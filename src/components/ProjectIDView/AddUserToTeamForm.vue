<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import addUserToTeam from '@/hooks/addUserToTeam.js'

const store = useStore();
const props = defineProps({
    projectID: Number,
});

const userMail = ref('');

async function handleAdding() {
    await addUserToTeam(props.projectID, userMail.value);
    store.commit('setShowDialogWindowType', '');
}
</script>

<template>
    <form class="new-column-form" @submit.prevent>
        <h3>Добавление пользователя в команду</h3>
        <my-input v-model="userMail" type="text" placeholder="Введите email пользователя" />
        <my-button @click="handleAdding">Добавить</my-button>
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