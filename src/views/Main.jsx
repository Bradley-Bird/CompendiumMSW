import React from 'react';
import { useEffect, useState } from 'react';
import CharacterList from '../components/CharacterList';
import { fetchCharacters, fetchFilm } from '../services/ghibli';

function Main() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('1');
  const [tempMovies, setTempMovies] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const isFiltered = selectedMovie !== '1';
  const current = isFiltered ? filteredCharacters : characters;

  //populates characters
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  //maps through characters, grabs nested 'films' endpoint, then fetches film title and sets movies array with film titles
  useEffect(() => {
    characters.map(async (character) => {
      await fetchFilm(character.films).then((data) => {
        return setTempMovies((tempMovies) => {
          return [
            ...tempMovies.slice(0, 1),
            { id: data.id, title: data.title },
            ...tempMovies.slice(1),
          ];
        });
      });
    });
  }, [characters]);

  useEffect(() => {
    setMovies(tempMovies);
  }, [tempMovies]);

  //waits for movies to be updated with film titles. then makes new array with-
  //only once instance of each film title.
  useEffect(() => {
    const titles = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
    }));
    const uniqueIds = [
      { id: 1, title: 'All' },
      ...new Map(titles.map((item) => [item['id'], item])).values(),
    ];
    setTitle(uniqueIds);
  }, [movies]);

  //on change fetch movies, fetch characters in particular movie, then display characters on page.
  //handleClick for setting state
  useEffect(() => {
    const getChar = () => {
      // filtering characters based on films
      const filterChar = characters.filter(
        (character) =>
          character.films[0] ===
          `https://ghibliapi.herokuapp.com/films/${selectedMovie}`
      );
      setFilteredCharacters(filterChar);
    };
    getChar();
  }, [selectedMovie]);

  // console.log('movies', movies);
  return (
    <>
      <select
        onChange={(e) => {
          setSelectedMovie(e.target.value);
        }}
      >
        {title.length &&
          title.map((t) => (
            <option value={t.id} key={t.id}>
              {t.title}
            </option>
          ))}
      </select>
      <div>
        {loading ? (
          <p>loading...</p>
        ) : (
          current.map((character) => (
            <CharacterList key={character.name} {...{ character }} />
          ))
        )}
      </div>
    </>
  );
}

export default Main;
