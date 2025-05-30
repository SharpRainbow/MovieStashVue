<script setup>
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const authStore = useAuthStore()
const router = useRouter()

const userData = ref({
  login: 'Login',
  email: 'example@email.com',
  nickname: 'Nickname',
})

function logOut() {
  authStore.logout()
  router.replace(`/login`)
}

async function loadUserData() {
  try {
    const userDataResponse = await axios.get(
      'https://168882.msk.web.highserver.ru/api/v1/users/personal',
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      },
    )
    if (userDataResponse.status === 200) {
      userData.value = userDataResponse.data
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadUserData()
})
</script>

<template>
  <div class="content">
    <div class="container info">
      <h2>Мои данные</h2>
      <div class="pair">
        <div class="property">{{ $t(`fields.login.label`) }}</div>
        <div class="value">{{ userData.login }}</div>
        <md-icon>chevron_right</md-icon>
      </div>
      <div class="pair">
        <div class="property">{{ $t(`fields.email.label`) }}</div>
        <div class="value">{{ userData.email }}</div>
        <RouterLink to="/account/email">
          <md-icon>chevron_right</md-icon>
        </RouterLink>
      </div>
      <div class="pair">
        <div class="property">{{ $t(`fields.displayName.label`) }}</div>
        <div class="value">{{ userData.nickname }}</div>
        <RouterLink to="/account/displayName">
          <md-icon>chevron_right</md-icon>
        </RouterLink>
      </div>
    </div>
    <md-filled-button @click="router.push(`/collections/personal`)">
      {{ $t(`buttons.user_collections`) }}
    </md-filled-button>
    <md-filled-button @click="logOut">
      {{ $t(`buttons.exit`) }}
    </md-filled-button>
  </div>
</template>

<style scoped>
md-filled-button {
  width: 100%;
  max-width: 500px;
  margin-top: 16px;
}

h2 {
  margin: 0 0 16px;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
}

.container {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  box-sizing: border-box;
  padding: 24px;
}

.pair {
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  display: flex;
  gap: 12px;
}

.pair:not(:nth-child(2)) {
  padding-top: 8px;
  border-top: 1px solid var(--secondary-color);
}

.value {
  flex-grow: 1;
  font-size: 16px;
}

.property {
  /*min-width: fit-content;*/
  font-size: 12px;
  min-width: 200px;
}

@media screen and (max-width: 480px) {
  h2 {
    font-size: 16px;
  }

  .pair {
    position: relative;
    gap: 4px;
    align-items: flex-start;
    flex-direction: column;
  }

  .pair md-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>