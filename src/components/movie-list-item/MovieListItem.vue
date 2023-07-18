<template>
    <div>
        <li class="list-group-item d-flex justify-content-between">
            <span class="list-group-item-label">Omar</span>
            <input type="number" class="list-group-item-input" defaultValue="999" />

            <div class="d-flex justify-content-center align-items-center">
                <button type="button" class="btn-cookie btn-sm">
                    <i class="fa fa-cookie"></i>
                </button>

                <button type="button" class="btn-trash btn-sm">
                    <i class="fa fa-trash"></i>
                </button>

                <i class="fa fa-star"></i>
            </div>

        </li>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.list-group-item {
    padding: 15px 20px;
    border-bottom: 1px solid #3d5a80;
}
.list-group-item:last-child {
    border-bottom: none;
}
.list-group-item span {
    line-height: 35px;
    font-size: 20px;
    cursor: pointer;
    width: 550px;
}
.list-group-item input {
    line-height: 35px;
    font-size: 20px;
    text-align: center;
    border: none;
    outline: none;
}
.list-group-item button {
    width: 35px;
    height: 35px;
    margin: 3px;
    font-size: 17px;
    border: none;
    cursor: pointer;
}
</style>