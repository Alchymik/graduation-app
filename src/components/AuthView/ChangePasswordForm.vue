<script setup>
import { supabase } from "@/supabase"
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore();
const newPassword = ref('');
const newPasswordRepeated = ref('');

const handlepasswordChange = async () => {
    if (newPassword.value === newPasswordRepeated.value !== '') {
        await supabase.auth.updateUser({ password: newPassword.value })
        store.commit('setShowDialogWindowType', '');
    }
}
</script>
<template>
    <form class="form" @submit.prevent>
        <h3>Смены пароля</h3>
        <my-input v-model="newPassword" type="text" placeholder="Новый пароль" />
        <my-input v-model="newPasswordRepeated" type="text" placeholder="Новый пароль повторно" />
        <my-warning-text v-if="newPassword === '' || newPasswordRepeated === ''">Необходимо заполнить все
            поля!</my-warning-text>
        <my-warning-text v-else-if="newPassword !== newPasswordRepeated">Пароли должны совпадать!</my-warning-text>
        <my-button @click="handlepasswordChange">Сменить пароль</my-button>
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
</style>