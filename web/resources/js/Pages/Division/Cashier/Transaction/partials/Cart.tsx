import SearchBar from "@/Components/SearchBar/SearchBar";
import { CartItem, PageProps, User } from "@/types";
import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { Product } from "@/types/model";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { router } from "@inertiajs/react";

interface CartProps{
    user: User;
    className?: string;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({ user, cartItems, setCartItems, className }) => {
    const handleInitialCartOpen = (): boolean => {
        if (window.innerWidth <= 500) {
            return false;
        }
        if (cartItems.length > 0) {
            return true;
        }
        return false;
    };

    const [isOpened, setIsOpened] = useState<boolean>(handleInitialCartOpen);
    const [cartSearchInput, setCartSearchInput] = useState("");

    const handleCartSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCartSearchInput(e.target.value);
    };

    const filteredCartItems = cartItems.filter((cartItem) =>
        cartSearchInput.length > 0
            ? cartItem.product.product_name.match(
                new RegExp(cartSearchInput, "i")
            )
            : true
    );

    const clearCart = () => {
        setCartItems([]);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 500) {
                setIsOpened(false);
            }
        };

        handleResize(); // Check the initial window size
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [mouseDownTime, setMouseDownTime] = useState<number>(0);
    const handleMouseDown = () => {
        setMouseDownTime(Date.now());
    };

    const handleMouseUp = () => {
        const mouseUpTime = Date.now();
        if (mouseUpTime - mouseDownTime < 100) {
            setIsOpened(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            branch_id: user.id,
            cartItems: JSON.stringify(cartItems)
        };

        router.post(route('cashier.transaction.store'), formData);

        clearCart()
    };

    return (
        <>
            {!isOpened && (
                <Draggable
                    bounds="parent"
                    onMouseDown={handleMouseDown}
                    onStop={handleMouseUp}
                >
                    <div
                        className="absolute z-50 bottom-0 right-0 select-none cursor-pointer"
                    >
                        <div className="bg-green-500 rounded-full w-14 h-14 grid place-items-center m-3">
                            <FontAwesomeIcon icon={faShoppingCart} className="text-primary-100" />
                        </div>
                    </div>
                </Draggable>
            )}
            <div
                className={`h-full overflow-hidden border transition-all duration-300 bg-white
                    phone:absolute phone:right-0 phone:top-0 phone:h-screen z-50 
                    ${isOpened ? "phone:w-screen w-80" : "w-0"} ${className}`}
            >
                <div className="flex flex-col h-full">
                    <div className="border-b flex justify-between items-center py-2 px-2">
                        <div className="flex">
                            <span
                                className="select-none cursor-pointer"
                                onClick={() => setIsOpened(!isOpened)}
                            >
                                {isOpened ? ">" : "<"}{" "}
                            </span>
                            <h2 className="ml-3">Cart</h2>
                        </div>
                        <button
                            className="bg-red-500 text-white py-1 px-2 rounded"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>
                    </div>
                    <div className="pt-2 px-2">
                        <div className="py-2">
                            <SearchBar
                                handleChange={handleCartSearchChange}
                                searchInput={cartSearchInput}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="px-2 flex-grow overflow-auto">
                        <div className="py-2">
                            {filteredCartItems.map((item) => (
                                <CartItemCard
                                    key={item.product.id}
                                    item={item}
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="px-2 py-2 border-t flex flex-col">
                        <div className="text-lg font-medium mb-4">
                            Total Price:{" "}
                            <span className="font-semibold">
                                Rp {""}
                                {filteredCartItems.reduce(
                                    (total, item) =>
                                        total +
                                        item.product.product_price *
                                        item.quantity,
                                    0
                                )}
                            </span>
                        </div>
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded"
                            onClick={() => handleSubmit}
                        >
                            Finish Transaction
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
