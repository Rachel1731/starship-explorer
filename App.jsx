import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarshipCard from './StarshipCard';

const StarshipList = () => {
  const [starships, setStarships] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStarships, setFilteredStarships] = useState([]);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/starships/');
        setStarships(response.data.results);
        setTotalResults(response.data.count);
        setFilteredStarships(response.data.results);
      } catch (error) {
        console.error('Error fetching starships:', error);
      }
    };
    
    fetchStarships();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = starships.filter(starship =>
        starship.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStarships(filtered);
    } else {
      setFilteredStarships(starships);
    }
  }, [searchTerm, starships]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for a starship"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <h2>Displaying {filteredStarships.length} of {totalResults} starships</h2>
      </div>
      <div className="starship-list">
        {filteredStarships.map(starship => (
          <StarshipCard key={starship.url} starship={starship} />
        ))}
      </div>
    </div>
  );
};

const StarshipCard = ({ starship }) => {
  return (
    <div className="starship-card">
      <h3>{starship.name}</h3>
      <p><strong>Class:</strong> {starship.starship_class}</p>
      <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
      <p><strong>Model:</strong> {starship.model}</p>
    </div>
  );
};

import React from 'react';
import StarshipList from './StarshipList'; 
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <h1>Starship Explorer</h1> 
      <StarshipList /> {CR90 corvette, Star Destroyer, Sentinel-class landing craft, Death Star, Millennium Falcon,Y-wing,X-wing, TIE Advanced x1, Executor, Rebel transport}
    </div>
  );
};

export default App







