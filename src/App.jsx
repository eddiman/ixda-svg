import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Events} from './Containers/Events';

export const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main root route for Home */}
        <Route path="/" element={<Events />} />
      </Routes>
    </Router>
  );
};

