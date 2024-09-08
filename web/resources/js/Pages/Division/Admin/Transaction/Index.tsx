import { PageProps, ColumnProps, FormField } from "@/types";
import BasicIndexLayout from "@/Layouts/Division/DashboardLayout/IndexLayout/BasicIndexLayout";
import { Branch, Transaction } from "@/types/model";

const Index = ({ auth, transaction }: PageProps<{ transaction: Transaction[] }>) => {
    const columns: ColumnProps[] = [
        { Header: "Status", accessor: "transaction_status" },
        { Header: "ID", accessor: "transaction_id" },
        { Header: "Date", accessor: "transaction_date" },
        { Header: "Customer", accessor: "customer_id" },
        { Header: "User", accessor: "user_id" },
        { Header: "Branch", accessor: "branch_id" },
        { Header: "Description", accessor: "description" },
    ];

    const form: FormField[] = [
        { name: "branch_name", label: "Name", type: "text" },
        { name: "branch_location", label: "Location", type: "textarea" },
    ];

    return (
        <BasicIndexLayout auth={auth} data={transaction} columns={columns} form={form} title="Transaction" storeRoute={route('admin.transaction.store')}/>
    );
};

export default Index;