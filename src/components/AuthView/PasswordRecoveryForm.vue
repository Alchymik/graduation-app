<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { supabase } from "@/supabase"

const store = useStore();
const email = ref('');

const handleCreation = async () => {
    await supabase.auth.resetPasswordForEmail(email.value, {
        redirectTo: '/auth',
    });
    store.commit('setShowDialogWindowType', 'verify');
}
</script>

<template>
    <form class="form" @submit.prevent>
        <h3>Восстановление пароля</h3>
        <my-input v-model="email" type="text" placeholder="Введите почту" />
        <my-button @click="handleCreation">Готово</my-button>
    </form>
</template>

<style scoped>
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.form {
    margin: 15px;
    display: flex;
    flex-direction: column;
}

.form>* {
    margin-top: 15px;
}

.form>button {
    align-self: flex-end;
}

.active {
    background-color: #4169E1;
    color: white;
}
</style>