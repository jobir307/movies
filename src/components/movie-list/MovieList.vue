<template>
    <ul class="movie-list list-group">
        <movie-list-item 
          v-for="movie in movies" 
          :key="movie.id" 
          :movie="movie"
          v-on:onToggle="$emit('onToggle', $event)" 
          v-on:onDelete="$emit('deleteCurrentMovie', movie.id)"
        />
    </ul>
</template>

<script>
import MovieListItem from '../movie-list-item/MovieListItem.vue'
export default {
  components: { MovieListItem },
  props: {
    movies: {
        type: Array,
        required: true
    }
  }
}
</script>

<style scoped>
.movie-list {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>