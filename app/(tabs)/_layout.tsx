import { Tabs } from 'expo-router';
import React, {useContext} from 'react';
import {Platform, View, StyleSheet} from 'react-native';

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
              tabBarActiveTintColor: Colors.primary.main,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
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
                  title: '',
                  tabBarIcon: ({ color }) => (
                      <View style={[styles.middleTab, { backgroundColor: Colors.primary.main }]}>
                          <Ionicons name="cart" size={28} color={Colors.neutral[700] } />
                      </View>
                  ),
                  tabBarBadge: cartProducts.length > 0 ? cartProducts.length : 0,
                  tabBarItemStyle: {
                      marginTop: -20,
                  },
              }}
          />

          <Tabs.Screen
              name="services"
              options={{
                  title: 'Services',
                  tabBarIcon: ({ color }) => <Ionicons name="albums" size={28} color={color} />,
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


const styles = StyleSheet.create({
    middleTab: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: Colors.primary.main,
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: Colors.neutral[700],
        borderWidth: 3,
    },
});