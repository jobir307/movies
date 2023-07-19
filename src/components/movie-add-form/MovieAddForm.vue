<template>
    <div class="movie-add-form">
        <h3>Yangi kino yaratish</h3>
        <form class="add-form d-flex" v-on:submit.prevent>
            <input 
                type="text" 
                class="form-control new-movie-label" 
                placeholder="Qanday kino?" 
                v-on:input="name = $event.target.value"
                v-bind:value="name"
            />
            <input 
                type="number" 
                class="form-control new-movie-label" 
                placeholder="Necha marotaba ko'rilgan?" 
                v-on:input="viewers = $event.target.value"
                v-bind:value="viewers"
            />
            <button 
                class="btn btn-outline-dark" 
                type="submit"
                v-on:click="addMovie"
            >
                Qo'shish
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                viewers: ''
            }
        },
        methods: {
            addMovie() {
                if (this.name && this.viewers) {
                    const newMovie = {
                        id: Date.now(),
                        name: this.name, 
                        viewers: this.viewers,
                        favourite: false, 
                        like: false
                    }
                    this.$emit('createMovie', newMovie)
                    this.name=''
                    this.viewers=''
                }
            }
        }
    }
</script>

<style scoped>
.movie-add-form {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>