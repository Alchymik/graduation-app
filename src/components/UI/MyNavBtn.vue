<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "my-nav-btn"
}
</script>

<style scoped>
button {
    background-color: #2a52be;
    padding: 10px;
    border: 1px solid #2a52be;
    border-radius: 5px;
    font-size: medium;
    color: white;
    transition: 0.1s;
}

button:hover {
    transition: 0.1s;
    background-color: #4169E1;
    cursor: pointer;
}

.chosen {
    background-color: #4169E1;
}
</style>