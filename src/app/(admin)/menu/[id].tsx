import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, Stack, useRouter, Link } from 'expo-router'
import products from '@/assets/data/products'
import { defaultImage } from '@/components/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProviders'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsCreen = () => {
  const [selectSize, setSelectSize] = useState<PizzaSize>('S');
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();
  const product = products.find((p) => p.id.toString() === id)
  if (!product) {
    return <Text>Product not found {id}</Text>
  }
  const addToCart = () => {
    if (!product) return

    addItem(product, selectSize)
    router.push('/cart')
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`}asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }} />
      <Image source={{ uri: product.image || defaultImage }}
        style={styles.image}
      />
      <Stack.Screen options={{ title: product.name }} />
      <Text style={styles.price}>${product.price}</Text>
      {/* <Button onPress={addToCart} text={'Add to cart'} /> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto'
  },


})

export default ProductDetailsCreen
