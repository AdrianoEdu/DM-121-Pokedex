const getPokemonUrlById = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const getPokemonUrlByName = name => `https://pokeapi.co/api/v2/pokemon/${name}`

const initialKanto = 1, lastKanto = 151;
const initialJohto = 152, lastJohto = 251;
const initialHoen = 252, lastHoen = 386;
const initialSinoh = 387, lastSinoh = 493;
const initialUnova = 494, lastUnova = 649;
const initialKalos = 650, lastKalos = 721;
const initialAlola = 722, lastAlola = 809;
const initialGalar = 810, lastGalar = 905;

const pokeRegions = ["Kanto", "Johto", "Hoen", "Sinoh", "Unova", "Kalos", "Alola", "Galar"];

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
        let li = createPokemon(pokemon);
        console.log(li)
        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = li
    }
}

async function onSearchRegion() {
    const pokedex = document.querySelector(".pokedex");
    removeAllChild(pokedex);

    var pokeRegion = document.getElementById("pokeSearchRegion");

    switch (pokeRegion.value.toLowerCase()) {
        case pokeRegions[0].toLowerCase():
            fetchPokemon(initialKanto, lastKanto);
            break;
        case pokeRegions[1].toLowerCase():
            fetchPokemon(initialJohto, lastJohto);
            break;
        case pokeRegions[2].toLowerCase():
            fetchPokemon(initialHoen, lastHoen);
            break;
        case pokeRegions[3].toLowerCase():
            fetchPokemon(initialSinoh, lastSinoh);
            break;
        case pokeRegions[4].toLowerCase():
            fetchPokemon(initialUnova, lastUnova);
            break;
        case pokeRegions[5].toLowerCase():
            fetchPokemon(initialKalos, lastKalos);
            break;
        case pokeRegions[6].toLowerCase():
            fetchPokemon(initialAlola, lastAlola);
            break;
        case pokeRegions[7].toLowerCase():
            fetchPokemon(initialGalar, lastGalar);
            break;
        default:
            fetchPokemon(initialKanto, lastGalar)
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

const createMoveSetPokemon = (attack) => {
    var li = document.createElement("li");
    var p = document.createElement(p);
    p.innerHTML = attack.name

    li.appendChild(p);

    return li.innerHTML;
}

fetchPokemon(1, 905)