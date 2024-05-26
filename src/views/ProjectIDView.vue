<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { supabase } from '@/supabase'
import ColumnCreationForm from '@/components/ProjectIDView/ColumnCreationForm.vue'
import SprintCreationForm from '@/components/ProjectIDView/SprintCreationForm.vue'
import TeamForm from '@/components/ProjectIDView/TeamForm.vue'
import AddUserToTeamForm from '@/components/ProjectIDView/AddUserToTeamForm.vue'
import TaskForm from '@/components/ProjectIDView/TaskForm.vue'
import TaskMigrationForm from '@/components/ProjectIDView/TaskMigrationForm.vue'
import ProjectTable from '@/components/ProjectIDView/ProjectTable.vue'
import SprintsList from '@/components/ProjectIDView/SprintsList.vue'
import fetchTables from '@/hooks/fetchTables.js'
import fetchProject from '@/hooks/fetchProject.js'

const route = useRoute();
const store = useStore();
const project = ref({});
const tables = ref([]);
const isProjectDataLoaded = ref(false);

function handleTeamButtonClick () {
    store.commit('setDialogComponentsProps', {projectID: project.value[0].id});
    store.commit('setShowDialogWindowType', 'team');
}

onMounted(async () => {
    store.dispatch('getSession');
    [project.value, tables.value] = await Promise.all([fetchProject(route.params.id), fetchTables(route.params.id)]);
    isProjectDataLoaded.value = true;
})

supabase
    .channel(`sprint`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tables' },
        async (payload) => {
            tables.value = await fetchTables(route.params.id);
        })
    .subscribe();
</script>

<template>
    <my-dialog :showFlag="$store.state.showDialogWindowType">
        <TeamForm v-if="$store.state.showDialogWindowType === 'team'" :projectID="$store.state.dialogComponentsProps.projectID"/>
        <AddUserToTeamForm v-if="$store.state.showDialogWindowType === 'addTeam'" :projectID="$store.state.dialogComponentsProps.projectID"/>
        <ColumnCreationForm v-if="$store.state.showDialogWindowType === 'createColumn'" :tableID='$store.state.dialogComponentsProps.tableID' />
        <TaskForm v-if="$store.state.showDialogWindowType === 'task'" :taskID='$store.state.dialogComponentsProps.taskID' />
        <TaskMigrationForm v-if="$store.state.showDialogWindowType === 'taskMigration'" :taskID="$store.state.dialogComponentsProps.taskID" :projectID="$store.state.dialogComponentsProps.projectID"/>
        <SprintCreationForm v-if="$store.state.showDialogWindowType === 'createSprint'" :projectID="$store.state.dialogComponentsProps.projectID"/>
    </my-dialog>
    <div class="allaround">
        <div v-if="isProjectDataLoaded" class="content">
            <div class="upper_bar">
                <h3 class="project_title">{{ project[0].title }}</h3>
                <my-nav-btn class="team_btn" @click="handleTeamButtonClick">Список команды</my-nav-btn>
            </div>
            <div class="kanbun_project" v-if="project[0].methoda === 'kanbun'">
                <ProjectTable :tableID="tables[0].id" :tableType="kanbun"/>
            </div>
            <div class="scrum_project" v-else-if="project[0].methoda === 'scrum'">
                <ProjectTable class="scrum_backlog" :tableID="tables.find((el) => el.type === 'scrum_backlog').id" :tableType="'scrum_backlog'"/>
                <SprintsList class="scrum_sprints" :project="project[0]" :tables="tables.filter(el => el.type === 'scrum_sprint')"/>
            </div>
        </div>
        <div v-else > Идёт загрузка...</div>
    </div>
</template>

<style scoped>
.allaround {
    height: 100%;
    background-color: #4169E1;
    display: flex;
    justify-content: center;
}
.project_title {
    color: white;
}
.content {
    width: 1300px;
    padding: 20px;
}

.upper_bar {
    margin: 0 25px;
    display: flex;
    justify-content: space-between;
}
.scrum_project {
    display: flex;
    justify-content: space-between;
}

.scrum_backlog {
    flex-grow: 1;
}

.scrum_sprints {
    flex-grow: 2;
}
</style>