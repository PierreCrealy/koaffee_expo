import {
    ActivityIndicator, Animated,
    FlatList,
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from "react";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedView} from '@/components/ThemedView';
import ProductCard from '@/components/ProductCard';

import {useFocusEffect, useLocalSearchParams} from "expo-router";
import { useNavigation } from "expo-router";

import { Product } from "@/entities/Product";

import {CartContext} from "@/contexts/CartContext";
import {UserContext} from "@/contexts/UserContext";
import ScrollView = Animated.ScrollView;
import ProductHorizontalCard from "@/components/ProductHorizontalCard";

export default function ProductsCategoryScreen() {
    const {categoryId} = useLocalSearchParams();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = React.useState<Product[]>([]);

    // @ts-ignore
    const { addToCart } = useContext(CartContext);

    // @ts-ignore
    const { user, token } = useContext(UserContext);

    useFocusEffect(
        useCallback(() => {
            const fetchProducts = async () => {
                setLoading(true);
                await fetch(`https://koaffee-api.pierre-dev-app.fr/api/v1/product/${categoryId}/products-category`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                    .then((response) => response.json())
                    .then(data => {
                        setLoading(false);
                        setProducts(data.products);
                    })
                    .catch((e) => console.log('error : ' + e.message));
            }

            fetchProducts();
        }, [user?.id])
    );

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Liste des produits' });
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
                <ThemedView>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuredContainer}
                    >
                        {products.map((product) => (
                            <ProductHorizontalCard key={product.id} product={product} />
                        ))}
                    </ScrollView>
                </ThemedView>
            )}

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    featuredContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        gap: 2
    },
    emptyText: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 50,
    },
    reactLogo: {
        width: '100%',
        height: '100%',
    },
});