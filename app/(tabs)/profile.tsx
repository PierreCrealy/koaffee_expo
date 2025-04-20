import {StyleSheet, Image, Text, TouchableOpacity, View, SectionList, ActivityIndicator} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

import React, {useCallback, useContext, useState} from "react";

import * as SecureStore from "expo-secure-store";
import {useFocusEffect, useRouter} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Order } from "@/entities/Order";
import OrderCard from "@/components/OrderCard";
import { CartContext } from "@/contexts/CartContext";
import { UserContext } from "@/contexts/UserContext";

import { Colors } from "@/constants/Colors";

export default function ProfileScreen() {

    const router = useRouter();

    // @ts-ignore
    const { cleanCart } = useContext(CartContext);

    // @ts-ignore
    const { user, token, disconnectUser } = useContext(UserContext);

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        await fetch(`https://koaffee-api.pierre-dev-app.fr/api/v1/order/${user?.id}/group-by-status`, {
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

    useFocusEffect(
        useCallback(() => {

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
        cleanCart()
        disconnectUser()

        router.replace('/auth')
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#FFFFFF', dark: '#353636' }}
            headerImage={
                <Image
                    source={require('@/assets/images/koaffee_logo.png')}
                    style={styles.reactLogo}
                />
            }
        >

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Profil</ThemedText>

                <TouchableOpacity style={styles.disconnectBtn}  onPress={() => attemptDisconnect()} >
                    <Text style={styles.textBtn}>Déconnexion</Text><Ionicons name="log-out" size={32} color={Colors.neutral[700]} />
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="default">Nom   : {user?.name}</ThemedText>
                <ThemedText type="default">Email : {user?.email}</ThemedText>
                <View style={styles.badge}>
                    <Text style={styles.textBadge}>{user?.fidelityPts}</Text><Ionicons name="server-sharp" size={32} color="white" />
                </View>
            </ThemedView>


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
    badge: {
        width: '35%',

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
        alignSelf: 'flex-start',
        justifyContent: 'space-between',

    },
    textBadge: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
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
        color: Colors.neutral[700],
    },
    disconnectBtn: {
        backgroundColor: Colors.primary.light,
        borderRadius: 8,

        paddingVertical: 8,
        paddingHorizontal: 25,

        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,

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
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,

        marginBottom: 20,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
});

