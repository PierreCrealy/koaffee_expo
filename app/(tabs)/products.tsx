import {
    StyleSheet,
    Image,
    View,
    Text,
    SectionList,
    ActivityIndicator,
    Animated,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProductCard from "@/components/ProductCard";

import React, {useCallback, useContext, useEffect, useState} from "react";

import { Product } from "@/entities/Product";

import { UserContext } from "@/contexts/UserContext";

import { useFocusEffect } from "expo-router";

import { slideInFromLeft } from "@/animations/Animations";

export default function ProductsScreen() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = React.useState(false);

    const { translateX, animation: slideLeftAnim } = slideInFromLeft();

    // @ts-ignore
    const { user, token } = useContext(UserContext);

    const fetchProducts = async () => {
        setLoading(true);
        fetch('https://koaffee-api.pierre-dev-app.fr/api/v1/product/group-by-category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((e) => console.log('error : ' + e.message));
    }
    const sections = Object.keys(products).map(category => ({
        title: category,
        // @ts-ignore
        data: products[category],
    }));

    useEffect(() => {
        Animated.parallel([slideLeftAnim]).start();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchProducts();

        }, [user?.id])
    );

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#FFFFFF', dark: '#353636' }}
            headerImage={
                <Image
                    source={require('@/assets/images/produt_icon.jpg')}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Tous nos produits</ThemedText>
            </ThemedView>
            <ThemedText>Voici une liste de tous nos produits disponible, organisé par catégorie.</ThemedText>


            {loading ? (
                <ActivityIndicator size="large" color="#B3D8DE" />
            ) : (
                <ThemedView>
                    <SectionList
                        scrollEnabled={false}
                        sections={sections}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={<Text style={styles.emptyText}>Aucun produit disponible</Text>}
                        renderItem={({item}) => (
                            <Animated.View style={[
                                {
                                    transform: [{ translateX }],
                                }
                            ]}>
                                <View style={styles.itemProduct}>
                                    <ProductCard product={item} />
                                </View>
                            </Animated.View>

                        )}
                        renderSectionHeader={({section}) => (
                            <ThemedView style={styles.titleContainer}>
                                <ThemedText type="title" style={styles.header}>{ section.title}</ThemedText>
                            </ThemedView>
                        )}
                    />
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
    },
    title: {
        fontSize: 24,
    },
    header: {
        marginTop: 60,
        marginBottom: 35,
    },
    addBtn: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,

        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,

        marginTop: 10,
    },
    emptyText: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 50,
    },
    itemProduct: {
        marginBottom: 40,
    },
    actionItemProduct: {
        alignItems: 'flex-end',
    },
    textBtn: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    reactLogo: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
