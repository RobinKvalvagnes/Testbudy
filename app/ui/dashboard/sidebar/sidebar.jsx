import styles from './sidebar.module.css';
import MenuLink from './menuLink/menuLink';
import { BsFillPersonFill } from "react-icons/bs";
import { SiBlazemeter } from "react-icons/si";
import Image from 'next/image';
import { LuTestTube2 } from "react-icons/lu";

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
                title: 'Azure',
                path: '/dashboard/azure',
                icon: <MdShoppingBag />,
            },
            {
                title: 'Demo',
                path: '/dashboard/acunetix',
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

const Sidebar = ({ user }) => {
    // Display user email if available, otherwise fallback to 'Guest'
    const userEmail = user?.Email || 'Demo user';
  
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <LuTestTube2 size={50} />
        </div>
        <div className={styles.user}>
          <BsFillPersonFill className={styles.userImage} size={25} />
          <div className={styles.userDetail}>
            <span className={styles.username}>{userEmail}</span>
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