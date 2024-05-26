<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import createColumns from '@/hooks/createColumns.js'

const store = useStore();
const props = defineProps({
    tableID: Number,
});

const columnName = ref('');

async function handleCreation() {
    const newColumn = {
        table_id: props.tableID,
        name: columnName.value,
    }
    await createColumns([newColumn]);
    store.commit('setShowDialogWindowType', '');
}
</script>

<template>
    <form class="new-column-form" @submit.prevent>
        <h3>Добавление колонки</h3>
        <my-input v-model="columnName" type="text" placeholder="Название колонки" />
        <my-button @click="handleCreation">Добавить</my-button>
    </form>
</template>

<style scoped>
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.new-column-form {
    margin: 15px;
    display: flex;
    flex-direction: column;
}

.new-column-form>* {
    margin-top: 15px;
}

.new-column-form>button {
    align-self: flex-end;
}

.active {
    background-color: #4169E1;
    color: white;
}
</style>