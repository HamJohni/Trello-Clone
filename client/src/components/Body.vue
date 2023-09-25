<script setup lang="ts">
import Block from "@/components/Block.vue";
import AddColumn from "@/components/AddColumn.vue";
import {ref} from "vue";
import AddCard from "@/components/AddCard.vue";

let showColumnAdd = ref(false)
const changeShowColumnAdd = () => {
  showColumnAdd.value = !showColumnAdd.value
}

let showCardAdd = ref(false)
let columnIdInfo = ref()

const changeShowCardAdd = (id: any) => {
  columnIdInfo.value = id
  showCardAdd.value = !showCardAdd.value
}

</script>
<template>
  <div class="body">
    <Block :changeShowCardAdd="changeShowCardAdd"/>

    <div>
      <button class="add" @click="changeShowColumnAdd">Add list</button>
    </div>

    <AddColumn :showColumnAdd="showColumnAdd" :changeShowColumnAdd="changeShowColumnAdd"/>
    <AddCard :showCardAdd="showCardAdd"
             :changeShowCardAdd="changeShowCardAdd"
             :columnIdInfo="columnIdInfo"
    />
  </div>
</template>

<style scoped>
.body{
  display: flex;
  column-gap: 20px;
  padding: 20px;
  overflow-x: auto;
}

.add{
  width: 200px;
  background: #101204;
  padding: 10px;
  border: none;
  border-radius: 10px;
}

.add:hover{
  background: #2c2c30;
  transform: scale(1.05);
}

.add:active{
  transform: scale(0.95);
}

.body::-webkit-scrollbar{
  height: 12px;
}
</style>