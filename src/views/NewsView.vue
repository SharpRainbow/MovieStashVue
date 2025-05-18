<script setup>
import Pagination from '@/components/Pagination.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NewsItem from '@/components/NewsItem.vue'

const router = useRouter()
const newsItems = ref([])
const currentPage = ref(1)
const totalPages = ref(5)

function onPageChange(page) {
  console.log(page)
  currentPage.value = page
  if (currentPage.value === totalPages.value) {
    totalPages.value += 1
  }
  loadItems()
}

function loadItems() {
  const newsArr = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    src: `/src/assets/images/placeholder.jpg`,
    alt: `desc${index + 1}`,
    title: "News title",
    text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet."
  }))
  newsItems.value = []
  newsArr.forEach((item) => {
    newsItems.value.push(item)
  })
}

function removeContent(content) {
  contents.value.splice(contents.value.indexOf(content), 1)
}

onMounted(() => {
  loadItems()
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
        :text="item.text"
        :image="item.src"
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
  gap: 24px;
  box-sizing: border-box;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  width: 100%;
  height: 100%;
}

@media screen and (max-device-width: 480px) {

  .news-list {
    border: 0;
    padding: 0;
    gap: 12px;
  }

}
</style>