import React from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonsList({ pokemonCards, onPokemonCardClick }) {
  const renderPokemonCardsList = () => {
    return pokemonCards.map(pokemonCard => {
      return (
        <PokemonCard
          pokemonCard={pokemonCard}
          onPokemonCardClick={onPokemonCardClick}
          key={pokemonCard.id}
        />
      );
    });
  };

  return <div>{renderPokemonCardsList()}</div>;
}
