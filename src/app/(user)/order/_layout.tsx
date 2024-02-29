
import {  Stack } from "expo-router";

export default function MenuStack() {
    return (
        <Stack screenOptions={{
           
        }}>
            <Stack.Screen name="index" options={{ title: 'Order' }} />
        </Stack>
    )
}