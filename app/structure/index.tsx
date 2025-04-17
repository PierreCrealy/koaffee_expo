import {StyleSheet, Image, Text, TouchableOpacity, View, SectionList} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, {useEffect} from "react";

import Ionicons from "@expo/vector-icons/Ionicons";


import {Structures} from "@/constants/Structures";
import MapView, {Marker} from "react-native-maps";
import {useNavigation} from "expo-router";

export default function StructureScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Structures' });
    }, [])

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
                <ThemedText type="title">Nos structures</ThemedText>
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
        height: 500,
    },
    header: {
        marginTop: 60,
        marginBottom: 35,
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

