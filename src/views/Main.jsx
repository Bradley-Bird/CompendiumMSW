import React from 'react';
import { useEffect, useState } from 'react';
import CharacterList from '../components/CharacterList';
import { fetchCharacters, fetchFilm } from '../services/ghibli';

async function getMovies() {
  const data = await fetchFilm(character.films);
  return data;
}
function Main() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [tempMovies, setTempMovies] = useState([]);

  //populates characters
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters();
      console.log(data);
      setCharacters(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  //maps through characters, grabs nested 'films' endpoint, then fetches film title and sets movies array with film titles
  useEffect(() => {
    characters.map(async (character) => {
      const fetchData = async () => {
        const data = await fetchFilm(character.films);

        setTempMovies((prev) => [...prev, data]);
      };
      await fetchData();
    });
    setMovies(tempMovies);
    console.log(tempMovies);
  }, [characters]);

  //waits for movies to be updated with film titles. then makes new array with-
  //only once instance of each film title.
  useEffect(() => {
    const titles = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
    }));
    const uniqueIds = [
      ...new Map(titles.map((item) => [item['id'], item])).values(),
    ];

    console.log('asjikhda', uniqueIds);
    // console.log('titles', titles);
  }, [movies]);

  //on change fetch movies, fetch characters in particular movie, then display characters on page.
  //handleClick for setting state
  const handleClick = (e) => {
    setSelectedMovie(e.target.value);
  };
  // console.log('movies', movies);
  return (
    <>
      <select onChange={handleClick}>
        {title.length && title.map((t) => <option key={t}>{t}</option>)}
      </select>
      <div>
        {loading ? (
          <p>loading...</p>
        ) : (
          characters.map((character) => (
            <CharacterList key={character.name} {...{ character }} />
          ))
        )}
      </div>
    </>
  );
}

export default Main;
