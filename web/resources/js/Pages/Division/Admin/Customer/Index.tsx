import { PageProps, ColumnProps, FormField } from "@/types";
import BasicIndexLayout from "@/Layouts/Division/DashboardLayout/IndexLayout/BasicIndexLayout";
import { Customer } from "@/types/model";

const Index = ({ auth, customers }: PageProps<{ customers: Customer[] }>) => {
    const columns: ColumnProps[] = [
        { Header: "ID", accessor: "id" },
        { Header: "Name", accessor: "customer_name" },
        { Header: "Address", accessor: "customer_address" },
        { Header: "Phone", accessor: "customer_phone" },
    ];

    const form: FormField[] = [
        { name: "customer_name", label: "Name", type: "text" },
        { name: "customer_phone", label: "Phone", type: "text" },
        { name: "customer_address", label: "Address", type: "textarea" },
    ];

    return (
        <BasicIndexLayout auth={auth} data={customers} columns={columns} form={form} title="Customer" storeRoute={route('admin.customer.store')}/>
    );
};

export default Index;