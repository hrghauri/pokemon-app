import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export default function PokemonNameSearchBox({
  searchPokemonName,
  isDisabled,
  searchPokemon
}) {
  const [currentPokemonName, setCurrentPokemonName] = useState(
    searchPokemonName
  );

  console.log('SearchBox: searchPokemonName', searchPokemonName);
  console.log('SearchBox: currentPokemonName', currentPokemonName);

  const useStyles = makeStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400
    },
    input: {
      marginLeft: 8,
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  });
  const classes = useStyles();

  const onSearch = e => {
    e.preventDefault();
    searchPokemon(currentPokemonName);
  };

  return (
    <form>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search for your favourite Pokemon"
          inputProps={{ 'aria-label': 'Search for your favourite Pokemon' }}
          onChange={e => setCurrentPokemonName(e.target.value)}
          disabled={isDisabled}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          type="submit"
          onClick={onSearch}
          disabled={isDisabled}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  );
}
