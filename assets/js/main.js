const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151; //numero maximo de pokemons

const limit = 12; //numero padrão de pokemons sendo mostrada na tela inicial

let offset = 0; // offset é o ponto de partida da lista total de pokemons.

// Função que recebe um pokemon e cria um card sobre ele:
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    // coloca os pokemons vindos da api em um array.
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join(''); // a função map() itera sobre cada pokemon do array.
        pokemonList.innerHTML += newHtml; //Adiciona o conteudo HTML gerado ao conteudo ja existente.
    })
}

loadPokemonItens(offset, limit);

// Adiciona um observador de eventos sobre o botão:
loadMoreButton.addEventListener('click', () => {
    offset += limit; // Ao clicar no botão é mostrado na tela um pokemon até atingir o limite estabelecido.
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton); // Aqui, caso cheguemos no limite de 151 pokemons o botão será removido.
    } else {
        loadPokemonItens(offset, limit);
    }
})