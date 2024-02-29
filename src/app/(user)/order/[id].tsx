import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders';

import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';

export default function OrderDetailsScreen() {
    const {id} = useLocalSearchParams();
    const order = orders.find((o) => o.id.toString() === id)
    if (!order) {
       return  <Text>Not Found</Text>
    }
    return (
        <View style={{gap:10, padding:20}}>
            <Stack.Screen options={{title: `Order #${id}`}}/>

            {/* <OrderListItem order={order}/> */}

            <FlatList
                data={order.order_items}
                renderItem={({item})=> <OrderItemListItem item={item}/> }
                contentContainerStyle={{gap:10}}
                ListHeaderComponent={() =><OrderListItem order={order}/>}
            />
        </View>
    )
}