import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
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
    <Dialog onClose={handlePopUpClose} {...other}>
      <DialogTitle id={pokemonCard.id}>{pokemonCard.id}</DialogTitle>
      <IconButton
        aria-label="Close"
        style={styles.closeButton}
        onClick={handlePopUpClose}
      >
        <CloseIcon />
      </IconButton>
      <Card>
        <CardHeader />
        <CardMedia image={pokemonCard.imageUrl} style={styles.media} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
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
