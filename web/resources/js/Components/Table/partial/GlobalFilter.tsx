import SearchBar from "@/Components/SearchBar/SearchBar";
import { changeColor } from "@/utils/color";
import { icon } from "@/utils/icon";
import React, { useMemo } from "react";

interface GlobalFilterProps {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ filter, setFilter }) => {
    // const targetIconColor = useMemo(() => (changeColor('#4b5563')),[]); 
    
    // console.log(targetIconColor);
    const iconColor = {
        filter : 'invert(33%) sepia(15%) saturate(548%) hue-rotate(176deg) brightness(90%) contrast(89%)',
    };


    return (
        <SearchBar handleChange={(e) => setFilter(e.target.value)} searchInput={filter}/>
    );
};

export default GlobalFilter;
