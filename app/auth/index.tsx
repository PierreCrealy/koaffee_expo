import {Image, StyleSheet, Button, TextInput, Text, TouchableOpacity, View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from "react";

import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AuthScreen() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const router = useRouter();

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

            await SecureStore.setItemAsync('userToken', data.success.token)
            // @ts-ignore
            await SecureStore.setItemAsync('userInfo', JSON.stringify({ id: data.success.id, name: data.success.name, email: data.success.email }))

            // alert("Store token : " + await SecureStore.getItemAsync('token'))
            // alert('Connexion réussi.')

            router.push('/(tabs)')

        }catch(e){
            alert('Connexion échoué.')
        }
    }

    const setUserOneForm = () => {
        setEmail('guest@cda.fr');
        setPassword('cda');
    }

    const setUserTwoForm = () => {
        setEmail('guest2@cda.fr');
        setPassword('cda');
    }

  return (
      <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
            <Image
              source={require('@/assets/images/pass_logo.png')}
              style={styles.reactLogo}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Koaffee </ThemedText>
            <HelloWave />
          </ThemedView>

          <ThemedView style={styles.formContainer}>

              <View style={styles.inputContainer}>
                  <Ionicons name="person" size={32} color="#f4511e" />
                  <TextInput
                      onChangeText={(text) => setEmail(text)}
                      value={email}
                      placeholder="Enter login"
                      style={styles.textInput}
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Ionicons name="keypad" size={32} color="#f4511e" />
                  <TextInput
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                      placeholder="Enter password"
                      secureTextEntry={true}
                      style={styles.textInput}
                  />
              </View>

              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.connexionBtn}  onPress={() => attemptConnexion()} >
                      <Text style={styles.textBtn}>Connexion</Text><Ionicons name="log-in" size={32} color="#f4511e" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.registerBtn}  onPress={() => alert("Indisponible")} >
                      <Text style={styles.textBtn}>Inscription</Text><Ionicons name="arrow-down" size={32} color="#f4511e" />
                  </TouchableOpacity>
              </View>


              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.connexionBtn}  onPress={() => setUserOneForm()} >
                      <Text style={styles.textBtn}>User 1</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.registerBtn}  onPress={() => setUserTwoForm()} >
                      <Text style={styles.textBtn}>User 2</Text>
                  </TouchableOpacity>
              </View>

          </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#1D3D47',
        borderRadius: 8,
        padding: 8,

        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',

        marginTop: 25,

        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBtn: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#f4511e',
    },
    connexionBtn: {
        backgroundColor: '#FFE1C9',
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
    registerBtn: {
        backgroundColor: '#FFF7F0',
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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    formContainer: {
        gap: 8,
        marginVertical: 25
    },
    reactLogo: {
        width: '100%',
        height: '100%',
    },
});
