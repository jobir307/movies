<template>
    <input 
        class="form-control" 
        v-bind:value="modelValue"
        v-on:input="updateInput"
    />
</template>

<script>
    export default {
        name: 'my-input',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>