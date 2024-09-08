import { MenuSection } from "@headlessui/react";

export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface FormField {
    name: string;
    label?: string;
    id?: string;
    type: string;
    required?: boolean;
    options?: FormOption[];
    value?: any;
    selected?: any;
}

interface FormOption {
    name: string;
    value: any;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

export interface MenuItem {
    name: string;
    route: string;
    icon: React.ReactNode;
    mustEquals?: boolean;
}

import { CellProps } from "react-table";
import { Product } from "./model";

export interface ColumnProps {
    Header: string;
    accessor: string;
    disableSortBy?: boolean;
    Cell?: (props: CellProps<any>) => JSX.Element;
}

export interface CartItem {
    quantity: number;
    product: Product;
}
