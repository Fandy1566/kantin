import AdminLayout from "@/Layouts/Division/AdminLayout";
import { PageProps } from "@/types";
import { Branch, Product } from "@/types/model";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

interface CreateProps extends PageProps {
    branches: Branch[];
    products: Product[];
}

const Create = ({ auth, branches, products }: CreateProps) => {
    const [productDetails, setProductDetails] = useState([{ product_id: '', quantity: 0 }]);
    const [sourceBranch, setSourceBranch] = useState<any>(branches[0].id);
    const [destinationBranch, setDestinationBranch] = useState<any>(branches[0].id);

    // Handle adding a new product entry
    const handleAddProduct = () => {
        setProductDetails([...productDetails, { product_id: '', quantity: 0 }]);
    };

    // Handle removing a product entry
    const handleRemoveProduct = (index: number) => {
        const updatedProductDetails = [...productDetails];
        updatedProductDetails.splice(index, 1); // Remove the product at the specified index
        setProductDetails(updatedProductDetails);
    };

    // Handle changing the product or quantity
    const handleProductChange = (index: number, event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedProductDetails = [...productDetails];
        updatedProductDetails[index] = { ...updatedProductDetails[index], [name]: value };
        setProductDetails(updatedProductDetails);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            branch_id: sourceBranch,
            branch_destination_id: destinationBranch,
            product_details: productDetails
        };

        router.post(route('admin.stockTransfer.store'), formData);
        
        setProductDetails([{ product_id: '', quantity: 0 }]);
        setSourceBranch('0');
        setDestinationBranch('0')
    };

    return (
        <AdminLayout user={auth.user} title={`Stock Transfer`}>
            <h2 className="text-lg mb-5 col-span-2">Create Stock Transfer</h2>
            <div className="col-span-1 p-5 bg-primary-100 dark:bg-dark-primary-100 border border-primary-300 dark:border-dark-primary-300 overflow-auto shadow-sm sm:rounded-lg">
                <div>
                    <label htmlFor="">Source Branch:</label><br />
                    <select name="branch_id" id="" 
                    onChange={(e) => setSourceBranch(e.target.value)}
                    >
                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.branch_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Destination Branch:</label><br />
                    <select name="branch_destination_id" id=""
                    onChange={(e) => setDestinationBranch(e.target.value)}
                    >
                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.branch_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-5 flex items-center mb-5">
                    <h4 >Products</h4>
                    <button
                        type="button"
                        className="bg-blue-500 text-white p-2 ml-2"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button>
                </div>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Product</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productDetails.map((productDetail, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">
                                    <select
                                        name="product_id"
                                        id={`product_id_${index}`}
                                        value={productDetail.product_id}
                                        onChange={(e) => handleProductChange(index, e)}
                                    >
                                        <option value="">Select Product</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.product_name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        name="quantity"
                                        id={`quantity_${index}`}
                                        value={productDetail.quantity}
                                        onChange={(e) => handleProductChange(index, e)}
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white p-2"
                                        onClick={() => handleRemoveProduct(index)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 mt-5"
                    onClick={handleSubmit}
                >
                    Save Stock Transfer
                </button>
            </div>
        </AdminLayout>
    );
};

export default Create;
