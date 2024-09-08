import { MenuSection, User } from '@/types';
import React, { PropsWithChildren } from 'react'
import DashboardLayout from '../DashboardLayout';
import { AdminSidebarData } from '@/Config/Sidebar/Index';

interface AdminLayoutProps {
    user: User;
    title?: string;
    className?: string;
}

const AdminLayout = ({ user, title, children, className }: PropsWithChildren<AdminLayoutProps>) => {
    return (
        <DashboardLayout className={className} sidebar={AdminSidebarData} user={user} title={title}>
            {children}
        </DashboardLayout>
    )
}

export default AdminLayout
