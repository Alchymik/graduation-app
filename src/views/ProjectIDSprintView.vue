<script setup>
import ColumnCreationForm from '@/components/ProjectIDView/ColumnCreationForm.vue'
import TaskForm from '@/components/ProjectIDView/TaskForm.vue'
import TeamForm from '@/components/ProjectIDView/TeamForm.vue'
import AddUserToTeamForm from '@/components/ProjectIDView/AddUserToTeamForm.vue'
import TaskMigrationForm from '@/components/ProjectIDView/TaskMigrationForm.vue'
import ProjectTable from '@/components/ProjectIDView/ProjectTable.vue'
import fetchTablebyID from '@/hooks/fetchTableByID'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore();

const table = ref([]);
const isDataLoaded = ref(false);

onMounted(async () => {
    store.dispatch('getSession');
    table.value = await fetchTablebyID(useRoute().params.sprint_id);
    isDataLoaded.value = true;
})
</script>

<template>
    <my-dialog :showFlag="$store.state.showDialogWindowType">
        <TeamForm v-if="$store.state.showDialogWindowType === 'team'" :projectID="$store.state.dialogComponentsProps.projectID"/>
        <AddUserToTeamForm v-if="$store.state.showDialogWindowType === 'addTeam'" :projectID="$store.state.dialogComponentsProps.projectID"/>
        <ColumnCreationForm v-if="$store.state.showDialogWindowType === 'createColumn'" :tableID='$store.state.dialogComponentsProps.tableID' />
        <TaskForm v-if="$store.state.showDialogWindowType === 'task'" :taskID='$store.state.dialogComponentsProps.taskID' />
        <TaskMigrationForm v-if="$store.state.showDialogWindowType === 'taskMigration'" :taskID="$store.state.dialogComponentsProps.taskID" :projectID="$store.state.dialogComponentsProps.projectID"/>
    </my-dialog>
    <div class="allaround">
        <div class="content">
            <div v-if="isDataLoaded">
                <ProjectTable :tableID="table[0].id" :tableType="'scrum_sprint'"/>
            </div>
            <div v-else > Идёт загрузка...</div>
        </div>
    </div>
</template>

<style scoped>
.allaround {
    height: 100%;
    background-color: #4169E1;
    display: flex;
    justify-content: center;
}
.content {
    width: 1300px;
    padding: 20px;
}
</style>