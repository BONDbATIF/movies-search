<template>
  <div>
    <div class="maindivStyles">
      <div class="selectStyles">
        <select name="sortBy" id="select" v-model="sortBy">
          <option value="" disabled selected>Sort by...</option>
          <option value="Episode">Episode</option>
          <option value="Release_date">Release date</option>
        </select>
      </div>
      <div>
        <input
          class="search-movie"
          type="search"
          v-model="searchQuery"
          placeholder="Search..."
        />
      </div>
    </div>
    <div>
      <div class="inline br floatleft">
        <div
        class="item"
        v-for="movieList in showMoviesListItems"
        :key="movieList">
        <ul class="mb0">
          <li class="table" @click="showDetails(movieList)">
            <div class="inline mr16 fnt500 fnt12">
              EPISODE {{ movieList.episode_id }}
            </div>
            <div class="inline mr8 fnt500">
              Episode {{ movieList.episode_id_roman }} -
            </div>
            <div class="inline fnt500 width">{{ movieList.title }}</div>
            <div class="inline mr8">{{ movieList.release_date }}</div>
          </li>
        </ul>
      </div>
      </div>
      <div class="block" v-if="isMovieListClicked"> 
        {{showDiscription.fullTitle}}<br/>
        {{showDiscription.discription}}<br/>
        Director {{showDiscription.director}}
      </div>
      <div v-else class="block">No movie selected.</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import romanize from "romanize";

export default {
  name: "MoviesSearch",
  props: {},
  data() {
    return {
      searchQuery: "",
      sortBy: "",
      isMovieListClicked:false,
      showDiscription:{
        discription:"",
        director:""
      }
    };
  },
  computed: {
    ...mapState(["moviesList"]),
    ...mapGetters(["showMoviesList"]),
    showMoviesListItems() {
      let filteredMoviesList = this.showMoviesList;
      if (this.searchQuery !== "" && this.searchQuery) {
        filteredMoviesList = filteredMoviesList.filter((item) => {
          console.log(item.title);
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
      console.log(this.moviesList);

      return filteredMoviesList;
    },

    getRomanNumber: () => romanize(),
  },
  methods: {
    showDetails(movieList){
      this.isMovieListClicked=true;
      const findClickedMovie=this.$store.state.moviesearch.moviesList.filter((movies)=>movies.title===movieList.title)[0];
      this.showDiscription.fullTitle ='Episode '+ movieList.episode_id_roman+" "+movieList.title
      this.showDiscription.discription=findClickedMovie.opening_crawl;
      this.showDiscription.director=findClickedMovie.director
    },
    ...mapMutations(["setSortBy"]),
    ...mapActions(["fetchMoviesList"]),
  },

  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,
head {
  background-color: white;
}
.search-movie {
  border-radius: 5px;
  padding: 3px;
  display: inline;
  width: 45%;
}
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.selectStyles {
  display: inline;
  float: left;
  margin-right: 16px;
}
.maindivStyles {
  padding: 16px;
  background: #f0f1f2;
  border: 1px solid #d5dfed;
}
#select {
  border-radius: 5px;
  height: 35px;
}
.inline {
  display: inline-block;
}
.mr8 {
  margin-right: 8px;
  width: 90px;
}
.mr16 {
  padding-top: 1rem;
  margin-right: 16px;
}
.fnt500 {
  font-weight: 500;
}
.width {
  width: 300px;
}
.table {
  padding-bottom: 1rem;
  margin-bottom: 0rem !important;
  border-bottom: 1px solid gray;
  padding-left: 16px;
}
.mb0 {
  margin-bottom: 0px !important;
  display: table-row;
}
.fnt12 {
  font-size: 12px;
}
.br{
  height: 90vh;
  border-right: 1px solid gray;
}
.floatleft{
  float: left;
}
.block{
  display: block;
  text-align: center;
  padding-top: 250px;
}
</style>
