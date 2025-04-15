import {StyleSheet, View, Text, FlatList, TouchableOpacity, Image} from "react-native"

import CartItem from "./CartItem"
import React from "react";
import {Link, useRouter} from "expo-router";

const CategorySection = ({categories}: {categories: string[]}) => {

  const router = useRouter();

  if (categories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune catégorie n'est disponible pour le moment</Text>
      </View>
    )
  }

  const productsCategory = (category: string) => {
    router.navigate('/category/[categoryId]')
    router.setParams({ categoryId: category })
  }

  return (
    <View style={styles.container}>

      <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (

              <TouchableOpacity style={[styles.categoryCard]} onPress={() => productsCategory(item)}>

                <Image
                    source={require('@/assets/images/meal_3.png')}
                    style={styles.categoryImage}
                />

                <View style={[styles.badge]}>
                  <Text style={styles.badgeText}>{item}</Text>
                </View>

              </TouchableOpacity>
          )}
      />

    </View>
  )
}

export default CategorySection

const styles = StyleSheet.create({
  list: {
    paddingVertical: 4,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
  },
  badge: {
    zIndex: 1,

    backgroundColor: "#4CAF50",

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,

    position: "absolute",
    bottom: 0,
    right:  -10,
  },
  badgeText: {
    color: "white",
    fontSize: 8,
    fontWeight: "500",
  },
  categoryCard: {
    flexDirection: "row",
    justifyContent: "space-around",

    paddingHorizontal: 8,
    paddingVertical: 8,

    marginBottom: 10,

  },
  categoryImage: {
    width: 150,
    height: 150,

    borderRadius: 8,
  },
  container: {
    borderRadius: 12,

    padding: 4,
    marginBottom: 16,

  },
  title: {
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
