import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export default function PokemonNameSearchBox({
  changePokemonName,
  searchPokemon,
  isDisabled,
  currentSearchPokemonName
}) {
  const onChange = e => {
    e.preventDefault();
    changePokemonName(e.target.value);
  };

  const onSearch = e => {
    e.preventDefault();
    searchPokemon();
  };

  return (
    <form>
      <Paper style={styles.root}>
        <InputBase
          style={styles.input}
          placeholder="Search for your favourite Pokemon"
          inputProps={{ 'aria-label': 'Search for your favourite Pokemon' }}
          onChange={onChange}
          disabled={isDisabled}
          value={currentSearchPokemonName}
        />
        <IconButton
          style={styles.iconButton}
          aria-label="Search"
          type="submit"
          onClick={onSearch}
          disabled={isDisabled || currentSearchPokemonName.length === 0}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  );
}

const styles = {
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
};
