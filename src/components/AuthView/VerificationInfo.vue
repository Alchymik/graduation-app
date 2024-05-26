<template>
    <div class="wrapper">
        <p>Ссылка для подтверждения отправлена на указанную почту!</p>
        <my-button @click="$store.commit('setShowDialogWindowType', '');">Понятно</my-button>
    </div>
</template>

<script></script>

<style scoped>
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