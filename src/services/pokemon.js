import api from '../api';

export default {
  getPokemonCardsByName: async (name, page) => {
    const response = await fetch(api + `cards?name=${name}&page=${page}`);
    const headers = response.headers;

    for (var pair of headers.entries()) {
      if (pair[0] === 'count') var currentCount = pair[1];
      if (pair[0] === 'page-size') var pageSize = pair[1];
      if (pair[0] === 'total-count') var totalCount = pair[1];
    }
    const jsonResponse = await response.json();

    return {
      cards: jsonResponse.cards,
      pageSize,
      totalCount,
      currentCount
    };
  },

  getPokemonCardsByExactName: name =>
    fetch(api + `cards?name="${name}"`)
      .then(response => response.json())
      .then(jsonResponse => jsonResponse.cards)
};
