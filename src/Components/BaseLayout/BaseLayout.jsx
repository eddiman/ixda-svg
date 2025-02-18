import React from "react";
import styles from "./BaseLayout.module.scss";
import IxdaLogo from "../IxdaLogo/IxdaLogo";

const BaseLayout = ({ title="Title", subTitle="Subtitle", color = "white", children, anchorId }) => {
  return (
    <div className={styles.baseLayout + " " + styles[color]} id={anchorId ? anchorId : ""}>
    <div className={styles.baseLayoutContainer}>
      <header className={styles.header}>
        <div className={styles.top}>
          <h2 className={styles.subtitle}>{subTitle}</h2>
          <div className={styles.logoContainer}>
            <a href="/" className={styles.logoLink}>
              <h3 className={styles.ixdaTitle}>IxDA Stavanger</h3>
              <IxdaLogo color = {color} className={styles.logo } />
            </a>
          </div>
        </div>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <main className={styles.content}>{children}</main>
    </div>
    </div>
  );
};

export default BaseLayout;
