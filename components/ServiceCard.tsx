import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native"
import { Product } from "@/entities/Product";
import { Link, useRouter } from "expo-router";
import { FormatDate } from "@/usefuls/FormatDate";
import React from "react";
import {Service} from "@/entities/Service";
import { Colors} from "@/constants/Colors";

export default function ServiceCard ({ service }: {service: Service }) {

    const router = useRouter();

    const showService = () => {
        router.navigate('/service/[serviceId]')
        router.setParams({ serviceId: service.id })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => showService()} activeOpacity={0.8}>
            <Image source={require('@/assets/images/produt_icon.jpg')} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.name}>{service.name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {service.description}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.infoItem}>
                        {/*<Clock size={16} color={Colors.primary.main} style={styles.icon} />*/}
                        <Text style={styles.infoText}>
                            {/*{FormatDate(service.duration)}*/}
                        </Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{service.price.toFixed(2)} €</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.bookButton} onPress={() => alert("Indisponible actuellement")}>
                    {/*<CalendarCheck size={16} color={Colors.neutral[100]} style={{ marginRight: 8 }} />*/}
                    <Text style={styles.bookButtonText}>Réserver maintenant</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral[100],
        borderRadius: 12,
        shadowColor: Colors.neutral[700],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.neutral[700],
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: Colors.neutral[500],
        marginBottom: 16,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 4,
    },
    infoText: {
        fontSize: 14,
        color: Colors.neutral[600],
    },
    priceContainer: {
        backgroundColor: Colors.primary.light,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.primary.dark,
    },
    bookButton: {
        backgroundColor: Colors.primary.light,
        borderRadius: 8,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookButtonText: {
        color: Colors.neutral[700],
        fontWeight: '600',
        fontSize: 14,
    },
})
