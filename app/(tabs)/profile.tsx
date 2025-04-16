import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, {useEffect, useState} from "react";

import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { User } from "@/entities/User";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabSettingScreen() {

    const router = useRouter();
    const [user, setUser] = useState<User>();

    async function attemptDisconnect()
    {
        await SecureStore.deleteItemAsync('userToken')
        router.push('/auth')
    }


    useEffect(() => {
        const loadUser = async () => {
            const token = await SecureStore.getItemAsync('userToken');
            const userInfo = await SecureStore.getItemAsync('userInfo');
            const userStore = JSON.parse((userInfo) as string);

            setUser(userStore);
        }

        loadUser();
    }, []);

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
            <ThemedText>This app includes example code to help you get started.</ThemedText>


            <Collapsible title="Commandes">
                <ThemedText>
                    For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
                    <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
                    different screen densities
                </ThemedText>
                <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
                <ExternalLink href="https://reactnative.dev/docs/images">
                    <ThemedText type="link">Learn more</ThemedText>
                </ExternalLink>
            </Collapsible>


            <TouchableOpacity style={styles.disconnectBtn}  onPress={() => attemptDisconnect()} >
                <Text style={styles.textBtn}>Se déconnecter</Text><Ionicons name="log-out" size={32} color="#f4511e" />
            </TouchableOpacity>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
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

