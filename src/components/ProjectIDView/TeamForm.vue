<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import fetchProjectTeamIDs from '@/hooks/fetchProjectTeamIDs.js'
import fetchProjectOwnerID from '@/hooks/fetchProjectOwnerID.js'
import fetchUserInfo from '@/hooks/fetchUserInfo.js'

const store = useStore();
const props = defineProps({
    projectID: Number
});
const ownerInfo = ref([]);
const teamInfo = ref([]);
const isTeamDataLoaded = ref(false);

const handleAddUserClick = () => {
    store.commit('setDialogComponentsProps', { projectID: props.projectID });
    store.commit('setShowDialogWindowType', 'addTeam');
}

onMounted(async () => {
    let [ownerID, teamIDs] = await Promise.all([fetchProjectOwnerID(props.projectID), fetchProjectTeamIDs(props.projectID)]);

    ownerInfo.value = await fetchUserInfo(ownerID[0].user_id);
    teamInfo.value = await Promise.all(teamIDs.map((el) => fetchUserInfo(el.user_id)));

    isTeamDataLoaded.value = true;
});
</script>

<template>
    <div class="wrapper">
        <div class="project_owner" v-if="isTeamDataLoaded">
            <h3>Автор проекта</br></h3> {{ ownerInfo[0].email }}
        </div>
        <div class="project_team" v-if="isTeamDataLoaded">
            <h3>Приглашенные пользователи</h3>
            <div class="project_team_item" v-for="item in teamInfo[0]" :key="item.id">
                {{ item.email }}
            </div>
        </div>
        <my-button @click="handleAddUserClick">Добавить пользователя</my-button>
    </div>
</template>

<style scoped>
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.wrapper {
    margin: 15px;
    display: flex;
    flex-direction: column;
}

.wrapper>* {
    margin-top: 15px;
}

.wrapper>button {
    align-self: flex-end;
}
</style>