import { MenuSection } from '@/types'
import { faArchive, faCodeBranch, faCog, faDollarSign, faDolly, faExchangeAlt, faHome, faShoppingCart, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'

const AdminSidebarData: MenuSection[] = [
    {
        title: 'Overview',
        items: [
            { name: 'Dashboard', route: route('admin.dashboard'), icon: (<FontAwesomeIcon icon={faHome} />), mustEquals: true },
            { name: "Products", route: route("admin.product.index"), icon: (<FontAwesomeIcon icon={faArchive} />) },
            { name: "Stocks", route: route("admin.stock.index"), icon: (<FontAwesomeIcon icon={faDolly} />), mustEquals: true },
            { name: "Customer", route: route("admin.customer.index"), icon: (<FontAwesomeIcon icon={faUsers} />) },
            { name: "Transfer", route: route("admin.stockTransfer.create"), icon: (<FontAwesomeIcon icon={faExchangeAlt} />), mustEquals: true},
            { name: 'Users', route: route('admin.user.index'), icon: (<FontAwesomeIcon icon={faUser} />) },
            { name: 'Transaction', route: route('cashier.transaction.create'), icon: (<FontAwesomeIcon icon={faShoppingCart} />) },
        ]
    },
    {
        title: "History",
        items: [
            { name: "Transaction", route: route("admin.transaction.index"), icon: (<FontAwesomeIcon icon={faDollarSign} />)},
            { name: "Transfer", route: route("admin.stockTransfer.index"), icon: (<FontAwesomeIcon icon={faExchangeAlt} />), mustEquals: true},
        ],
    },
    {
        title: "Config",
        items: [
            { name: "Branch", route: route("admin.branch.index"), icon: (<FontAwesomeIcon icon={faCodeBranch} />) },
        ],
    },
    {
        title: 'Account',
        items: [
            { name: 'Settings', route: route('admin.setting'), icon: (<FontAwesomeIcon icon={faCog} />) },
            { name: 'Profile', route: route('profile.edit'), icon: (<FontAwesomeIcon icon={faUser} />) },
        ]
    },
]

export default AdminSidebarData
