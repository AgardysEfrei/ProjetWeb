<template>
  <form class="mail-composer" @submit.prevent="sendMail">
    <input v-model="to" type="email" placeholder="To" required />
    <input v-model="subject" type="text" placeholder="Subject" required />
    <textarea v-model="body" placeholder="Message" required></textarea>
    <BaseButton type="submit">Send</BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'
const to = ref('')
const subject = ref('')
const body = ref('')

function sendMail() {
  alert(`Mail sent to: ${to.value}\nSubject: ${subject.value}`)
  to.value = ''
  subject.value = ''
  body.value = ''
}
</script>

<style scoped>
.mail-composer {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
input, textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
}
button {
  background: #2a3cff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
button:hover {
  background: #1a2acc;
}
</style>
