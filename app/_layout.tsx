import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Stack, useNavigation, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect, useState} from 'react';
import 'react-native-reanimated';
import {StyleSheet, View} from "react-native";

import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";
import { LikedProvider } from "@/contexts/LikedContext";

import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

import {User} from "@/entities/User";
import StructuretBubble from "@/components/StructureBubble";
import LikedBubble from "@/components/LikedBubble";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {

  const router = useRouter();
  const [location, setLocation] = useState(undefined);

  // @ts-ignore

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission de notifications refusée');
      }
    };
    requestPermissions();
  }, []);


  useEffect(() => {
    async function getCurrentLocation(){
      let { status } = await Location.requestForegroundPermissionsAsync();

      if(status !== 'granted'){
        alert('Permission refusée');
      }

      let locations = await Location.getCurrentPositionAsync();
      // @ts-ignore
      setLocation(locations);

      const { latitude, longitude } = locations.coords;
      const geoCode = await Location.reverseGeocodeAsync({latitude, longitude})

      const { isoCountryCode } = geoCode[0];
      await SecureStore.setItemAsync('location', (isoCountryCode != null ? isoCountryCode : 'FR'));

    }

    getCurrentLocation();

  }, []);


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <UserProvider>
          <LikedProvider>
            <CartProvider>

              <View style={styles.containerBubble}>
                <StructuretBubble />
                <LikedBubble />
              </View>


              <Stack screenOptions={{ headerShown: false }}>

                <Stack.Screen name="auth/index" />
                <Stack.Screen name="+not-found" />

              </Stack>

              <StatusBar style="auto" />
            </CartProvider>
          </LikedProvider>
        </UserProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  containerBubble: {

    borderRadius: 12,

    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",

    width: 120,

    zIndex: 1,

    position: "absolute",
    top: 60,
    right: 25,
  },
})

