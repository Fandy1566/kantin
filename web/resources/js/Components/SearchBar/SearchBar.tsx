import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface searchProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchInput: string;
    className?: string;
}

const SearchBar: React.FC<searchProps> = ({ handleChange, searchInput, className }) => {
    const iconColor = {
        filter : 'invert(33%) sepia(15%) saturate(548%) hue-rotate(176deg) brightness(90%) contrast(89%)',
    };

    return (
        <div className={`bg-transparent border border-primary-300 dark:border-dark-primary-300 rounded-lg overflow-hidden flex items-center px-2 py-2 w-fit ${className}`}>
            <FontAwesomeIcon icon={faSearch} />
            <input
                className="bg-transparent flex-grow border-transparent focus:border-transparent focus:ring-0 text-gray-600 text-sm p-0 ml-1"
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
            />
        </div>
    );
};

export default SearchBar;
