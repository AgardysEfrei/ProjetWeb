<template>
  <div class="user-profile" v-if="user">
    <div class="profile-header">
      <img :src="user.photo || defaultPhoto" alt="Photo de profil" class="profile-photo" />
      <h1>{{ user.name }}</h1>
    </div>
    <div class="profile-details">
      <p><strong>Email:</strong> {{user.username}}</p>
    </div>
  </div>
  <div v-else>
    <p>Aucun utilisateur connecté.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.getters.user)

// Optionnel : une photo par défaut si user.photo n'existe pas
const defaultPhoto = 'https://via.placeholder.com/150'

// Si tu souhaites, tu peux aussi formater les données user ici, par exemple :
// user.prenom = user.givenName ou user.nom = user.familyName selon ce que renvoie MSAL/Graph
</script>

<style scoped>
.user-profile {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-photo {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.profile-details {
  line-height: 1.6;
}

.profile-details p {
  margin: 10px 0;
}
</style>
