import { View, Text, FlatList } from 'react-native'
import orders from '@/assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
export default function OrderScreen() {
  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) =>
          <OrderListItem
            order={item}
          />
        }
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  )
}