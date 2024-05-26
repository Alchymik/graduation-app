<script setup>
import { supabase } from '@/supabase'
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import ProjectCreationForm from '@/components/ProjectsView/ProjectCreationForm.vue'
import ProjectList from '@/components/ProjectsView/ProjectList.vue'
import ProjectTypeFilter from '@/components/ProjectsView/ProjectTypeFilter.vue'
import fetchProjectsList from '@/hooks/fetchProjectsList.js'
import fetchTeamProjectsList from '@/hooks/fetchTeamProjectsList.js'

const store = useStore();
const searchInput = ref('');
const selectedTypeFilter = ref('Self');
const fetchedProjects = ref([]);
const fetchedTeamProjects = ref([]);
const selectedTypeProjects = computed(() => {
    switch (selectedTypeFilter.value) {
        case 'Self':
            return fetchedProjects.value.filter((el) => el.state === 'Active');
         case 'Shared':
            return fetchedTeamProjects.value;
        case 'Archived':
            return fetchedProjects.value.filter((el) => el.state === 'Archived');
    }
});

const searchedSelectedTypeProjects = computed(() => {
    return [...selectedTypeProjects.value.filter(el => el.title.toLowerCase().includes(searchInput.value.toLowerCase()))]
});

onBeforeMount(async () => {
    await store.dispatch('getSession');
    if (store.state.session !== null) [fetchedProjects.value, fetchedTeamProjects.value] = await Promise.all([fetchProjectsList(store.state.session.user.id), fetchTeamProjectsList(store.state.session.user.id)]);
});

supabase
    .channel('tb_change_channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' },
        payload => {
            fetchProjectsList(store.state.session.user.id).then((data) => fetchedProjects.value = data);
        })
    .subscribe();

</script>

<template>
    <my-dialog :showFlag="$store.state.showDialogWindowType">
        <ProjectCreationForm v-if="$store.state.showDialogWindowType === 'createProject'"></ProjectCreationForm>
    </my-dialog>
    <div class="allaround">
        <div class="info-text" v-if="store.state.session === null">
        Войдите или зарегистрируйтесь для доступа к функционалу приложения
        </div>
        <div class="content" v-else>
            <div class="left-side-content"><ProjectTypeFilter v-model="selectedTypeFilter" /></div>
            <div class="right-side-content">
                <div class="header-btns">
                    <my-button class="project-create-button"
                        @click="$store.commit('setShowDialogWindowType', 'createProject')">Создать
                        проект</my-button>
                    <my-input class="project-search-button" v-model="searchInput"
                        placeholder="Поиск по названию"></my-input>
                </div>
                <ProjectList class="project-list" :projects="searchedSelectedTypeProjects"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
span {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.allaround {
    height: 100%;
    background-color: #4169E1;
    display: flex;
    justify-content: center;
}

.info-text {
    margin: 40px;
    color: white;
}

.content {
    width: 1300px;
    display: flex;
}

.left-side-content {
    margin: 20px;
    flex-grow: 0;
}

.right-side-content {
    margin: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.header-btns {
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.project-create-button {
    flex-grow: 0;
}

.project-search-button {
    margin-left: 5px;
    flex-grow: 1;
    min-width: 600px;
}

.project-list {
    margin-top: 5px;
}
</style>