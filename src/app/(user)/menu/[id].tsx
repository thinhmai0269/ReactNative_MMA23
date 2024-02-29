import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultImage } from '@/components/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProviders'
import { PizzaSize } from '@/types'
const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsCreen = () => {
  const [selectSize, setSelectSize] = useState<PizzaSize>('S');
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router=useRouter();
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
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultImage }}
        style={styles.image}
      />

      <Text>Select Size</Text>
      <View style={styles.sizes} >
        {sizes.map((size) => (
          <Pressable
            onPress={() => { setSelectSize(size) }}
            style={[styles.size,
            { backgroundColor: selectSize === size ? 'gainsboro' : 'white' }]}
            key={size}
          >
            <Text style={[styles.sizeText,
            { fontWeight: selectSize === size ? '500' : '300' }]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text={'Add to cart'} />
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
  sizes: {
    flexDirection: 'row'
    , justifyContent: 'space-around',

  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
  }

})

export default ProductDetailsCreen
