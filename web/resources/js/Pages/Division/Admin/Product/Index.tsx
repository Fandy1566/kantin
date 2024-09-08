
import BasicIndexLayout from "@/Layouts/Division/DashboardLayout/IndexLayout/BasicIndexLayout";
import { PageProps, ColumnProps, FormField } from "@/types";
import { Product, ProductCategory } from "@/types/model";


const Index = ({
    auth,
    products,
    categories,
}: PageProps<{ products: Product[]; categories: ProductCategory[] }>) => {
    const columns: ColumnProps[] = [
        { Header: "ID", accessor: "id" },
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
        { Header: "Name", accessor: "product_name" },
        { Header: "Price", accessor: "product_price" },
        {
            Header: "Description",
            accessor: "product_description",
            disableSortBy: true,
        },
    ];

    const form: FormField[] = [
        { name: "product_name", label: "Name", type: "text" },
        { name: "product_price", label: "Price", type: "number" },
        { name: "product_image", label: "Image", type: "file" },
        { name: "product_description", label: "Description", type: "textarea" },
        {
            name: "category_id",
            label: "Category ",
            type: "select",
            options: categories.map((category) => ({
                name: category.category_name,
                value: category.id,
            })),
        },
    ];


    return (
        <BasicIndexLayout auth={auth} data={products} columns={columns} form={form} title="Product" storeRoute={route('admin.product.store')}/>
    );
};

export default Index;
