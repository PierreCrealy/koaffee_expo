import React, {useState, createContext, useContext} from "react";
import { Product } from "@/entities/Product";

import { UserContext } from "@/contexts/UserContext";


// @ts-ignore
export const LikedContext = createContext();

export const LikedProvider = ({children}: {children: any}) => {
    // @ts-ignore
    const { user, token } = useContext(UserContext);


    const [likedProducts, setLikedProducts] = useState<Product[]>([]);

    const fetchLikedProducts = async () => {
        await fetch(`https://koaffee-api.pierre-dev-app.fr/api/v1/liked-product/${user.id}/liked`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(data => {
                setLikedProducts(data.likedProducts);
            })
            .catch((e) => console.log('error : ' + e.message));
    }

    const addToLiked = (product: Product) => {

        const infos = {
            userId: user.id,
            productId: product.id,
        }

        const addProductToLiked = async () => {
            await fetch(`https://koaffee-api.pierre-dev-app.fr/api/v1/liked-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(infos)
            })
                .then((response) => response.json())
                .then(data => {
                    setLikedProducts(data.likedProducts);
                })
                .catch((e) => console.log('error : ' + e.message));
        }

        addProductToLiked();

        fetchLikedProducts();
    }

    const removeFromLiked = (product: Product) => {

        const removeProductToLiked = async () => {
            await fetch(`https://koaffee-api.pierre-dev-app.fr/api/v1/liked-product/${user.id}/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then(data => {
                    setLikedProducts(data.likedProducts);
                })
                .catch((e) => console.log('error : ' + e.message));
        }

        removeProductToLiked();

        fetchLikedProducts();
    }


    return (
        <LikedContext.Provider value={{likedProducts, fetchLikedProducts, addToLiked, removeFromLiked}}>
            {children}
        </LikedContext.Provider>
    );
}