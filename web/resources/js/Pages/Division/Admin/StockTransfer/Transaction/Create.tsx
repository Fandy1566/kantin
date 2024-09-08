import React, { useEffect, useState } from "react";
import Cart from "./partials/Cart";
import { CartItem, PageProps, User } from "@/types";
import { Product, ProductCategory } from "@/types/model";
import CashierLayout from "@/Layouts/CashierLayout/CashierLayout";
import SearchBar from "@/Components/SearchBar/SearchBar";
import ItemCard from "./partials/ItemCard";
import Navbar from "@/Components/Navbar";

interface CreateProps extends PageProps {
    products: Product[];
    categories: ProductCategory[];
}

const Create = ({ auth, products, categories }: CreateProps) => {
    const [searchInput, setSearchInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedItems = localStorage.getItem("cartItems");
        return storedItems ? JSON.parse(storedItems) : [];
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryInput(e.target.value);
    };

    const filteredProducts = products
        .filter((product) =>
            searchInput.length > 0
                ? product.product_name.match(new RegExp(searchInput, "i"))
                : true
        )
        .filter((product) =>
            categoryInput.length > 0
                ? product.category_id.toString() === categoryInput
                : true
        );

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CashierLayout user={auth.user} cartItems={cartItems} setCartItems={setCartItems}>
                <div className="flex p-4 items-center">
                    <SearchBar
                        handleChange={handleSearchChange}
                        searchInput={searchInput}
                        className="flex-grow mr-4"
                    />
                    <select
                        className="border-gray-200 rounded-lg"
                        onChange={handleCategoryChange}
                        value={categoryInput}
                    >
                        <option value="">All Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="px-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] overflow-auto gap-5 w-full pb-5">
                    {filteredProducts.map((product) => (
                        <ItemCard
                            key={product.id}
                            item={product}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                        />
                    ))}
                </div>
        </CashierLayout>
    );
};

export default Create;
