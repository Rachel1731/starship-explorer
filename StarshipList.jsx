import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarshipCard from './StarshipCard';

export default function StarshipList () {
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