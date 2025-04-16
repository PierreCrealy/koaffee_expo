import {
    Button,
    Image,
    StyleSheet,
} from 'react-native';
import React, { useEffect } from "react";

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import CartSection from "@/components/CartSection";
import CategorySection from "@/components/CategorySection";


import { Product } from "@/entities/Product";
import { User } from "@/entities/User";

import { Categories } from "@/usefuls/Categories";

import * as Notifications from 'expo-notifications';
import * as SecureStore from "expo-secure-store";


export default function HomeScreen() {

    const [cartProducts, setCartProducts] = React.useState<Product[]>([]);
    const [categories, setCategories] = React.useState<string[]>([]);
    const [user, setUser] = React.useState<User>();
    const [location, setLocation] = React.useState();

    const sendNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Hello 👋',
                body: 'Tu as cliqué sur le bouton !',
                data: { extraData: 'Des données personnalisées' },
            },
            trigger: null,
        });
    };

    useEffect(() => {
        setCategories(Categories)
    }, []);

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

    async function fetchExchange() {
        const response = await fetch('https://pass-api.pierre-dev-app.fr/api/v1/exchange/1');
        const data = await response.json();

        alert('Store token : ' + await SecureStore.getItemAsync('token'));
    }

    const addCartProduct = (item: Product) => {
        setCartProducts((prev) => [...prev, item]);
    }

    const removeCartProduct = (item: Product) => {
        setCartProducts((prev) => prev.filter((name) => name !== item));
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
                <ThemedText type="title">Bienvenue {user?.name}</ThemedText>
                <HelloWave/>
            </ThemedView>

            <ThemedText type="default">Vous êtes en {location}</ThemedText>
            <Button title="test" onPress={() => sendNotification()} />

            <ThemedView style={styles.stepContainer}>
                <CategorySection categories={categories} />
            </ThemedView>


        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
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
        // height: 178,
        // width: 290,
        // bottom: 0,
        // left: 0,
        // position: 'absolute',
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
    textBtn: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
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
