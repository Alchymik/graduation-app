<script setup>
import { ref } from 'vue'
import createProject from '@/hooks/createProject.js'
import { useStore } from 'vuex'

const store = useStore();
const projectName = ref('');
const methoda = ref('');
</script>

<template>
    <form class="new-project-form" @submit.prevent>
        <h3>Создание проекта</h3>
        <my-input v-model="projectName" type="text" placeholder="Название проекта" />
        <h3>Шаблон</h3>
        <div class="methodology-choice">
            <my-button @click="methoda = 'kanbun'" :class="{ active: methoda === 'kanbun' }">Kanbun</my-button>
            <my-button @click="methoda = 'scrum'" :class="{ active: methoda === 'scrum' }">Scrum</my-button>
        </div>
        <my-button @click="createProject(store.state.session.user.id, projectName, methoda); store.commit('setShowDialogWindowType', '')">Создать проект</my-button>
    </form>
</template>

<style scoped>
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.new-project-form {
    margin: 15px;
    display: flex;
    flex-direction: column;
}

.new-project-form>* {
    margin-top: 15px;
}

.new-project-form>button {
    align-self: flex-end;
}

.methodology-choice {
    display: flex;
    justify-content: space-between;
}

.methodology-choice>* {
    width: 45%;
}

.active {
    background-color: #4169E1;
    color: white;
}
</style>