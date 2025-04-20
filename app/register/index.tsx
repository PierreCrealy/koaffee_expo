import {Image, StyleSheet , TextInput, Text, TouchableOpacity, View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {useContext} from "react";

import * as SecureStore from "expo-secure-store";
import {Link, useRouter} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {UserContext} from "@/contexts/UserContext";
import { User } from '@/entities/User';
import { Colors } from "@/constants/Colors";


export default function AuthScreen() {

    const router = useRouter();


    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // @ts-ignore
    const { user, connectUser } = useContext(UserContext);

    async function attemptRegister()
    {
        try{

            const form = {
                name : name,
                email: email,
                password: password,
            }

            const response = await fetch(
                'https://koaffee-api.pierre-dev-app.fr/api/v1/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json()

            await SecureStore.setItemAsync('userToken', data.success.token)
            // @ts-ignore
            await SecureStore.setItemAsync('userInfo', JSON.stringify({ id: data.success.id, name: data.success.name, email: data.success.email }))


            const userC: User = {
                id: data.success.id,
                email: data.success.email,
                name: data.success.name,
                fidelityPts: data.success.fidelityPts,
            };

            connectUser({ user: userC, token: data.success.token})

            router.push('/(tabs)')

        }catch(e){
            alert('L\'inscription à échoué : \nVeuillez vérifier vos informations et retenter.')
        }
    }


  return (
      <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
            <Image
              source={require('@/assets/images/koaffee_logo.png')}
              style={styles.reactLogo}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Koaffee Inscription</ThemedText>
          </ThemedView>

          <ThemedView style={styles.formContainer}>

              <View style={styles.inputContainer}>
                  <Ionicons name="person" size={32} color={Colors.primary.light} />
                  <TextInput
                      onChangeText={(text) => setName(text)}
                      value={name}
                      placeholder="Votre nom"
                      placeholderTextColor={Colors.neutral[500]}
                      style={styles.textInput}
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Ionicons name="mail" size={32} color={Colors.primary.light} />
                  <TextInput
                      onChangeText={(text) => setEmail(text)}
                      value={email}
                      placeholder="Votre adresse mail"
                      placeholderTextColor={Colors.neutral[500]}
                      style={styles.textInput}
                  />
              </View>

              <View style={styles.inputContainer}>
                  <Ionicons name="keypad" size={32} color={Colors.primary.light} />
                  <TextInput
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                      placeholder="Votre mot de passe"
                      placeholderTextColor={Colors.neutral[500]}
                      secureTextEntry={true}
                      style={styles.textInput}
                  />
              </View>

              <View style={styles.container}>
                  <TouchableOpacity style={styles.registerBtn}  onPress={() => attemptRegister()} >
                      <Text style={styles.textBtn}>Confirmer l'inscription</Text><Ionicons name="arrow-down" size={32} color={Colors.neutral[500]} />
                  </TouchableOpacity>
              </View>

              <View style={styles.container}>
                  <Link href="/" style={styles.link}>
                      <ThemedText type="link">Retour à la page de connexion</ThemedText>
                  </Link>
              </View>

          </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    textInput: {
        fontSize: 18,
        color: Colors.neutral[700],
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
    container: {
        flexDirection: 'row',

        marginTop: 25,

        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtn: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.neutral[700],
    },
    connexionBtn: {
        backgroundColor: Colors.primary.light,
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
        backgroundColor: Colors.primary.light,
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
        justifyContent: 'center',
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
