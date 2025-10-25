import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';

type Product = {
  id: string;
  title: string;
  handle: string;
  price: number;
  description?: string;
  image_url?: string;
  in_stock: boolean;
};

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch products from Medusa
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO: Connect to gohaste.medusajs.app
        const response = await fetch('https://gohaste.medusajs.app/store/products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Demo data
        setProducts([
          {
            id: '1',
            title: 'Premium Headphones',
            handle: 'premium-headphones',
            price: 19999,
            description: 'High-quality audio headphones',
            in_stock: true,
          },
          {
            id: '2',
            title: 'Wireless Mouse',
            handle: 'wireless-mouse',
            price: 4999,
            description: 'Ergonomic wireless mouse',
            in_stock: true,
          },
          {
            id: '3',
            title: 'USB-C Cable',
            handle: 'usb-c-cable',
            price: 999,
            description: 'Fast charging USB-C cable',
            in_stock: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <Link href={`/product/${item.id}`} asChild>
      <TouchableOpacity style={styles.productCard}>
        <View style={styles.productImage}>
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>
          ${(item.price / 100).toFixed(2)}
        </Text>
        <View style={styles.stockBadge}>
          <Text style={styles.stockText}>
            {item.in_stock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medusa Store</Text>
        <Link href="/cart" asChild>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartText}>🛒 {cartCount}</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cartButton: {
    padding: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  cartText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#f3f4f6',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d1d5db',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    paddingHorizontal: 8,
    marginTop: 4,
  },
  stockBadge: {
    marginHorizontal: 8,
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#d1fae5',
    borderRadius: 4,
  },
  stockText: {
    fontSize: 12,
    color: '#065f46',
    fontWeight: '500',
  },
});

export default HomeScreen;
