const API = {
  getDetails: (item) => {
    return fetch(item.url)
            .then(response => response.json())
            .then(createPokemon)
  },
  getAll: (limit = 2, offset = 0) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    return fetch(URL)
            .then(response => response.json())
            .then(json => json.results)
            .then(list => list.map(item => API.getDetails(item)))
            .then(promises => Promise.all(promises))
            .catch(error => console.error(error))
  }
}

const createPokemon = (details) => {
  const pokemon = new Pokemon();
  pokemon.name = details.name;
  pokemon.order = details.order;
  details.types.map(slot => pokemon.types.push(slot.type.name));
  pokemon.image = details.sprites.other.dream_world.front_default;
  return pokemon;
}