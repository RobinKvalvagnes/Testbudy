
import styles from './sidebar.module.css';
import MenuLink from './menuLink/menuLink';
import { BsFillPersonFill } from "react-icons/bs";
import { SiBlazemeter } from "react-icons/si";
import Image from 'next/image';


import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdHelpCenter
} from 'react-icons/md';




const menuItems = [
    {
        title: 'Pages',
        list: [
            {
                title: 'Dashboard',
                path: '/dashboard',
                icon: <MdDashboard />,
            },
            {
                title: 'Blazemeter',
                path: '/dashboard/blazemeter',
                icon: <SiBlazemeter />,
            },
            {
                title: 'Products2',
                path: '/dashboard/products',
                icon: <MdShoppingBag />,
            },
            {
                title: 'product3',
                path: '/dashboard/transactions',
                icon: <MdAttachMoney />,
            },
        ],
    },
    {
        title: 'Users',
        list: [
            {
                title: 'Settings',
                path: '/dashboard/settings',
                icon: <MdDashboard />,
            },
            {
                title: 'Help',
                path: '/dashboard/help',
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const Sidebar = () => {
    return (
        
        <div className={styles.container}>
        <div className={styles.logo}>
        <Image src="/testbud_logo.png" alt="Logo" width={120} height={40} />

        </div>
        <div className={styles.user}>
            <BsFillPersonFill className={styles.userImage} size={25} />
            <div className={styles.userDetail}>
                <span className={styles.username}>test</span>
                <span className={styles.userTitle}>Software Developer</span>
            </div>
        </div>
        <ul className={styles.list}>
            {menuItems.map((cat) => (
                <li key={cat.title}>
                    <span className={styles.cat}>{cat.title}</span>
                    <ul>
                        {cat.list.map((item) => (
                            <li key={item.title}>
                                <MenuLink item={item} />
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </div>
    );
};



export default Sidebar; 
