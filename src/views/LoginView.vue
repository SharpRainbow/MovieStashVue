<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { notifyError } from '@/utils/notifications.js'

const authStore = useAuthStore()
const router = useRouter()
const passwordVisible = ref(false)
const userLogin = ref('')
const userPassword = ref('')

async function tryLogin() {
  const error = await authStore.login(userLogin.value, userPassword.value)
  if (error) {
    let text = 'Не удалось выполнить вход!'
    switch (error.status) {
      case 404:
        text = 'Пользователь не найден!'
        break
      case 401:
        text = 'Введен неверный пароль!'
        break
    }
    notifyError(text)
  }
  else
    await router.replace('/account')
}

function loginChanged(event) {
  userLogin.value = event.target.value
}

function passwordChanged(event) {
  if (event.target.id === 'password') {
    userPassword.value = event.target.value
  }
}
</script>

<template>
  <div class="content">
    <div class="login-panel">
      <md-outlined-text-field
        :label="$t(`fields.login.label`)"
        @input="loginChanged">
      </md-outlined-text-field>
      <md-outlined-text-field
        id="password"
        :type="passwordVisible ? `text` : `password`"
        :label="$t(`fields.password.label`)"
        @input="passwordChanged"
      >
        <md-icon-button toggle slot="trailing-icon" @click="passwordVisible = !passwordVisible">
          <md-icon>visibility</md-icon>
          <md-icon slot="selected">visibility_off</md-icon>
        </md-icon-button>
      </md-outlined-text-field>
      <div class="horizontal-container">
        <md-filled-button @click="tryLogin">
          {{ $t(`buttons.login`) }}
        </md-filled-button>
        <RouterLink to="/register">
          <md-filled-button>
            {{ $t(`buttons.register`) }}
          </md-filled-button>
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
