<script setup lang="ts">
</script>

<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: white;
  transition: .5s;
  font-family: "Roboto", sans-serif;
}

.app{
  height: 100vh;
}

button{
  cursor: pointer;
}
</style>
