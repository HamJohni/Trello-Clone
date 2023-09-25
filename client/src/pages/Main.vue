<script setup lang="ts">
import Header from "@/components/Header.vue";
import Filter from "@/components/Filter.vue";
import Body from "@/components/Body.vue";
</script>

<template>
  <main class="main">
      <Header/>
      <Filter/>
      <Body/>
  </main>
</template>


<style scoped>
.main{
  background: black;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
</style>