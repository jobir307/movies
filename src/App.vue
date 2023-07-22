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
      <my-loader v-if="loading && !movies.length"/>
      <my-box v-else-if="!movies.length && !loading">
        <p class="text-center fs-3 text-danger fw-bolder">Kino mavjud emas!</p>
      </my-box>
      <movie-list
        v-else
        v-bind:movies="onFilter(onSearchHandler(movies, term), filter)"
        v-on:onToggle="onToggleMovie"
        v-on:deleteCurrentMovie="deleteMovie"
      />
      <nav aria-label="pagination" class="mt-3">
        <ul class="pagination justify-content-center">
          <li 
            v-for="pageNumber in totalPages" 
            :key="pageNumber" 
            class="page-item" 
            :class="{ 'active': pageNumber == page }"
            @click="changePageHandler(pageNumber)"
          >
            <span class="page-link">{{ pageNumber }}</span>
          </li>
        </ul>
      </nav>
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
        filter: 'all',
        loading: false,
        limit: 10,
        page: 1,
        totalPages: 0
    }
  },
  methods: {
    async createNewMovie(movie) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', movie)
        this.movies.push(response.data)
      } catch (error) {
        console.log(error)
      } 
      // this.movies.push(movie)
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
    async deleteMovie(movieId) {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${movieId}`)
        console.log(response);
        // const index = this.movies.findIndex(item => item.id === movieId)
        // this.movies.splice(index, 1)
      } catch (error) {
        console.log(error);
      }
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
    async fetchMovies() {
      try {
        this.loading = true
        setTimeout(async () => {
          let response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _limit: this.limit,
              _page: this.page
            }
          })
          const newArr = response.data.map(item => ({
            id: item.id,
            name: item.title,
            viewers: item.id * 10, 
            favourite: false, 
            like: false
          }))
          this.movies = newArr
          this.loading = false
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        }, 1000);
        
      } catch (error) {
        console.log(error.message);
      }
    },
    changePageHandler(pageNumber) {
      this.page = pageNumber
    }
  },
  mounted() {
    this.fetchMovies()
  },
  watch: { // watch - bu razvedchik ya'ni data (page) o'zgarsa reaksiya beradi !!!
    page() {
      this.fetchMovies()
    },
    movies() {
      this.fetchMovies()
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