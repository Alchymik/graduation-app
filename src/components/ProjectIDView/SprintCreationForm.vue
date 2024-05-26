<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import createTable from '@/hooks/createTable'
import createColumns from '@/hooks/createColumns.js'

const date = ref(new Date());
const store = useStore();
const props = defineProps({
    projectID: Number,
});

async function handleCreation() {
    let createdSprintTable = await createTable(props.projectID, 'scrum_sprint', date.value[0], date.value[1]);
    await createColumns([
                { table_id: createdSprintTable[0].id, name: 'Бэклог спринта' },
                { table_id: createdSprintTable[0].id, name: 'В работе' },
                { table_id: createdSprintTable[0].id, name: 'Тестирование' },
                { table_id: createdSprintTable[0].id, name: 'К исправлению' },
                { table_id: createdSprintTable[0].id, name: 'Выполнено' },
            ]);
    store.commit('setShowDialogWindowType', '');
}
</script>

<template>
    <form class="new-column-form" @submit.prevent>
        <h3>Создание спринта</h3>
        <p>Укажите дату начала и конца спринта</p>
        <VueDatePicker v-model="date"
            locale="ru" 
            :enable-time-picker="false" 
            :range="{ minRange: 2 }"
            select-text="Выбрать"
            cancel-text="Очистить"/>
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