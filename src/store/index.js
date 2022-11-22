import { createStore } from 'vuex'

import moviesearch from './modules/moviesearch'

export default createStore({
  modules: {
    moviesearch
  }
})
