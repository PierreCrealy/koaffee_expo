import {
    Image,
    StyleSheet,
    Platform,
    Button,
    SectionList,
    View,
    Text,
    GestureResponderEvent,
    FlatList
} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

import * as SecureStore from "expo-secure-store";
import React, {useCallback} from "react";

async function fetchExchange() {
    const response = await fetch('https://pass-api.pierre-dev-app.fr/api/v1/exchange/1');
    const data = await response.json();

    alert('Call response : ' + data.exchange.access);
    alert('Store token : ' + await SecureStore.getItemAsync('token'));
}

const DATA = [
    {
        title: 'Main dishes',
        data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
    },
];


// type Product = {
//     name: string;
//     price: number;
// }

export default function HomeScreen() {

    const [products, setProducts] = React.useState<string[]>([]);

    const addProduct = (item: string) => {
        setProducts((prev) => [...prev, item]);
    }

    const removeProduct = (item: string) => {
        setProducts((prev) => prev.filter((name) => name !== item));
    }


      return (
          <ParallaxScrollView
              headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
              headerImage={
                <Image
                  source={require('@/assets/images/partial-react-logo.png')}
                  style={styles.reactLogo}
                />
              }>
              <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave />
              </ThemedView>

              <ThemedView style={styles.stepContainer}>
                  <ThemedText type="subtitle">Step : Call API</ThemedText>
                  <ThemedText>
                      <Button onPress={() => fetchExchange()} title="Call API" />
                  </ThemedText>
              </ThemedView>


              <ThemedView style={styles.stepContainer}>
                  <ThemedText type="subtitle">Panier</ThemedText>
                  <ThemedText>
                      <FlatList
                          data={products}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => <Text>{item} <Button title="Supprimer du panier" onPress={() => removeProduct(item)} /></Text>}
                      />
                  </ThemedText>
              </ThemedView>

              <ThemedView>
                  <SectionList
                      sections={DATA}
                      keyExtractor={(item, index) => item + index}
                      renderItem={({ item }) => (
                          <View style={styles.item}>
                              <Text style={styles.title}>{item}</Text>

                              <Image
                                  source={require('@/assets/images/react-logo.png')}
                                  style={styles.imageItem}
                              />

                              <View style={styles.addBtn}>
                                  <Button title="Ajouter au panier" onPress={() => addProduct(item)} />
                              </View>
                          </View>
                      )}
                      renderSectionHeader={({section: {title}}) => (
                          <Text style={styles.header}>{title}</Text>
                      )}
                  />
              </ThemedView>

        </ParallaxScrollView>
      );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#A1CEDC',
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
    },
    imageItem: {
        height: 50,
        width: 50,
        bottom: 0,
        right: 0,
        position: 'absolute',
    },
    addBtn: {
        height: 100,
        right: 0,
        position: 'absolute',
    },
});
