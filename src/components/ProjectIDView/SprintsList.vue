<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore();
const props = defineProps({
    tables: Array,
    project: Object,
});

function handleSprintCreation() {
    store.commit('setDialogComponentsProps', {projectID: props.project.id});
    store.commit('setShowDialogWindowType', 'createSprint');
}

onMounted(() => console.log('tables', props.tables))
</script>

<template>
<div class="sprints_list">
    <div class="sprint_item" v-for="table in props.tables" :key="table.id">
        <div class="sprint_body">
            <p>Спринт <strong>{{ table.start_date }}</strong> - <strong>{{ table.end_date }}</strong></p>
        </div>
        <div class="sprint_btns">
            <my-nav-btn @click="$router.push(`/projects/${props.project.id}/sprint_${table.id}`)">Открыть</my-nav-btn>
        </div>
    </div>
    <my-nav-btn class="create_sprint_btn" @click="handleSprintCreation">+ Создать спринт</my-nav-btn>
</div>
</template>

<style scoped>
.sprints_list {
    margin: 20px;
    display: flex;
    flex-direction: column;
}
.sprint_item {
    height: 60px;
    margin-top: 5px;
    color: white;
    background-color: #2a52be;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sprint_body,
.sprint_btns {
    margin: 0 10px;
}

.create_sprint_btn {
    margin-top: 5px;
    text-align: center;
}
</style>