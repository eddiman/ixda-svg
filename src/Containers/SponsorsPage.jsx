import { useState, useEffect, useRef } from "react";
import "../styles/eventPage.scss";
import SplashScreen from "../Components/SplashScreen/SplashScreen";
import BaseLayout from "../Components/BaseLayout/BaseLayout";
import Menu from "../Components/Menu/Menu";

export const SponsorsPage = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000); // This has to be about 300ms more than fadeOut animation duration in SplashScreen.module.scss, something with how css renders differently than what the setTimeout times stuff, if same the fadout animation cuts out a bit shorter
    return () => clearTimeout(timeout);
  }, []); // Run effect only once when component mounts

  return (
    <>
    <Menu/>
      {showLoading ? <SplashScreen/> : ""}
      <div className={"about-container fade-in"}>
        <BaseLayout title="Sponsorship" subTitle="Sponsors">  wagama</BaseLayout>
      </div>
    </>
  );
};
