import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native"
//import { useCart } from "../context/CartContext"
import CartItem from "./CartItem"
import { Product } from "@/entities/Product";

const CartSection = ({products}: {products: Product[]}) => {
  //const { cartItems, clearCart, getCartTotal } = useCart()

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Votre panier est vide</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panier</Text>
        <TouchableOpacity>
          <Text style={styles.clearButton}>Nettoyer</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem product={item} />}
        scrollEnabled={false}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: {products.reduce((total,product) => total + product.price, 0 )} €</Text>
      </View>
    </View>
  )
}

export default CartSection

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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
