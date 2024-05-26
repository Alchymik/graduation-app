<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { supabase } from '@/supabase'
import renameColumn from "@/hooks/renameColumn.js"
import deleteColumn from "@/hooks/deleteColumn.js"
import fetchTasks from '@/hooks/fetchTasks.js'
import createTask from '@/hooks/createTask.js'
import updateTaskColumn from '@/hooks/updateTaskColumn.js'

const store = useStore();
const props = defineProps({
    column: Object,
});
const emit = defineEmits(['drag-start', 'drag-finish'])
const tasks = ref([]);

async function handleColumnRename(newName) {
    renameColumn(props.column.id, newName);
}

async function handleColumnDelete() {
    deleteColumn(props.column.id, props.column.id);
}

async function handleTaskCreation() {
    let newTask = await createTask(props.column.id, '', '', '', null);
    store.commit('setDialogComponentsProps', { taskID: newTask[0].id });
    store.commit('setShowDialogWindowType', 'task');
}

function handleTaskClick(task_id) {
    store.commit('setDialogComponentsProps', { taskID: task_id });
    store.commit('setShowDialogWindowType', 'task');
}

function handleDragStart(event, { item_id }) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData('item_id', item_id);
}

async function handleDragDrop(event, column_id) {
    let item_id = event.dataTransfer.getData('item_id');
    updateTaskColumn(item_id, column_id);
}

onMounted(async () => {
    tasks.value = await fetchTasks(props.column.id);
});

supabase
    .channel(`tasks_${props.column.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' },
        async (payload) => {
            tasks.value = await fetchTasks(props.column.id);
            console.log('tasks.value', tasks.value);
        })
    .subscribe();
</script>

<template>
    <div class="column" @drop="handleDragDrop($event, column.id)" @dragenter.prevent @dragover.prevent>
        <div class="column-header">
            <my-click-to-edit :value="column.name" :placeholder="'Введите название'" :tagType="'input'"
                @update="handleColumnRename" />
            <div @click="handleColumnDelete">&#128465;<strong></strong></div>
        </div>
        <div class="column-body">
            <div class="task" v-for="task in tasks" :key="task.id" draggable="true"
                @dragstart="handleDragStart($event, { item_id: task.id, column_id: column.id })"
                @click="handleTaskClick(task.id)">
                <p v-if="task.name.trim() != ''">{{ task.name }}</p>
                <p v-else>Без названия</p>
                <p class="task_tag" v-if="task.tag.trim() != ''">{{ task.tag }}</p>
                <p class="task_deadline" v-if="task.deadline_date !== null">до {{ task.deadline_date }}</p>
            </div>
        </div>
        <div class="column-footer" @click="handleTaskCreation">
            + Добавить задачу
        </div>
    </div>
</template>

<style scoped>
.column {
    margin: 5px;
    padding: 10px;
    color: white;
    background-color: #2a52be;
    border: 2px solid #2a52be;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.column-header {
    display: flex;
    justify-content: space-between;
    flex-grow: 0;
}

.column-body,
.column-footer {
    margin-top: 5px;
}

.column-body {
    min-height: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.column-footer {
    color: white;
    text-align: center;
    min-height: 20px;
    margin-top: 10px;
    background-color: #2a52be;
    padding: 5px;
    border-radius: 5px;
    flex-grow: 0;
}

.column-footer:hover {
    transition: 0.1s;
    background-color: #4169E1;
    cursor: pointer;
}

.task {
    color: black;
    min-height: 20px;
    margin-top: 10px;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
}

.task_tag {
    color: #2a52be;
}

.task_deadline {
    color:crimson;
}
</style>