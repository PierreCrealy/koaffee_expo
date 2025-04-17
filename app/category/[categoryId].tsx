import {
    FlatList,
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedView} from '@/components/ThemedView';

import { useLocalSearchParams} from "expo-router";
import { useNavigation } from "expo-router";

import ProductCard from '@/components/ProductCard';

import React, {useContext, useEffect} from "react";
import { Product } from "@/entities/Product";
import {CartContext} from "@/contexts/CartContext";

export default function ProductsCategoryScreen() {
    const {categoryId} = useLocalSearchParams();
    const navigation = useNavigation();

    const [products, setProducts] = React.useState<Product[]>([]);

    // @ts-ignore
    const { addToCart, cartProducts } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            fetch(`https://pass-api.pierre-dev-app.fr/api/v1/product/${categoryId}/products-category`)
                .then((response) => response.json())
                .then(data => {
                    setProducts(data.products);
                })
                .catch((e) => alert('error : ' + e.message));
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Liste des produits' });
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

            <ThemedView>
                <FlatList
                    scrollEnabled={false}
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        (
                            <View style={styles.itemProduct}>
                                <ProductCard product={item} />
                                <View style={styles.actionItemProduct}>
                                    <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                                        <Text style={styles.textBtn}>Ajouter +</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={styles.emptyText}>Aucun produit disponible</Text>}
                />
            </ThemedView>

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    textBtn: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
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
    itemProduct: {
        marginBottom: 40,
    },
    actionItemProduct: {
        alignItems: 'flex-end',
    },
    list: {
        padding: 16,
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