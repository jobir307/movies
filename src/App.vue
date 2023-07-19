<template>
  <div class="app font-monospace">
    <div class="content">
      <app-info 
        v-bind:allMoviesCount="movies.length"
        v-bind:favouriteMoviesCount="movies.filter(m => m.favourite).length"
      />
      <div class="search-panel">
        <search-panel />
        <app-filter />
      </div>
      <movie-list 
        v-bind:movies="movies"
        v-on:onToggle="onToggleMovie"
        v-on:deleteCurrentMovie="deleteMovie"
      />
      <movie-add-form
        v-on:createMovie="createNewMovie"
       />
    </div>
  </div>
</template>

<script>
import AppInfo from '@/components/app-info/AppInfo.vue'
import SearchPanel from '@/components/search-panel/SearchPanel.vue'
import AppFilter from '@/components/app-filter/AppFilter.vue'
import MovieList from './components/movie-list/MovieList.vue'
import MovieAddForm from './components/movie-add-form/MovieAddForm.vue'

export default {
  components: { 
    AppInfo, 
    SearchPanel,
    AppFilter,
    MovieList,
    MovieAddForm,
  },
  data() {
    return {
        movies: [
            {id: 1, name: 'Omar', viewers: 300, favourite: false, like: true},
            {id: 2, name: 'Empire of osman', viewers: 754, favourite: true, like: false},
            {id: 3, name: 'Ertugrul', viewers: 411, favourite: true, like: true}
        ],
        term: '',
    }
  },
  methods: {
    createNewMovie(movie) {
      this.movies.push(movie)
    },
    onToggleMovie({id, prop}) {
      this.movies.map(item => {
        if (item.id == id) {
          if (prop == 'like') {
            item.like = !item.like
          } else if (prop == 'favourite') {
            item.favourite = !item.favourite
          }
        }
        return item
      })
    },
    deleteMovie(movieId) {
      const index = this.movies.findIndex(item => item.id === movieId)
      this.movies.splice(index, 1)
    },
    onFilterMovie(arr, term) {
      if (term.length == 0)
        return arr
      return arr.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
    }
  }
}
</script>

<style scoped>
.app {
  height: 100vh;
  color: #000;
}
.content {
  width: 1000px;
  min-height: 700px;
  background-color: #fff;
  margin: 0 auto;
  padding: 5rem 0;
}
.search-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>