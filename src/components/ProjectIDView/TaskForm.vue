<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { supabase } from '@/supabase'
import fetchTaskByID from '@/hooks/fetchTaskByID'
import fetchProject from '@/hooks/fetchProject'
import updateTaskName from '@/hooks/updateTaskName.js'
import updateTaskTags from '@/hooks/updateTaskTags'
import updateTaskDeadline from '@/hooks/updateTaskDeadline'
import updateTaskDetails from '@/hooks/updateTaskDetails.js'
import deleteTask from '@/hooks/deleteTask.js'
import fetchProjectIdOfTask from '@/hooks/fetchProjectIdOfTask.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const store = useStore();
const props = defineProps({
    taskID: Number,
})

const fetchedTask = ref([]);
const project = ref([]);
const isTaskLoaded = ref(false);
const deadlineDate = ref(new Date(0));

async function handleTaskNameUpdate(newName) {
    await updateTaskName(fetchedTask.value[0].id, newName)
}

async function handleTaskTagsUpdate(newTags) {
    await updateTaskTags(fetchedTask.value[0].id, newTags)
}

async function handleTaskDetailsUpdate(newDetails) {
    await updateTaskDetails(fetchedTask.value[0].id, newDetails)
}

async function dateClicked(date) {
    await updateTaskDeadline(fetchedTask.value[0].id, date);
}

async function dateCleared() {
    await updateTaskDeadline(fetchedTask.value[0].id, null);
}
async function handleDeleteClick() {
    await deleteTask(props.taskID)
    store.commit('setShowDialogWindowType', '');
}

async function handleMigrateClick() {
    store.commit('setShowDialogWindowType', 'taskMigration');
    store.commit('setDialogComponentsProps', {taskID: props.taskID, projectID: project.value[0].id});
}

onMounted(async () => {
    fetchedTask.value = await fetchTaskByID(props.taskID);
    let projectId = await fetchProjectIdOfTask(props.taskID);
    project.value = await fetchProject(projectId);
    deadlineDate.value = fetchedTask.value[0].deadline_date;
    isTaskLoaded.value = true;
});

supabase
    .channel('tasks')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' },
        async (payload) => {
            fetchedTask.value = await fetchTaskByID(props.taskID);
        })
    .subscribe();
</script>

<template>
    <div class="task-form" v-if="isTaskLoaded">
        <div class="task-name">
            <h3><my-click-to-edit :value="fetchedTask[0].name" :placeholder="'Введите название'" :tagType="'input'"
                @update="handleTaskNameUpdate" /></h3>
        </div>
        <div class="task-tags-row">
            <b>Тэги:</b><my-click-to-edit class="task-tags" :value="fetchedTask[0].tag" :placeholder="'Введите тэги'" :tagType="'input'" @update="handleTaskTagsUpdate"/>
        </div>
        <div class="deadline-row">
            <b>Дэдлайн:</b>
            <VueDatePicker class="calendar" 
            no-today
            autocomplete="off"
            auto-apply
            placeholder="Дэдлайн не установлен"
            v-model="deadlineDate"
            @date-update="dateClicked"
            @cleared="dateCleared"
            locale="ru" 
            :enable-time-picker="false" 
            select-text="Выбрать"
            cancel-text="Очистить"/>
        </div>
        <p class="task-description"><my-click-to-edit :value="fetchedTask[0].details" :placeholder="'Введите описание'"
                :tagType="'textarea'" @update="handleTaskDetailsUpdate" /></p>
        <div class="task-buttons">
            <my-button v-if="project[0].methoda === 'scrum'" @click="handleMigrateClick">Перенести в спринт</my-button>
            <my-button @click="handleDeleteClick">Удалить</my-button>
        </div>
    </div>
</template>

<style scoped>
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.task-form {
    width: 424px;
    margin: 5px;
    display: flex;
    flex-direction: column;
}

.task-tags-row {
    margin-top: 10px;
    width: 100%;
    display: flex;
}

.task-tags {
    margin-left: 5px;
    color: #2a52be;
}

.deadline-row {
    margin-top: 10px;
}

.calendar {
    margin-top: 10px;
}

.task-description {
    height: 400px;
    max-width: 100%;
    margin-top: 10px;
}

.task-buttons {
    display: flex;
    justify-content: space-between;
}
</style>