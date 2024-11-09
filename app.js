// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
