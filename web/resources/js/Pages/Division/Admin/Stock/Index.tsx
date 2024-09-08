import { PageProps, ColumnProps, FormField } from "@/types";
import BasicIndexLayout from "@/Layouts/Division/DashboardLayout/IndexLayout/BasicIndexLayout";
import { Branch, Product, Stocks } from "@/types/model";
import { router } from "@inertiajs/react";
import { useState } from "react";

const Index = ({
    auth,
    stocks,
    branches,
    products,
    selectedBranchId,
}: PageProps<{
    stocks: Stocks[];
    branches: Branch[];
    products: Product[];
    selectedBranchId: number;
}>) => {
    const [branchId, setBranchId] = useState(selectedBranchId);
    
    console.log(branchId);
    

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newBranchId = parseInt(event.target.value, 10);
        setBranchId(newBranchId);
        router.get(route("admin.stock.index"), {
            branch_id: newBranchId,
        });
    };

    const columns: ColumnProps[] = [
        { Header: "id", accessor: "id" },
        {
            Header: "Image",
            accessor: "product_image",
            disableSortBy: true,
            Cell: (tableProps) => (
                <figure className="w-20 h-20 overflow-hidden grid place-items-center">
                    <img
                        className="object-cover"
                        src={tableProps.row.original.product_image}
                        alt={tableProps.row.original.product_image}
                    />
                </figure>
            ),
        },
        { Header: "Product", accessor: "product_name" },
        { Header: "Quantity", accessor: "product_stock.quantity",
            Cell: (tableProps) => (
                tableProps.value != null ? tableProps.value : '0'
            ),
        },
    ];

    const form: FormField[] = [
        {
            name: "product_id",
            label: "Product",
            type: "select",
            options: products.map((product) => ({
                name: product.product_name,
                value: product.id,
            })),
        },
        { name: "quantity", label: "Quantity", type: "number" },
        { name: "branch_id", type: "hidden", value: `${ branchId }` },
    ];

    return (
        <BasicIndexLayout
            auth={auth}
            data={stocks}
            columns={columns}
            form={form}
            title="Stock"
            storeRoute={route("admin.stock.store")}
        >
            <div className="p-5 bg-primary-100 dark:bg-dark-primary-100 border-primary-300 dark:border-dark-primary-300 border overflow-auto shadow-sm rounded-lg mb-5 w-fit flex flex-col">
                <label className="mb-2" htmlFor="branch">
                    Select Branch:
                </label>
                <select
                    className="bg-primary-100 dark:bg-dark-primary-100 border-primary-300 dark:border-dark-primary-300 text-sm rounded-lg"
                    id="branch"
                    value={branchId}
                    onChange={handleBranchChange}
                >
                    {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                            {branch.branch_name}
                        </option>
                    ))}
                </select>
            </div>
        </BasicIndexLayout>
    );
};

export default Index;
