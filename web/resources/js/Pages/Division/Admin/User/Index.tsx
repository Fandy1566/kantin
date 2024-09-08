import { PageProps, ColumnProps, FormField, User } from "@/types";
import BasicIndexLayout from "@/Layouts/Division/DashboardLayout/IndexLayout/BasicIndexLayout";

const Index = ({ auth, users }: PageProps<{ users: User[] }>) => {
    const columns: ColumnProps[] = [
        { Header: "ID", accessor: "id" },
        { Header: "username", accessor: "username" },
        { Header: "Name", accessor: "name" },
        { Header: "Email", accessor: "email" },
        { Header: "Role", accessor: "role_id" },
        { Header: "Branch", accessor: "branch_id" },
    ];

    const form: FormField[] = [
        { name: "Name", label: "name", type: "text" },
        { name: "username", label: "Username", type: "text" },
        { name: "Email", label: "email", type: "email" },
        { name: "customer_address", label: "Address", type: "textarea" },
    ];

    return (
        <BasicIndexLayout auth={auth} data={users} columns={columns} form={form} title="Customer" storeRoute={route('admin.user.store')}/>
    );
};

export default Index;