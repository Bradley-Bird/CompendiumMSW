export async function fetchCharacters() {
  const resp = await fetch('https://ghibliapi.herokuapp.com/people');
  const data = await resp.json();
  return data;
}

export async function fetchFilm([film]) {
  const resp = await fetch(film);
  const data = await resp.json();
  //   console.log(data);
  return data;
}
