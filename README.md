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

## Tech Stack

- **Frontend Framework**: Expo / React Native
- **Routing**: Expo Router
- **State Management**: React Hooks
- **Backend**: Medusa (gohaste.medusajs.app)
- **Language**: TypeScript
- **Styling**: React Native StyleSheet

## Project Structure

```
medusa-storefront/
├── app/
│   ├── index.tsx          # Home/products screen
│   ├── cart/
│   │   └── index.tsx      # Shopping cart screen
│   └── product/
│       └── [id].tsx       # Product detail screen (planned)
├── lib/
│   └── medusa-client.ts   # Medusa API client
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── README.md              # This file
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

## Current Progress

✅ **Completed**:
- Project initialization with Expo
- Home/products listing screen
- Shopping cart screen with item management
- Medusa API client with type definitions
- app.json configuration for multi-platform builds

🔄 **In Development**:
- Product detail pages
- Checkout flow with address entry
- Order confirmation
- User authentication
- Delivery tracking

⏸️ **Planned**:
- Payment gateway integration
- Wishlist functionality
- Product reviews and ratings
- Search and filtering
- User account management
- Notification system

## Contributing

This is an active development project. All code follows TypeScript best practices and React Native conventions.

## License

MIT

## Support

For issues or questions, please reach out to the AWM-Deeper team.
