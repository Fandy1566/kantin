import ModalForm from "@/Components/Modal/ModalForm";
import Table from "@/Components/Table/Table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps, ColumnProps, FormField } from "@/types";
import { AdminSidebarData } from '@/Config/Sidebar/Index';
import { Children, PropsWithChildren, useState } from "react";

interface BasicIndexLayoutProps extends PageProps{
    data: any[]
    columns: ColumnProps[]
    form?: FormField[]
    title: string
    storeRoute: string
}

const BasicIndexLayout = ({ auth, data, columns, form, title, storeRoute, children }: PropsWithChildren<BasicIndexLayoutProps>) => {
    let canAdd: boolean = true
    if (form?.length == 0 || form == undefined) {
        canAdd = false
    }
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <DashboardLayout user={auth.user} title={title} sidebar={AdminSidebarData}>
            {
                canAdd && (
                    <ModalForm isOpen={isOpen} onClose={closeModal} formFields={form || []} route={storeRoute}/>
                )
            }
            <h2 className="text-lg mb-5 col-span-2">
                {title} Data
            </h2>
            {children}
            <div className="col-span-1 p-5 bg-primary-100 dark:bg-dark-primary-100 border-primary-300 dark:border-dark-primary-300 border overflow-auto shadow-sm rounded-lg">
                <Table
                    TableColumns={columns}
                    TableData={data}
                    Pagination
                    Search
                    CanImport
                    onClickAdd={canAdd ? openModal : undefined}
                />
            </div>
        </DashboardLayout>
    );
};

export default BasicIndexLayout;
