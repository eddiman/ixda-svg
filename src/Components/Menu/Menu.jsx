import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Menu.module.scss";

const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);
  const menuWrapperRef = useRef(null); // Ref for detecting outside clicks
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

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuWrapperRef.current && !menuWrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav
      ref={menuWrapperRef} // Attach ref to the wrapper
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
            href="https://www.meetup.com/ixda-stavanger"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/meetup.svg" alt="Instagram" />
          </a>
          <a
            href="https://www.linkedin.com/company/ixda-stavanger"
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