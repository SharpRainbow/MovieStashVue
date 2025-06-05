<script setup>
import Pagination from '@/components/Pagination.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NewsItem from '@/components/NewsItem.vue'
import { useListData } from '@/composables/useListData.js'
import axios from '@/utils/axiosInstance.js'
import { useAuthStore } from '@/stores/authStore.js'
import { useConfirmableAction } from '@/composables/useConfirmableAction.js'
import { notifyError, notifySuccess } from '@/utils/notifications.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const itemLimit = 5

const {
  items: newsItems,
  loadPage: loadMoreNewsItems,
  totalPages,
  currentPage,
} = useListData((page) => {
  return axios.get(
    `/news?page=${page}&limit=${itemLimit}`,
  )
})

function resetNewsList() {
  totalPages.value = 0
  currentPage.value = 1
  newsItems.value = []
  calculatePages()
  loadMoreNewsItems()
}

async function removeNews(newsId) {
  try {
    const deleteResponse = await axios.delete(
      `/news/${newsId}`
    )
    if (deleteResponse.status === 200) {
      notifySuccess(t('notifications.news.deleted'))
      resetNewsList()
    }
  } catch (error) {
    notifyError(t('notifications.news.deleted_error'))
  }
}

function changeNews(newsId) {
  router.push({ path: '/news/add', query: { news_id: newsId } })
}

function onPageChange(page) {
  currentPage.value = page
  if (currentPage.value === totalPages.value) {
    calculatePages()
  }
  loadMoreNewsItems()
}

async function calculatePages() {
  const pageNumber = currentPage.value > 1 ? Math.ceil(currentPage.value / 3) + 1 : 1
  try {
    const news = await axios.get(
      `/news?page=${pageNumber}&limit=${itemLimit * 3}`,
    )
    const items = news.data.length / itemLimit
    totalPages.value += Math.ceil(items)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  resetNewsList()
})
</script>

<template>
  <div class="view-news">
    <div class="news-list">
      <news-item
        v-for="item in newsItems"
        :key="item.id"
        :news-id="item.id"
        :title="item.title"
        :text="item.description"
        :image="item.image"
        :delete-action="authStore.hasRole('moderator') ? removeNews : null"
        :change-action="authStore.hasRole('moderator') ? changeNews : null"
        :click-action="() => router.push(`/news/${item.id}`)"
      >
      </news-item>
    </div>
    <div class="news-actions" v-if="authStore.hasRole('moderator')">
      <md-filled-button @click="router.push('/news/add')">{{ $t('buttons.add') }}</md-filled-button>
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

.view-news {
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

.news-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  width: 100%;
  height: 100%;
}

.news-actions {
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 12px;
  margin-right: 12px;
}

@media screen and (max-device-width: 480px) {

  .view-news {
    padding: 0 12px;
  }

  .news-list {
    border: 0;
    padding: 0;
    gap: 12px;
  }

}
</style>