import React, { useState } from 'react';
import pokemonService from './services/pokemon';
import PokemonCard from './components/PokemonCard';

import PokemonNameSearchBox from './components/PokemonNameSearchBox';

function PokemonApp() {
  const [pokemons, setPokemons] = useState([]);
  const [isSearchInProgress, setSearchInProgress] = useState(false);
  const [searchPokemonName, setSearchPokemonName] = useState('');

  const searchPokemon = pokemonName => {
    console.log('Pokemon App: name Returned from the searchBox: ', pokemonName);
    setSearchInProgress(true);
    setTimeout(() => {
      if (pokemonName.length < 2) {
        console.log('Pokemon App: Reseting searchPokemonName');
        setSearchPokemonName('');
      }

      setSearchInProgress(false);
    }, 3000);
  };

  const renderSearchBox = key => {
    console.log(
      'Pokemon App: Rendering Search Box with searchPokemonName as: ',
      searchPokemonName
    );

    return (
      <PokemonNameSearchBox
        key={key}
        searchPokemonName={searchPokemonName}
        isDisabled={isSearchInProgress}
        searchPokemon={searchPokemon}
      />
    );
  };

  const renderBottom = key => {
    if (pokemons.length === 0)
      return <div key={key}>Search for your favourite Pokemon</div>;
    else
      return pokemons.forEach(pokemon => {
        return <PokemonCard pokemon={pokemon} />;
      });
  };

  return (
    <div className="PokemonApp">{[renderSearchBox(1), renderBottom(2)]}</div>
  );
}

export default PokemonApp;
