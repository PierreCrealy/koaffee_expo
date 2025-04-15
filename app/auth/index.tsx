import {Image, StyleSheet, Platform, Button, TextInput} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from "react";

import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function AuthScreen() {

    const [email, setEmail] = React.useState('guest@cda.fr');
    const [password, setPassword] = React.useState('cda');

    const router = useRouter();

    async function fetchExchange()
    {
        const response = await fetch('https://pass-api.pierre-dev-app.fr/api/v1/exchange/1');
        const data = await response.json();

        // alert('Call response : ' + data.exchange.access);
        // alert("Store token : " + await SecureStore.getItemAsync('token'));

        router.push('/(tabs)/secure')
    }

    async function attemptConnexion()
    {
        try{
            // alert(email + " / " + password);

            const ids = {
                email: email,
                password: password,
            }

            const response = await fetch(
                'https://pass-api.pierre-dev-app.fr/api/v1/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ids)
                }
            );

            const data = await response.json()

            await SecureStore.setItemAsync('token', data.success.token)

            // alert("Store token : " + await SecureStore.getItemAsync('token'))
            // alert('Connexion réussi.')

            router.push('/(tabs)')

        }catch(e){
            alert('Connexion échoué.')
        }
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
            <ThemedText type="title">Bienvenue !</ThemedText>
            <HelloWave />
          </ThemedView>

          <ThemedView style={styles.stepContainer}>
              <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value="guest@cda.fr"
                  placeholder="Enter login"
              />

              <TextInput
                  onChangeText={(text) => setPassword(text)}
                  value="cda"
                  placeholder="Enter password"
                  secureTextEntry={true}
              />

              <Button title="Connexion" onPress={() => attemptConnexion()} />
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
});
