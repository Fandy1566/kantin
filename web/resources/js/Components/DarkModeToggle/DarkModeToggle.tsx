import React from 'react';
import useDarkMode from '../../hooks/useDarkMode'; // Adjust the import path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle = () => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    return (
        <button
            type='button'
            onClick={toggleDarkMode}
            className="w-10 h-10 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full"
        >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon}/>
            
        </button>
    );
};

export default DarkModeToggle;