<script setup>
import { supabase } from "@/supabase"
import { useStore } from "vuex"
import { onMounted } from "vue"
import RegisterForm from '@/components/AuthView/RegisterForm'
import LoginForm from '@/components/AuthView/LoginForm'
import VerificationInfo from '@/components/AuthView/VerificationInfo'
import ChangePasswordForm from '@/components/AuthView/ChangePasswordForm'
import PasswordRecoveryForm from '@/components/AuthView/PasswordRecoveryForm'

const store = useStore();
const handleSignOut = async () => {
    try {
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
        else store.dispatch('getSession');
    } catch (error) {
        alert(error.error_description || error.message);
    }
};
onMounted(async () => {
    store.dispatch('getSession');
});

supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') store.commit('setShowDialogWindowType', 'changePassword');
})

</script>

<template>
    <div class="allaround">
        <my-dialog :showFlag="store.state.showDialogWindowType">
            <ChangePasswordForm v-if="store.state.showDialogWindowType === 'changePassword'"/>
            <RegisterForm v-if="store.state.showDialogWindowType === 'register'" />
            <VerificationInfo v-if="store.state.showDialogWindowType === 'verify'" />
            <LoginForm v-if="store.state.showDialogWindowType === 'login'" />
            <PasswordRecoveryForm v-if="store.state.showDialogWindowType === 'recoverPassword'"/>
        </my-dialog>
        <div v-if="store.state.session === null" class="content">
            <my-button @click="store.commit('setShowDialogWindowType', 'register')">Зарегистрироваться</my-button>
            <div class="or-text">или</div>
            <my-button @click="store.commit('setShowDialogWindowType', 'login')">Войти</my-button>
        </div>
        <div v-else class="content">
            <my-button @click="store.commit('setShowDialogWindowType', 'changePassword')">Сменить пароль</my-button>
            <my-button @click="handleSignOut">Выйти</my-button>
        </div>
    </div>
</template>

<style scoped>
.or-text {
    margin: 5px;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.allaround {
    height: 100%;
    display: flex;
    background-color: #4169E1;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}

.content {
    display: flex;
    flex-flow: column;
    align-items: center;
}

button {
    margin-top: 10px;
}
</style>