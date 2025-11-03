# Medusa Storefront

Universal customer storefront for the Medusa marketplace. Built with Expo/React for web and mobile access.

## Features

- 🛍️ **Product Browsing** - Browse products with images, descriptions, and pricing
- 🛒 **Shopping Cart** - Add/remove items and manage quantities
- 💳 **Checkout** - Seamless checkout experience with delivery options
- 📦 **Order Tracking** - Track order status and delivery
- 📱 **Cross-Platform** - Works on web, iOS, and Android via Expo
- 🔗 **Medusa Integration** - Connects to Medusa backend via gohaste.medusajs.app
- 🎨 **Beautiful UI** - Native-feeling mobile UI with React Native
- 🚚 **Stuart Delivery Integration** - Real-time parcel creation, tracking, and delivery management

## Tech Stack

- **Frontend Framework**: Expo / React Native
- **Routing**: Expo Router
- **State Management**: React Hooks
- **Backend**: Medusa (gohaste.medusajs.app)
- **Delivery Partner**: Stuart Delivery API
- **Language**: TypeScript
- **Styling**: React Native StyleSheet

## Project Structure

```
medusa-storefront/
├── app/
│   ├── index.tsx              # Home/products screen
│   ├── cart/
│   │   └── index.tsx          # Shopping cart screen
│   ├── product/
│   │   └── [id].tsx           # Product detail screen (in development)
│   ├── checkout/
│   │   └── index.tsx          # Checkout screen (in development)
│   ├── order/
│   │   ├── confirmation/
│   │   │   └── index.tsx      # Order confirmation (in development)
│   │   └── tracking/
│   │       └── index.tsx      # Delivery tracking (in development)
│   └── auth/
│       └── login.tsx          # Customer login (in development)
├── lib/
│   ├── medusa-client.ts       # Medusa API client
│   ├── stuart-client.ts       # Stuart Delivery API client
│   └── useStuartDelivery.ts   # React hook for Stuart integration
├── app.json                   # Expo configuration
├── package.json               # Dependencies
├── .env.example               # Environment variables template
├── README.md                  # This file
├── STUART_DELIVERY_INTEGRATION.md # Stuart integration guide
└── DEPLOYMENT_GUIDE.md        # Deployment instructions
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/AWM-Deeper/medusa-storefront.git
cd medusa-storefront

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your configuration to .env
# EXPO_PUBLIC_MEDUSA_URL=https://gohaste.medusajs.app
# EXPO_PUBLIC_STUART_API_KEY=your_key_here
# EXPO_PUBLIC_STUART_ENABLED=true
```

### Development

```bash
# Start Expo development server
npm start

# Run on web
npm run web

# Run on iOS (requires macOS)
npm run ios

# Run on Android (requires Android SDK)
npm run android
```

### Building for Production

```bash
# Build for web
npm run build:web

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Medusa Integration

The storefront connects to a Medusa backend running at `https://gohaste.medusajs.app`.

### API Methods

- `getProducts()` - Fetch all products
- `getProductById(id)` - Fetch specific product
- `getProductByHandle(handle)` - Fetch product by handle
- `createCart()` - Create a new shopping cart
- `addToCart(cartId, variantId, quantity)` - Add items to cart
- `createOrder(cartId, email)` - Complete checkout

See `lib/medusa-client.ts` for full API documentation.

## Stuart Delivery Integration

The storefront includes integrated real-time delivery management via the Stuart Delivery API.

### Features

- 📍 **Real-time Parcel Creation** - Automatically create delivery jobs when orders are placed
- 🚚 **Delivery Management** - Submit delivery requests with pickup and destination details
- 📦 **Order Tracking** - Real-time tracking with driver information and ETA
- ✅ **Delivery Cancellation** - Cancel deliveries when needed

### Quick Setup

1. Get your Stuart API key from [Stuart Console](https://console.stuart.com)
2. Add to `.env` file:
   ```
   EXPO_PUBLIC_STUART_API_KEY=your_api_key_here
   EXPO_PUBLIC_STUART_ENABLED=true
   ```
3. Use the `useStuartDelivery` hook in cart/checkout components

### Components

- **lib/stuart-client.ts** - Core Stuart API client with methods for job/delivery creation and tracking
- **lib/useStuartDelivery.ts** - React hook for managing Stuart Delivery state in components
- **STUART_DELIVERY_INTEGRATION.md** - Complete integration guide with examples

For detailed integration instructions, see [STUART_DELIVERY_INTEGRATION.md](./STUART_DELIVERY_INTEGRATION.md)

## Current Progress

✅ **Completed**:
- Project initialization with Expo
- Home/products listing screen
- Shopping cart screen with item management
- Medusa API client with type definitions
- app.json configuration for multi-platform builds
- **NEW: Stuart Delivery client library (lib/stuart-client.ts)**
- **NEW: Stuart Delivery React hook (lib/useStuartDelivery.ts)**
- **NEW: Stuart integration documentation**

🔄 **In Development**:
- Product detail pages
- Checkout flow with address entry
- Order confirmation
- User authentication
- Delivery tracking with Stuart
- **Integration of Stuart Delivery into cart/checkout flow**

⏸️ **Planned**:
- Payment gateway integration
- Wishlist functionality
- Product reviews and ratings
- Search and filtering
- User account management
- Notification system
- Multi-carrier delivery support

## Contributing

This is an active development project. All code follows TypeScript best practices and React Native conventions.

## License

MIT

## Support

For issues or questions, please reach out to the AWM-Deeper team.

## Deployment Status

- Dashboard: Live on Vercel
- Storefront: Ready for deployment
- Backend: Operational at gohaste.medusajs.app
- Stuart Integration: Ready for production (requires valid API key)
