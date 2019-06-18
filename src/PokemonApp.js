import React, { Component } from 'react';

import pokemonService from './services/pokemon';

import ErrorHandlingComponent from './components/ErrorHandlingComponent';
import PokemonNameSearchBox from './components/PokemonNameSearchBox';
import PokemonsList from './components/PokemonsList';
import PokemonPopup from './components/PokemonPopup';

class PokemonApp extends Component {
  state = {
    pokemonCards: [],
    isSearchInProgress: false,
    currentSearchPokemonName: '',
    hasErrorOccured: false,
    error: {},
    currentClickedPokemonCardId: '',
    isPopupOpen: false,
    searchedPokemonTimesNegative: 0 // a Hack to  make sure to completely rerender PokemonList once a search is performed again
  };

  handlePokemonCardOnClick = pokemonCardId => {
    this.setState({
      currentClickedPokemonCardId: pokemonCardId,
      isPopupOpen: true
    });
  };

  handlePopupClose = () => {
    this.setState({
      currentClickedPokemonCardId: '',
      isPopupOpen: false
    });
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
          } else {
            this.setState({
              pokemonCards: cards
            });
          }
        })
        .catch(error => {
          _handleError(error);
        })
        .finally(() => {
          const searchedPokemonTimesNegative =
            this.state.searchedPokemonTimesNegative - 1; // a Hack
          this.setState({
            isSearchInProgress: false,
            searchedPokemonTimesNegative
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
          key={this.state.searchedPokemonTimesNegative} // a Hack
        />
      );
  };

  renderPopUpIfNeccessary = key => {
    if (this.state.isPopupOpen) {
      const [currentPokemonCard] = this.state.pokemonCards.filter(
        pokemonCard => this.state.currentClickedPokemonCardId === pokemonCard.id
      );

      return (
        <PokemonPopup
          handlePopUpClose={this.handlePopupClose}
          pokemonCard={currentPokemonCard}
          key={key}
          open={true}
        />
      );
    } else return null;
  };

  render() {
    return (
      <div className="pokemon-app">
        {[
          this.renderErrorHandlingComponent(1),
          this.renderSearchBox(2),
          this.renderBottom(3),
          this.renderPopUpIfNeccessary(4)
        ]}
      </div>
    );
  }
}

export default PokemonApp;
