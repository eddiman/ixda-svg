import { useState, useEffect } from "react";

import sanityClient from "../api/sanityClient"; // Adjust the path as needed
import fetchAboutUs from "../api/fetchAboutUs"; // Adjust the path as needed

import imageUrlBuilder from "@sanity/image-url";
import SplashScreen from "../Components/SplashScreen/SplashScreen";
import BaseLayout from "../Components/BaseLayout/BaseLayout";
import PersonCard from "../Components/PersonCard/PersonCard";
import Menu from "../Components/Menu/Menu";

import "../styles/aboutPage.scss";
import { PortableText } from "@portabletext/react";

// Set up image builder
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source).url();
}

export const AboutPage = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAboutUs();
      console.log(data);

      setAboutData(data);
    };

    loadData();
  }, []);

  // Handle loading state
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Menu />
      {showLoading ? <SplashScreen /> : ""}
      <div className="about-container fade-in">
        {aboutData ? (
          <>
            <BaseLayout title={aboutData.title} subTitle="About us">
              <div className="ixda-content">
                <div className={"ixda-text max-half"}>
                  <PortableText value={aboutData.content} />
                </div>
                {/* Page Image */}
                {aboutData.image && (
                  <img
                    src={urlFor(aboutData.image) + "?w=1200&h=900"}
                    alt={aboutData.title}
                    className="ixda-image"
                  />
                )}

                {/* Page Content */}

                {/* Board Members */}
              </div>
            </BaseLayout>

            <BaseLayout title={"The board"} subTitle="About us" color="gray-6">
              <div className="board-members-content">
                <p className="max-half"> {aboutData.boardDescriptionTextbox}</p>
                <div className="board-grid">
                  {aboutData.boardMembers.map((member, index) => (
                    <PersonCard key={index} person={member} />
                  ))}
                </div>
              </div>
            </BaseLayout>
            <BaseLayout title={"The program committee"} subTitle="About us" color="gray-1">
              <div className="board-members-content">
                <p className="max-half"> {aboutData.programDescriptionTextbox}</p>
                <div className="board-grid">
                  {aboutData.programMembers.map((member, index) => (
                    <PersonCard key={index} person={member} />
                  ))}
                </div>
              </div>
            </BaseLayout>
          </>
        ) : (
          <BaseLayout title={"Loading..."} subTitle="About us" />
        )}
      </div>
    </>
  );
};

export default AboutPage;
