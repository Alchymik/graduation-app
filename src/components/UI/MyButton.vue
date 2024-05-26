<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "my-button"
}
</script>

<style scoped>
button {
    width: max-content;
    background-color: #2a52be;
    padding: 15px;
    border: 2px solid #2a52be;
    border-radius: 5px;
    font-size: medium;
    color: white;
    transition: 0.1s;
}

button:hover {
    transition: 0.1s;
    background-color: white;
    color: #2a52be;
    cursor: pointer;
}
</style>