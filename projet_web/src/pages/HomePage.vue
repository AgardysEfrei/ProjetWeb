<script setup>
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'

const clickCount = ref(0)

function handleButtonClick() {
  clickCount.value++
  return new Promise((resolve) => {
    setTimeout(resolve, clickCount.value * 1000)
  })
}
</script>

<template>
  <div>
    <p>Here comes the content of the HomePage.</p>
    <base-button style="margin: 1rem;">BaseButton</base-button>
    <base-button disabled>BaseButton disabled</base-button>
    <base-button color="danger" style="margin: 1rem;">BaseButton with color props</base-button>
    <base-button color="warn">BaseButton with color props</base-button>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
</style>
