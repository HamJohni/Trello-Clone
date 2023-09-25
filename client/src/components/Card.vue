<script setup lang="ts">
import {useStore} from "vuex";
const store = useStore();

const props = defineProps({
  card: Object
})

const editTime = (time: string) => {
  const dateTimeObject = new Date(time);
  const hours = dateTimeObject.getHours();
  const minutes = dateTimeObject.getMinutes();
  return `${hours}:${minutes}`;
}

const deleteCard = (id: any) => {
  store.dispatch('useBody/deleteCard', id)
}
</script>

<template>
  <div class="card">

    <div class="left">
      <h3 class="title">{{card.title}}</h3>
      <p class="desc">{{card.desc}}</p>
    </div>

    <div class="right">
      <span class="time">{{editTime(card.createdAt)}}</span>

      <span class="icon" @click.prevent="deleteCard(card.id)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
      </span>

    </div>
  </div>
</template>

<style scoped>
.card{
  padding: 10px;
  display: flex;
  border-radius: 10px;
  background: #22272b;
}

.card:hover .icon{
  display: flex;
}

.left{
  display: flex;
  flex-direction: column;
  width: 80%;
}

.right{
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.title{
  font-weight: 700;
  font-size: 23px;
}

.desc{
  font-size: 20px;
  font-weight: 500;
  color: #ffffff90;
}

.icon{
  border-radius: 10px;
  width: 30px;
  height: 30px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon:hover{
  background: #ffffff20;
}

.time{
  font-size: 15px;
  color: #ffffff80;
}

.svg{
  width: 20px;
}
</style>