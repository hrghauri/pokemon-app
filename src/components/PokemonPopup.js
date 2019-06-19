import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function PokemonPopup({
  handlePopUpClose,
  pokemonCard,
  ...other
}) {
  return (
    <Dialog
      onClose={handlePopUpClose}
      {...other}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle
        id={pokemonCard.id}
        style={{
          textAllign: 'center',
          margin: 'auto',
          color: 'grey',
          textTransform: 'uppercase',
          fontWeight: '300'
        }}
      >
        {pokemonCard.name}
      </DialogTitle>
      <IconButton
        aria-label="Close"
        style={styles.closeButton}
        onClick={handlePopUpClose}
      >
        <CloseIcon />
      </IconButton>
      <Card>
        <CardHeader />

        {pokemonCard.hp && (
          <div style={{ position: 'absolute', left: '320px' }}>
            <span>HP: </span>
            <span>{pokemonCard.hp}</span>
          </div>
        )}
        {pokemonCard.types && (
          <div style={{ position: 'absolute', left: '320px', top: '140px' }}>
            <span>Types: </span>
            {pokemonCard.types.map(type => {
              return <span key={type}>{type} </span>;
            })}
          </div>
        )}
        {pokemonCard.set && (
          <div style={{ position: 'absolute', left: '320px', top: '190px' }}>
            <span>Set: </span>
            <span>{pokemonCard.set}</span>
          </div>
        )}
        {pokemonCard.series && (
          <div style={{ position: 'absolute', left: '320px', top: '240px' }}>
            <span>Series: </span>
            <span>{pokemonCard.series}</span>
          </div>
        )}
        <div>
          <img
            src={pokemonCard.imageUrl}
            style={{ width: '290px', height: '400px', display: 'inline' }}
            alt={pokemonCard.name}
          />
        </div>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {pokemonCard.text &&
            Array.isArray(pokemonCard.text) &&
            pokemonCard.text.length > 0
              ? pokemonCard.text[0]
              : 'No Text Available for this Pokemon.'}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
}

const styles = {
  media: {
    paddingTop: '56.25%' // 16:9
  },
  closeButton: {
    position: 'absolute'
  }
};
