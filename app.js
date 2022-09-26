const getPokemonUrlById = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const getPokemonUrlByName = name => `https://pokeapi.co/api/v2/pokemon/${name}`

const fetchPokemon = (begin, last) => {
    const pokemonPromises = []
    for (let i = begin; i <= last; i++) {
        pokemonPromises.push(fetch(getPokemonUrlById(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const listPokemons = pokemons.reduce((accumulator, pokemon) => {
                accumulator += createPokemon(pokemon)
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = listPokemons            
    })  
}

const getPokemonIdFormatted = id => {
    if (id < 10) {
        return `#00${id}`
    }
    else if (id < 100) {
        return `#0${id}`
    }
    else {
        return `#${id}`
    }
}

function removeAllChild(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
}

async function onSearch() {
    const pokedex = document.querySelector(".pokedex");
    removeAllChild(pokedex);
  
    var pokeName = document.getElementById("pokeSearch");
    if (pokeName.value === "") {
        await onSearchRegion()
    } else {
      const pokemon = await fetch(getPokemonUrlByName(pokeName.value.toLowerCase())).then(response => response.json())
      let li= createPokemon(pokemon);
      console.log(li)
      const ul = document.querySelector('[data-js="pokedex"]')
      ul.innerHTML = li
    }
}

async function onSearchRegion()
{
    const pokedex = document.querySelector(".pokedex");
    removeAllChild(pokedex);

    var pokeRegion = document.getElementById("pokeSearchRegion");

    if (pokeRegion.value === "") {
        fetchPokemon(1,905)
    }
    else if (pokeRegion.value === "Kanto" || pokeRegion.value === "kanto" || pokeRegion.value === "KANTO") {
        fetchPokemon(1,151)
    } 
    else if (pokeRegion.value === "Johto" || pokeRegion.value === "johto" || pokeRegion.value === "JOHTO") {
        fetchPokemon(152,251);
    }
    else if (pokeRegion.value === "Hoenn" || pokeRegion.value === "hoenn" || pokeRegion.value === "HOENN") {
        fetchPokemon(252,386);
    }
    else if (pokeRegion.value === "Sinnoh" || pokeRegion.value === "sinnoh" || pokeRegion.value === "SINNOH") {
        fetchPokemon(387,493);
    }
    else if (pokeRegion.value === "Unova" || pokeRegion.value === "unova" || pokeRegion.value === "UNOVA") {
        fetchPokemon(494,649);
    }
    else if (pokeRegion.value === "Kalos" || pokeRegion.value === "kalos" || pokeRegion.value === "KALOS") {
        fetchPokemon(650,721);
    }
    else if (pokeRegion.value === "Alola" || pokeRegion.value === "alola" || pokeRegion.value === "ALOLA") {
        fetchPokemon(722,809);
    }
    else if (pokeRegion.value === "Galar" || pokeRegion.value === "galar" || pokeRegion.value === "GALAR") {
        fetchPokemon(810,905);
    }
}

const createPokemon = (pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)
    const moveSet = pokemon.moves;
    const typePokemon = types[0];
    const className = "card " + typePokemon;

    var liHead = document.createElement("li");

    var li = document.createElement("li");
    li.className = className;

    var p = document.createElement("p");
    p.className = "card-id";
    p.innerHTML = getPokemonIdFormatted(pokemon.id)

    var image = document.createElement("img");
    image.className = "card-image";
    image.alt = pokemon.name;
    image.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png";

    var h2 = document.createElement("h2");
    h2.className = "card-title";
    h2.innerHTML = pokemon.name;

    li.appendChild(p);
    li.appendChild(image);
    
    li.appendChild(h2);
    liHead.appendChild(li);

    return liHead.innerHTML;
}

const createMoveSetPokemon = (attack) => 
{
    var li = document.createElement("li");
    var p = document.createElement(p);
    p.innerHTML = attack.name

    li.appendChild(p);

    return li.innerHTML;
}

fetchPokemon(1,905)