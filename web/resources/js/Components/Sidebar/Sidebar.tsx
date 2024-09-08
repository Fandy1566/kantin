import { MenuSection, PageProps, User } from "@/types";
import React, { useEffect, useState } from "react";
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { images } from "@/utils/images";

interface SidebarProps {
    user: User;
    className?: string;
    onHide?: () => void;
    menu: MenuSection[];
}

const Sidebar = ({ user, className, menu, onHide }: SidebarProps) => {
    const currentPath = window.location.href;
    const [isOpened, setIsOpened] = useState<boolean>(
        localStorage.getItem("sidebarIsOpened") === "true"
    );
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsOpened(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebarIsOpened", JSON.stringify(isOpened));
    }, [isOpened]);

    const filteredMenu = menu.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.items.length > 0);

    return (
        <aside className={`h-screen relative ${className}`}>
            <div className={`${isOpened ? "w-72" : "w-24"
                } h-full flex flex-col pt-4 pb-1 transition-width duration-200 bg-primary-100 dark:bg-dark-primary-100 border-r border-primary-300 dark:border-dark-primary-300 overflow-hidden gap-y-2`}>
                <div id="app-info" className={`${isOpened ? '' : 'items-center flex-col'} px-4 py-2 flex justify-between`}>
                    <div className="flex gap-2">
                        <figure className="w-12 h-12 border border-primary-300 dark:border-dark-primary-300 rounded-lg">
                            <img src="" alt="" />
                        </figure>
                        {isOpened && (
                            <div className={`flex flex-col ml-4`}>
                                <h1 className="text-base">Kantin99</h1>
                                <h3 className="text-xs text-text-secondary dark:text-dark-text-secondary">Administator</h3>
                            </div>
                        )}
                    </div>
                    {/* if width is less than 768 px or tailwind md */}
                    <div
                        className={`${isOpened ? '' : 'absolute top-10 z-50 right-[-1em] bg-primary-200 dark:bg-dark-primary-200 w-7 h-7 border border-primary-300 dark:border-dark-primary-300'} md:hidden text-text-secondary dark:text-dark-text-secondary grid place-items-center select-none cursor-pointer transition-transform duration-300 rounded-full`}
                        onClick={onHide}
                    >
                        <FontAwesomeIcon
                            icon={isOpened ? faAngleLeft : faAngleRight}
                        />
                    </div>
                    {/* else */}
                    <div
                        className={`${isOpened ? '' : 'absolute top-10 z-50 right-[-1em] bg-primary-200 dark:bg-dark-primary-200 w-7 h-7 border border-primary-300 dark:border-dark-primary-300'} max-md:hidden text-text-secondary dark:text-dark-text-secondary grid place-items-center select-none cursor-pointer transition-transform duration-300 rounded-full`}
                        onClick={() =>
                            setIsOpened(isOpened === null ? true : !isOpened)
                        }
                    >
                        <FontAwesomeIcon
                            icon={isOpened ? faAngleLeft : faAngleRight}
                        />
                    </div>
                </div>
                <hr className='divider' />
                <nav className="px-4 flex-grow pt-3 overflow-auto">
                    {isOpened && (
                        <div className="w-full mb-3 h-12">

                            <div className="bg-primary-200 dark:bg-dark-primary-200 rounded-md py-3 px-3 flex items-baseline">
                                <span className="text-text-secondary dark:text-dark-text-secondary">
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <input
                                    className="w-full h-full border-none focus:ring-0 bg-transparent py-0"
                                    value={searchQuery}
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                        </div>
                    )}
                    {filteredMenu.map((section, index) => (
                        <div className="mb-5" key={index}>
                            <h3
                                className={`text-text-secondary dark:text-dark-text-secondary text-xs font-medium mb-3 tracking-widest uppercase ${!isOpened && "text-center"}`}
                            >
                                {section.title}
                            </h3>
                            <ul
                                className={`text-text-primary-100 dark:text-dark-text-primary-100 ${!isOpened && "flex flex-col items-center"
                                    } `}
                            >
                                {section.items.map((item, idx) => (
                                    <li key={idx}>
                                        <a
                                            className={`${isOpened
                                                ? "inline-flex items-center w-full"
                                                : "grid place-items-center"
                                                } ${((item.mustEquals) ?
                                                    (currentPath == item.route) : (currentPath.includes(item.route))) ? "bg-primary-200 dark:bg-dark-primary-200" : ''
                                                } whitespace-nowrap rounded-md text-sm py-2 px-4 justify-start h-10 mb-1 hover:bg-primary-200 hover:dark:bg-dark-primary-200`}
                                            href={item.route}
                                        >
                                            {item.icon}
                                            {isOpened && (
                                                <p className="ml-3">
                                                    {item.name}
                                                </p>
                                            )}
                                            {!isOpened && (
                                                <div className={`${styles.menuText} bg-primary-200 dark:bg-dark-primary-200 px-4 py-2 absolute left-[calc(100%-1em)] z-50 border border-primary-300 dark:border-dark-primary-300 rounded-sm`}>
                                                    {item.name}
                                                </div>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
                <hr className="divider" />
                <div id="user-info" className={`${isOpened ? '' : 'flex-col'} px-4 py-2 flex justify-between items-center`}>
                    <div className="flex">
                        <figure className="w-12 h-12 border border-primary-300 dark:border-dark-primary-300 rounded-full overflow-hidden">
                            <img src={images('icon_avatar_default.jpg')} alt="" />
                        </figure>
                        {isOpened && (
                            <div className="flex flex-col ml-3">
                                <p className="text-base">{user.name}</p>
                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">@{user.username}</p>
                            </div>
                        )}
                    </div>
                    {isOpened && (
                        <a href={route('profile.edit')}>
                            <div className="hover:bg-primary-200 hover:dark:bg-dark-primary-200 p-2 grid items-center rounded-md">
                                <FontAwesomeIcon icon={faCog} />
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
