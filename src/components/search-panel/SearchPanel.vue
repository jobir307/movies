<template>
    <my-input 
        type="text" 
        class="search-input" 
        autocomplete="off" 
        placeholder="Kinolarni qidirish"
        v-bind:value="term"
        v-on:input="changeTerm"
    />
</template>

<script>
    export default {
        props: {
            updateTermHandler: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                term: ''
            }
        },
        methods: {
            changeTerm(event) {
                this.term = event.target.value
                this.updateTermHandler(this.term)
            }
        }
    }
</script>

<style scoped>
.search-input {
    padding: 0.8rem;
    font-size: 20px;
}
</style>