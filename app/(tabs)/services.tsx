import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text,
    SectionList,
    ActivityIndicator, FlatList,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProductCard from "@/components/ProductCard";

import React, {useCallback, useContext, useEffect, useState} from "react";

import { Service } from "@/entities/Service";

import { CartContext } from "@/contexts/CartContext";
import {useFocusEffect} from "expo-router";
import { User } from "@/entities/User";
import * as SecureStore from "expo-secure-store";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesScreen() {

    const [services, setServices] = useState<Service[]>([]);
    const [user, setUser] = React.useState<User>();
    const [token, setToken] = React.useState<string>();
    const [loading, setLoading] = React.useState(false);

    // @ts-ignore
    const { addToCart, cartProducts } = useContext(CartContext);

    const fetchServices = async () => {
        setLoading(true);

        fetch('https://koaffee-api.pierre-dev-app.fr/api/v1/service', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(data => {
                setServices(data.services);
                setLoading(false);
            })
            .catch((e) => console.log('error : ' + e.message));
    }
    const loadUser = async () => {
        const tokenSec = await SecureStore.getItemAsync('userToken');
        const userInfo = await SecureStore.getItemAsync('userInfo');
        const userSec = JSON.parse((userInfo) as string);

        setUser(userSec);
        setToken((tokenSec) as string);
    }


    useFocusEffect(
        useCallback(() => {
            fetchServices();
            loadUser();

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
                <ThemedText type="title">Tous nos services</ThemedText>
            </ThemedView>
            <ThemedText>Voici une liste de tous nos services proposés.</ThemedText>


            {loading ? (
                <ActivityIndicator size="large" color="#B3D8DE" />
            ) : (
                <ThemedView>
                    <FlatList
                        scrollEnabled={false}
                        data={services}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            (
                                <View style={styles.itemProduct}>
                                    <ServiceCard service={item} />
                                </View>

                            )}
                        //contentContainerStyle={styles.list}
                        ListEmptyComponent={<Text style={styles.emptyText}>Aucun service disponible</Text>}
                    />
                </ThemedView>
            )}

        </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
