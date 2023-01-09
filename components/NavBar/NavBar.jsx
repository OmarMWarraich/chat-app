import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './NavBar.module.css';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model, Error } from '../index';
import images from '../../assets';

const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "allUsers"
    },
    {
      menu: "Chat",
      link: "/"
    },
    {
      menu: "Contacts",
      link: "/"
    },
    {
      menu: "Settings",
      link: "/"
    },
    {
      menu: "Faqs",
      link: "/"
    },
    {
      menu: "Terms & Conditions",
      link: "/"
    }
  ];

  // UseState
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  // UseContext

  const { account, userName, connectWallet } = useContext(ChatAppContext);

  return (
    <div className={styles.NavBar}>
      <div className={styles.NavBar_box}>
        <div className={styles.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={styles.NavBar_box_right}>
          {/* Desktop */}
          <div className={styles.NavBar_box_right_menu}>
            {menuItems.map((item, index) => (
              <div onClick={() => setActive(index + 1)} key={index + 1} 
              className={active === (index + 1) ? styles.NavBar_box_right_menu_active : styles.NavBar_box_right_menu_item}>
                <Link 
                  className={styles.NavBar_box_right_menu_item_link}
                  href={item.link}
                >
                  {item.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* Mobile */}
          {open && (
            <div className={styles.NavBar_box_right_menu_mobile}>
              {menuItems.map((item, index) => (
                <div onClick={() => setActive(index + 1)} key={index + 1}
                className={active === (index + 1) ? styles.NavBar_box_right_menu_active : styles.NavBar_box_right_menu_item}>
                  <Link
                    className={styles.NavBar_box_right_menu_item_link}
                    href={item.link}
                  >
                    {item.menu}
                  </Link>
              </div>
              ))}

              <p className={styles.mobile_menu_btn}>
                <Image 
                  src={images.close} 
                  alt="close" 
                  width={50} 
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
        </div>
        )}

        {/* Connect Wallet */}
        <div className={styles.NavBar_box_right_connect}>
          {account == "" ? (
            <button onClick={() => connectWallet()}>
              {" "}
              <span>Connect Wallet</span>
            </button>
          ) : (
            <button onClick={() => setOpenModel(true)}>
              {" "}
              <Image src={userName ? images.accountName : images.create2} alt="user" width={20} height={20} />
              {" "}
              <small>{userName || "Create Account"}</small>
            </button>
          )}
          </div>
          
          <div 
            className={styles.NavBar_box_right_open}
            onClick={() => setOpen(!open)}
          >
            <Image src={images.open} alt="open" width={50} height={50} />
          </div>
      </div>
    </div>
    </div>
);
};

export default NavBar