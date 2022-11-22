<template>
  <MoviesSearch />
</template>
//7039313693
<script>
import { mapActions } from 'vuex';
import MoviesSearch from './components/MoviesSearch.vue';

export default {
  name: 'App',
  components: {
    MoviesSearch
},
  methods:{
    ...mapActions(['fetchMoviesList'])
  },

  created(){
    if(this.showMoviesList && this.showMoviesList.lenght>0) return
    this.fetchMoviesList();
  }
}
</script>

<style>

</style>
