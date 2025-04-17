import {StyleSheet, Image, View, TouchableOpacity, Text, SectionList} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProductCard from "@/components/ProductCard";

import React, {useCallback, useContext, useEffect, useState} from "react";

import { Product } from "@/entities/Product";

import { CartContext } from "@/contexts/CartContext";
import {useFocusEffect} from "expo-router";
import {User} from "@/entities/User";
import * as SecureStore from "expo-secure-store";

export default function ProductsScreen() {

    const [products, setProducts] = useState<Product[]>([]);
    const [user, setUser] = React.useState<User>();

    useFocusEffect(
        useCallback(() => {
            const fetchProducts = async () => {
                fetch('https://pass-api.pierre-dev-app.fr/api/v1/product/group-by-category')
                    .then((response) => response.json())
                    .then(data => {
                        setProducts(data.products);
                    })
                    .catch((e) => alert('error : ' + e.message));
            }
            const loadUser = async () => {
                const token = await SecureStore.getItemAsync('userToken');
                const userInfo = await SecureStore.getItemAsync('userInfo');
                const userSec = JSON.parse((userInfo) as string);

                setUser(userSec);
            }

            fetchProducts();
            loadUser();

        }, [user?.id])
    );

    // @ts-ignore
    const { addToCart, cartProducts } = useContext(CartContext);

    const sections = Object.keys(products).map(category => ({
        title: category,
        // @ts-ignore
        data: products[category],
    }));


    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <Image
                    source={require('@/assets/images/meal_4.png')}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Tous nos produits</ThemedText>
            </ThemedView>
            <ThemedText>Voici une liste de tous nos produits disponible, organisé par catégorie.</ThemedText>


            <ThemedView>
                <SectionList
                    scrollEnabled={false}
                    sections={sections}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.emptyText}>Aucun produit disponible</Text>}
                    renderItem={({item}) => (

                        <View style={styles.itemProduct}>
                            <ProductCard product={item} />
                            <View style={styles.actionItemProduct}>
                                <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                                    <Text style={styles.textBtn}>Ajouter +</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )}
                    renderSectionHeader={({section}) => (
                        <Text style={styles.header}>
                            {section.title}
                        </Text>
                    )}
                />
            </ThemedView>

        </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
    },
    header: {
        marginTop: 60,
        fontSize: 32,
        backgroundColor: '#fff',
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
