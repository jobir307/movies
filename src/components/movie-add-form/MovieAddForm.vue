<template>
    <my-box style="margin-top: 2rem;">
        <h3>Yangi kino yaratish</h3>
        <form class="add-form d-flex" v-on:submit.prevent>
            <my-input
                type="text"
                class="new-movie-label"
                placeholder="Qanday kino?"
                v-model="name"
            />
            <my-input 
                type="number" 
                class="new-movie-label" 
                placeholder="Necha marotaba ko'rilgan?"
                v-model="viewers"
            />
            <my-button 
                class="btn-outline-dark"
                type="submit"
                v-on:click="addMovie"
            >
                Qo'shish
            </my-button>
        </form>
    </my-box>
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
</style>