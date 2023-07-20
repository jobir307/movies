<template>
  <div class="app font-monospace">
    <div class="content">
      <app-info 
        v-bind:allMoviesCount="movies.length"
        v-bind:favouriteMoviesCount="movies.filter(m => m.favourite).length"
      />
      <div class="search-panel">
        <search-panel 
          v-bind:updateTermHandler="updateTermHandler"
        />
        <app-filter 
          v-bind:updateFilterHandler="updateFilterHandler"
          v-bind:filterName="filter"
        />
      </div>
      <movie-list 
        v-bind:movies="onFilter(onSearchHandler(movies, term), filter)"
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
import MovieList from '@/components/movie-list/MovieList.vue'
import MovieAddForm from '@/components/movie-add-form/MovieAddForm.vue'
import axios from 'axios'

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
        movies: [],
        term: '',
        filter: 'all'
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
    onSearchHandler(arr, term) {
      if (term.length == 0)
        return arr
      return arr.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
    },
    onFilter(arr, filter) {
      switch(filter) {
        case "popular":
          return arr.filter(c => c.like)
        case "mostViewers":
          return arr.filter(c => c.viewers > 400)
        default:
          return arr
      }
    },  
    updateTermHandler(term) {
      this.term = term
    },
    updateFilterHandler(filter) {
      this.filter = filter
    },
    async fetchMovie() {
      try {
        let {data} = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        const newArr = data.map(item => ({
          id: item.id,
          name: item.title,
          viewers: item.id * 10, 
          favourite: false, 
          like: false
        }))
        console.log(newArr);
        this.movies.push(newArr)
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  mounted() {
    this.fetchMovie()
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