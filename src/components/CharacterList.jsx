import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchFilm } from '../services/ghibli';

function CharacterList({ character: { name, films } }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      //   console.log(films);
      const data = await fetchFilm(films);
      //   console.log(data);
      setMovies(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <p>{movies.title}</p> */}
      <p>{name}</p>
    </>
  );
}

export default CharacterList;
