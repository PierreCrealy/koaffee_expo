import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Stack, useNavigation, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect, useState} from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import LogoutBubble from "@/components/LogoutBubble";
import {CartProvider} from "@/contexts/CartContext";

import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

import {User} from "@/entities/User";
import StructuretBubble from "@/components/StructureBubble";
import {UserContext, UserProvider} from "@/contexts/UserContext";

export default function RootLayout() {
  const router = useRouter();

  const [location, setLocation] = useState(undefined);
  const [user, setUser] = useState<User | null>(null);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // @ts-ignore
  // const { user, token } = useContext(UserContext);

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
          <CartProvider>

            <StructuretBubble />

            <Stack screenOptions={{ headerShown: false }}>

              <Stack.Screen name="auth/index" />
              <Stack.Screen name="+not-found" />

            </Stack>

            <StatusBar style="auto" />
          </CartProvider>
        </UserProvider>
    </ThemeProvider>
  );
}
