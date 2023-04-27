const API = {
  getDetails: async (item) => {
    const response = await fetch(item.url)
    const json = await response.json()
    return createPokemon(json)
  },
  getAll: async (limit = 2, offset = 0) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    const response = await fetch(URL)
    const json = await response.json()
    const list = json.results
    return await Promise.all(list.map(item => API.getDetails(item)))
  }
}

const createPokemon = (details) => {
  const pokemon = new Pokemon()
  pokemon.id = details.id
  pokemon.name = details.name
  details.types.map(slot => pokemon.types.push(slot.type.name))
  pokemon.image = details.sprites.other.dream_world.front_default
  return pokemon
}