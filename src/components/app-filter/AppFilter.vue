<template>
    <div class="btn-group mt-3">
        <my-button v-for="bt in buttons" :key="bt.id"
            type="button" 
            v-on:click="filterHandler(bt.title)"
            :class="[filterName === bt.title ? 'btn btn-dark' : 'btn btn-outline-dark']"
        >
            {{ bt.name }}
        </my-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter: 'all',
            buttons: [
                {id: 1, title: 'all', name: 'Barcha kinolar'},
                {id: 2, title: 'popular', name: 'Mashhur kinolar'},
                {id: 3, title: 'mostViewers', name: 'Eng ko\'p ko\'rilgan'}
            ]
        }
    },
    props: {
        updateFilterHandler: {
            type: Function,
            required: true
        },
        filterName: {
            type: String,
            required: true
        }
    },
    methods: {
        filterHandler(filter) {
            // console.log(filter)
            this.filter = filter
            this.updateFilterHandler(this.filter)
        }
    }
}
</script>

<style scoped>

</style>