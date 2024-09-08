import { PageProps, ColumnProps, FormField } from "@/types";
import BasicIndexLayout from "@/Layouts/Division/DashboardLayout/IndexLayout/BasicIndexLayout";
import { Customer, StockTransfer } from "@/types/model";

const Index = ({ auth, stockTransfer }: PageProps<{ stockTransfer: StockTransfer[] }>) => {
    const columns: ColumnProps[] = [
        { Header: "ID", accessor: "id" },
        { Header: "Transfer Date", accessor: "transfer_date" },
        { Header: "Start", accessor: "branch_id" },
        { Header: "Destination", accessor: "branch_destination_id" },
        { Header: "User", accessor: "user_id" },
    ];

    return (
        <BasicIndexLayout auth={auth} data={stockTransfer} columns={columns} title="Stock Transfer" storeRoute={route('admin.stockTransfer.store')}/>
    );
};

export default Index;