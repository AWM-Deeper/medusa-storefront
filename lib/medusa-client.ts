const MEDUSA_URL = process.env.EXPO_PUBLIC_MEDUSA_URL || 'https://gohaste.medusajs.app';
const MEDUSA_API_KEY = process.env.EXPO_PUBLIC_MEDUSA_API_KEY || '';

export interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  price: number;
  image_url?: string;
  in_stock: boolean;
  variants?: Variant[];
}

export interface Variant {
  id: string;
  title: string;
  sku?: string;
  price: number;
  inventory_quantity: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  variant_id: string;
  quantity: number;
  unit_price: number;
  title: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shipping_address?: Address;
  items: CartItem[];
  created_at: string;
}

export interface Address {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  postal_code?: string;
  country_code?: string;
  phone?: string;
}

class MedusaClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string = MEDUSA_URL, apiKey: string = MEDUSA_API_KEY) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async fetch(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.apiKey && { 'x-publishable-api-key': this.apiKey }),
      ...options.headers,
    };

    const defaultOptions: RequestInit = {
      headers,
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error);
      throw error;
    }
  }

  // Products
  async getProducts(): Promise<Product[]> {
    const response: any = await this.fetch('/store/products');
    return response.products || [];
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    const response: any = await this.fetch(`/store/products?handle=${handle}`);
    return response.products?.[0] || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    const response: any = await this.fetch(`/store/products/${id}`);
    return response.product || null;
  }

  // Collections
  async getCollections(): Promise<any[]> {
    const response: any = await this.fetch('/store/collections');
    return response.collections || [];
  }

  async getCollectionByHandle(handle: string): Promise<any | null> {
    const response: any = await this.fetch(
      `/store/collections?handle=${handle}`
    );
    return response.collections?.[0] || null;
  }

  // Cart
  async createCart(): Promise<any> {
    return this.fetch('/store/carts', {
      method: 'POST',
    });
  }

  async getCart(cartId: string): Promise<any> {
    return this.fetch(`/store/carts/${cartId}`);
  }

  async addToCart(
    cartId: string,
    variantId: string,
    quantity: number
  ): Promise<any> {
    return this.fetch(`/store/carts/${cartId}/line-items`, {
      method: 'POST',
      body: JSON.stringify({
        variant_id: variantId,
        quantity,
      }),
    });
  }

  async updateCartItem(
    cartId: string,
    lineItemId: string,
    quantity: number
  ): Promise<any> {
    return this.fetch(`/store/carts/${cartId}/line-items/${lineItemId}`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(cartId: string, lineItemId: string): Promise<any> {
    return this.fetch(`/store/carts/${cartId}/line-items/${lineItemId}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async createOrder(cartId: string, customerEmail: string): Promise<any> {
    return this.fetch(`/store/carts/${cartId}/complete`, {
      method: 'POST',
      body: JSON.stringify({
        email: customerEmail,
      }),
    });
  }

  async getOrder(orderId: string): Promise<Order | null> {
    try {
      return await this.fetch(`/store/orders/${orderId}`);
    } catch {
      return null;
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response: any = await this.fetch(
      `/store/products?q=${encodeURIComponent(query)}`
    );
    return response.products || [];
  }
}

export const medusaClient = new MedusaClient();
