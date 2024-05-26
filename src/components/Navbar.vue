<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import fetchUserInfo from '@/hooks/fetchUserInfo'

const route = useRoute();
const store = useStore();
const userEmail = ref('');
const isProjects = () => {
      if (route.path === '/projects') return true;
      else return false;
    };
const isAuth = () => {
      if (route.path === '/auth') return true;
      else return false;
    };
onMounted(async() => {
  await store.dispatch('getSession');
  if (store.state.session !== null) {
    let userInfo = await fetchUserInfo(store.state.session.user.id);
    userEmail.value = userInfo[0].email;
  }
});
</script>

<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-left-side">
        <my-nav-btn @click="$router.push(`/projects`)" :class="{ 'chosen': isProjects() }">Проекты</my-nav-btn>
      </div>
      <div class="navbar-right-side">
        <my-nav-btn @click="$router.push(`/auth`)" :class="{ 'chosen': isAuth() }">
          <p v-if="store.state.session === null">Вход/регистрация</p>
          <p v-else>{{ userEmail }}</p>
        </my-nav-btn>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  height: 50px;
  background-color: #2a52be;
  display: flex;
  justify-content: center;
}

.navbar-content {
  width: 1300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left-side,
.navbar-right-side {
  margin: 0 20px;
}

.divide-bar {
  color: white;
  font-weight: 100;
}
</style>