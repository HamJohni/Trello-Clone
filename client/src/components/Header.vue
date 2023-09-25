<script setup lang="ts">
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue';
import {computed} from "vue";
import { useStore } from 'vuex';
import router from "@/router/router";
const store = useStore();

const react =  computed(() => {
  return{
    authenticated: store.getters['useAuth/authenticated'],
    auth: store.getters['useAuth/auth']
  }
})
const singOut = computed(() => {
  store.commit('useAuth/RESET_TOKEN_AND_USER')
  localStorage.removeItem('token')
  router.push('/login')
})
</script>

<template>
  <header class="header">
    <h1 class="title">Kanban</h1>
    <p v-if="react.authenticated">
      {{react.auth.name}}
    </p>

    <div class="right">

      <p class="cursor-pointer" v-if="react.authenticated" @click="singOut">
        Exit
      </p>
    </div>

  </header>
</template>

<style scoped>
.header{
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #22272b;
}

.title{
  font-size: 30px;
}

.right{
  display: flex;
  align-items: center;
  column-gap: 10px;
}

img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.menu{
  position: relative;
}

.menuBtn{
  border-radius: 9999px;
}

.menuBtn:focus{
  outline: none;
  box-shadow: 0 0 0 2px black;
}

.MenuItems{
  transform-origin: top right;
  margin-top: 0.5rem;
  outline: none;
  position: absolute;
  right: 0;
  background-color: #fff;
  overflow: hidden;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-width: 1px;
  border-style: solid;
  border-color: #e5e7eb;
  width: 12rem;
}
.a {
  display: block;
  padding: .5rem 1rem 0.5rem 1rem;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
}
</style>