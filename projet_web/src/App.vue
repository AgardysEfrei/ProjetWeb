<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import SigninButton from './components/SigninButton.vue'
import BaseLayout from './components/BaseLayout.vue'
import HomePage from './pages/HomePage.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <SigninButton :user="user" @userChanged="handleUserChanged"/>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
  <base-layout>
    <home-page />
  </base-layout>
</template>
