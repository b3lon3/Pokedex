const pokemonNome = document.querySelector('#pokemon_nome');
const pokemonId = document.querySelector('#pokemon_id');
const pokemonGif = document.querySelector('#pokemon_gif');

const form = document.querySelector('#form');
const input = document.querySelector('#search');
const buttonPrev = document.querySelector('#btn-prev');
const buttoNext = document.querySelector('#btn-next');

let searchPokemon = 1;

const pegarPokemon = async (pokemon) => {
    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    console.log(APIResposta)

    if (APIResposta.status == 200) {
        const dados = await APIResposta.json();
        return dados;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNome.innerHTML = 'loading...';
    pokemonId.innerHTML = '';

    const dados = await pegarPokemon(pokemon);

    if (dados) {
        pokemonGif.style.display = 'block'
        pokemonNome.innerHTML = dados.name;
        pokemonId.innerHTML = dados.id;
        pokemonGif.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = dados.id;
    } else {
        pokemonGif.style.display = 'none';
        pokemonNome.innerHTML = "Not found ...";
        pokemonId.innerHTML = '';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

function prev() {
    if (searchPokemon > 1) {
        searchPokemon --;
        renderPokemon(searchPokemon);
    }
}
function next() {
    searchPokemon++;
    renderPokemon(searchPokemon);
}

renderPokemon(searchPokemon);