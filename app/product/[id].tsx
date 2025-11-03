import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Button, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import medusaClient from '@/lib/medusa-client';

/**
 * Product Detail Screen (In Development)
 * 
 * Displays detailed product information including:
 * - Product images
 * - Description and specifications
 * - Pricing and availability
 * - Quantity selector
 * - Add to cart functionality
 * - Related products
 */
export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      if (id) {
        const product = await medusaClient.getProductById(id);
        setProduct(product);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      // TODO: Implement add to cart functionality
      // 1. Get cart ID from storage or create new cart
      // 2. Get selected variant
      // 3. Call medusaClient.addToCart()
      // 4. Show success message
      // 5. Navigate to cart or show toast
      console.log(`Adding ${quantity} item(s) to cart`);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', marginBottom: 10 }}>Error: {error}</Text>
        <Button title="Retry" onPress={loadProduct} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Product Images */}
      {product.images && product.images.length > 0 && (
        <View style={{ width: '100%', aspectRatio: 1 }}>
          <Image
            source={{ uri: product.images[0].url }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
        </View>
      )}

      {/* Product Info */}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
          {product.title}
        </Text>

        {/* Price */}
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          {product.variants && product.variants.length > 0 && (
            <>
              {product.variants[0].prices && (
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#2563eb' }}>
                  ${product.variants[0].prices[0]?.amount / 100}
                </Text>
              )}
            </>
          )}
        </View>

        {/* Description */}
        {product.description && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, color: '#666', lineHeight: 22 }}>
              {product.description}
            </Text>
          </View>
        )}

        {/* Quantity Selector */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ marginRight: 10, fontWeight: '600' }}>Quantity:</Text>
          <Button title="-" onPress={() => setQuantity(Math.max(1, quantity - 1))} />
          <Text style={{ marginHorizontal: 16, fontSize: 16 }}>{quantity}</Text>
          <Button title="+" onPress={() => setQuantity(quantity + 1)} />
        </View>

        {/* Add to Cart Button */}
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          color="#2563eb"
        />
      </View>
    </ScrollView>
  );
}
