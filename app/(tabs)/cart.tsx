import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import * as Notifications from 'expo-notifications';
import * as SecureStore from "expo-secure-store";

import React, { useCallback, useContext, useEffect } from "react";

import { Product } from "@/entities/Product";
import { User } from "@/entities/User";

import CartSection from "@/components/CartSection";

import { CartContext } from "@/contexts/CartContext";
import Ionicons from "@expo/vector-icons/Ionicons";

import { CountriesBonus } from "@/usefuls/CountriesBonus";
import { useRouter } from "expo-router";


export default function CartScreen() {

    const router = useRouter();

    // @ts-ignore
    const { cleanCart, cartProducts } = useContext(CartContext);
    const [user, setUser] = React.useState<User>();
    const [location, setLocation] = React.useState();

    useEffect(() => {
        const loadUser = async () => {
            const token = await SecureStore.getItemAsync('userToken');
            const userInfo = await SecureStore.getItemAsync('userInfo');
            const userSec = JSON.parse((userInfo) as string);

            setUser(userSec);
        }
        const loadLocation = async () => {
            const locationSec = await SecureStore.getItemAsync('location');
            // @ts-ignore
            setLocation(locationSec)
        }

        loadLocation()
        loadUser();
    }, []);

    const getTotalWithBonus = () => {

        // @ts-ignore
        let totalCart = cartProducts.reduce((total,product) => total + product.price, 0 );
        // @ts-ignore
        let totalCarWithBonus = Math.round(totalCart * CountriesBonus[location]) ;

        return totalCarWithBonus;
    }

    async function fetchPassOrder()
    {
        let totalCart = getTotalWithBonus();
        let fidelityPts = Math.floor(totalCart / 2);
        let cartProductsIds = cartProducts.map((product: Product) => (product.id)) ;

        const infos = {
            total: totalCart,
            table: 1,
            fidelityPtsEarned: fidelityPts,
            userId: user?.id,
            productIds: `{${cartProductsIds}}`,
        }

        try{
            const response = await fetch(
                'https://pass-api.pierre-dev-app.fr/api/v1/order',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(infos)
                }
            );

            cleanCart();
            router.push('/(tabs)')

            //const data = await response.json()

        }catch(e){
            // @ts-ignore
            alert('Une erreur est survenue : ' + e.message);
        }

    }


    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/bar.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Panier</ThemedText>
                <HelloWave/>
            </ThemedView>


            <ThemedView style={styles.stepContainer}>
                <CartSection products={cartProducts} total={getTotalWithBonus()} />
            </ThemedView>


            {cartProducts.length > 0 && (
                <TouchableOpacity style={styles.orderBtn} onPress={fetchPassOrder}>
                    <Text style={styles.textBtn}>Commander</Text><Ionicons name="arrow-forward" size={32} color="white" />
                </TouchableOpacity>
            )}

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    orderBtn: {
        width: '80%',

        backgroundColor: '#4CAF50',
        borderRadius: 8,

        paddingVertical: 8,
        paddingHorizontal: 25,

        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,

        marginTop: 10,

        flexDirection: 'row',

        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',

    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    cartContainer: {
        height: 50,
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        width: '100%',
        height: '100%',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#A1CEDC',
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
    },
    imageItem: {
        height: 50,
        width: 50,
        bottom: 0,
        right: 0,
        position: 'absolute',
    },
    itemProduct: {
        marginBottom: 40,
    },
    actionItemProduct: {
        alignItems: 'flex-end',
    },
    textBtn: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    list: {
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 50,
    },
});
