import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native"
import React from "react";

import Ionicons from '@expo/vector-icons/Ionicons';
import * as SecureStore from "expo-secure-store";
import {useRouter} from "expo-router";



const LogoutBubble = () => {

    const router = useRouter();

    async function attemptDisconnect()
    {
        await SecureStore.deleteItemAsync('userToken')
        router.push('/auth')
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={attemptDisconnect}>
                <Ionicons name="log-out" size={32} color="#f4511e" />
            </TouchableOpacity>
        </View>
    )
}

export default LogoutBubble

const styles = StyleSheet.create({
    icon: {
      color: "#A1CEDC",
    },
    container: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 2,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,

        justifyContent: "center",
        alignItems: "center",


        width: 50,
        height: 50,

        zIndex: 1,

        position: "absolute",
        top: 60,
        right: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#f4511e",
    },
    clearButton: {
        fontSize: 14,
        color: "#888",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
    },
    totalText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#f4511e",
    },
    emptyContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
    },
})
