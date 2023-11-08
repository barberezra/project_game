import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
// stylesheet
import './index.css';
// components
import Game from './components/Game/Game.js';
import Home from './components/Home/Home';
import HowTo from './components/Home/HowTo';

    // const [message, setMessage] = useState('');
    // const [error, setError] = useState('');
  
    // useEffect(() => {
    //   fetch('/move')
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error('Failed to capture pit data from the external API');
    //       } else {
    //         response_data = response.json();
    //         pitNumber = response_data.get('pitNumber');
    //         pitValue = response_data.get('pitValue')
    //         pitRange = response_data.get('pitRange')
  
    //         return response.json();
    //       }
    //     })
    //     .then(data => setMessage(data.message))
    //     .catch(error => setError(error.message));
    // }, []);
  
const root = createRoot(document.getElementById('root'));
root.render(
  <div>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/how_to" element={<HowTo />} />
        <Route exact path="/game" element={<Game />} />
      </Routes>
    </Router>
  </div>
);