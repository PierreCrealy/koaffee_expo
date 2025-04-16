import { Tabs } from 'expo-router';
import React, {useContext} from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Ionicons from '@expo/vector-icons/Ionicons';
import {CartContext} from "@/contexts/CartContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

    // @ts-ignore
    const { cartProducts } = useContext(CartContext);

  return (
      <Tabs
          screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                  ios: {
                      // Use a transparent background on iOS to show the blur effect
                      position: 'absolute',
                  },
                  default: {

                  },
              }),
          }}>

          <Tabs.Screen
              name="index"
              options={{
                  title: 'Home',
                  tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
              }}
          />
          <Tabs.Screen
              name="products"
              options={{
                  title: 'Produits',
                  tabBarIcon: ({ color }) => <Ionicons name="menu" size={28} color={color} />,
              }}
          />

          <Tabs.Screen
              name="cart"
              options={{
                  title: 'Panier',
                  tabBarIcon: ({ color }) => <Ionicons name="cart" size={28} color={color} />,
                  tabBarBadge: cartProducts.length > 0 ? cartProducts.length : 0,
              }}
          />

          <Tabs.Screen
              name="profile"
              options={{
                  title: 'Profil',
                  tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
              }}
          />

    </Tabs>
  );
}
