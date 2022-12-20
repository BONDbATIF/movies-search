import axios from "axios";
import romanize from "romanize";

const state = {
  moviesList: [
    { episode_id: 4, title: "IV - A New Hope", release_date: "1977-05-25" },
    { episode_id: 6, title: "IV - A old Hope", release_date: "1975-12-01" },
    { episode_id: 8, title: "IV - A gold Hope", release_date: "2000-05-21" },
    { episode_id: 2, title: "IV - The Rock", release_date: "1990-05-05" },
    { episode_id: 1, title: "IV - I Love You", release_date: "1972-03-15" },
    { episode_id: 9, title: "IV - My Life My Way", release_date: "1977-05-23" },
    { episode_id: 7, title: "IV - Ping Me", release_date: "1977-09-25" },
  ],
};

const getters = {
  showMoviesList: (state) => {
    let filteredList = [];
    state.moviesList.forEach((list) => {
      filteredList.push({
        episode_id: list.episode_id,
        episode_id_roman :romanize(list.episode_id),
        title:  list.title,
        release_date: list.release_date,
      });
    });
    return filteredList;
  },
};

const actions = {
  async fetchMoviesList({ commit }) {
    const response = await axios.get(
      "https://swapi.dev/api/films/?format=json"
    );
    console.log(response.data.results);
    commit("setMoviesList", response.data.results);
  },
};

const mutations = {
  setMoviesList: (state, moviesList1) => (state.moviesList = moviesList1),
  setSortBy: (state, sortBy) => (state.sortBy = sortBy),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
