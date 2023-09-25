<script setup lang="ts">
import {computed, reactive} from "vue";
import {
  required,
  email,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useStore } from 'vuex';
import router from "@/router/router";
const store = useStore();

const formData: any = reactive({
  email: "",
  password: "",
})

const rules = computed(() => {
  return {
    email: {required, email},
    password: {required},
  }
})

const v$ = useVuelidate(rules, formData)

const submitHandler = async () => {
  const result = await v$.value.$validate()

  if(result){
    await store.dispatch('useAuth/login', formData);
    router.replace({
      name: "home"
    })
  }else{
    alert("error")
  }
}
</script>

<template>
  <section class="auth">
    <form @submit.prevent="submitHandler">
      <h2>Авторизация</h2>
      <div class="mid">
        <div>
          <div class="block">
            <label>Email:</label>
            <input type="email" placeholder="Email" v-model="formData.email">
          </div>

          <p class="error" v-for="error in v$.email.$errors" :key="error.$uid">
            {{error.$message}}
          </p>
        </div>

        <div>
          <div class="block">
            <label>Password:</label>
            <input type="password" placeholder="Password" v-model="formData.password">
          </div>

          <p class="error" v-for="error in v$.password.$errors" :key="error.$uid">
            {{error.$message}}
          </p>
        </div>

      </div>

      <div class="footer">
        <div @click="$router.push('/register')">У меня нет аккаунта</div>
        <button>Войти</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.auth{
  width: 100%;
  height: 100vh;
  background: #2c2c30;
  display: flex;
  justify-content: center;
  align-items: center;
}

form{
  border: 1px solid white;
  border-radius: 10px;
  width: 600px;
}

h2{
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid white ;
}

.mid{
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.block{
  display: flex;
  align-items: center;
}

label{
  width: 30%;
}

input{
  outline: none;
  background: #ffffff20;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
}

.footer{
  border-top: 1px solid white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
a{
  text-decoration: none;
}

button{
  border-radius: 10px;
  padding: 5px 20px ;
  background: transparent;
  border: 1px solid #ffffff90;
}

.error{
  color: red;
  margin-top: 5px;
  text-align: center;
}

</style>