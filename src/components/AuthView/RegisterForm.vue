<template>
    <form class="new-user-form" @submit.prevent>
        <h3>Регистрация</h3>
        <my-input v-model="email" type="text" placeholder="Почта" />
        <my-input v-model="password" type="text" placeholder="Пароль" />
        <my-input v-model="passwordRepeated" type="text" placeholder="Пароль повторно" />
        <my-warning-text v-if="email === '' || password === '' || passwordRepeated === ''">Необходимо заполнить все
            поля!</my-warning-text>
        <my-warning-text v-else-if="password !== passwordRepeated">Пароли должны совпадать!</my-warning-text>
        <my-button @click="handleSignup">Зарегистрироваться</my-button>
    </form>
</template>

<script>
import { supabase } from "@/supabase";

export default {
    data() {
        return {
            email: '',
            password: '',
            passwordRepeated: '',
        }
    },
    methods: {
        async handleSignup() {
            if (this.password === this.passwordRepeated) {
                try {
                    const { error } = await supabase.auth.signUp({
                        email: this.email,
                        password: this.password,
                    });
                    if (error) throw error;
                } catch (error) {
                    alert(error.error_description || error.message);
                } finally {
                    this.$store.commit('setShowDialogWindowType', 'verify');
                }
            }
        },
    }
}
</script>

<style scoped>
h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
}

.new-user-form {
    margin: 15px;
    display: flex;
    flex-direction: column;
}

.new-user-form>* {
    margin-top: 15px;
}

.new-user-form>button {
    align-self: flex-end;
}
</style>