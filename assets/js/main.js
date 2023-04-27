const form = document.getElementById("form")
const openButton = document.getElementById("btn-open")
const listElement = document.querySelector("[data-list]")
const loadMoreButton = document.getElementById("btn-load-more")
let chosenGeneration, offset
const limit = 2

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

const openPokedex = (gen) => {
  chosenGeneration = generations[gen]
  offset = chosenGeneration.firstPokemonNumber - 1;
  loadMoreButton.classList.remove("hide")
  resetButton.classList.remove("hide")
  listElement.innerHTML = ""
  loadPokemons(limit, offset)
}

openButton.addEventListener('click', (e)=>{
  e.preventDefault()
  openPokedex(form.generation.value)
  e.target.textContent = "Change generation"
})

const loadPokemons = () => {
  API.getAll(limit, offset).then((list = []) => 
    listElement.innerHTML += list.map(listItemTemplate).join(""))
}

loadMoreButton.addEventListener('click', (e) => {
  offset += limit
  const nextPageTotalItems = offset + limit
  if (nextPageTotalItems >= chosenGeneration.lastPokemonNumber) {
    const newLimit = chosenGeneration.lastPokemonNumber - offset
    loadPokemons(newLimit, offset)
    loadMoreButton.remove()
  } else {
    loadPokemons(limit, offset)
  }
})