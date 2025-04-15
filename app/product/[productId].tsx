import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

import { useLocalSearchParams} from "expo-router";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";

import { Product } from "@/entities/Product";
import { FormatDate } from "@/usefuls/FormatDate";

export default function HomeScreen() {
    const {productId} = useLocalSearchParams();
    const navigation = useNavigation();
    const [product, setProduct] = React.useState<Product>();

    useEffect(() => {
        const fetchProduct = async () => {
            fetch(`https://pass-api.pierre-dev-app.fr/api/v1/product/${productId}`)
                .then((response) => response.json())
                .then(data => {
                    setProduct(data.product);
                })
                .catch((e) => alert('error : ' + e.message));
        }

        fetchProduct();
    }, []);

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Produit' });
    }, [navigation]);


    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/meal.png')}
                    style={styles.reactLogo}
                />
            }>

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{ product?.name }</ThemedText>
                <Text style={styles.dateText}>{FormatDate(product?.created_at)}</Text>
                {product?.updated_at !== product?.created_at && (
                    <Text style={styles.dateText}>formatDate(product.updated_at)</Text>
                )}
            </ThemedView>

            <View style={styles.details}>
                {product?.fidelity_program && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Loyalty Program</Text>
                    </View>
                )}

                {product?.proposed && (
                    <View style={[styles.badge, styles.proposedBadge]}>
                        <Text style={styles.badgeText}>Available</Text>
                    </View>
                )}
            </View>

            <ThemedView>
                <Text style={styles.category}>{product?.category}</Text>
                <Text style={styles.description}>{product?.description}</Text>
            </ThemedView>


            <Image
                source={require('@/assets/images/meal.png')}
                style={styles.image}
            />


        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
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
    image: {
        width: '100%',
        height: 300,
        borderRadius: 4,
        backgroundColor: '#A1CEDC'
    },
});
