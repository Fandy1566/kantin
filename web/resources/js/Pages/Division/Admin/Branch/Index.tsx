import { PageProps, ColumnProps, FormField } from "@/types";
import BasicIndexLayout from "@/Layouts/Division/DashboardLayout/IndexLayout/BasicIndexLayout";
import { Branch } from "@/types/model";

const Index = ({ auth, branches }: PageProps<{ branches: Branch[] }>) => {
    const columns: ColumnProps[] = [
        { Header: "ID", accessor: "id" },
        { Header: "Name", accessor: "branch_name" },
        { Header: "Location", accessor: "branch_location" },
    ];

    const form: FormField[] = [
        { name: "branch_name", label: "Name", type: "text" },
        { name: "branch_location", label: "Location", type: "textarea" },
    ];

    return (
        <BasicIndexLayout auth={auth} data={branches} columns={columns} form={form} title="Branch" storeRoute={route('admin.branch.store')}/>
    );
};

export default Index;