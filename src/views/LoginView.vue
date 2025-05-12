<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const passwordVisible = ref(false)
</script>

<template>
  <div class="content">
    <div class="login-panel">
      <md-outlined-text-field label="Логин"> </md-outlined-text-field>
      <md-outlined-text-field :type="passwordVisible ? `text` : `password`" label="Пароль">
        <md-icon-button toggle slot="trailing-icon" @click="passwordVisible = !passwordVisible">
          <md-icon>visibility</md-icon>
          <md-icon slot="selected">visibility_off</md-icon>
        </md-icon-button>
      </md-outlined-text-field>
      <div class="horizontal-container">
        <md-filled-button>Вход</md-filled-button>
        <RouterLink to="/register">
          <md-filled-button>Регистрация</md-filled-button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-panel {
  gap: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 24px;
  margin: 24px;
  background: var(--secondary-color);
  border-radius: 16px;
  max-width: 400px;
  flex-grow: 1;
}

.horizontal-container {
  display: flex;
  gap: 24px;
}

</style>
