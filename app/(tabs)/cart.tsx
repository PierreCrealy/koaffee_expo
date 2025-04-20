import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CartSection from "@/components/CartSection";

import * as SecureStore from "expo-secure-store";

import React, { useCallback, useContext } from "react";
import { useFocusEffect, useRouter } from "expo-router";

import { Product } from "@/entities/Product";
import { User } from "@/entities/User";

import { CartContext } from "@/contexts/CartContext";
import { UserContext } from "@/contexts/UserContext";

import Ionicons from "@expo/vector-icons/Ionicons";

import { CountriesBonus } from "@/constants/CountriesBonus";
import {Colors} from "@/constants/Colors";

import SendNotification from "@/usefuls/SendNotification";


export default function CartScreen() {

    const router = useRouter();

    const [location, setLocation] = React.useState();

    // @ts-ignore
    const { cleanCart, cartProducts } = useContext(CartContext);

    // @ts-ignore
    const { user, token } = useContext(UserContext);

    const loadLocation = async () => {
        const locationSec = await SecureStore.getItemAsync('location');
        // @ts-ignore
        setLocation(locationSec)
    }

    useFocusEffect(
        useCallback(() => {
            loadLocation()

        }, [user?.id])
    );

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
            method: 2,
        }

        try{
            const response = await fetch(
                'https://koaffee-api.pierre-dev-app.fr/api/v1/order',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(infos)
                }
            );

            // const text = await response.text(); // pour debug
            // console.log('Raw response:', JSON.stringify(text));
            //
            // const data = JSON.parse(text); // on parse manuellement
            // console.log('Parsed JSON:', JSON.stringify(data));

            SendNotification({
                title: 'Commande passée, merci !',
                body: `Votre commande n°?? est en cours de préparation...`,
                data: {extraData: ''}
            })

            cleanCart();
            router.push('/(tabs)')


        }catch(e){
            // @ts-ignore
            alert('Une erreur est survenue : ' + e.message);
        }

    }


    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: Colors.primary.light, dark: Colors.primary.dark}}
            headerImage={
                <Image
                    source={require('@/assets/images/cart_icon.jpg')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Panier</ThemedText>
            </ThemedView>


            <ThemedView style={styles.stepContainer}>
                <CartSection products={cartProducts} total={getTotalWithBonus()} bonus={CountriesBonus[location]} />
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

        backgroundColor: Colors.success.light,
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
    reactLogo: {
        width: '100%',
        height: '100%',
    },
    textBtn: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
});
