import {StyleSheet, Image, Text, TouchableOpacity, View, SectionList, ActivityIndicator} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, {useCallback, useEffect, useState} from "react";

import * as SecureStore from "expo-secure-store";
import {useFocusEffect, useRouter} from "expo-router";
import { User } from "@/entities/User";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Order } from "@/entities/Order";
import OrderCard from "@/components/OrderCard";

export default function ProfileScreen() {

    const router = useRouter();
    const [user, setUser] = useState<User>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [token, setToken] = useState<string>();
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const loadUser = async () => {
                const tokenSec = await SecureStore.getItemAsync('userToken');
                const userInfo = await SecureStore.getItemAsync('userInfo');
                const userStore = JSON.parse((userInfo) as string);

                setUser(userStore);
                setToken((tokenSec) as string);
            }
            const fetchOrders = async () => {
                setLoading(true);
                await fetch(`https://pass-api.pierre-dev-app.fr/api/v1/order/${user?.id}/group-by-status`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                    .then((response) => response.json())
                    .then(data => {
                        setOrders(data.orders);
                        setLoading(false);
                    })
                    .catch((e) => console.log('error : ' + e.message));
            }

            loadUser();
            fetchOrders();

        }, [user?.id])
    );

    const sections = Object.keys(orders).map(status => ({
        title: status,
        // @ts-ignore
        data: orders[status],
    }));

    async function attemptDisconnect()
    {
        await SecureStore.deleteItemAsync('userToken')
        await SecureStore.deleteItemAsync('userInfo')

        router.push('/auth')
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <Image
                    source={require('@/assets/images/coffee.png')}
                    style={styles.reactLogo}
                />
            }
        >

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Profil</ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="default">Nom   : {user?.name}</ThemedText>
                <ThemedText type="default">Email : {user?.email}</ThemedText>
            </ThemedView>


            <TouchableOpacity style={styles.disconnectBtn}  onPress={() => attemptDisconnect()} >
                <Text style={styles.textBtn}>Se déconnecter</Text><Ionicons name="log-out" size={32} color="#f4511e" />
            </TouchableOpacity>

            <Collapsible title="Commandes">

                { loading ? (
                    <ActivityIndicator size="large" color="#B3D8DE" />
                ) : (
                    <SectionList
                        scrollEnabled={false}
                        sections={sections}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={<Text style={styles.emptyText}>Aucune commandes passées</Text>}
                        renderItem={({item}) => (

                            <View style={styles.itemProduct}>
                                <OrderCard order={item} />
                            </View>

                        )}
                        renderSectionHeader={({section}) => (
                            <ThemedView style={styles.titleContainer}>
                                <ThemedText type="title" style={styles.header}>{ section.title}</ThemedText>
                            </ThemedView>
                        )}
                    />
                )}

            </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 60,
        marginBottom: 35,
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
    textBtn: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#f4511e',
    },
    disconnectBtn: {
        width: '80%',

        backgroundColor: '#FFE1C9',
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
    reactLogo: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
});

