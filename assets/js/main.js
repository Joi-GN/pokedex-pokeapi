const listElement = document.querySelector("[data-list]")

const listItemTemplate = (item) => `
  <li class="item ${item.types[0]}">
    <span class="number"></span>
    <span class="name">${item.name}</span>
    <div class="details">
      <ol class="types">
        ${item.types.map(type => `<li class="type">${type}</li>`).join('')}
      </ol>
      <img src="${item.image}" alt="${item.name}">
    </div>
  </li>
`
API.getAll().then((list = []) => listElement.innerHTML += list.map(item => listItemTemplate(item)).join(""))