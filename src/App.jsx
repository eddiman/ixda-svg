import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './Containers/Home';
import {About} from './Containers/About';
import {Photography} from './Containers/Photography';

export const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main root route for Home */}
        <Route path="/" element={<Home />} />

        {/* Route for About */}
        <Route path="/about" element={<About />} />
        <Route path="/photography" element={<Photography />} />
      </Routes>
    </Router>
  );
};

