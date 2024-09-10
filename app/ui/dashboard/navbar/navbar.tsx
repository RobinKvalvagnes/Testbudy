"use client"; // Ensure this component is client-side rendered

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md';
import { supabase } from '@/utils/supabase/client';

// Define your button options
const options = [
    { key: 'logout', label: 'Logout' },
   // { key: 'option2', label: 'Option 2' },  add more options here 
   // { key: 'option3', label: 'Option 3' },
];

const Navbar = () => {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<{ email?: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUser();
    }, []);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = async (key: string) => {
        if (key === 'logout') {
            await supabase.auth.signOut();
            window.location.href = '/login'; // Redirect to login page
        }
        // Handle other options if necessary
    };

    return (
        <div className={styles.container}>
            <span>Navbar</span>
            <div className={styles.title}>{pathname?.split("/").pop()}</div>
            <div className={styles.menu}>
                <div className={styles.search}>
                    <MdSearch />
                    <input type="text" placeholder="search.." className={styles.input} />
                </div>
                <div className={styles.icons}>
                    <MdOutlineChat size={20} />
                    <MdNotifications size={20} />
                    <div className={styles.dropdownWrapper} onClick={toggleDropdown}>
                        <MdPublic size={20} />
                        {isDropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                {options.map(option => (
                                    <button
                                        key={option.key}
                                        className={styles.dropdownItem}
                                        onClick={() => handleOptionClick(option.key)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
