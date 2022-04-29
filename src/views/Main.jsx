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

    setMovies(tempMovies);
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
      ...new Map(titles.map((item) => [item['id'], item])).values(),
    ];

    setTitle(uniqueIds);
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
        {title.length &&
          title.map((t) => <option key={t.id}>{t.title}</option>)}
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
