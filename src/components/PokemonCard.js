import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function PokemonCard({ pokemonCard, onPokemonCardClick }) {
  return (
    <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }}>
      <div className="pokemon-Card">
        <img
          src={pokemonCard.imageUrl}
          onClick={() => onPokemonCardClick(pokemonCard.id)}
          alt={pokemonCard.name}
        />
      </div>
    </Grid>
  );
}
