import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import ListFooter from './ListFooter';
import FilteringComponent from './FilteringComponent';
import Button from '@material-ui/core/Button';

export default class PokemonsList extends Component {
  constructor(props) {
    super(props);
    const possibleNewState = this._getResetState();
    this.state = { maxPageSize: 8, ...possibleNewState };
  }

  _getResetState = () => {
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

      return {
        currentPage: 1,
        filteredPokemonCardsList: this.props.pokemonCards,
        filters: {
          typesFilter,
          setsFilter
        },
        filtersOpen: [],
        anchorEL: {}
      };
    } else
      return {
        currentPage: 0,
        filteredPokemonCardsList: [],
        filters: {},
        filtersOpen: [],
        anchorEL: {}
      };
  };

  _reset = () => {
    this.setState(this._getResetState());
  };

  _getNumberOfPages = dataLength => {
    if (dataLength === 0) return 0;

    const remainder = dataLength % this.state.maxPageSize;
    const quotient = Math.floor(dataLength / this.state.maxPageSize);

    if (remainder === 0) return quotient;
    else return quotient + 1;
  };

  _applyTypesFilter = (filter, pokemonCardsList) => {
    const allTypeFilterKeys = Object.keys(filter.typesFilter);

    const allAppliedTypeFilters = allTypeFilterKeys.reduce(
      (acc, currentTypeFilterKey) => {
        const currentFilterValue = filter.typesFilter[currentTypeFilterKey];
        if (currentFilterValue === true) {
          acc.push(currentTypeFilterKey);
        }
        return acc;
      },
      []
    );

    if (allAppliedTypeFilters.length === 0) return pokemonCardsList;
    else {
      const newfilteredPokemonCardsList = pokemonCardsList.reduce(
        (acc, currentPokemonCard) => {
          const currentPokemonCardTypes = currentPokemonCard.types;
          let match = true;
          for (let i = 0; i < allAppliedTypeFilters.length; i++) {
            if (currentPokemonCardTypes) {
              if (!currentPokemonCardTypes.includes(allAppliedTypeFilters[i])) {
                match = false;
                break;
              }
            } else {
              match = false;
              break;
            }
          }

          if (match) acc.push(currentPokemonCard);

          return acc;
        },
        []
      );

      return newfilteredPokemonCardsList;
    }
  };

  _applySetsFilter = (filter, pokemonCardsList) => {
    const allSetFilterKeys = Object.keys(filter.setsFilter);
    const allAppliedSetFilters = allSetFilterKeys.reduce(
      (acc, currentSetFilterKey) => {
        const currentFilterValue = filter.setsFilter[currentSetFilterKey];
        if (currentFilterValue === true) {
          acc.push(currentSetFilterKey);
        }
        return acc;
      },
      []
    );

    if (allAppliedSetFilters.length === 0) return pokemonCardsList;
    else {
      const newfilteredPokemonCardsList = pokemonCardsList.reduce(
        (acc, currentPokemonCard) => {
          const currentPokemonCardSet = currentPokemonCard.set;
          if (allAppliedSetFilters.includes(currentPokemonCardSet))
            acc.push(currentPokemonCard);
          return acc;
        },
        []
      );
      console.log(newfilteredPokemonCardsList);
      return newfilteredPokemonCardsList;
    }
  };

  _applyFilterAndReturnFilteredList = filter => {
    const typesFilteredList = this._applyTypesFilter(
      filter,
      this.props.pokemonCards
    );

    //Set Filter feature is broken; will fix it later
    // const setsFilterList = this._applySetsFilter(filter, typesFilteredList);
    return typesFilteredList;
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
    filters[filterName + 'sFilter'][filterType] = filterValue;

    const newfilteredPokemonCardsList = this._applyFilterAndReturnFilteredList(
      filters
    );

    this.setState({
      filters,
      filteredPokemonCardsList: newfilteredPokemonCardsList,
      currentPage: 1
    });
  };

  handleFilterClose = filterName => {
    const index = this.state.filtersOpen.indexOf(filterName);
    if (index !== -1) {
      this.state.filtersOpen.splice(index, 1);
      this.setState({
        filtersOpen: this.state.filtersOpen
      });
    }
  };

  handleFilterOpen = (filterName, e) => {
    const newFiltersOpen = this.state.filtersOpen;
    newFiltersOpen.push(filterName);
    const anchorEL = e.currentTarget;

    this.setState({
      filtersOpen: newFiltersOpen,
      anchorEL
    });
  };

  renderTypesFilter = key => {
    const allTypeFilterKeys = Object.keys(this.state.filters.typesFilter);
    const allAppliedTypeFilters = allTypeFilterKeys.reduce(
      (acc, currentTypeFilterKey) => {
        const currentFilterValue = this.state.filters.typesFilter[
          currentTypeFilterKey
        ];
        if (currentFilterValue === true) {
          acc.push(currentTypeFilterKey);
        }
        return acc;
      },
      []
    );

    if (this.state.filtersOpen.includes('type')) {
      return (
        <React.Fragment key={key}>
          <FilteringComponent
            filterName={'type'}
            allFilteringValues={Object.keys(this.state.filters.typesFilter)}
            selectedFilteringValues={allAppliedTypeFilters}
            onFilterValueSelection={this.handleFilter}
            onFilterClose={this.handleFilterClose}
            open={true}
            anchorEL={this.state.anchorEL}
          />

          <Button key={key} variant="contained" disabled>
            Type Filter
          </Button>
        </React.Fragment>
      );
    } else
      return (
        <Button
          key={key}
          variant="contained"
          onClick={e => this.handleFilterOpen('type', e)}
        >
          Type Filter
        </Button>
      );
  };

  renderSetsFilter = key => {
    const allSetFilterKeys = Object.keys(this.state.filters.setsFilter);
    const allAppliedSetFilters = allSetFilterKeys.reduce(
      (acc, currentSetFilterKey) => {
        const currentFilterValue = this.state.filters.setsFilter[
          currentSetFilterKey
        ];
        if (currentFilterValue === true) {
          acc.push(currentSetFilterKey);
        }
        return acc;
      },
      []
    );

    if (this.state.filtersOpen.includes('set')) {
      return (
        <React.Fragment key={key}>
          <FilteringComponent
            filterName={'set'}
            allFilteringValues={Object.keys(this.state.filters.setsFilter)}
            selectedFilteringValues={allAppliedSetFilters}
            onFilterValueSelection={this.handleFilter}
            onFilterClose={this.handleFilterClose}
            open={true}
            anchorEL={this.state.anchorEL}
          />
          <Button key={key} variant="contained" disabled>
            Set Filter
          </Button>
        </React.Fragment>
      );
    } else
      return (
        <Button
          key={key}
          variant="contained"
          onClick={e => this.handleFilterOpen('set', e)}
        >
          Set Filter
        </Button>
      );
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

    return (
      <div key={key} className="pokemon-cards-list">
        {visiblePokemonCardsList.map(pokemonCard => {
          return (
            <PokemonCard
              pokemonCard={pokemonCard}
              onPokemonCardClick={this.props.onPokemonCardClick}
              key={pokemonCard.id}
            />
          );
        })}
      </div>
    );
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
      <div>
        {[
          //Set Filter feature is broken; will fix it later
          // this.renderSetsFilter(0),
          this.renderTypesFilter(1),
          this.renderResetFilter(2),
          this.renderPokemonCardsList(3),
          this.renderListFooter(4)
        ]}
      </div>
    );
  }
}
