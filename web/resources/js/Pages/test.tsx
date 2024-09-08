import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { MenuSection, PageProps } from "@/types";
import { faCog, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface testProps extends PageProps{

}

const test = ({auth}: testProps) => {

    return (
        <DashboardLayout user={auth.user} title="test">
            
        </DashboardLayout>
    );
};

export default test;
