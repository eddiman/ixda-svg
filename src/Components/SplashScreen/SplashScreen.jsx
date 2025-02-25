import React, { useState, useEffect, useRef } from "react";
import IxdaLogo from "../IxdaLogo/IxdaLogo";
import styles from "./SplashScreen.module.scss";

const SplashScreen = () => {
  const colorClasses = [
    "white",
    "gray-6",
    "gray-1",
    "ixda-red",
    "ixda-purple",
    "ixda-blue",
    "ixda-green",
    "ixda-orange",
    "ixda-pink",
    "ixda-cyan",
    "ixda-yellow",
  ];
  const [randomColor, setRandomColor] = useState('');
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    setRandomColor(colorClasses[randomIndex]);
  }, []);
  return (
    <div className={`${styles.loadingComponent} ${styles[randomColor]}`}>
      <IxdaLogo color={randomColor} />
      <h1 className={styles.title}>IxDA Stavanger</h1>
    </div>
  );
};

export default SplashScreen;
