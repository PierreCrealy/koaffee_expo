import { StyleSheet, View, TouchableOpacity } from "react-native"
import React from "react";

import Ionicons from '@expo/vector-icons/Ionicons';
import {useRouter} from "expo-router";

import { Colors } from "@/constants/Colors";


const StructuretBubble = () => {

    const router = useRouter();

    async function navigateToStructurePage()
    {
        router.navigate('/structure')
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateToStructurePage}>
                <Ionicons name="storefront" size={32} color={Colors.primary.light} />
            </TouchableOpacity>
        </View>
    )
}

export default StructuretBubble

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,

        justifyContent: "center",
        alignItems: "center",


        width: 50,
        height: 50,

        // zIndex: 1,
        //
        // position: "absolute",
        // top: 60,
        // right: 25,
    },
})
