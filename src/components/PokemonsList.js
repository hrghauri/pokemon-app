import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import ListFooter from './ListFooter';

export default class PokemonsList extends Component {
  state = {
    maxPageSize: 10,
    currentPage: 0,
    filteredPokemonCardsList: this.props.pokemonCards.slice(),
    filters: {}
  };

  componentDidMount = () => {
    if (this.state.filteredPokemonCardsList.length > 0)
      this.setState({
        currentPage: 1
      });
  };

  handlePageSelect = pageNum => {
    this.setState({
      currentPage: pageNum
    });
  };

  _getNumberOfPages = dataLength => {
    if (dataLength === 0) return 0;

    const remainder = dataLength % this.state.maxPageSize;
    const quotient = Math.floor(dataLength / this.state.maxPageSize);

    if (remainder === 0) return quotient;
    else return quotient + 1;
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
        {[this.renderPokemonCardsList(0), this.renderListFooter(1)]}
      </div>
    );
  }
}
