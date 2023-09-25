<script setup lang="ts">
import {reactive, computed} from "vue";
import useVuelidate from "@vuelidate/core";
import {
    required,
    minLength,
    email,
    sameAs
} from "@vuelidate/validators";
import axios from "axios";
import router from "@/router/router";

const formData: any = reactive({
  name: '',
  email: "",
  password: "",
  confirmPassword: ""
})

const rules = computed(() => {
  return {
    name: {required, minLength: minLength(3) },
    email: {required, email},
    password: {required},
    confirmPassword: {required, sameAs: sameAs(formData.password)},
  }
})

const v$ = useVuelidate(rules, formData)

const submitHandler = async () => {
  const result = await v$.value.$validate()

  if(result){
    const {confirmPassword, ...other} = formData

    axios.post('/user/registration', other)
         .then(() => router.push('/login'))
  }else{
    alert("error")
  }
}

</script>

<template>
  <section class="auth">
    <form @submit.prevent="submitHandler">
      <h2>Регистрация</h2>

      <div class="mid">
        <div>
          <div class="block">
            <label>Full name:</label>
            <input type="text" placeholder="Full name" v-model="formData.name">
          </div>

          <p class="error" v-for="error in v$.name.$errors" :key="error.$uid">
            {{error.$message}}
          </p>

        </div>

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


        <div>
          <div class="block">
            <label>Confirm:</label>
            <input type="password" placeholder="Confirm" v-model="formData.confirmPassword">
          </div>

          <p class="error" v-for="error in v$.confirmPassword.$errors" :key="error.$uid">
            {{error.$message}}
          </p>
        </div>
      </div>

      <div class="footer">
        <div @click="$router.push('/login')">У меня уже есть аккаунт</div>
        <button type="submit">Зарегитрироваться</button>
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
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  outline: none;
  background: #ffffff20;
}

.footer{
  border-top: 1px solid white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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