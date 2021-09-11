<template>
  <div v-show="show" class="overlay">
    <div class="dialog">
      <div class="dialog__content">
        <h2 class="dialog__title">review</h2>
        <p class="dialog__description">{{ review }}</p>
      </div>
      <hr />
      <div class="dialog__footer">
        <button @click="closeDialog" class="dialog__cancel">Cancel</button>
<!--        <button class="dialog__confirm">Yes, delete it</button>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from '@vue/composition-api'

const Dialog = defineComponent({
  name: 'Dialog',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    review: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('closeDialog')
    }
    return {
      closeDialog
    }
  }
})

export default Dialog
</script>

<style></style>