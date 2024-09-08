import InputNumber from "@/Components/InputNumber/InputNumber";
import { CartItem } from "@/types";
import { images } from "@/utils/images";
import React, { useEffect } from "react";

interface CartItemCardProps {
    item: CartItem;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, cartItems, setCartItems } ) => {
    const handleQuantityChange = (quantity: number) => {
        const newCartItems = cartItems.map((cartItem) =>
            cartItem.product.id === item.product.id
                ? { ...cartItem, quantity }
                : cartItem
        ).filter((cartItem) => cartItem.quantity > 0);

        setCartItems(newCartItems);
    };

    return (
        <div key={item.product.id} className="mb-4 flex">
            <figure className="h-20 w-20 bg-gray-200 rounded-lg border overflow-hidden grid place-items-center relative">
                <img
                    className="w-full h-full object-cover"
                    src={item.product.product_image !== ''? item.product.product_image : images('no_image_available.png')}
                    alt={item.product.product_name}
                />
            </figure>
            <div className="pl-4 flex flex-col justify-between py-2 flex-grow">
                <div className="overflow-auto text-gray-900 font-semibold">
                    {item.product.product_name}
                </div>
                <div className="flex justify-between place-items-center">
                    <div className="font-semibold text-gray-600 text-sm">
                        Rp {item.quantity*item.product.product_price}
                    </div>
                    <div className="">
                        <InputNumber
                            value={item.quantity}
                            onChange={handleQuantityChange}
                            minValue={0}
                            maxValue={99}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;
