<template>
  <header class="header">
    <div class="left">
      <base-button color="primary" @click="goToHome">
        <i class="fas fa-home"></i> Home
      </base-button>

      <base-button v-if="user" color="primary" @click="goToUserPage">
        <i class="fas fa-user"></i> Profil
      </base-button>
    </div>

    <div class="right">
      <!-- Si connecté : bouton de déconnexion -->
      <base-button
          v-if="user"
          color="primary"
          @click="signOutHandler"
          :disabled="loadingSignOut"
      >
        <i class="fas fa-sign-out-alt"></i> Déconnexion
      </base-button>

      <!-- Si déconnecté : bouton de connexion -->
      <base-button
          v-else
          color="primary"
          @click="signInHandler"
          :disabled="loadingSignIn"
      >
        <i class="fas fa-sign-in-alt"></i> Connexion à Microsoft
      </base-button>
    </div>
  </header>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { signIn as msalSignIn, signOut as msalSignOut } from '../lib/microsoftGraph.js'

const store = useStore()
const user = computed(() => store.getters.user)

const loadingSignIn = ref(false)
const loadingSignOut = ref(false)

const emit = defineEmits(['navigate'])

function goToHome() {
  store.commit('setCurrentPage', 'home')
  emit('navigate', 'home')
}

function goToUserPage() {
  store.commit('setCurrentPage', 'user')
  emit('navigate', 'user')
}

async function signInHandler() {
  loadingSignIn.value = true
  try {
    const userData = await msalSignIn() // <-- ici userData doit contenir accessToken
    store.commit('setUser', userData)  // (optionnel si déjà fait dans msalSignIn)
    store.commit('setCurrentPage', 'home')
    emit('navigate', 'home')
  } catch (e) {
    console.error('Erreur connexion:', e)
  } finally {
    loadingSignIn.value = false
  }
}

async function signOutHandler() {
  loadingSignOut.value = true
  try {
    await msalSignOut()
    store.commit('clearUser') // vide user, emails, selectedMail, currentPage
    emit('navigate', 'home')
  } catch (e) {
    console.error('Erreur déconnexion:', e)
  } finally {
    loadingSignOut.value = false
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #42b983;
  color: white;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
