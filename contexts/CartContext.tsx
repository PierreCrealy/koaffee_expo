import React, { useState, createContext } from "react";
import { Product } from "@/entities/Product";

// @ts-ignore
export const CartContext = createContext();

export const CartProvider = ({children}: {children: any}) => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCartProducts(prevProducts => [...prevProducts, product]);
    }

    const removeFromCart = (product: Product) => {
        setCartProducts(prevProducts => prevProducts.filter(productPrev => product.id !== productPrev.id));
    }

    const cleanCart = () => {
        setCartProducts([]);
    }

    return (
        <CartContext.Provider value={{cartProducts, addToCart, removeFromCart, setCartProducts, cleanCart}}>
            {children}
        </CartContext.Provider>
    );
}