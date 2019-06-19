import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

export default function PokemonCard({ pokemonCard, onPokemonCardClick }) {
  return (
    <div className="pokemon-Card">
      <img
        src={pokemonCard.imageUrl}
        onClick={() => onPokemonCardClick(pokemonCard.id)}
      />
    </div>
  );
}
