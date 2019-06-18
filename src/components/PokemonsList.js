import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import ListFooter from './ListFooter';

export default class PokemonsList extends Component {
  state = {
    maxPageSize: 10,
    currentPage: 0,
    filteredPokemonCardsList: [],
    filters: {},
    filtersOpen: []
  };

  componentDidMount = () => {
    this._reset();
  };

  _reset = () => {
    if (this.props.pokemonCards.length > 0) {
      const typesFilter = this.props.pokemonCards.reduce(
        (acc, currentPokemonCard) => {
          if (currentPokemonCard.types)
            currentPokemonCard.types.forEach(type => {
              acc[type] = false;
            });
          return acc;
        },
        {}
      );

      const setsFilter = this.props.pokemonCards.reduce(
        (acc, currentPokemonCard) => {
          if (currentPokemonCard.set) acc[currentPokemonCard.set] = false;
          return acc;
        },
        {}
      );

      this.setState({
        currentPage: 1,
        filteredPokemonCardsList: this.props.pokemonCards,
        filters: {
          typesFilter,
          setsFilter
        }
      });
    }
  };

  _getNumberOfPages = dataLength => {
    if (dataLength === 0) return 0;

    const remainder = dataLength % this.state.maxPageSize;
    const quotient = Math.floor(dataLength / this.state.maxPageSize);

    if (remainder === 0) return quotient;
    else return quotient + 1;
  };

  _applyTypesFilter = (filter, pokemonCardsList) => {};

  _applySetsFilter = (filter, pokemonCardsList) => {};

  _applyFilterAndReturnFilteredList = filter => {
    const typesFilteredList = this._applyTypesFilter(
      filter,
      this.state.filteredPokemonCardsList
    );
    const setsFilterList = this._applySetsFilter(filter, typesFilteredList);
    return setsFilterList;
  };

  handlePageSelect = pageNum => {
    this.setState({
      currentPage: pageNum
    });
  };

  handleResetFilters = () => {
    this._reset();
  };

  handleFilter = (filterName, filterType, filterValue) => {
    const filters = this.state.filters;
    filters[filterName][filterType] = filterValue;

    const newfilteredPokemonCardsList = this._applyFilterAndReturnFilteredList(
      filters
    );

    this.setState({
      filters,
      filteredPokemonCardsList: newfilteredPokemonCardsList
    });
  };

  renderTypesFilter = key => {
    return <div key={key} />;
  };

  renderSetsFilter = key => {
    return <div key={key} />;
  };

  renderResetFilter = key => {
    return <div key={key} />;
  };

  renderPokemonCardsList = key => {
    const visiblePokemonCardsList = [];
    const startingIndexInclusive =
      (this.state.currentPage - 1) * this.state.maxPageSize;
    const endingIndexInclusive =
      this.state.currentPage * this.state.maxPageSize - 1;

    for (let i = startingIndexInclusive; i <= endingIndexInclusive; i++) {
      if (this.state.filteredPokemonCardsList[i])
        visiblePokemonCardsList.push(this.state.filteredPokemonCardsList[i]);
    }

    return visiblePokemonCardsList.map(pokemonCard => {
      return (
        <PokemonCard
          pokemonCard={pokemonCard}
          onPokemonCardClick={this.props.onPokemonCardClick}
          key={key + pokemonCard.id}
        />
      );
    });
  };

  renderListFooter = key => {
    const numOfPages = this._getNumberOfPages(
      this.state.filteredPokemonCardsList.length
    );
    if (numOfPages === 0) return null;

    const currentPage = this.state.currentPage;

    return (
      <ListFooter
        key={key}
        onPageSelect={this.handlePageSelect}
        numOfPages={numOfPages}
        currentPage={currentPage}
      />
    );
  };

  render() {
    return (
      <div className="pokemon-cards-list">
        {[
          this.renderSetsFilter(0),
          this.renderTypesFilter(1),
          this.renderResetFilter(2),
          this.renderPokemonCardsList(3),
          this.renderListFooter(4)
        ]}
      </div>
    );
  }
}
