<script setup>
import Pagination from '@/components/Pagination.vue'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useListData } from '@/composables/useListData.js'
import { useAuthStore } from '@/stores/authStore.js'
import axios from '@/utils/axiosInstance.js'
import Review from '@/components/Review.vue'
import { notifyError } from '@/utils/notifications.js'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const itemLimit = 4

const {
  items: reviewItems,
  loadPage: loadMoreReviewItems,
  totalPages,
  currentPage,
} = useListData((page) => {
  return axios.get(
    `/contents/${route.query.content_id}/reviews?page=${page}&limit=${itemLimit}`,
  )
})

function onPageChange(page) {
  currentPage.value = page
  if (currentPage.value === totalPages.value) {
    calculatePages()
  }
  loadMoreReviewItems()
}

async function calculatePages() {
  const pageNumber = currentPage.value > 1 ? Math.ceil(currentPage.value / 3) + 1 : 1
  try {
    const news = await axios.get(
      `/contents/${route.query.content_id}/reviews?page=${pageNumber}&limit=${itemLimit * 3}`,
    )
    const items = news.data.length / itemLimit
    totalPages.value += Math.ceil(items)
  } catch (e) {
    console.error(e)
  }
}

function resetReviewList() {
  totalPages.value = 0
  currentPage.value = 1
  reviewItems.value = []
  calculatePages()
  loadMoreReviewItems()
}

async function removeReview(reviewId) {
  try {
    const createReviewResponse = await axios.delete(
      `/reviews/${reviewId}`
    )
    if (createReviewResponse.status === 200) {
      resetReviewList()
    }
  } catch (error) {
    console.error(error)
    notifyError(t('notifications.content.review_delete_error'))
  }
}

function changeReview() {
  router.push({ path: '/reviews/add', query: { content_id: route.query.content_id } })
}

function actionAccessible(userId) {
  return authStore.isLoggedIn && (Number(authStore.user?.userId) === Number(userId))
}

onMounted(() => {
  resetReviewList()
})
</script>

<template>
  <div class="view-reviews">
    <div class="reviews-list">
      <Review
        v-for="item in reviewItems"
        :key="item.id"
        :review-id="item.id"
        :title="item.title"
        :description="item.description"
        :type="item.opinion.name"
        :date="item.date"
        :author="item.userName"
        :delete-action="(actionAccessible(item.userId) || authStore.hasRole('moderator')) ? removeReview : null"
        :change-action="actionAccessible(item.userId) ? changeReview : null"
        :click-action="() => router.push(`/reviews/${item.id}`)"
      >
      </Review>
    </div>
    <div class="pagination-wrapper">
      <pagination
        :currentPage="currentPage"
        :perPage="10"
        :totalPages="totalPages"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped>

.view-reviews {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 1000px;
  width: 100%;
  height: 100%;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  width: 100%;
  height: 100%;
  gap: 16px;
  padding: 20px 24px;
}

@media screen and (max-device-width: 480px) {

  .view-reviews {
    padding: 0 12px;
  }

  .reviews-list {
    border: 0;
    padding: 0;
    gap: 12px;
  }

}
</style>