import {ActivityIndicator, Animated, Image, StyleSheet,} from 'react-native';
import React, {useCallback, useContext, useEffect,} from "react";

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CategorySection from "@/components/CategorySection";

import {Order} from "@/entities/Order";

import { Categories } from "@/constants/Categories";

import * as SecureStore from "expo-secure-store";

import OrderProgress from "@/components/OrderProgress";
import { useFocusEffect, useRouter } from "expo-router";
import { UserContext } from "@/contexts/UserContext";

import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import { slideInFromLeft } from "@/animations/Animations";


export default function HomeScreen() {
    const router = useRouter();

    const [location, setLocation] = React.useState();
    const [order, setOrder] = React.useState<Order>();
    const [loading, setLoading] = React.useState(false);

    const { translateX, animation: slideLeftAnim } = slideInFromLeft();

    // @ts-ignore
    const { user, token } = useContext(UserContext);

    const loadLocation = async () => {
        const locationSec = await SecureStore.getItemAsync('location');
        // @ts-ignore
        setLocation(locationSec);
    };
    const latestProgressUserOrder = async () => {
        setLoading(true);

        await fetch(`https://koaffee-api.pierre-dev-app.fr/api/v1/order/${user?.id}/PROGRESS/latest`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(data => {
                setOrder(data.orders);
                setLoading(false);
            })
            .catch((e) => console.log('error : ' + e.message));
    };
    const getExpoToken = async () => {
        let token;

        console.log("Is device ?")
        if (Device.isDevice) {
            console.log("Is device !")
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                alert('Permission pour les notifications refusée 😢');
                return;
            }

            const { data } = await Notifications.getExpoPushTokenAsync({
                projectId: '3c189bf3-db8a-4168-a8ba-6f523cd1fbfb',
            });
            token = data;
            console.log('Expo Push Token:', token);
        } else {
            console.log("Is not a device !")
            alert('Doit être exécuté sur un vrai appareil, pas un simulateur/emulateur');
        }

        console.log("Platfom ?")
        if (Platform.OS === 'android') {
            console.log("Android !")
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    };

    useEffect(() => {
        Animated.parallel([slideLeftAnim]).start();
    }, []);

    useFocusEffect(
        useCallback(() => {

            if(!user)
            {
                router.replace("/auth");
            }else{
                loadLocation();
                latestProgressUserOrder();
            }

            // getExpoToken();

            return () => {
                // cleanup (opt)
            };
        }, [user?.id])
    );


    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#D0D0D0', dark: '#333333'}}
            headerImage={
                <Image
                    source={require('@/assets/images/koaffee_logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Bienvenue {user?.name}</ThemedText>
                <HelloWave/>
            </ThemedView>

            <ThemedText type="default">Vous êtes en {location}</ThemedText>


            <Animated.View style={[
                {
                    transform: [{ translateX }],
                },
            ]} >
                { loading ? (
                    <ActivityIndicator size="large" color="#B3D8DE" />
                ) : (
                    <OrderProgress order={order}/>
                )}
            </Animated.View>


            <ThemedView style={styles.sectionContainer}>
                <ThemedText type="title">Catégories</ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <CategorySection categories={Categories} />
            </ThemedView>


        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 25,
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
        // height: 178,
        // width: 290,
        // bottom: 0,
        // left: 0,
        // position: 'absolute',
    },
});
