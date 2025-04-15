import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Product } from "@/entities/Product";
import { Link, useRouter } from "expo-router";
import { FormatDate } from "@/usefuls/FormatDate";

export default function ProductCard ({ product }: {product: Product}) {

    const router = useRouter();

    return (
        <TouchableOpacity style={styles.card}>
            {product.highlight && (
                <View style={styles.highlightBadge}>
                    <Text style={styles.highlightText}>Featured</Text>
                </View>
            )}

            <View style={styles.header}>
                <Text style={styles.name}>{product.name}</Text>
            </View>

            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.description}>{product.description}</Text>

            <View style={styles.details}>
                {product.fidelity_program && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Loyalty Program</Text>
                    </View>
                )}

                {product.proposed && (
                    <View style={[styles.badge, styles.proposedBadge]}>
                        <Text style={styles.badgeText}>Available</Text>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                <Text style={styles.dateText}>{FormatDate(product.created_at)}</Text>
                {product.updated_at !== product.created_at && (
                    <Text style={styles.dateText}>formatDate(product.updated_at)</Text>
                )}
                <Text style={styles.price}>${product.price}</Text>
                <Link href={{pathname: '/product/[productId]', params: {productId: product.id}}}> Détails </Link>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
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
