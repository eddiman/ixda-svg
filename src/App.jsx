import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventPage } from './Containers/EventPage';
import { fetchSiteConfig } from "./api/fetchSiteConfig";
import { AboutPage } from './Containers/AboutPage';
import { SponsorsPage } from './Containers/SponsorsPage';
import { ContactPage } from './Containers/ContactPage';


// Create context
export const SiteConfigContext = createContext(null);

// Context provider
export const SiteConfigProvider = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    const getConfig = async () => {
      const data = await fetchSiteConfig();
      setSiteConfig(data);
    };
    getConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={siteConfig}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);

// Main App
export const App = () => {
  return (
    <SiteConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </SiteConfigProvider>
  );
};