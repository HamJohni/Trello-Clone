<script setup lang="ts">
import Card from "@/components/Card.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
const store = useStore();
const props = defineProps({
  changeShowCardAdd: Object
});

const allColumn = ref([])
const allCard = ref([])

const react = computed(() => {
  return{
    getAllColumn: store.getters['useBody/getAllColumn'],
    getAllCard:store.getters['useBody/getAllCards']
  }
})

const cards = computed((id: any)=> {
  return store.getters['useBody/getAllCards'].filter((item: any) => item.columnId === id)
})

onMounted(() => {
  store.dispatch('useBody/getAllColumns')
  store.dispatch('useBody/getAllCards')
});

const deleteColumn = (id: any) => {
  store.dispatch('useBody/deleteColumn', id)
}

const onDragStart = (e: any, card: any) => {
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('cardId', card.id.toString())
}

const onDrop = (e:any, columId: any) => {
  const cardId = parseInt(e.dataTransfer.getData('cardId'))
  react.value.getAllCard.map((item: any) => {
    if(item.id == cardId){
      const obj = {
        cardId:cardId,
        newId: columId
      }
      store.dispatch('useBody/editCard', obj)
      return item
    }
  })
}
</script>

<template>
  <div class="block" v-for="column in react.getAllColumn" :key="column.id">
    <div class="column">
      <div class="body__info">
        <h3 class="column__title">{{column.title}}</h3>

        <p class="column__time" @click.prevent="deleteColumn(column.id)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </p>
      </div>

      <div class="body__content droppable"
           @drop="onDrop($event, column.id)"
           @dragover.prevent
           @dragenter.prevent
      >

        <Card
            class="draggable"
            v-for="card in react.getAllCard.filter((item) => item.columnId === column.id)"
            :card="card"
            @dragstart="onDragStart($event, card)"
            draggable="true"
        />

      </div>

      <div class="body__footer">
        <button class="footer__btn" @click="changeShowCardAdd(column.id)">Добавить карту</button>
      </div>

    </div>
  </div>
</template>

<style scoped>

.block{
  max-width: 300px;
  width: 100%;
}

.column{
  width: 100%;
}

.body__info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
}

.body__content{
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-height: 100%;
  overflow-y: scroll;
  flex: 1;
  min-height: 10px;
}

.body__footer{
  text-align: center;
  padding: 5px 0;
}

.footer__btn{
  background: transparent;
  border: none;
  width: 100%;
  padding: 10px 0;
}

.footer__btn:hover{
  background: #2c2c30;
  border-radius: 10px;
  transform: scale(1.05);
}

.column{
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background: #101204;
  padding: 10px;
  border-radius: 10px;
  max-height: 100%;
  width: 100%;
}

.column__title{
  background: transparent;
  width: 75%;
  border: none;
  padding: 5px;
  font-size: 23px;
  font-weight: 600;
}

.column__time{
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
}

.column__time:hover{
  background: red;
}

.body__content::-webkit-scrollbar{
  width: 10px;
}

.body__content::-webkit-scrollbar-track  {
  border-radius: 20px;
  background: #1c2015;
}

.body__content::-webkit-scrollbar-thumb {
  background: #323b35;
  height: 2px;
  border-radius: 10px;
}

.svg{
  width: 24px;
}

</style>