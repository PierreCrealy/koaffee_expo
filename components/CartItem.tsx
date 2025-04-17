import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import {Product} from "@/entities/Product";
import {useContext} from "react";
import {CartContext} from "@/contexts/CartContext";

const CartItem = ({ product }: {product: Product}) => {

  // @ts-ignore
  const { removeFromCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.quantityText}>{product.name[0]}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
      </View>

      <View style={styles.actions}>
        <Text style={styles.price}>{product.price} €</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  circleContainer: {
    marginRight: 12,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f4511e",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default CartItem
