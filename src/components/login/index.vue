<template>
<div class="content-login">
    <div class="img"><img src="https://sso.hust.edu.vn/adfs/portal/illustration/illustration.png?id=BC7103B7130C814F67E8AE687ADD28DBD4E717AE2C00E124A193A21CFFA47656"></div>
    <div class="form">
        <h1>Login</h1>
        <label>id'student</label><input type="text" v-model="user"><br>
        <label>password</label><input type="password" v-model="pass">
        <button v-on:click="eventClickSignIn">Sign in</button>
        <p>Change password ? Click <a href="">here</a>.</p>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'Login',
  // data () {
  //   return {
  //     isValidate: false
  //   }
  // },
  props: {
    isValidate: {
      type: Boolean
    }
  },
  setup (props, {emit}) {
    const user = ref('')
    const pass = ref('')

    const eventClickSignIn = async () => {
      console.log(user.value)
      const { data } = await axios.post('https://backendthayanh.herokuapp.com/login', {
          user: user.value,
          passw: pass.value
        }
      )
      emit('handleSignIn', data)
    }
    return {
      user,
      pass,
      eventClickSignIn
    }
  }
})

</script>

<style>
.content-login{
        width: 100%;
        height: 100vh;
    }
    .content-login .img{
        width: 70%;
        height: 100vh;
        float: left;
    }
    .content-login .img img{
        width: 100%;
        height: 100vh;
    }
    .content-login .form{
        width: 27%;
        float: left;
        margin-top: 25vh;
        font-size: 25px;
        margin-left: 3%;
    }
    .content-login .form h1{
        color: #228be6;
        text-align: center;
        font-size: 50px;
        margin-left: 6%;
    }
    .content-login .form label{
        font-size: 25px;
        color: #464775;
        margin-top: 20px;
    }
    .content-login .form input{
        font-size: 20px;
        width: 60%;
        height: 3vh;
        margin-top: 15px;
        margin-left: 3%;
    }
    .content-login .form button{
        background-color: dodgerblue;
        padding: 10px;
        color: white;
        font-size: 20px;
        border-radius: 5px;
        margin-top: 15px;
    }
    .content-login .form p{
        margin-top: 15px;
    }
</style>
