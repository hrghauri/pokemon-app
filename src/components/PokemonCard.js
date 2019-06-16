import React from 'react';

export default function PokemonCard({ pokemonCard, onPokemonCardClick }) {
  return (
    <img
      src={pokemonCard.imageUrl}
      onClick={() => onPokemonCardClick(pokemonCard.id)}
    />
  );
}
