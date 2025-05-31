<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const newData = ref({
  id: 0,
  image: '/src/assets/images/placeholder.jpg',
  date: '',
  title: '',
  description: '',
})

async function loadNews() {
  try {
    const newResponse = await axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/news/${route.params.id}`
    )
    if (newResponse.status === 200) {
      newData.value = newResponse.data
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  loadNews()
})
</script>

<template>
<div class="view-content">
  <p class="news-date">{{ newData.date }}</p>
  <h1 class="news-title">{{ newData.title }}</h1>
  <img v-if="newData.image" class="news-image" :src="newData.image" alt="news image"/>
  <pre class="news-data"> {{ newData.description }} </pre>
</div>
</template>

<style scoped>

.view-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 800px;
  width: 100%;
}

.news-title {
  margin-top: 0;
  text-align: center;
}

.news-image {
  border-radius: 12px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}

.news-date {
  font-size: 15px;
  color: gray;
}

.news-data {
  font-family: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
}

</style>