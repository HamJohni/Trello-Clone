<script setup lang="ts">
import {computed, reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {minLength} from "@vuelidate/validators";
import {useStore} from "vuex";
const store = useStore();

const props = defineProps({
  showColumnAdd: Boolean,
  changeShowColumnAdd: Function
});

const formData: any = reactive({
  title: ''
})

const rules = computed(() => {
  return {
    title: {required, minLength: minLength(3)}
  }
})

const v$ = useVuelidate(rules, formData)

const submitHandler = async () => {
  const result = await v$.value.$validate()

  const object = {
    title: formData.title,
    userId: store.state.useAuth.user.id
  }

  if (typeof props.changeShowColumnAdd === "function") {
    props.changeShowColumnAdd();
  }

  if(result){
    await store.dispatch('useBody/addColumn', object)
    formData.title = ''
  }else{
    console.log("error")
  }
}
</script>

<template>
  <div class="over" v-if="showColumnAdd" @click.stop="changeShowColumnAdd">
    <form class="form" @click.stop @submit.prevent="submitHandler">
      <div class="header">
        <h2>Создание таблицы</h2>
      </div>

      <div class="body">
      </div>
      <input type="text"
             placeholder="Название таблицы"
             v-model="formData.title"
      >

      <p class="error" v-for="error in v$.title.$errors" :key="error.$uid">
        {{error.$message}}
      </p>

      <div class="footer">
        <button type="submit">Добавить таблицу</button>
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
  padding: 10px;
}

.header{
  text-align: center;
}

.body{
  padding: 10px;
}

input{
  width: 100%;
  background: transparent;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
}

.footer{
  margin-top: 10px;
  text-align: center;
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