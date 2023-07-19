<template>
    <input 
        type="text" 
        class="form-control search-input" 
        autocomplete="off" 
        placeholder="Kinolarni qidirish"
    >
</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
.search-input {
    padding: 1.2rem;
    background-color: #fcfaf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
    font-size: 20px;
}
</style>