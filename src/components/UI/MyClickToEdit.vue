<template>
    <input type="text" v-if="edit && tagType == 'input'" :value="value" @input="$event.preventDefault()"
        @blur="updateValue" @keyup.enter="updateValue" v-focus />
    <textarea v-else-if="edit && tagType == 'textarea'" :value="value" @input="$event.preventDefault()"
        @blur="updateValue" @keyup.enter.exact="updateValue" @keyup.shift.enter.exact="text += '\\'" v-focus></textarea>
    <pre v-else-if="value !== ''" @click="edit = true">{{ value }}</pre>
    <pre v-else @click="edit = true" class="placeholder">{{ placeholder }}</pre>
</template>

<script>
export default {
    name: "my-click-to-edit",
    data() {
        return {
            edit: false,
            localValue: this.value
        }
    },
    props: {
        value: String,
        placeholder: String,
        tagType: String,
    },
    methods: {
        updateValue(event) {
            this.localValue = event.target.value;
            this.edit = false;
            this.$emit('update', this.localValue);
        }
    }
}
</script>
<style scoped>
input,
textarea,
p {
    height: 100%;
    width: 100%;
    overflow-wrap: break-word;
}

.placeholder {
    color: gray;
}

textarea {
    resize: none;
    height: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

textarea::-webkit-scrollbar {
    display: none;
}
</style>
