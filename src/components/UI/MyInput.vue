<template>
    <input :value="modelValue" @input="updateInput" type="text" />
</template>

<script>
export default {
    name: "my-input",
    props: {
        modelValue: String,
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style scoped>
input {
    padding: 15px;
    border: 2px solid #2a52be;
    border-radius: 5px;
    font-size: medium;
    color: #2a52be;
}
</style>