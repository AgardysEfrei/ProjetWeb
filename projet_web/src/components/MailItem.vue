<template>
  <li :class="['mail-item', { selected }]" @click="selectMail">
    <div class="mail-content">
      <span class="sender"><i class="fas fa-user-circle"></i> {{ mail.sender }}</span>
      <span class="subject">{{ mail.subject }}</span>
    </div>
    <button class="delete-btn" @click.stop="deleteMail" title="Supprimer">
      <i class="fas fa-trash-alt"></i>
    </button>
  </li>
</template>

<script setup>
const props = defineProps({
  mail: Object,
  selected: Boolean
})

const emit = defineEmits(['select', 'delete'])

function selectMail() {
  emit('select', props.mail)
}

function deleteMail() {
  emit('delete', props.mail.id)
}
</script>

<style scoped>
.mail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease;
  cursor: pointer;
}

.mail-item:hover {
  background-color: #edf2f7;
}

.mail-item.selected {
  background-color: #bee3f8;
}

.mail-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sender {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
}

.subject {
  font-size: 0.95rem;
  color: #4a5568;
}

.delete-btn {
  background: none;
  border: none;
  color: #e53e3e;
  font-size: 1.1rem;
  cursor: pointer;
  padding-left: 0.5rem;
  transition: transform 0.2s ease;
}

.delete-btn:hover {
  transform: scale(1.2);
  color: #c53030;
}
</style>
