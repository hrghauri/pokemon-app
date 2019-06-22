import React, { Component } from 'react';
import Background from './images/light-grey-terrazzo.png';
import pokemonService from './services/pokemon';
import ErrorHandlingComponent from './components/ErrorHandlingComponent';
import PokemonNameSearchBox from './components/PokemonNameSearchBox';
import PokemonsList from './components/PokemonsList';
import PokemonPopup from './components/PokemonPopup';

class PokemonApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonCards: [],
      isSearchInProgress: false,
      currentSearchPokemonName: '',
      hasErrorOccured: false,
      error: {},
      currentClickedPokemonCardId: '',
      isPopupOpen: false,
      searchedPokemonTimesNegative: 0 // a Hack to  make sure to completely rerender PokemonList once a search is performed again
    };
    document.body.style = 'background-image:' + `url(${Background})`;
  }

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

  handleSearchPokemon = async () => {
    const _setStateAsync = updater =>
      new Promise(resolve => this.setState(updater, resolve));

    const _cleanup = () => {
      const searchedPokemonTimesNegative =
        this.state.searchedPokemonTimesNegative - 1; // a Hack
      this.setState({
        isSearchInProgress: false,
        searchedPokemonTimesNegative
      });
    };

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

    await _setStateAsync({ isSearchInProgress: true });
    const result = await pokemonService.getPokemonCardsByName(
      this.state.currentSearchPokemonName,
      1
    );

    const cards = result.cards;
    const totalCount = result.totalCount;
    const currentCount = result.currentCount;
    const pageSize = result.pageSize;

    if (currentCount < totalCount) {
      const totalPages = Math.ceil(totalCount / pageSize);
      const allPromises = [];

      for (let i = 2; i <= totalPages; i++) {
        allPromises.push(() => {
          return pokemonService
            .getPokemonCardsByName(this.state.currentSearchPokemonName, i)
            .then(result => {
              const moreCards = result.cards;
              moreCards.forEach(card => {
                cards.push(card);
              });
            });
        });
      }

      try {
        await Promise.all(allPromises.map(promiseFunc => promiseFunc()));
        await _setStateAsync({
          pokemonCards: cards
        });
      } catch (error) {
        _handleError(error);
      }
      _cleanup();
    } else {
      if (cards.length === 0) {
        let error = new Error('No pokemons found by this name.');
        _handleError(error);
      } else {
        await _setStateAsync({
          pokemonCards: cards
        });
      }
      _cleanup();
    }
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
      <div className="pokemon-search-text-box" key={key}>
        <PokemonNameSearchBox
          key={key}
          currentSearchPokemonName={this.state.currentSearchPokemonName}
          isDisabled={this.state.isSearchInProgress}
          searchPokemon={this.handleSearchPokemon}
          changePokemonName={this.handleChangePokemonName}
        />
      </div>
    );
  };

  renderBottom = key => {
    if (this.state.pokemonCards.length === 0)
      return (
        <div key={key} className="bottom-text">
          Search for your favourite Pokemon!
        </div>
      );
    else
      return (
        <PokemonsList
          pokemonCards={this.state.pokemonCards}
          onPokemonCardClick={this.handlePokemonCardOnClick}
          key={this.state.searchedPokemonTimesNegative} // a Hack
          isSearchInProgress={this.state.isSearchInProgress}
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
        <h1>Pokemon Search app</h1>
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
