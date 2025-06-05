<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/axiosInstance.js'
import { notifyError, notifySuccess } from '@/utils/notifications.js'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const reviewId = ref(0)
const contentId = ref(Number(route.query.content_id) || 0)
const reviewTitle = ref('')
const reviewDescription = ref('')
const reviewOpinion = ref(0)
const autoResize = (event) => {
  event.target.style.height = 'auto'
  event.target.style.height = event.target.scrollHeight + 'px'
}
const opinionOptions = ref([])
const reviewSavable = computed(() => {
  return reviewTitle.value.toString().trim() !== '' &&
    reviewDescription.value.toString().trim() !== '' &&
    reviewOpinion.value > 0 &&
    contentId.value > 0
})

async function postReview() {
  try {
    const reviewData = {
        contentId: contentId.value,
        title: reviewTitle.value,
        description: reviewDescription.value,
        opinionId: reviewOpinion.value,
    }
    let createReviewResponse
    if (reviewId.value > 0) {
      createReviewResponse = await axios.patch(
        `/reviews/${reviewId.value}`,
        reviewData
      )
    } else {
      createReviewResponse = await axios.post(
        `/reviews`,
        reviewData
      )
    }
    if (createReviewResponse.status === 201 || createReviewResponse.status === 200 ) {
      await router.replace(`/content/${contentId.value}`)
      notifySuccess('Рецензия сохранена!')
    }
  } catch (error) {
    console.error(error)
    notifyError('Не удалось сохранить рецензию!')
  }
}

async function loadOpinionOptions() {
  try {
    const opinionResponse = await axios.get(
      `/opinions`
    )
    if (opinionResponse.status === 200) {
      opinionOptions.value.push(...opinionResponse.data)
    }
  } catch (error) {
    console.error(error)
  }
}

async function checkUserReviews() {
  try {
    const request = await axios.get(
      `/contents/${contentId.value}/reviews?limit=1`
    )
    const review = request.data[0]
    if (request.status === 200 && Number(authStore.user?.userId) === Number(review?.userId)) {
      reviewTitle.value = review.title
      reviewDescription.value = review.description
      reviewOpinion.value = review.opinion.id
      reviewId.value = review.id
    }
  } catch (err) {
    console.error(err)
  }
}

function goBack() {
  if (window.history.state.back) {
    router.back()
  } else {
    router.replace('/account')
  }
}

onMounted(() => {
  loadOpinionOptions()
  checkUserReviews()
})
</script>

<template>
  <div class="view-content">
    <input
      type="text"
      class="review-title"
      v-model="reviewTitle"
      :placeholder="$t(`fields.review.placeholder.title`)"
    />
    <select ref="opinionSelector" v-model="reviewOpinion">
      <option selected disabled value="0">
        {{ $t(`fields.review.placeholder.type`) }}
      </option>
      <option v-for="option in opinionOptions" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <textarea
      :placeholder="$t(`fields.review.placeholder.desc`)"
      v-model="reviewDescription"
      @input="autoResize"
    ></textarea>
    <div class="review-actions">
      <md-text-button @click="goBack">{{ $t(`buttons.cancel`) }}</md-text-button>
      <md-filled-button :disabled="!reviewSavable" @click="postReview">
        {{ $t(`buttons.publish`) }}
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
