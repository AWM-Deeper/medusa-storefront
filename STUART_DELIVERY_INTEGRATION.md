# Stuart Delivery Integration Guide

This document provides complete integration instructions for the Stuart Delivery API in the Medusa Storefront.

## Overview

The Stuart Delivery integration enables real-time parcel creation, delivery management, and tracking through the Stuart Delivery platform. This is implemented in the cart/checkout flow for seamless order fulfillment.

## Architecture

### Core Components

#### 1. **lib/stuart-client.ts** - Stuart API Client
Comprehensive TypeScript client for Stuart Delivery API with the following features:
- Job creation (parcel/shipment creation)
- Delivery request submission
- Tracking information retrieval
- Delivery cancellation
- Full error handling and logging

**Integration Points:**
```typescript
import { getStuartClient } from './lib/stuart-client';
const client = getStuartClient(); // Singleton instance
```

#### 2. **lib/useStuartDelivery.ts** - React Hook
React hook that provides state management for Stuart Delivery integration with:
- Loading state management
- Error handling
- Job and delivery ID tracking
- Tracking information state
- Simplified API interface

**Usage:**
```typescript
import { useStuartDelivery } from './lib/useStuartDelivery';

const Cart = () => {
  const { loading, error, jobId, deliveryId, createJob, createDelivery, getTracking } = useStuartDelivery();
  
  // Ready to use in component
};
```

## Configuration

### Environment Variables

Add to your `.env` file (see `.env.example` for template):

```bash
# Stuart Delivery API Key (from Stuart Dashboard)
EXPO_PUBLIC_STUART_API_KEY=sk_test_placeholder_key_replace_with_real_key

# Enable/disable Stuart integration
EXPO_PUBLIC_STUART_ENABLED=true
```

### Getting Your Stuart API Key

1. Sign up at [Stuart Delivery Console](https://console.stuart.com)
2. Navigate to API Settings → API Keys
3. Create a new API key (or use existing test key)
4. Replace `sk_test_placeholder_key_replace_with_real_key` with your actual key
5. Keep the key secure - never commit actual keys to version control

## Implementation Examples

### Cart Page Integration

```typescript
// app/cart/index.tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useStuartDelivery } from '@/lib/useStuartDelivery';
import type { ParcelRequest, DeliveryRequest } from '@/lib/stuart-client';

export default function CartScreen() {
  const { loading, error, deliveryId, createJob, createDelivery } = useStuartDelivery();
  const [orderData, setOrderData] = useState(null);

  const handleCheckout = async () => {
    try {
      // 1. Create parcel/job in Stuart
      const parcelRequest: ParcelRequest = {
        reference: `ORDER-${Date.now()}`,
        line_items: [
          {
            description: 'Order Items',
            quantity: 1,
            weight: 2.5, // kg
          },
        ],
        origin: {
          address: '123 Store Street',
          postal_code: '75001',
          city: 'Dallas',
          country: 'US',
          contact: {
            firstname: 'Store',
            lastname: 'Name',
            phone: '+1234567890',
            email: 'store@example.com',
          },
        },
        destination: {
          address: '456 Customer Ave',
          postal_code: '75002',
          city: 'Dallas',
          country: 'US',
          contact: {
            firstname: 'John',
            lastname: 'Doe',
            phone: '+9876543210',
            email: 'customer@example.com',
          },
        },
      };

      const jobCreated = await createJob(parcelRequest);
      if (!jobCreated) {
        throw new Error(error || 'Failed to create Stuart job');
      }

      // 2. Create delivery request
      const deliveryRequest: DeliveryRequest = {
        job_id: jobId!, // From hook state
        pickup_at: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        deliveries: [
          {
            package_type: 'small_parcel',
            items: parcelRequest.line_items,
            reference: parcelRequest.reference,
            origin: parcelRequest.origin,
            destination: parcelRequest.destination,
          },
        ],
      };

      const deliveryCreated = await createDelivery(deliveryRequest);
      if (!deliveryCreated) {
        throw new Error(error || 'Failed to create Stuart delivery');
      }

      // 3. Process order with Stuart delivery ID
      setOrderData({
        medusa_order_id: 'order-123',
        stuart_delivery_id: deliveryId,
        status: 'processing',
      });

      // Complete order processing...
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <View>
      <Text>Shopping Cart</Text>
      <Button 
        title={loading ? 'Processing...' : 'Proceed to Checkout'}
        onPress={handleCheckout}
        disabled={loading}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {deliveryId && <Text>Delivery ID: {deliveryId}</Text>}
    </View>
  );
}
```

### Order Confirmation with Tracking

```typescript
// app/order/confirmation/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useStuartDelivery } from '@/lib/useStuartDelivery';

export default function OrderConfirmation({ deliveryId }) {
  const { tracking, getTracking, loading } = useStuartDelivery();

  useEffect(() => {
    // Poll for tracking updates
    const interval = setInterval(() => {
      getTracking(deliveryId);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [deliveryId]);

  return (
    <View>
      <Text>Order Confirmation</Text>
      {tracking && (
        <View>
          <Text>Status: {tracking.status}</Text>
          <Text>Driver: {tracking.driver_info?.name}</Text>
          <Text>ETA: {tracking.estimated_arrival}</Text>
        </View>
      )}
    </View>
  );
}
```

## API Reference

### StuartDeliveryClient Methods

#### `createJob(parcelRequest: ParcelRequest)`
Creates a job (parcel/shipment) in Stuart.

**Parameters:**
- `reference`: Order reference (unique identifier)
- `line_items`: Array of items with description, quantity, weight
- `origin`: Pickup location details
- `destination`: Delivery location details

**Returns:**
```typescript
{
  success: boolean;
  jobId?: string;        // Stuart job ID
  error?: string;        // Error message if failed
}
```

#### `createDelivery(deliveryRequest: DeliveryRequest)`
Submits a delivery request for a created job.

**Parameters:**
- `job_id`: The job ID from createJob
- `pickup_at`: ISO 8601 timestamp for pickup time
- `deliveries`: Array of delivery details

**Returns:**
```typescript
{
  success: boolean;
  deliveryId?: string;   // Stuart delivery ID
  error?: string;
}
```

#### `getTracking(deliveryId: string)`
Retrrieves real-time tracking information.

**Returns:**
```typescript
{
  success: boolean;
  tracking?: {
    delivery_id: string;
    status: string;                    // e.g., 'in_transit', 'delivered'
    current_location?: {
      latitude: number;
      longitude: number;
    };
    estimated_arrival?: string;        // ISO 8601 timestamp
    driver_info?: {
      name: string;
      phone: string;
      vehicle: string;
    };
  };
  error?: string;
}
```

#### `cancelDelivery(jobId: string)`
Cancels an active delivery.

**Returns:**
```typescript
{
  success: boolean;
  error?: string;
}
```

## Error Handling

The Stuart client provides comprehensive error handling:

```typescript
const { error, createJob } = useStuartDelivery();

const handleCheckout = async () => {
  const success = await createJob(parcelRequest);
  
  if (!success) {
    // error will contain the error message
    console.error('Stuart error:', error);
    // Show user-friendly error message
  }
};
```

## Testing

### Mock Mode
When `EXPO_PUBLIC_STUART_ENABLED=false`, the client will return mock responses for development.

### Using Test API Key
Steart provides test API keys (`sk_test_*`) that don't create real deliveries. Use these for development and testing.

### Integration Testing
```typescript
import { getStuartClient } from '@/lib/stuart-client';

// Verify configuration
const client = getStuartClient();
const { valid, errors } = client.validateConfig();
if (!valid) {
  console.error('Stuart config errors:', errors);
}
```

## Security Considerations

1. **API Key Management**
   - Never commit real API keys to version control
   - Use environment variables for sensitive data
   - Rotate keys periodically

2. **Data Validation**
   - Always validate user input before sending to Stuart
   - Sanitize address information

3. **Error Messages**
   - Don't expose internal API errors to users
   - Log detailed errors server-side for debugging

## Troubleshooting

### Common Issues

**"Stuart Delivery is not enabled" error**
- Verify `EXPO_PUBLIC_STUART_ENABLED=true` in .env
- Check `EXPO_PUBLIC_STUART_API_KEY` is set
- Ensure environment variables are loaded before app initialization

**"Missing required fields" error**
- Verify all ParcelRequest/DeliveryRequest fields are populated
- Check address format matches Stuart requirements
- Ensure contact information is complete

**API request timeouts**
- Check network connectivity
- Verify Stuart API is accessible from your location/network
- Increase timeout in axios configuration if needed

## Production Deployment

1. Update `.env` with production Stuart API key
2. Set `EXPO_PUBLIC_STUART_ENABLED=true` only in production
3. Implement proper error logging and monitoring
4. Test end-to-end checkout flow with real deliveries
5. Set up webhook handlers for delivery status updates (if available)

## Additional Resources

- [Stuart API Documentation](https://docs.stuart.com/)
- [Stuart Console](https://console.stuart.com)
- [Medusa Documentation](https://docs.medusajs.com/)

## Support

For issues or questions:
1. Check this documentation
2. Review Stuart API docs
3. Check error logs in browser console
4. Open an issue in the repository
