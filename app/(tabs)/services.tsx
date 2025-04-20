import {
    StyleSheet,
    Image,
    View,
    Text,
    ActivityIndicator, FlatList,
    Animated,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, {useCallback, useContext, useEffect, useState} from "react";

import { Service } from "@/entities/Service";

import { UserContext } from "@/contexts/UserContext";
import {useFocusEffect} from "expo-router";
import ServiceCard from "@/components/ServiceCard";

import { slideInFromLeft } from "@/animations/Animations";

export default function ServicesScreen() {

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = React.useState(false);

    const { translateX, animation: slideLeftAnim } = slideInFromLeft();

    // @ts-ignore
    const { user, token } = useContext(UserContext);

    useEffect(() => {
        Animated.parallel([slideLeftAnim]).start();
    }, []);

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

    useFocusEffect(
        useCallback(() => {
            fetchServices();

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
                                <Animated.View style={[
                                    {
                                        transform: [{ translateX }],
                                    }
                                ]}>
                                    <View style={styles.itemProduct}>
                                        <ServiceCard service={item} />
                                    </View>
                                </Animated.View>
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
