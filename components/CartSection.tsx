import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native"
import CartItem from "./CartItem"
import { Product } from "@/entities/Product";
import {useContext} from "react";
import {CartContext} from "@/contexts/CartContext";
import {Colors} from "@/constants/Colors";

const CartSection = ({products, total, bonus}: {products: Product[], total: number, bonus: number}) => {

  // @ts-ignore
  const { removeFromCart, cleanCart } = useContext(CartContext);

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
        <Text style={styles.title}>Résumé</Text>
        <TouchableOpacity onPress={() => cleanCart()}>
          <Text style={styles.clearButton}>Nettoyer</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => removeFromCart(item)}>
                <CartItem product={item} />
              </TouchableOpacity>
            </View>
        )}
        scrollEnabled={false}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: {total} €</Text>
        <Text style={styles.bonusText}>Bonus: {bonus} %</Text>
      </View>
    </View>
  )
}

export default CartSection

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.main,
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
    color: Colors.neutral[700],
  },
  clearButton: {
    fontSize: 14,
    color: Colors.neutral[500],
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
    color: Colors.neutral[500],
  },
  bonusText: {
    fontSize: 16,
    fontStyle: "italic",
    color: Colors.primary.light,
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
