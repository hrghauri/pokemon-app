import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

export default function PokemonCard({ pokemonCard, onPokemonCardClick }) {
  return (
    <Grid item xs={3} style={{ textAlign: 'center' }}>
      <div className="pokemon-Card">
        <img
          src={pokemonCard.imageUrl}
          onClick={() => onPokemonCardClick(pokemonCard.id)}
        />
      </div>
    </Grid>
  );
}
