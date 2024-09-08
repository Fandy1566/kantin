import InputNumber from "@/Components/InputNumber/InputNumber";
import { CartItem } from "@/types";
import { Product } from "@/types/model";
import { images } from "@/utils/images";
import React from "react";

interface ItemCardProps {
    item: Product;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ItemCard = ({ item, cartItems, setCartItems }: ItemCardProps) => {
    const addItemToCart = () => {
        const itemExists = cartItems.some(
            (cartItem) => cartItem.product.id === item.id
        );

        const itemToAdd: CartItem = {
            quantity: 1,
            product: item,
        };

        if (!itemExists) {
            setCartItems([...cartItems, itemToAdd]);
        }
    };

    const handleQuantityChange = (quantity: number) => {
        setCartItems((prevItems) =>
            quantity === 0
                ? prevItems.filter((cartItem) => cartItem.product.id !== item.id)
                : prevItems.map((cartItem) =>
                    cartItem.product.id === item.id
                        ? { ...cartItem, quantity }
                        : cartItem
                )
        );
    };

    const cartItem = cartItems.find(
        (cartItem) => cartItem.product.id === item.id
    );

    return (
        <div className="border h-fit rounded-lg p-2 w-full bg-white shadow">
            <figure
                className="h-[120px] w-full border bg-gray-200 rounded-lg overflow-hidden grid place-items-center relative"
                onClick={addItemToCart}
            >
                <img
                    className="w-full h-[120px] object-cover"
                    src={item.product_image !== ''? item.product_image : images('no_image_available.png')}
                    alt={item.product_name}
                />
            </figure>
            <div className="overflow-auto text-gray-900 font-semibold">
                {item.product_name}
            </div>
            <div className="font-semibold text-gray-600 text-sm flex items-center justify-between h-10">
                <span>Rp {item.product_price}</span>
                {cartItem ? (
                    <InputNumber
                        value={cartItem.quantity}
                        onChange={handleQuantityChange}
                        minValue={0}
                        maxValue={99}
                    />
                ) : (
                    <button onClick={addItemToCart}>Add to cart</button>
                )}
            </div>
        </div>
    );
};

export default ItemCard;
