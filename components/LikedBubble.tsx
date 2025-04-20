import {StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, SectionList} from "react-native"
import React, {useContext} from "react";

import Ionicons from '@expo/vector-icons/Ionicons';
import {useRouter} from "expo-router";
import {UserContext} from "@/contexts/UserContext";

import { Colors } from "@/constants/Colors";


const LikedBubble = () => {

    const router = useRouter();

    // @ts-ignore
    const { user } = useContext(UserContext);

    async function navigateToStructurePage()
    {
        router.navigate('/liked')
    }

    return (

        user ? (
            <View style={styles.container}>
                <TouchableOpacity onPress={navigateToStructurePage}>
                    <Ionicons name="heart" size={32} color="#F04729" />
                </TouchableOpacity>
            </View>
        ) : null

    )
}

export default LikedBubble

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
