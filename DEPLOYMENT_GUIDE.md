# Medusa Storefront Deployment Guide

## Overview

This guide covers deploying the Medusa Storefront to production via Vercel for the web, with support for iOS and Android through Expo.

## Status

- ✅ Code: Production-ready
- ✅ Configuration: Complete with vercel.json
- ✅ Environment Variables: Documented (.env.example)
- ✅ GitHub: Ready for deployment

## Deployment to Vercel (Web)

### Quick Start

1. **Fork or Clone Repository**
   ```bash
   git clone https://github.com/AWM-Deeper/medusa-storefront.git
   ```

2. **Sign Up for Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub

3. **Import Project**
   - Click "New Project"
   - Select "AWM-Deeper/medusa-storefront"
   - Click "Import"

4. **Configure Environment Variables**
   - Set `EXPO_PUBLIC_MEDUSA_URL=https://gohaste.medusajs.app`
   - Click "Deploy"

5. **Access Your App**
   - Vercel provides a live URL automatically
   - Example: `https://medusa-storefront-[YOUR_NAME].vercel.app`

### Environment Variables

```
EXPO_PUBLIC_MEDUSA_URL=https://gohaste.medusajs.app
```

### Testing the Deployment

After deployment:

1. Visit your Vercel URL
2. The app loads with the Medusa backend connection
3. Browse products from the connected Shopify stores
4. Add items to cart
5. Test checkout flow

## Local Development

### Web Version

```bash
npm install
npm run web
```

Visits `http://localhost:19006` in your browser.

### iOS

```bash
npm start
# Then press 'i' for iOS
```

Requires Xcode and iOS simulator.

### Android

```bash
npm start
# Then press 'a' for Android
```

Requires Android Studio and Android emulator.

## Production Build

### Expo Web Export

```bash
npx expo export:web
```

Generates `dist/` folder ready for hosting.

### Deploy to Custom Hosting

If not using Vercel:

1. Run `npx expo export:web`
2. Upload `dist/` contents to your hosting provider
3. Set `EXPO_PUBLIC_MEDUSA_URL` in environment

## API Integration

The storefront connects to:

- **Medusa Backend**: https://gohaste.medusajs.app
- **Endpoints Used**:
  - `GET /store/products` - Product listing
  - `POST /store/carts` - Create shopping cart
  - `GET /store/carts/{id}` - Get cart details
  - `POST /store/orders` - Create order

## Testing Checklist

- [ ] Products load from Medusa
- [ ] Product details display correctly
- [ ] Add to cart functionality works
- [ ] Cart updates show correct totals
- [ ] Checkout process initiates
- [ ] Mobile responsive on all screen sizes

## Troubleshooting

### Products Not Loading

1. Verify `EXPO_PUBLIC_MEDUSA_URL` is correct
2. Check Medusa backend is accessible
3. Review browser console for CORS errors

### Build Errors

1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Expo cache: `npx expo start --clear`
3. Check Node version: `npm run` requires Node 16+

### Deployment Fails

1. Ensure all dependencies are specified in package.json
2. Check that build command is `npm run build` or `expo export:web`
3. Verify environment variables are set in Vercel

## Support

For issues or questions:

1. Check GitHub Issues: https://github.com/AWM-Deeper/medusa-storefront/issues
2. Review Medusa docs: https://docs.medusajs.com
3. Contact: support@awm-deeper.com
