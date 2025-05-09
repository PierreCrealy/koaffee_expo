import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native"
import { Order } from "@/entities/Order";
import { FormatDate } from "@/usefuls/FormatDate";
import React from "react";

export default function OrderCard ({ order }: {order: Order}) {

    return (
        <TouchableOpacity style={styles.card}>

            <View style={styles.productCard}>
                <Image
                    source={require('@/assets/images/cart_icon.jpg')}
                    style={styles.productImage}
                />

                <View style={styles.productInfo}>
                    <View style={styles.header}>
                        <Text style={styles.name}>Commande #{order.id}</Text>
                    </View>

                    <Text style={styles.category}>Table n°{order.table}</Text>

                    <View style={styles.details}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{order.fidelity_pts_earned} pts</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.footer}>
                <Text style={styles.dateText}>{FormatDate(order.created_at)}</Text>
                {order.updated_at !== order.created_at && (
                    <Text style={styles.dateText}>{FormatDate(order.updated_at)}</Text>
                )}
                <Text style={styles.price}>{order.total} €</Text>
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
