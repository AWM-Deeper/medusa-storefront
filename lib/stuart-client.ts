/**
 * Stuart Delivery Integration Client
 * 
 * This client provides integration with the Stuart Delivery API for parcel
 * creation, tracking, and delivery management in the Medusa storefront.
 * 
 * API Documentation: https://docs.stuart.com/
 */

import axios from 'axios';

/**
 * Configuration for Stuart API
 */
interface StuartConfig {
  apiKey: string;
  apiUrl: string;
  enabled: boolean;
}

/**
 * Parcel request interface for Stuart API
 */
interface ParcelRequest {
  line_items: {
    description: string;
    quantity: number;
    weight: number; // in kg
  }[];
  reference: string; // Order reference
  origin: {
    address: string;
    postal_code: string;
    city: string;
    country: string;
    contact?: {
      firstname: string;
      lastname: string;
      phone: string;
      email: string;
    };
  };
  destination: {
    address: string;
    postal_code: string;
    city: string;
    country: string;
    contact: {
      firstname: string;
      lastname: string;
      phone: string;
      email: string;
    };
  };
}

/**
 * Delivery request interface
 */
interface DeliveryRequest {
  job_id: string;
  pickup_at?: string;
  deliveries: {
    package_type: string;
    items: ParcelRequest['line_items'];
    reference: string;
    origin: ParcelRequest['origin'];
    destination: ParcelRequest['destination'];
  }[];
}

/**
 * Tracking information interface
 */
interface TrackingInfo {
  delivery_id: string;
  status: string;
  current_location?: {
    latitude: number;
    longitude: number;
  };
  estimated_arrival?: string;
  driver_info?: {
    name: string;
    phone: string;
    vehicle: string;
  };
}

/**
 * Stuart Delivery Client
 */
class StuartDeliveryClient {
  private config: StuartConfig;
  private axiosInstance: any;

  constructor(apiKey: string, enabled: boolean = true) {
    this.config = {
      apiKey,
      apiUrl: 'https://api.stuart.com/v2',
      enabled,
    };

    if (this.config.enabled && this.config.apiKey) {
      this.axiosInstance = axios.create({
        baseURL: this.config.apiUrl,
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
    }
  }

  /**
   * Check if Stuart integration is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled && !!this.config.apiKey;
  }

  /**
   * Validate configuration
   */
  validateConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config.apiKey) {
      errors.push('Stuart API key is not configured');
    }

    if (!this.config.enabled) {
      errors.push('Stuart Delivery integration is disabled');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Create a parcel/job in Stuart
   * This is the main integration point for the cart/checkout flow
   */
  async createJob(parcelRequest: ParcelRequest): Promise<{ success: boolean; jobId?: string; error?: string }> {
    try {
      if (!this.isEnabled()) {
        return {
          success: false,
          error: 'Stuart Delivery is not enabled. Check EXPO_PUBLIC_STUART_API_KEY and EXPO_PUBLIC_STUART_ENABLED.',
        };
      }

      // Validate required fields
      if (!parcelRequest.reference || !parcelRequest.origin || !parcelRequest.destination) {
        return {
          success: false,
          error: 'Missing required fields: reference, origin, or destination',
        };
      }

      // Make API call to create job
      const response = await this.axiosInstance.post('/jobs', {
        line_items: parcelRequest.line_items,
        reference: parcelRequest.reference,
        origin: parcelRequest.origin,
        destination: parcelRequest.destination,
      });

      return {
        success: true,
        jobId: response.data.id,
      };
    } catch (error: any) {
      console.error('Error creating Stuart job:', error);
      return {
        success: false,
        error: error.message || 'Failed to create Stuart job',
      };
    }
  }

  /**
   * Create a delivery request for a job
   */
  async createDelivery(deliveryRequest: DeliveryRequest): Promise<{ success: boolean; deliveryId?: string; error?: string }> {
    try {
      if (!this.isEnabled()) {
        return {
          success: false,
          error: 'Stuart Delivery is not enabled',
        };
      }

      // Validate required fields
      if (!deliveryRequest.job_id || !deliveryRequest.deliveries || deliveryRequest.deliveries.length === 0) {
        return {
          success: false,
          error: 'Missing required fields: job_id or deliveries',
        };
      }

      // Make API call to create delivery
      const response = await this.axiosInstance.post(
        `/jobs/${deliveryRequest.job_id}/delivery`,
        {
          pickup_at: deliveryRequest.pickup_at,
          deliveries: deliveryRequest.deliveries,
        }
      );

      return {
        success: true,
        deliveryId: response.data.id,
      };
    } catch (error: any) {
      console.error('Error creating Stuart delivery:', error);
      return {
        success: false,
        error: error.message || 'Failed to create Stuart delivery',
      };
    }
  }

  /**
   * Get tracking information for a delivery
   */
  async getTracking(deliveryId: string): Promise<{ success: boolean; tracking?: TrackingInfo; error?: string }> {
    try {
      if (!this.isEnabled()) {
        return {
          success: false,
          error: 'Stuart Delivery is not enabled',
        };
      }

      const response = await this.axiosInstance.get(`/jobs/${deliveryId}`);

      const tracking: TrackingInfo = {
        delivery_id: response.data.id,
        status: response.data.status,
        current_location: response.data.current_location,
        estimated_arrival: response.data.eta,
        driver_info: response.data.assignee,
      };

      return {
        success: true,
        tracking,
      };
    } catch (error: any) {
      console.error('Error retrieving Stuart tracking:', error);
      return {
        success: false,
        error: error.message || 'Failed to retrieve tracking information',
      };
    }
  }

  /**
   * Cancel a delivery
   */
  async cancelDelivery(jobId: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.isEnabled()) {
        return {
          success: false,
          error: 'Stuart Delivery is not enabled',
        };
      }

      await this.axiosInstance.delete(`/jobs/${jobId}`);

      return {
        success: true,
      };
    } catch (error: any) {
      console.error('Error cancelling Stuart delivery:', error);
      return {
        success: false,
        error: error.message || 'Failed to cancel delivery',
      };
    }
  }
}

/**
 * Initialize Stuart Delivery Client
 * This should be called in your app initialization
 */
export const initializeStuartClient = (): StuartDeliveryClient => {
  const apiKey = process.env.EXPO_PUBLIC_STUART_API_KEY || '';
  const enabled = process.env.EXPO_PUBLIC_STUART_ENABLED === 'true';

  return new StuartDeliveryClient(apiKey, enabled);
};

/**
 * Create a singleton instance for use throughout the app
 */
let stuartClientInstance: StuartDeliveryClient | null = null;

export const getStuartClient = (): StuartDeliveryClient => {
  if (!stuartClientInstance) {
    stuartClientInstance = initializeStuartClient();
  }
  return stuartClientInstance;
};

export type { ParcelRequest, DeliveryRequest, TrackingInfo };
export { StuartDeliveryClient };
export default getStuartClient();
