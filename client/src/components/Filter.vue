<script setup lang="ts">
import {useStore} from "vuex";
import {reactive} from "vue";
import {onMounted} from "vue";

const store = useStore();

const formData: any = reactive({
  title: ''
})

onMounted(() => {
  store.dispatch('useBody/getAllColumns', formData.title)
});

</script>

<template>
  <div class="filter">
    <input type="text" placeholder="Search..." v-model="formData.title">
  </div>
</template>

<style scoped>
.filter{
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
}
input{
  border: none;
  border-bottom: 1px solid white;
  padding: 10px;
  width: 35%;
  outline: none;
  background: transparent;
}

</style>