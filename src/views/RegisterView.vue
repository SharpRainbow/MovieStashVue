<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { notifyError, notifySuccess } from '@/utils/notifications.js'
import axios from 'axios'

const router = useRouter()
const passwordVisible = ref(false)
const userLogin = ref('')
const userPassword = ref('')
const userEmail = ref('')
const userNickname = ref('')
const dataProvided = computed(() => {
  return userLogin.value &&
    userPassword.value &&
    userEmail.value &&
    userNickname.value
})

async function tryRegister() {
  try {
    const response = await axios.post('https://168882.msk.web.highserver.ru/api/v1/register',
      {
        email: userEmail.value,
        login: userLogin.value,
        password: userPassword.value,
        nickname: userNickname.value,
      }
    )
    if (response.status === 201) {
      await router.replace('/login')
      notifySuccess('Регистрация успешна!')
    }
  } catch (error) {
    console.error(error)
    let text = 'Не удалось зарегистрироваться!'
    if (error.status === 400) {
      text = 'Неверные учетные данные!'
    }
    notifyError(text)
  }
}

function loginChanged(event) {
  userLogin.value = event.target.value
}

function passwordChanged(event) {
  userPassword.value = event.target.value
}

function emailChanged(event) {
  userEmail.value = event.target.value
}

function nicknameChanged(event) {
  userNickname.value = event.target.value
}
</script>

<template>
  <div class="content">
    <div class="reg-panel">
      <md-outlined-text-field
        :label="$t(`fields.login.label`)"
        @input="loginChanged"
      >
      </md-outlined-text-field>
      <md-outlined-text-field
        :type="passwordVisible ? `text` : `password`"
        :label="$t(`fields.password.label`)"
        @input="passwordChanged">
        <md-icon-button toggle slot="trailing-icon" @click="passwordVisible = !passwordVisible">
          <md-icon>visibility</md-icon>
          <md-icon slot="selected">visibility_off</md-icon>
        </md-icon-button>
      </md-outlined-text-field>
      <md-outlined-text-field
        type="email"
        :label="$t(`fields.email.label`)"
        @input="emailChanged"
      >
      </md-outlined-text-field>
      <md-outlined-text-field
        :label="$t(`fields.nickname.label`)"
        @input="nicknameChanged"
      >
      </md-outlined-text-field>
      <md-filled-button :disabled="!dataProvided" @click="tryRegister">
        {{ $t(`buttons.register_action`) }}
      </md-filled-button>
    </div>
  </div>
</template>

<style scoped>
.content {
  flex-grow: 1;
  justify-items: center;
  align-content: center;
}

.reg-panel{
  gap: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 24px;
  background: var(--secondary-color);
  border-radius: 16px;
  width: 400px;
}

@media screen and (max-device-width: 480px) {
  .reg-panel {
    width: auto;
  }
}
</style>