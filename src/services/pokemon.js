import api from '../api';

export default {
  getPokemonCardsByName: name =>
    fetch(api + `cards?name="${name}"`)
      .then(response => response.json())
      .then(jsonResponse => jsonResponse.cards)
};
