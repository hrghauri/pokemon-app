import React, { Component } from 'react';
import PokemonsList from './components/PokemonsList';
import PokemonNameSearchBox from './components/PokemonNameSearchBox';
import ErrorHandlingComponent from './components/ErrorHandlingComponent';

import pokemonService from './services/pokemon';

class PokemonApp extends Component {
  state = {
    pokemonCards: [],
    isSearchInProgress: false,
    currentSearchPokemonName: '',
    hasErrorOccured: false,
    error: {}
  };

  handlePokemonCardOnClick = pokemonCardId => {
    console.log(pokemonCardId);
  };

  handleChangePokemonName = pokemonName => {
    this.setState({
      currentSearchPokemonName: pokemonName
    });
  };

  handleSearchPokemon = () => {
    const _handleError = error => {
      this.setState(
        {
          hasErrorOccured: true,
          error
        },
        () => {
          setTimeout(() => {
            this.setState({
              hasErrorOccured: false,
              error: {}
            });
          }, 2500);
        }
      );
    };

    this.setState({ isSearchInProgress: true }, () => {
      pokemonService
        .getPokemonCardsByName(this.state.currentSearchPokemonName)
        .then(cards => {
          if (cards.length === 0) {
            let error = new Error('No pokemons found by this name.');
            _handleError(error);
          } else
            this.setState({
              pokemonCards: cards
            });
        })
        .catch(error => {
          _handleError(error);
        })
        .finally(() => {
          this.setState({
            isSearchInProgress: false
          });
        });
    });
  };

  renderErrorHandlingComponent = key => {
    return (
      <ErrorHandlingComponent
        hasErrorOccured={this.state.hasErrorOccured}
        error={this.state.error}
        key={key}
      />
    );
  };

  renderSearchBox = key => {
    return (
      <PokemonNameSearchBox
        key={key}
        currentSearchPokemonName={this.state.currentSearchPokemonName}
        isDisabled={this.state.isSearchInProgress}
        searchPokemon={this.handleSearchPokemon}
        changePokemonName={this.handleChangePokemonName}
      />
    );
  };

  renderBottom = key => {
    if (this.state.pokemonCards.length === 0)
      return <div key={key}>Search for your favourite Pokemon</div>;
    else
      return (
        <PokemonsList
          pokemonCards={this.state.pokemonCards}
          onPokemonCardClick={this.handlePokemonCardOnClick}
          key={key}
        />
      );
  };

  render() {
    return (
      <div className="PokemonApp">
        {[
          this.renderErrorHandlingComponent(1),
          this.renderSearchBox(2),
          this.renderBottom(3)
        ]}
      </div>
    );
  }
}

export default PokemonApp;
