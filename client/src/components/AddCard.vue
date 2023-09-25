<script setup lang="ts">
import {computed, reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {minLength} from "@vuelidate/validators";
import {useStore} from "vuex";
const store = useStore();

const props = defineProps({
  showCardAdd: Boolean,
  columnIdInfo: Number,
  changeShowCardAdd: Function
});

const formData: any = reactive({
  title: '',
  desc: ''
})

const rules = computed(() => {
  return {
    title: {required, minLength: minLength(3)},
    desc: {required, minLength: minLength(3)}
  }
})

const v$ = useVuelidate(rules, formData)

const submitHandler = async () => {
  const result = await v$.value.$validate()

  const object = {
    title: formData.title,
    columnId: props.columnIdInfo,
    desc: formData.desc
  }

  if (typeof props.changeShowCardAdd === "function") {
    props.changeShowCardAdd();
  }

  if(result){
    await store.dispatch('useBody/addCard', object)
    formData.title = ''
    formData.desc = ''
  }else{
    console.log("error")
  }
}
</script>

<template>
  <div class="over" v-if="showCardAdd" @click.stop="changeShowCardAdd">
    <form class="form" @click.stop @submit.prevent="submitHandler">
      <div class="header">
        <h2>Создание карты</h2>
      </div>

      <div class="body">
        <input type="text"
               placeholder="Название карты"
               v-model="formData.title"
        >
        <p class="error" v-for="error in v$.title.$errors" :key="error.$uid">
          {{error.$message}}
        </p>

        <input type="text"
               placeholder="Описание"
               v-model="formData.desc"
        >

        <p class="error" v-for="error in v$.desc.$errors" :key="error.$uid">
          {{error.$message}}
        </p>
      </div>

      <div class="footer">
        <button type="submit">Добавить карту</button>
      </div>

    </form>
  </div>
</template>


<style scoped>
.over{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #99999990;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form{
  width: 350px;
  background: #2c2c30;
  border-radius: 10px;
}

.header{
  text-align: center;
  padding: 10px;
}

.body{
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

input{
  width: 100%;
  background: transparent;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
}

.footer{
  text-align: center;
  padding: 10px;
}

button{
  border: 1px solid white;
  background: transparent;
  padding: 5px 40px;
  border-radius: 10px;
}

.error{
  color: red;
  margin-top: 5px;
  text-align: center;
}

</style>