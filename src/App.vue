<template>
  <div>
    <Base
      v-if="isValidate"
    />
    <Login
      v-if="!isValidate"
      v-on:handleSignIn="handleSignIn"
    />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ref } from "vue"
import Base from "@/components/base.vue"
import Login from './components/login/index.vue'
export default defineComponent({
  name: 'App',
  components: {
    Base,
    Login
  },
  setup () {
    const isValidate = ref(false)
    const idUser = ref(0)

    const handleSignIn = (data: any) => {
      if (data.result === true) {
        isValidate.value = true
        idUser.value = data.id
      }
    }

    return {
      isValidate,
      handleSignIn,
      idUser
    }
  }
})
</script>

<style>

</style>
