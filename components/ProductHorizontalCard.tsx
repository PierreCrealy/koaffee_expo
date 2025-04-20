import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native"
import { Product } from "@/entities/Product";
import { Link, useRouter } from "expo-router";
import { FormatDate } from "@/usefuls/FormatDate";
import React, {useContext} from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartContext } from "@/contexts/CartContext";

export default function ProductHorizontalCard ({ product }: {product: Product}) {

    const router = useRouter();

    // @ts-ignore
    const { addToCart } = useContext(CartContext);

    const showProducts = () => {
        router.navigate('/product/[productId]')
        router.setParams({ productId: product.id })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => showProducts()} activeOpacity={0.8}>
            <Image source={require('@/assets/images/produt_icon.jpg')} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {product.name}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                    {product.description}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
                        <Ionicons name="add" size={18} color={Colors.neutral[700]} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        backgroundColor: Colors.neutral[100],
        borderRadius: 12,
        shadowColor: Colors.neutral[700],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
        marginRight: 16,
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    content: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: Colors.neutral[700],
    },
    description: {
        fontSize: 14,
        color: Colors.neutral[500],
        marginBottom: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.neutral[700],
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
