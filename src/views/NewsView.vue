<script setup>
import Pagination from '@/components/Pagination.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NewsItem from '@/components/NewsItem.vue'
import { useListData } from '@/composables/useListData.js'
import axios from '@/utils/axiosInstance.js'

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
  calculatePages()
  loadMoreNewsItems()
})
</script>

<template>
  <div class="view-news">
    <div class="news-list">
      <news-item
        v-for="item in newsItems"
        :key="item.id"
        @click="router.push(`/news/${item.id}`)"
        :title="item.title"
        :text="item.description"
        :image="item.image"
      >
      </news-item>
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