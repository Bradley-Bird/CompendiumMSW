import React from 'react';
import { useEffect, useState } from 'react';
import CharacterList from '../components/CharacterList';
import { fetchCharacters, fetchFilm } from '../services/ghibli';

function Main() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters();
      console.log(data);
      setCharacters(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    characters.map(async (character) => {
      const fetchData = async () => {
        const data = await fetchFilm(character.films);
        setMovies((prev) => [...prev, data.title]);
        console.log('data', data.title);
      };
      await fetchData();
    });
  }, [characters]);
  useEffect(() => {
    const titles = [new Set(movies.map((movie) => movie))];
    setTitle(titles);
  }, [movies]);

  console.log('movies', movies);
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        characters.map((character) => (
          <CharacterList key={character.name} {...{ character }} />
        ))
      )}
    </div>
  );
}

export default Main;
