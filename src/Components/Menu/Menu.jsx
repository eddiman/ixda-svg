import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Menu.module.scss";

const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);
  const location = useLocation();
  const isRoot = location.pathname === "/";

  // Function to update menu height
  const updateMenuHeight = () => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.offsetHeight);
    }
  };

  // Update height on open/close
  useEffect(() => {
    updateMenuHeight();
  }, [isOpen]);

  // Update height on window resize
  useEffect(() => {
    window.addEventListener("resize", updateMenuHeight);
    return () => window.removeEventListener("resize", updateMenuHeight);
  }, []);

  return (
    <nav
      className={`${isOpen ? styles.open : ""}`}
      style={{ top: `-${menuHeight}px` }}
    >
      <div ref={menuRef} className={styles.innerMenu}>
        {!isRoot && (
          <a href="/" tabIndex={isOpen ? 0 : -1}>
            ←
          </a>
        )}
        <a href="about" tabIndex={isOpen ? 0 : -1}>
          About IxDA
        </a>
        <a href="sponsors" tabIndex={isOpen ? 0 : -1}>
          Sponsors
        </a>
        <a href="contact" tabIndex={isOpen ? 0 : -1}>
          Contact
        </a>

        <div className={styles.socialMedia}>
          <a
            href="https://www.instagram.com/ixda_stavanger/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/linkedin.svg" alt="LinkedIn" />
          </a>
          <a
            href="https://www.instagram.com/ixda_stavanger/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/insta.svg" alt="Instagram" />
          </a>
        </div>
      </div>
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <span className={`${styles.menuIcon} ${isOpen ? styles.isOpen : ""}`} />
      </button>
    </nav>
  );
};

export default MenuComponent;
