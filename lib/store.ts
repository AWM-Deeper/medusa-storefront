import { create } from 'zustand';
import { Product, Order, KPIData, Store } from './api-client';
import { getProducts, getOrders, getKPIData, getStores, calculateStoreRevenues } from './api-client';

interface StoreState {
  // Products
  products: Product[];
  selectedProduct: Product | null;
  productsLoading: boolean;
  productsError: string | null;
  fetchProducts: () => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  
  // Orders
  orders: Order[];
  selectedOrder: Order | null;
  ordersLoading: boolean;
  ordersError: string | null;
  fetchOrders: () => Promise<void>;
  setSelectedOrder: (order: Order | null) => void;
  
  // Stores
  stores: Store[];
  storesLoading: boolean;
  storesError: string | null;
  storeRevenues: Record<string, number>;
  fetchStores: () => Promise<void>;
  
  // KPI Dashboard
  kpiData: KPIData | null;
  kpiLoading: boolean;
  kpiError: string | null;
  fetchKPIData: () => Promise<void>;
  
  // Cart
  cartItems: (Product & { quantity: number })[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Products
  products: [],
  selectedProduct: null,
  productsLoading: false,
  productsError: null,
  fetchProducts: async () => {
    set({ productsLoading: true, productsError: null });
    try {
      const products = await getProducts();
      set({ products, productsLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      set({ productsError: errorMessage, productsLoading: false });
    }
  },
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  // Orders
  orders: [],
  selectedOrder: null,
  ordersLoading: false,
  ordersError: null,
  fetchOrders: async () => {
    set({ ordersLoading: true, ordersError: null });
    try {
      const orders = await getOrders();
      set({ orders, ordersLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orders';
      set({ ordersError: errorMessage, ordersLoading: false });
    }
  },
  setSelectedOrder: (order) => set({ selectedOrder: order }),
  
  // Stores
  stores: [],
  storesLoading: false,
  storesError: null,
  storeRevenues: {},
  fetchStores: async () => {
    set({ storesLoading: true, storesError: null });
    try {
      const [stores, revenues] = await Promise.all([
        getStores(),
        calculateStoreRevenues(),
      ]);
      set({ stores, storeRevenues: revenues, storesLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch stores';
      set({ storesError: errorMessage, storesLoading: false });
    }
  },
  
  // KPI Dashboard
  kpiData: null,
  kpiLoading: false,
  kpiError: null,
  fetchKPIData: async () => {
    set({ kpiLoading: true, kpiError: null });
    try {
      const kpiData = await getKPIData();
      set({ kpiData, kpiLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch KPI data';
      set({ kpiError: errorMessage, kpiLoading: false });
    }
  },
  
  // Cart
  cartItems: [],
  addToCart: (product, quantity) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...product, quantity }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),
  updateCartItemQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
