import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import styles from "./Menu.module.scss";
import IxdaLogo from "../IxdaLogo/IxdaLogo";

const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current URL path
  const isRoot = location.pathname === "/"; // Check if the user is at root

  return (
    <nav className={`${isOpen ? styles.open : ""}`}>
      <div className={styles.innerMenu}>
        {!isRoot && ( // Hide home link if at root
          <a href="/" tabIndex={isOpen ? 0 : -1}>
            ←
          </a>
        )}
        <a href="about" tabIndex={isOpen ? 0 : -1}>About IxDA</a>
        <a href="sponsors" tabIndex={isOpen ? 0 : -1}>Sponsors</a>
        <a href="#contact" tabIndex={isOpen ? 0 : -1}>Contact</a>
      </div>
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <span className={`${styles.menuIcon} ${isOpen ? styles.isOpen : ""}`} />
      </button>
    </nav>
  );
};

export default MenuComponent;