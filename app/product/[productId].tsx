import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

import {useFocusEffect, useLocalSearchParams} from "expo-router";
import { useNavigation } from "expo-router";
import React, {useContext, useEffect, useCallback} from "react";

import { Product } from "@/entities/Product";
import { FormatDate } from "@/usefuls/FormatDate";

import { UserContext } from "@/contexts/UserContext";

export default function ProductScreen() {
    const {productId} = useLocalSearchParams();
    const navigation = useNavigation();

    const [product, setProduct] = React.useState<Product>();
    const [loading, setLoading] = React.useState(false);

    // @ts-ignore
    const { user, token } = useContext(UserContext);

    const fetchProduct = async () => {
        setLoading(true);
        await fetch(`https://koaffee-api.pierre-dev-app.fr/api/v1/product/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(data => {
                setLoading(false);
                setProduct(data.product);
            })
            .catch((e) => console.log('error : ' + e.message));
    }

    useFocusEffect(
        useCallback(() => {

            fetchProduct();

        }, [user?.id])
    );

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Produit' });
    }, [navigation]);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/produt_icon.jpg')}
                    style={styles.reactLogo}
                />
            }>

            { loading ? (
                <ActivityIndicator size="large" color="#B3D8DE" />
            ) : (
                <View>
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">{ product?.name }</ThemedText>
                        <Text style={styles.dateText}>{FormatDate(product?.created_at)}</Text>
                        {product?.updated_at !== product?.created_at && (
                            <Text style={styles.dateText}>{FormatDate(product?.updated_at)}</Text>
                        )}
                    </ThemedView>

                    <View style={styles.details}>
                        {Boolean(product?.fidelity_program) && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Loyalty Program</Text>
                            </View>
                        )}

                        {Boolean(product?.proposed) && (
                            <View style={[styles.badge, styles.proposedBadge]}>
                                <Text style={styles.badgeText}>Available</Text>
                            </View>
                        )}
                    </View>

                    <ThemedView>
                        <Text style={styles.category}>{product?.category}</Text>
                        <Text style={styles.description}>{product?.description}</Text>
                    </ThemedView>
                </View>
            )}

            <Image
                source={require('@/assets/images/produt_icon.jpg')}
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
