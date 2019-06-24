import React from 'react';
import PokemonCard from './PokemonCard';
import Grid from '@material-ui/core/Grid';

export default function PokemonsList({ pokemonCards, onPokemonCardClick }) {
  return (
    <div className="pokemon-cards-list">
      <Grid container spacing={2}>
        {pokemonCards.map(pokemonCard => {
          return (
            <PokemonCard
              pokemonCard={pokemonCard}
              onPokemonCardClick={onPokemonCardClick}
              key={pokemonCard.id}
            />
          );
        })}
      </Grid>
    </div>
  );
}
