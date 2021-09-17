// DOM Variables
const $form = document.forms[0]

const $pokeCard = document.querySelector('.poke-card')
const $pokeName = document.querySelector('[data-poke-name]')
const $pokeImg = document.querySelector('[data-poke-img]')
const $pokeImgContainer = document.querySelector('[data-poke-img-container]')
const $pokeId = document.querySelector('[data-poke-id]')
const $pokeTypes = document.querySelector('[data-poke-types]')
const $pokeStats = document.querySelector('[data-poke-stats]')

// Variables
const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const TYPE_COLORS = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
}

// Search API
const searchPokemon = async (event) => {
  event.preventDefault()

  enableForm(false)

  const { value = '' } = $form.pokemon

  try {
    const searchText = value.trim().toLowerCase()
    console.log({ searchText })

    if (!searchText) {
      return renderNotFound()
    }
    const response = await fetch(`${API_URL}${searchText}`)
    const pokemon = await response.json()

    enableForm(true)
    renderPokemonData(pokemon)
    console.log(pokemon)
  } catch (error) {
    enableForm(true)
    renderNotFound()
  }
}

const enableForm = (enable = true) => {
  if (enable) {
    $form.pokemon.removeAttribute('disabled')
    $form.btnSearch.removeAttribute('disabled')
    return
  }

  $form.pokemon.setAttribute('disabled', true)
  $form.btnSearch.setAttribute('disabled', true)
}

// Events
const renderPokemonData = (data) => {
  console.log({ data })
  const sprite = data.sprites.front_default
  const { stats, types } = data

  $pokeName.textContent = data.name
  $pokeImg.setAttribute('src', sprite)
  $pokeId.textContent = `Nº ${data.id}`

  // setCardColor(types)
  // renderPokemonTypes(types)
  // renderPokemonStats(stats)
}

const setCardColor = (types) => {
  const [typeDefault = '', typeSecondary = ''] = types

  const { name: colorDefault } = typeDefault.type
  const { name: colorSecondary } = typeSecondary.type

  const colorOne = TYPE_COLORS[colorDefault] || TYPE_COLORS.default
  const colorTwo = TYPE_COLORS[colorSecondary] || TYPE_COLORS.default

  $pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`
  $pokeImg.style.backgroundSize = '5px 5px'
}

const renderPokemonTypes = (types) => {
  $pokeTypes.innerHTML = ''

  types.forEach((type) => {
    const { name: color } = type.type

    const typeTextElement = document.createElement('div')
    typeTextElement.style.color = TYPE_COLORS[color]
    typeTextElement.textContent = type.type.name

    $pokeTypes.appendChild(typeTextElement)
  })
}

const renderPokemonStats = (stats) => {
  $pokeStats.innerHTML = ''

  stats.forEach((stat) => {
    const statElement = document.createElement('div')
    const statElementName = document.createElement('div')
    const statElementAmount = document.createElement('div')

    statElementName.textContent = stat.stat.name
    statElementAmount.textContent = stat.base_stat

    statElement.appendChild(statElementName)
    statElement.appendChild(statElementAmount)
    $pokeStats.appendChild(statElement)
  })
}

const renderNotFound = () => {
  $pokeName.textContent = 'No encontrado'
  $pokeImg.setAttribute('src', 'assets/poke-shadow.png')
  $pokeImg.style.background = '#fff'
  $pokeImg.style.transition = 'all ease 300ms'
  $pokeTypes.innerHTML = ''
  $pokeStats.innerHTML = ''
  $pokeId.textContent = ''
}

// initialize App
const init = () => $form && $form.addEventListener('submit', searchPokemon)

window.addEventListener('DOMContentLoaded', init)
