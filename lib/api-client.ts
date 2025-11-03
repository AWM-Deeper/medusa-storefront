import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://stingray-app-yitsm.ondigitalocean.app';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  inventory?: number;
  [key: string]: any;
}

export interface Order {
  id: string;
  order_number?: string;
  total?: number;
  status?: string;
  created_at?: string;
  items?: OrderItem[];
  [key: string]: any;
}

export interface OrderItem {
  id: string;
  product_id?: string;
  quantity: number;
  price: number;
  [key: string]: any;
}

export interface KPIData {
  totalInventory: number;
  totalOrders: number;
  totalSales: number;
  recentOrders: Order[];
}

// Products API
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get('/admin/products');
    return response.data.products || response.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await apiClient.get(`/admin/products/${id}`);
    return response.data.product || response.data || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

// Orders API
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await apiClient.get('/admin/orders');
    return response.data.orders || response.data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getOrder = async (id: string): Promise<Order | null> => {
  try {
    const response = await apiClient.get(`/admin/orders/${id}`);
    return response.data.order || response.data || null;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return null;
  }
};

// KPI Dashboard API
export const getKPIData = async (): Promise<KPIData> => {
  try {
    const [productsRes, ordersRes] = await Promise.all([
      apiClient.get('/admin/products'),
      apiClient.get('/admin/orders'),
    ]);

    const products: Product[] = productsRes.data.products || productsRes.data || [];
    const orders: Order[] = ordersRes.data.orders || ordersRes.data || [];

    const totalInventory = products.reduce((sum, p) => sum + (p.inventory || 0), 0);
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const recentOrders = orders.slice(0, 5);

    return {
      totalInventory,
      totalOrders,
      totalSales,
      recentOrders,
    };
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    return {
      totalInventory: 0,
      totalOrders: 0,
      totalSales: 0,
      recentOrders: [],
    };
  }
};

export default apiClient;
