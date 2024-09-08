import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { MenuSection, User } from "@/types";

import React, { PropsWithChildren, useState } from "react";

interface DashboardLayoutProps {
    user: User;
    className?: string;
    title?: string;
    sidebar: MenuSection[];
}

const DashboardLayout = ({user, className, title, sidebar, children} : PropsWithChildren<DashboardLayoutProps>) => {

    const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true)

    return (
        <div className={`w-screen h-screen flex font-medium bg-gray-100 dark:bg-[#14141A] text-text-primary dark:text-dark-text-primary relative overflow-hidden ${className}`}>

            <Sidebar
                user={user}
                onHide={() => setIsSidebarOpened(false)}
                menu={sidebar}
                className={`${isSidebarOpened ? '' : 'max-md:hidden'} max-md:absolute max-md:left-0 max-md:top-0 z-50`}
            />
            <div
                id="sidebar-overlay"
                className={`${isSidebarOpened ? '' : 'max-md:hidden'} md:hidden bg-[#14141A] bg-opacity-60 absolute w-screen h-screen z-40`}
                onClick={() => setIsSidebarOpened(false)}
                >

            </div>
            <div className="flex-grow overflow-auto">
                <Navbar title={title} onClickMenu={() => setIsSidebarOpened(!isSidebarOpened)} />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
