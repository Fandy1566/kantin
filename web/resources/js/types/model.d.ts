import { User } from ".";

export interface Customer {
    id: number;
    customer_name : string;
    customer_address?: string;
    customer_phone?: string;
    isDeleted: boolean;
}

export interface Product {
    id: number;
    product_name: string;
    product_description: string;
    product_image: string;
    product_price: number;
    category_id: number;
}

export interface ProductCategory {
    id: number;
    category_name: string;
}

export interface Branch {
    id: number;
    branch_name: string;
}

export interface Stocks {
    id: number;
    product: Product;
    quantity: number;
}

export interface StockTransfer{
    id: number;
    transfer_date: string;
    branch_id: number;
    branch: Branch;
    branch_destination_id: number;
    branch_destination: Branch;
    user_id: number;
    user: User;
    isDeleted: boolean;
}

export interface StockTransferDetail{
    id: number;
    stock_transfer_id: number;
    stock_transfer: StockTransfer;
    quantity: number;
    product_id: number;
    product: Product;
}

export interface Transaction {
    transaction_id: string;
    customer_id: number;
    customer: Customer;
    user_id: number;
    user: User;
    transaction_date: Date;
    transaction_status: boolean;
    branch_id: number;
    branch: Branch;
    description: string;
}

export interface TransactionDetail {
    transaction_id: string;
    transaction: Transaction;
    product_id: number;
    product: Product;
    quantity: number;
    price: number;
}