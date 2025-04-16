import {Button, Image, StyleSheet, View,} from 'react-native';
import React, {useEffect} from "react";

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import CategorySection from "@/components/CategorySection";


import {Product} from "@/entities/Product";
import {User} from "@/entities/User";

import {Categories} from "@/usefuls/Categories";
import {Structures} from "@/usefuls/Structures";

import * as Notifications from 'expo-notifications';
import * as SecureStore from "expo-secure-store";

import MapView, {Marker} from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";

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


    // @ts-ignore
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
            {/*<Button title="test" onPress={() => sendNotification()} />*/}

            <ThemedView style={styles.stepContainer}>
                <CategorySection categories={categories} />
            </ThemedView>


            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Nos structures</ThemedText>
                <Ionicons name="home-sharp" size={28} color="black" />
            </ThemedView>

            <View style={styles.mapContainer}>
                <MapView style={styles.map}
                         initialRegion={{
                             latitude: 46.603354,
                             longitude: 1.888334,
                             latitudeDelta: 10,
                             longitudeDelta: 10,
                         }}
                >
                    {Structures.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            pinColor={marker.color}
                        >
                            <Ionicons name={marker.icon} size={28} color={marker.color} />
                        </Marker>
                    ))}
                </MapView>
            </View>


        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    mapContainer: {

    },
    map: {
        width: '100%',
        height: 300,
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
