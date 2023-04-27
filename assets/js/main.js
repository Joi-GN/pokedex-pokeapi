const listElement = document.querySelector("[data-list]")
const loadMoreButton = document.getElementById("btn-load-more")

const generations = {
  1: {
    firstPokemonNumber: 1,
    lastPokemonNumber: 151
  },
  2: {
    firstPokemonNumber: 152,
    lastPokemonNumber: 251
  },
  3: {
    firstPokemonNumber: 252,
    lastPokemonNumber: 386
  },
  4: {
    firstPokemonNumber: 387,
    lastPokemonNumber: 493
  },
  5: {
    firstPokemonNumber: 494,
    lastPokemonNumber: 649
  }, 
}

let chosenGeneration = generations[2]

const limit = 10
let offset = chosenGeneration.firstPokemonNumber - 1;

const listItemTemplate = (item) => `
  <li class="pokemon ${item.types[0]}">
    <header class="pokemon__header">
      <span class="number">${item.id}</span>
      <span class="name">${item.name}</span>
    </header>
    <div class="pokemon__details">
      <ol class="types">
        ${item.types.map(type => `<li class="type">${type}</li>`).join('')}
      </ol>
      <img class="image" src="${item.image}" alt="${item.name}">
    </div>
  </li>
`

const loadPokemons = (limit, offset) => {
  API.getAll(limit, offset).then((list = []) => 
    listElement.innerHTML += list.map(listItemTemplate).join(""))
}

loadMoreButton.addEventListener('click', (e) => {
  offset += limit
  const nextPageTotalItems = offset + limit
  if (nextPageTotalItems >= chosenGeneration.lastPokemonNumber) {
    const newLimit = chosenGeneration.lastPokemonNumber - offset
    loadPokemons(newLimit, offset)
    e.target.remove()
  } else {
    loadPokemons(limit, offset)
  }
})

loadPokemons(limit, offset)