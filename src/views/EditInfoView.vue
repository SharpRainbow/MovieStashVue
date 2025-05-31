<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore.js'
import { notifySuccess, notifyError } from '@/utils/notifications.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const activeData = ref('')
const isSavable = computed(() => activeData.value.trim() === '')

function onInput(e) {
  activeData.value = e.target.value
}

function goBack() {
  if (window.history.state.back) {
    router.back()
  } else {
    router.replace('/account')
  }
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
      activeData.value = userDataResponse.data[`${route.params.property}`]
    }
  } catch (error) {
    console.error(error)
  }
}

async function updateUserData() {
  try {
    const userDataResponse = await axios.patch(
      'https://168882.msk.web.highserver.ru/api/v1/users/personal',
      {
        [route.params.property]: activeData.value,
      },
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      },
    )
    if (userDataResponse.status === 200) {
      notifySuccess(t('notifications.profile.updated'))
    }
  } catch (error) {
    console.error(error)
    notifyError(t('notifications.profile.update_error'))
  }
}

onMounted(() => {
  loadUserData()
})
</script>

<template>
<div class="content">
  <div class="external">
  <div class="horizontal-container">
    <RouterLink to="/account" @click="goBack">
      <md-icon>chevron_left</md-icon>
    </RouterLink>
    <h2>{{ $t(`fields.${route.params.property}.label`) }}</h2>
  </div>
  </div>
  <div class="container">
    <md-outlined-text-field
      :label="$t(`fields.${route.params.property}.label`)"
      :value="activeData"
      @input="onInput"
    />
    <h4>{{ $t(`fields.${route.params.property}.note`) }}</h4>
    <p>{{ $t(`fields.${route.params.property}.description`) }}</p>
    <div class="horizontal-container">
      <md-text-button @click="goBack">
        {{ $t(`buttons.cancel`) }}
      </md-text-button>
      <md-filled-button @click="updateUserData" :disabled="isSavable">
        {{ $t(`buttons.save`) }}
      </md-filled-button>
    </div>
  </div>
</div>
</template>

<style scoped>

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  box-sizing: border-box;
  padding: 24px;
  justify-items: center;
}

.container h4 {
  margin-top: 32px;
  margin-bottom: 0;
}

.external {
  width: 100%;
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--secondary-color);
}

.horizontal-container {
  display: flex;
  gap: 24px;
  justify-content: flex-start;
  align-items: center;
  max-width: 500px;
  margin: auto;
  width: 100%;
}

.container .horizontal-container {
  justify-content: flex-end;
}

h2 {
  padding: 0;
  margin: 0;
}

</style>