import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native"
import { Product } from "@/entities/Product";
import { useRouter } from "expo-router";
import { FormatDate } from "@/usefuls/FormatDate";
import React, {useContext} from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartContext } from "@/contexts/CartContext";
import { LikedContext } from "@/contexts/LikedContext";
import {bool} from "prop-types";

export default function ProductCard ({ product }: {product: Product}) {

    const router = useRouter();

    // @ts-ignore
    const { addToCart } = useContext(CartContext);

    // @ts-ignore
    const { addToLiked, removeFromLiked } = useContext(LikedContext);

    // @ts-ignore
    const { likedProducts } = useContext(LikedContext);

    const isInLikedProducts = (product: Product): boolean => {

        return Array.isArray(likedProducts) && likedProducts.some(p => p.id === product.id);
    }


    const showProducts = () => {
        router.navigate('/product/[productId]')
        router.setParams({ productId: product.id })
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => showProducts()}>
            {Boolean(product.highlight) && (
                <View style={styles.highlightBadge}>
                    <Text style={styles.highlightText}>En avant</Text>
                </View>
            )}

            <View style={styles.productCard}>
                <Image
                    source={require('@/assets/images/produt_icon.jpg')}
                    style={styles.productImage}
                />

                <View style={styles.productInfo}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{product.name}</Text>
                    </View>

                    <Text style={styles.category}>{product.category}</Text>

                    <View style={styles.details}>
                        {Boolean(product.fidelity_program) && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Programme de fidélité</Text>
                            </View>
                        )}

                    </View>

                    <Text style={styles.price}>{product.price} €</Text>
                </View>
            </View>


            <View style={styles.footer}>
                <Text style={styles.dateText}>{FormatDate(product.created_at)}</Text>
                {product.updated_at !== product.created_at && (
                    <Text style={styles.dateText}>{FormatDate(product.updated_at)}</Text>
                )}

                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
                    <Ionicons name="add" size={18} color={Colors.neutral[700]} />
                </TouchableOpacity>

                { isInLikedProducts(product) ? (
                    <TouchableOpacity onPress={() => removeFromLiked(product)}>
                        <Ionicons name="heart" size={32} color="#F04729" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => addToLiked(product)}>
                        <Ionicons name="heart-outline" size={32} color={Colors.neutral[700]} />
                    </TouchableOpacity>
                )}

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    content: {
        padding: 12,
    },
    horizontalContent: {
        flex: 1,
        padding: 12,
    },

    description: {
        fontSize: 14,
        color: Colors.neutral[500],
        marginBottom: 8,
    },

    horizontalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },

    addButton: {
        width: 80,
        height: 32,
        borderRadius: 12,
        backgroundColor: Colors.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productCard: {
        flexDirection: "row",
        justifyContent: "space-around",

        paddingHorizontal: 8,
        paddingVertical: 8,

    },
    productImage: {
        width: 100,
        height: 100,

        borderRadius: 8,
    },
    productInfo: {
        width: "60%",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: "relative",
    },
    highlightBadge: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: Colors.primary.light,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 8,
    },
    highlightText: {
        color: Colors.neutral[700],
        fontSize: 12,
        fontWeight: "bold",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        marginRight: 8,
    },
    category: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
        textTransform: "uppercase",
        fontWeight: "500",
    },
    details: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 12,
    },
    badge: {
        backgroundColor: "#4CAF50",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
        marginBottom: 4,
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
    },
    footer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 8,
        marginTop: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.neutral[700],
    },
    dateText: {
        fontSize: 12,
        color: "#888",
    },
})
