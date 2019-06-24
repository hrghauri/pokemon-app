import React, { Component } from 'react';
import pokemonService from './services/pokemon';
import ErrorHandlingComponent from './components/ErrorHandlingComponent';
import PokemonNameSearchBox from './components/PokemonNameSearchBox';
import PokemonsList from './components/PokemonsList';
import PokemonPopup from './components/PokemonPopup';
import ListFooter from './components/ListFooter';

class PokemonApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonCards: {},
      isSearchInProgress: false,
      currentSearchPokemonName: '',
      lastPokemonSearched: '',
      hasErrorOccured: false,
      error: {},
      currentClickedPokemonCardId: '',
      isPopupOpen: false,
      searchedPokemonTimesNegative: 0, // a Hack to  make sure to completely rerender PokemonList once a search is performed again
      serverPageSize: 0,
      serverCurrentCount: 0,
      clientMaxPageSize: 8,
      clientCurrentPage: 0,
      clientTotalPages: 0
    };
  }

  handlePokemonCardOnClick = pokemonCardId => {
    this.setState({
      currentClickedPokemonCardId: pokemonCardId,
      isPopupOpen: true
    });
  };

  handleClientPageSelect = async clientPageNum => {
    const serverPages = this._getServerPagesForClientPage(clientPageNum);
    const downloadPokemonCardsPromises = [];

    serverPages.forEach(serverPage => {
      if (!this.state.pokemonCards[serverPage])
        downloadPokemonCardsPromises.push(async () => {
          const result = await pokemonService.getPokemonCardsByName(
            this.state.lastPokemonSearched,
            serverPage
          );
          const oldPokemonCards = this.state.pokemonCards;
          oldPokemonCards[serverPage] = result.cards;
          await this._setStateAsync({
            pokemonCards: oldPokemonCards
          });
        });
    });

    await Promise.all(
      downloadPokemonCardsPromises.map(promiseFunc => promiseFunc())
    );
    await this._setStateAsync({
      clientCurrentPage: clientPageNum
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

  _setStateAsync = updater =>
    new Promise(resolve => this.setState(updater, resolve));

  _handleError = error => {
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

  _getPokemonCardAddress = clientIndex => {
    var serverKey = Math.ceil(clientIndex / this.state.serverPageSize);
    if (serverKey === 0) serverKey = 1;
    const offset = clientIndex % this.state.serverPageSize;

    return [serverKey, offset];
  };

  _getServerPagesForClientPage = (
    clientPage,
    serverPageSize,
    clientPageSize
  ) => {
    const serverPages = [];

    const startingIndexServerInclusive = (clientPage - 1) * clientPageSize + 1;
    const endingIndexServerInclusive = clientPage * clientPageSize;

    const serverPageForStartingIndex = Math.ceil(
      startingIndexServerInclusive / serverPageSize
    );
    const serverPageForEndingIndex = Math.ceil(
      endingIndexServerInclusive / serverPageSize
    );

    if (serverPageForEndingIndex === serverPageForStartingIndex)
      serverPages.push(serverPageForEndingIndex);
    else
      for (
        let i = serverPageForStartingIndex;
        i <= serverPageForEndingIndex;
        i++
      ) {
        serverPages.push(i);
      }

    return serverPages;
  };

  getPokemonCardsByServerPage = async page => {
    const result = await pokemonService.getPokemonCardsByName(
      this.state.lastPokemonSearched,
      page
    );
    return result.cards;
  };

  _getNumberOfClientPages = dataLength => {
    const remainder = dataLength % this.state.clientMaxPageSize;
    const quotient = Math.floor(dataLength / this.state.clientMaxPageSize);

    if (remainder === 0) return quotient;
    else return quotient + 1;
  };

  handleSearchPokemon = async () => {
    await this._setStateAsync({ isSearchInProgress: true });
    try {
      const result = await pokemonService.getPokemonCardsByName(
        this.state.currentSearchPokemonName,
        1
      );
      if (result.cards.length == 0) {
        let error = new Error('No pokemons found by this name.');
        this._handleError(error);
      } else {
        const clientTotalPages = this._getNumberOfClientPages(
          result.totalCount
        );

        await this._setStateAsync({
          pokemonCards: { '1': result.cards },
          serverPageSize: result.pageSize,
          serverCurrentCount: result.currentCount,
          lastPokemonSearched: this.state.currentSearchPokemonName,
          clientCurrentPage: 1,
          clientTotalPages
        });
      }
    } catch (error) {
      this._handleError(error);
    }
    const searchedPokemonTimesNegative =
      this.state.searchedPokemonTimesNegative - 1; // a Hack
    await this._setStateAsync({
      isSearchInProgress: false,
      searchedPokemonTimesNegative
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
    if (Object.keys(this.state.pokemonCards).length === 0)
      return (
        <div key={key} className="bottom-text">
          Search for your favourite Pokemon!
        </div>
      );
    else {
      const visiblePokemonCardsList = [];
      const startingIndexInclusive =
        (this.state.clientCurrentPage - 1) * this.state.clientMaxPageSize;
      const endingIndexInclusive =
        this.state.clientCurrentPage * this.state.clientMaxPageSize - 1;

      for (let i = startingIndexInclusive; i <= endingIndexInclusive; i++) {
        const clientAddress = this._getPokemonCardAddress(i);

        if (
          this.state.pokemonCards[clientAddress[0]] &&
          this.state.pokemonCards[clientAddress[0]][clientAddress[1]]
        )
          visiblePokemonCardsList.push(
            this.state.pokemonCards[clientAddress[0]][clientAddress[1]]
          );
      }

      //this.state.pokemonCards[this.state.clientCurrentPage]

      return (
        <div key={this.state.searchedPokemonTimesNegative}>
          <PokemonsList
            pokemonCards={visiblePokemonCardsList}
            onPokemonCardClick={this.handlePokemonCardOnClick}
          />
          <ListFooter
            onPageSelect={this.handleClientPageSelect}
            numOfPages={this.state.clientTotalPages}
            currentPage={this.state.clientCurrentPage}
          />
        </div>
      );
    }
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
