<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const reviewData = ref({
  id: 1,
  image: '/src/assets/images/placeholder.jpg',
  date: '',
  title: '',
  userName: '',
  description: ''
})

const opinionColor = computed(() => {
  const name = reviewData.value?.opinion?.name
  if (name === 'Хорошо')
    return '#76FF03'
  else if (name === 'Плохо')
    return '#FF1744'
  else
    return '#BDBDBD'
})

async function loadReview() {
  try {
    const reviewResponse = await axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/reviews/${route.params.id}`
    )
    if (reviewResponse.status === 200) {
      reviewData.value = reviewResponse.data
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  loadReview()
})
</script>

<template>
  <div class="view-content">
    <div class="review-info">
      <p>
        {{ reviewData.userName }} оставил оценку
        <span :style="{color: opinionColor}">
          {{ reviewData?.opinion?.name }}
        </span>
      </p>
      <p>{{ reviewData.date }}</p>
    </div>
    <h1 class="review-title">{{ reviewData.title }}</h1>
    <pre class="review-data"> {{ reviewData.description }} </pre>
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

.review-title {
  margin: 0;
}

.review-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.review-info p {
  color: gray;
}

.review-data {
  font-family: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
}

@media screen and (max-device-width: 480px) {
  .review-info {
    flex-direction: column;
    width: auto;
    align-items: center;
  }
  .review-info p {
    margin: 0 0 12px 0;
  }
}

</style>