import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                accent: '#3B82F6',
                'accent-text': '#FFFFFF',
                success: 'green-600',
                error: '#dc2626',
                warning: 'yellow-600',
                info: '#3B82F6',
                //light mode
                'primary-100': '#FFFFFF',
                'primary-200': '#ECECEC',
                'primary-300': '#D9D9D9',
                'text-primary': '#030303',
                'text-secondary': '#7C7C7C',
                //dark mode
                'dark-primary-100': '#121212',
                'dark-primary-200': '#1f2937',
                'dark-primary-300': '#2D2D38',
                'dark-text-primary': '#E3E3E3',
                'dark-text-secondary': '#A8A8A8',
            }
        },
    },

    plugins: [forms],
};
