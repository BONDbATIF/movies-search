<template>
  <div>
    <select name="sortBy" id="select" v-model="sortBy">
      <option value="Episode">Episode</option>
      <option value="Release_date">Release date</option>
    </select>
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button class="dropdown-item" type="button">Action</button>
      <button class="dropdown-item" type="button">Another action</button>
      <button class="dropdown-item" type="button">Something else here</button>
    </div>
</div>
    <input
      class="search-movie"
      type="search"
      v-model="searchQuery"
      placeholder="Search..."
    />
    <div
      class="item fruit"
      v-for="movieList in showMoviesListItems"
      :key="movieList"
    >
      <ul>
        <li>
          EPISODE {{ movieList.episode_id }} Episode {{movieList.episode_id_roman}} - {{ movieList.title }}
          {{ movieList.release_date }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import romanize from 'romanize';

export default {
  name: "HelloWorld",
  props: {
    
  },
  data() {
    return {
      searchQuery: "",
      sortBy: "",
    };
  },
  computed: {
    ...mapState(["moviesList"]),
    ...mapGetters(["showMoviesList"]),

    showMoviesListItems() {
      let filteredMoviesList = this.showMoviesList;

      if (this.searchQuery !== "" && this.searchQuery) {
        filteredMoviesList = filteredMoviesList.filter((item) => {
          console.log(item.title)
          return item.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
      }

      if (this.sortBy === "Episode") {

        filteredMoviesList = filteredMoviesList.sort((a, b) => {
          return a.episode_id - b.episode_id;
        });
      } else if (this.sortBy === "Release_date") {

        filteredMoviesList = filteredMoviesList.sort((a, b) => {
          return new Date(a.release_date) - new Date(b.release_date);
        });
      }

      return filteredMoviesList;
    },

    getRomanNumber:()=>romanize()
  },
  methods: {
    
    ...mapMutations(["setSortBy"]),
    ...mapActions(["fetchMoviesList"]),
  },

   created(){
  
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,head{
  background-color: white;
}
.search-movie{
  background-color: lightgray;
  padding:3px;
}
th,td{
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #DDD;
}
</style>
