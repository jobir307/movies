<template>
    <my-box style="margin-top: 2rem;">
      <ul class="list-group">
          <movie-list-item 
            v-for="movie in movies" 
            :key="movie.id" 
            :movie="movie"
            v-on:onToggle="$emit('onToggle', $event)" 
            v-on:onDelete="$emit('deleteCurrentMovie', movie.id)"
          />
      </ul>
    </my-box>
</template>

<script>
import MovieListItem from '../movie-list-item/MovieListItem.vue'

export default {
  components: { 
    MovieListItem
  },
  props: {
    movies: {
        type: Array,
        required: true
    }
  }
}
</script>

<style scoped>
</style>