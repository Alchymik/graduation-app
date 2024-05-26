<template>
    <form class="new-post-form" @submit.prevent>
        <h3>Вход</h3>
        <my-input v-model="email" type="text" placeholder="Почта" />
        <my-input v-model="password" type="text" placeholder="Пароль" />
        <my-warning-text v-if="email === '' || password === ''">Необходимо заполнить все поля!</my-warning-text>
        <div class="bottom-buttons">
            <my-button @click="this.$store.commit('setShowDialogWindowType', 'recoverPassword')">Забыл пароль</my-button>
            <my-button class="login_btn" @click="handleSignIn">Войти</my-button>
        </div>
    </form>
</template>

<script>
import { supabase } from "@/supabase";

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async handleSignIn() {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: this.email,
                    password: this.password,
                });
                if (error) throw error;
                else {
                    this.$store.dispatch('getSession');
                    this.$store.commit('setShowDialogWindowType', '');
                }
            } catch (error) {
                alert(error.error_description || error.message);
            }
        },
    },
}
</script>

<style scoped>
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.new-post-form {
    margin: 15px;
    display: flex;
    flex-direction: column;
}

.new-post-form>* {
    margin-top: 15px;
}

.new-post-form>button {
    align-self: flex-end;
}

.bottom-buttons {
    display: flex;
    justify-content: space-between;
}

.login_btn {
    min-width: 133px;
}
</style>