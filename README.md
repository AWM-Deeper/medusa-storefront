# Medusa Storefront

Universal customer storefront for the Medusa marketplace. Built with Next.js for web and mobile access, with live product and order data integration.

## Features

- 🛍️ **Product Browsing** - Browse live products with images, descriptions, and pricing from the backend API
- 🛒 **Shopping Cart** - Add/remove items and manage quantities with state persistence
- 💳 **Checkout** - Seamless checkout experience with delivery options
- 📦 **Order Tracking** - Track order status and view recent orders in real-time
- 📊 **Dashboard** - Merchant dashboard with live KPI data (total sales, orders, inventory)
- 🔗 **API Integration** - Direct integration with Digital Ocean backend for live data
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS
- 🚚 **Stuart Delivery Integration** - Real-time parcel creation, tracking, and delivery management
- ⚡ **State Management** - Zustand for global state management of products, orders, and cart
- 🔄 **Real-time Updates** - Fetch and display live inventory, sales, and order data

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Client**: Axios
- **Backend API**: Digital Ocean (https://stingray-app-yitsm.ondigitalocean.app)

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AWM-Deeper/medusa-storefront.git
cd medusa-storefront
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Copy `.env.example` to `.env.local` and update with your configuration:

```bash
cp .env.example .env.local
```

Update `.env.local` with:
```env
# Digital Ocean Backend API URL (required for live data)
NEXT_PUBLIC_API_URL=https://stingray-app-yitsm.ondigitalocean.app

# Optional: Medusa Backend URL (for Medusa integration)
EXPO_PUBLIC_MEDUSA_URL=https://gohaste.medusajs.app

# Optional: Stuart Delivery Integration
EXPO_PUBLIC_STUART_API_KEY=your_api_key_here
EXPO_PUBLIC_STUART_ENABLED=true
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

## Pages

### Homepage (`/`)
- Displays live products from the Digital Ocean API
- Category sidebar for browsing
- Price range filter
- Product cards with images and pricing

### Product Detail (`/products/[id]`)
- Detailed product information
- Add to cart functionality

### Cart (`/cart`)
- View cart items and recent orders
- Order summary with totals
- Checkout button
- Real-time order data from API

### Dashboard (`/dashboard`)
- Live KPI metrics:
  - Total Inventory (from product data)
  - Total Orders (from order data)
  - Total Sales (sum of order totals)
  - Average Order Value
- Recent orders table with real-time data
- System status indicators
- Quick actions panel

## State Management (Zustand Store)

The application uses Zustand for global state management:

```typescript
// Products
- fetchProducts(): Fetch all products from API
- setSelectedProduct(): Set active product
- productsLoading: Loading state
- products: Array of products

// Orders
- fetchOrders(): Fetch all orders from API
- setSelectedOrder(): Set active order
- ordersLoading: Loading state
- orders: Array of orders

// KPI Data
- fetchKPIData(): Fetch aggregated dashboard metrics
- kpiData: Dashboard metrics (inventory, orders, sales)
- kpiLoading: Loading state

// Cart
- addToCart(): Add item to cart
- removeFromCart(): Remove item from cart
- updateCartItemQuantity(): Update item quantity
- clearCart(): Clear all cart items
- cartItems: Items in cart
```

## API Integration

The storefront connects to a Digital Ocean backend API with the following endpoints:

```
GET /admin/products - Fetch all products
GET /admin/products/:id - Fetch single product
GET /admin/orders - Fetch all orders
GET /admin/orders/:id - Fetch single order
```

See `lib/api-client.ts` for implementation details.

## Deployment

### Vercel Deployment

1. Push your changes to GitHub:
```bash
git add .
git commit -m "Update storefront with live data integration"
git push origin main
```

2. Connect to Vercel:
- Go to [vercel.com](https://vercel.com)
- Import the repository
- Set environment variables in Vercel project settings
- Deploy

3. Monitor deployment:
- Check Vercel dashboard for build status
- View deployment logs
- Test the live storefront

### Environment Variables in Production

Ensure these variables are set in your Vercel project:
- `NEXT_PUBLIC_API_URL`: Digital Ocean API endpoint
- Other optional variables for integrations

## Development

### Project Structure

```
medusa-storefront/
├── app/
│   ├── page.tsx           # Homepage
│   ├── dashboard/         # Merchant dashboard
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── product/           # Product pages
│   └── layout.tsx         # Root layout
├── lib/
│   ├── api-client.ts      # API client with endpoints
│   ├── store.ts           # Zustand store configuration
│   ├── medusa-client.ts   # Medusa integration
│   └── ...
├── public/                # Static assets
├── .env.example           # Environment variables template
└── package.json           # Dependencies
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

### Products not showing
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify Digital Ocean API is accessible
- Check browser console for API errors

### Orders not loading
- Ensure `/admin/orders` endpoint is accessible
- Check API authentication if required
- Verify order data format matches expected schema

### Dashboard KPI data missing
- Check that both `/admin/products` and `/admin/orders` endpoints are returning data
- Verify products have `inventory` field
- Verify orders have `total` and `created_at` fields

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an GitHub issue in this repository.
