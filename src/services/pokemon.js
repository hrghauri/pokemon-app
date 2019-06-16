import api from '../api';

export default {
  getPokemonCardsByName: name =>
    fetch.get(api + `cards?name=${name}`).then(response => response.json())
      .cards
};
