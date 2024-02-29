import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';
export const defaultImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png";
type ProductListItemProps = {
    product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments();
//    console.log("Check var", segments[0])
    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <Image source={{ uri: product.image || defaultImage }}
                    style={styles.img}
                    resizeMode="contain"
                />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>

            </Pressable>
        </Link>
    )
}
export default ProductListItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        margin: 5,
        maxWidth: '50%'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10
    },
    price: {
        color: Colors.light.tint
    },
    img: {
        width: 'auto',
        aspectRatio: 1
    }
});
