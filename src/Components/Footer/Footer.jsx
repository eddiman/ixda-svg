import { useState, useEffect } from "react";
import styles from "./Footer.module.scss";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../api/sanityClient";
import { useSiteConfig } from "../../App";

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

const Footer = ({}) => {
  const siteConfig = useSiteConfig();
  if (!siteConfig) return <div>Loading...</div>;
  const sponsors = siteConfig.sponsors;

  return (
    <footer className={styles.footer}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Our Sponsors</h2>
        <div className={styles.sponsorsGrid}>
          {sponsors
            ? sponsors.map((sponsor, index) => (
                <img
                  key={index}
                  src={urlFor(sponsor.asset).url()}
                  alt={`Sponsor ${index + 1}`}
                  className={styles.sponsorLogo}
                />
              ))
            : ""}
        </div>
        <a href="https://www.meetup.com/ixda-stavanger" target="_blank" rel="noopener noreferrer" className={styles.link}>
          IxDA SVG on Meetup.com →
        </a>
      </div>
    </footer>
  );
};

export default Footer;
