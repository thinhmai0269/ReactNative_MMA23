import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "@/types";
import { randomUUID } from 'expo-crypto';
type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: String;
};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: ''
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])
   
    const addItem = (product: Product, size: CartItem['size']) => {
        const exitingItem = items.find(
            item => item.product === product
            && item.size === size
        )
        if (exitingItem) {
            updateQuantity(exitingItem.id, 1)
            return;
        }
        const newCartItem: CartItem = {
            id: randomUUID(),
            product_id: product.id,
            product,
            size,
            quantity: 1
        }
        setItems([newCartItem, ...items])
        console.log(items.length)
    }
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        console.log(itemId, amount);

        setItems(items.map((item) =>
            item.id !== itemId
                ? item
                : { ...item, quantity: item.quantity + amount }
        ).filter((item) => item.quantity > 0)
        )
    };
    const total = items.reduce((sum, items) => 
    (sum += items.product.price * items.quantity), 0).toFixed(2);
 
    return (
        <CartContext.Provider
            value={{ items, addItem, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;

export const useCart = () => {
    return useContext(CartContext)
}