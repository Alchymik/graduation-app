<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import fetchProjectIdOfTask from '@/hooks/fetchProjectIdOfTask.js'
import fetchProjectIDSprints from '@/hooks/fetchProjectIDSprints.js'
import fetchColumns from '@/hooks/fetchColumns.js'
import updateTaskColumn from '@/hooks/updateTaskColumn'

const store = useStore();
const props = defineProps({
    taskID: Number,
    projectID: Number
});

const isSprintDataLoaded = ref(false);
const isSprintSelected = ref(false);
const tables = ref([]);
const columns = ref([]);

const handleSprintSelection = async (id) => {
    isSprintSelected.value = true;
    columns.value = await fetchColumns(id);
}

const handleMigration = async (new_column_id) => {
    await updateTaskColumn(props.taskID, new_column_id)
    store.commit('setShowDialogWindowType', '');
}

onMounted(async () => {
    tables.value = await fetchProjectIDSprints(props.projectID);
    isSprintDataLoaded.value = true;
})
</script>

<template>
    <div class="all_list" v-if="isSprintDataLoaded">
        <div v-if="!isSprintSelected">
            <h3>Выберите спринт</h3>
            <div class="sub_list" v-for="table in tables" :key="table.id">
                <my-button class="item_name" @click="handleSprintSelection(table.id)">Спринт <b>{{ table.start_date }}</b> - <b>{{ table.end_date }}</b></my-button>
            </div>
        </div>
        <div v-else>
            <h3>Выберите колонку</h3>
            <div class="sub_list" v-for="column in columns" :key="column.id">
                <my-button class="item_name" @click="handleMigration(column.id)">{{ column.name }}</my-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.all_list {
    margin: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.all_list>*:not(:first-child) {
    margin-top: 15px;
}

.sub_list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.sub_list>* {
    width: 100%;
}

.item_name {
    margin-top: 15px;
    text-align: center;
}

.active {
    background-color: #4169E1;
    color: white;
}
</style>