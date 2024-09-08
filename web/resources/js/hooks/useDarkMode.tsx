import { useEffect, useState } from 'react';

const useDarkMode = (): [boolean, () => void] => {
    const getSystemTheme = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const darkModeFromLocalStorage = localStorage.getItem("darkMode");
        if (darkModeFromLocalStorage !== null) {
            return darkModeFromLocalStorage === "true";
        } else {
            return getSystemTheme();
        }
    });

    useEffect(() => {
        const darkModePreference = localStorage.getItem('darkMode');
        if (darkModePreference === 'enabled') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;

        if (isDarkMode) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');
        }

        setIsDarkMode(!isDarkMode);
    };

    return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;