import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native"
import { Product } from "@/entities/Product";
import { Link, useRouter } from "expo-router";
import { FormatDate } from "@/usefuls/FormatDate";
import React from "react";

export default function ProductCard ({ product }: {product: Product}) {

    const router = useRouter();

    const showProducts = () => {
        router.navigate('/product/[productId]')
        router.setParams({ productId: product.id })
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => showProducts()}>
            {Boolean(product.highlight) && (
                <View style={styles.highlightBadge}>
                    <Text style={styles.highlightText}>Featured</Text>
                </View>
            )}

            <View style={styles.productCard}>
                <Image
                    source={require('@/assets/images/meal_2.png')}
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
                                <Text style={styles.badgeText}>Loyalty Program</Text>
                            </View>
                        )}

                    </View>
                </View>
            </View>


            <View style={styles.footer}>
                <Text style={styles.dateText}>{FormatDate(product.created_at)}</Text>
                {product.updated_at !== product.created_at && (
                    <Text style={styles.dateText}>{FormatDate(product.updated_at)}</Text>
                )}
                <Text style={styles.price}>{product.price} €</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: "#f4511e",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 8,
    },
    highlightText: {
        color: "white",
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
    description: {
        fontSize: 14,
        color: "#444",
        marginBottom: 12,
        lineHeight: 20,
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
    proposedBadge: {
        backgroundColor: "#2196F3",
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
        color: "#f4511e",
    },
    dateText: {
        fontSize: 12,
        color: "#888",
    },
})
