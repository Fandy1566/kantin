import React from 'react'
import styles from './Navbar.module.scss';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
    title?: string;
    onClickMenu: () => void;
}

const Navbar = ({ title, onClickMenu }: NavbarProps) => {
    return (
        <>
            <div className='w-full bg-primary-100 dark:bg-dark-primary-100 h-14 flex items-center border-b border-primary-300 dark:border-dark-primary-300 px-4 justify-between sticky top-0'>
                <div className="flex items-center gap-x-2">
                    <FontAwesomeIcon icon={faBars} className='md:hidden' onClick={onClickMenu}/>
                    <p>{title}</p>
                </div>
                <DarkModeToggle />
            </div>
        </>
    )
}

export default Navbar
