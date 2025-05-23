import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "@/constants/Colors";
import { FormatDate } from "@/usefuls/FormatDate";

import * as Progress from "react-native-progress";
import React from "react";


const OrderProgress = ({ order }: {order: any}) => {

  if (!order) {
    return (
        <View style={styles.container}>
          <Text> Aucune commande en cours</Text>
        </View>
    )
  }

  return (
      <TouchableOpacity >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.containerRow}>
              <Text style={styles.title}>Commande en préparation</Text>
              <Ionicons name="newspaper" size={28} color={Colors.neutral[700]} />
            </View>
            <Text style={styles.orderNumber}>Commande #{order.id}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Date de commande</Text>
              <Text style={styles.infoValue}>{FormatDate(order.created_at)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Total</Text>
              <Text style={styles.infoValue}>{order.total} €</Text>
            </View>
          </View>

          <View style={styles.progressRow}>
            <Progress.Bar progress={0.3} width={200} animated={true} color={Colors.primary.light} />
          </View>

        </View>
      </TouchableOpacity>
  )
}

export default OrderProgress

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,

  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressRow: {
    alignItems: "center",
    alignContent: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  header: {
    alignItems: "stretch",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary.light,
  },
  orderNumber: {
    fontSize: 14,
    color: Colors.neutral[700],
    marginTop: 2,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.neutral[500],
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.neutral[700],
  },
})
