/**
 * React Hook for Stuart Delivery Integration
 * 
 * This hook provides a simplified interface for using Stuart Delivery
 * in React/React Native components. It manages the state and API calls
 * for creating deliveries and tracking shipments.
 */
import { useState, useCallback, useEffect } from 'react';
import { getStuartClient } from './stuart-client';
import type { ParcelRequest, DeliveryRequest, TrackingInfo } from './stuart-client';

interface UseStuartDeliveryState {
  loading: boolean;
  error: string | null;
  jobId: string | null;
  deliveryId: string | null;
  tracking: TrackingInfo | null;
}

interface UseStuartDeliveryActions {
  createJob: (parcel: ParcelRequest) => Promise<boolean>;
  createDelivery: (delivery: DeliveryRequest) => Promise<boolean>;
  getTracking: (deliveryId: string) => Promise<boolean>;
  cancelDelivery: (jobId: string) => Promise<boolean>;
  reset: () => void;
}

type UseStuartDeliveryReturn = UseStuartDeliveryState & UseStuartDeliveryActions;

/**
 * Hook to manage Stuart Delivery integration
 * 
 * Usage in Cart/Checkout component:
 * ```tsx
 * const { loading, error, jobId, deliveryId, createJob, createDelivery } = useStuartDelivery();
 * 
 * const handleCheckout = async (cartItems, address) => {
 *   const success = await createJob(parcelRequest);
 *   if (success) {
 *     const deliverySuccess = await createDelivery(deliveryRequest);
 *     if (deliverySuccess) {
 *       // Process order with delivery_id
 *     }
 *   }
 * };
 * ```
 */
export const useStuartDelivery = (): UseStuartDeliveryReturn => {
  const [state, setState] = useState<UseStuartDeliveryState>({
    loading: false,
    error: null,
    jobId: null,
    deliveryId: null,
    tracking: null,
  });

  const client = getStuartClient();

  // Check if Stuart is enabled on mount
  useEffect(() => {
    if (!client.isEnabled()) {
      console.warn(
        'Stuart Delivery is not enabled. Set EXPO_PUBLIC_STUART_API_KEY and EXPO_PUBLIC_STUART_ENABLED in .env'
      );
    }
  }, [client]);

  /**
   * Create a job (parcel) in Stuart
   */
  const createJob = useCallback(
    async (parcelRequest: ParcelRequest): Promise<boolean> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await client.createJob(parcelRequest);
        if (result.success && result.jobId) {
          setState((prev) => ({
            ...prev,
            loading: false,
            jobId: result.jobId ?? null,
            error: null,
          }));
          console.log('Stuart job created:', result.jobId);
          return true;
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: result.error ?? 'Failed to create Stuart job',
          }));
          return false;
        }
      } catch (error: any) {
        const errorMessage = error.message ?? 'An error occurred while creating Stuart job';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        console.error('Error creating Stuart job:', errorMessage);
        return false;
      }
    },
    [client]
  );

  /**
   * Create a delivery request for a job
   */
  const createDelivery = useCallback(
    async (deliveryRequest: DeliveryRequest): Promise<boolean> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await client.createDelivery(deliveryRequest);
        if (result.success && result.deliveryId) {
          setState((prev) => ({
            ...prev,
            loading: false,
            deliveryId: result.deliveryId ?? null,
            error: null,
          }));
          console.log('Stuart delivery created:', result.deliveryId);
          return true;
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: result.error ?? 'Failed to create Stuart delivery',
          }));
          return false;
        }
      } catch (error: any) {
        const errorMessage = error.message ?? 'An error occurred while creating Stuart delivery';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        console.error('Error creating Stuart delivery:', errorMessage);
        return false;
      }
    },
    [client]
  );

  /**
   * Get tracking information
   */
  const getTracking = useCallback(
    async (deliveryId: string): Promise<boolean> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await client.getTracking(deliveryId);
        if (result.success && result.tracking) {
          setState((prev) => ({
            ...prev,
            loading: false,
            tracking: result.tracking ?? null,
            error: null,
          }));
          console.log('Tracking info retrieved:', result.tracking);
          return true;
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: result.error ?? 'Failed to retrieve tracking',
          }));
          return false;
        }
      } catch (error: any) {
        const errorMessage = error.message ?? 'An error occurred while fetching tracking';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        console.error('Error retrieving tracking:', errorMessage);
        return false;
      }
    },
    [client]
  );

  /**
   * Cancel a delivery
   */
  const cancelDelivery = useCallback(
    async (jobId: string): Promise<boolean> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await client.cancelDelivery(jobId);
        if (result.success) {
          setState((prev) => ({
            ...prev,
            loading: false,
            jobId: null,
            deliveryId: null,
            error: null,
          }));
          console.log('Delivery cancelled:', jobId);
          return true;
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: result.error ?? 'Failed to cancel delivery',
          }));
          return false;
        }
      } catch (error: any) {
        const errorMessage = error.message ?? 'An error occurred while cancelling delivery';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        console.error('Error cancelling delivery:', errorMessage);
        return false;
      }
    },
    [client]
  );

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      jobId: null,
      deliveryId: null,
      tracking: null,
    });
  }, []);

  return {
    ...state,
    createJob,
    createDelivery,
    getTracking,
    cancelDelivery,
    reset,
  };
};

export default useStuartDelivery;
