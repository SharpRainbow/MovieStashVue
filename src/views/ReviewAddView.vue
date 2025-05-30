<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { notifyError, notifySuccess } from '@/utils/notifications.js'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const reviewData = ref({
  content_id: Number(route.query.content_id) || 0,
  title: '',
  description: '',
  opinion_id: 0
})
const autoResize = (event) => {
  event.target.style.height = 'auto'
  event.target.style.height = event.target.scrollHeight + 'px'
}
const opinionOptions = ref([])
const reviewSavable = computed(() => {
  return reviewData.value.title.toString().trim() !== '' &&
    reviewData.value.description.toString().trim() !== '' &&
    reviewData.value.opinion_id !== 0 &&
    reviewData.value.content_id > 0
})

async function createReview() {
  try {
    const createReviewResponse = await axios.post(
      `https://168882.msk.web.highserver.ru/api/v1/reviews`,
      reviewData.value,
      { headers: { Authorization: `Bearer ${authStore.token}` }}
    )
    if (createReviewResponse.status === 201) {
      await router.replace(`/content/${reviewData.value.content_id}`)
      notifySuccess('Рецензия сохранена!')
    }
  } catch (error) {
    console.error(error)
    notifyError('Не удалось сохранить рецензию!')
  }
}

onMounted(() => {
  opinionOptions.value.push(...[
    {
      id: 1,
      name: 'Плохо'
    },
    {
      id: 2,
      name: 'Нейтрально'
    },
    {
      id: 3,
      name: 'Хорошо'
    }
  ])
})
</script>

<template>
  <div class="view-content">
    <input
      type="text"
      class="review-title"
      v-model="reviewData.title"
      :placeholder="$t(`fields.review.placeholder.title`)"
    />
    <select ref="opinionSelector" v-model="reviewData.opinion_id">
      <option selected disabled value="0">
        {{ $t(`fields.review.placeholder.type`) }}
      </option>
      <option v-for="option in opinionOptions" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <textarea
      :placeholder="$t(`fields.review.placeholder.desc`)"
      v-model="reviewData.description"
      @input="autoResize"
    ></textarea>
    <div class="review-actions">
      <md-text-button>Отмена</md-text-button>
      <md-filled-button :disabled="!reviewSavable" @click="createReview">
        Опубликовать
      </md-filled-button>
    </div>
  </div>
</template>

<style scoped>

select {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: none;
  border-radius: 16px;
  background-color: var(--secondary-color);
  cursor: pointer;
  font-weight: bold;
  font-family: inherit;
}

textarea {
  font-family: inherit;
  width: 100%;
  min-height: 160px;
  resize: none;
  margin: 16px;
  padding: 12px;
  box-sizing: border-box;
  border: none;
  background-color: var(--secondary-color);
  border-radius: 16px;
  font-size: 14px;
}

.view-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  box-sizing: border-box;
  padding: 24px 24px;
  max-width: 800px;
  width: 100%;
}

.review-title {
  width: 100%;
  font-family: inherit;
  margin-bottom: 16px;
  font-size: 24px;
  padding: 12px;
  border: none;
  background-color: var(--secondary-color);
  border-radius: 16px;
  box-sizing: border-box;
}

.review-actions {
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 16px;
}

</style>
