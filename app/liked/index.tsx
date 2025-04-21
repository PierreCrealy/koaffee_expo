import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedView} from '@/components/ThemedView';

import {useFocusEffect, useLocalSearchParams} from "expo-router";
import { useNavigation } from "expo-router";

import ProductCard from '@/components/ProductCard';

import React, {useCallback, useContext, useEffect} from "react";
import { Product } from "@/entities/Product";
import {CartContext} from "@/contexts/CartContext";
import {UserContext} from "@/contexts/UserContext";
import {LikedContext} from "@/contexts/LikedContext";

export default function LikedIndexScreen() {

    const navigation = useNavigation();

    //const [likedProducts, setLikedProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(false);

    // @ts-ignore
    const { addToCart, cartProducts } = useContext(CartContext);

    // @ts-ignore
    const { likedProducts, fetchLikedProducts } = useContext(LikedContext);

    // @ts-ignore
    const { user, token } = useContext(UserContext);

    useFocusEffect(
        useCallback(() => {

            fetchLikedProducts();

        }, [user?.id])
    );


    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Liste des favoris' });
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
                    <FlatList
                        scrollEnabled={false}
                        data={likedProducts}
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
            )}


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