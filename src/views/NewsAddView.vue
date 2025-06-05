<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import axios from '@/utils/axiosInstance.js'
import { notifyError, notifySuccess } from '@/utils/notifications.js'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const newsId = ref('')
const newsTitle = ref('')
const newsImage = ref(null)
const newsDescription = ref('')
const imagePreview = computed(() => {
  if (newsImage.value) {
    return URL.canParse(newsImage.value) ? newsImage.value : URL.createObjectURL(newsImage.value)
  } else return '/src/assets/images/placeholder.jpg'
})

const autoResize = (event) => {
  event.target.style.height = 'auto'
  event.target.style.height = event.target.scrollHeight + 'px'
}
const newsSavable = computed(() => {
  return (
    newsTitle.value?.toString().trim() !== '' && newsDescription.value?.toString().trim() !== ''
  )
})
const imagePicker = ref(null)

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    newsImage.value = file
  }
}

async function saveNews() {
  try {
    const formData = new FormData()
    formData.append('title', newsTitle.value)
    formData.append('description', newsDescription.value)
    if (newsImage.value) {
      formData.append('image', newsImage.value)
    }
    let saveResponse
    if (newsId.value > 0) {
      saveResponse = await axios.patch(`/news/${newsId.value}`, formData)
    } else {
      saveResponse = await axios.post('/news', formData)
    }

    if (saveResponse.status === 201 || saveResponse.status === 200) {
      await router.replace('/news')
      notifySuccess(t('notifications.news.saved'))
    }
  } catch (e) {
    notifyError(t('notifications.news.saved_error'))
    console.error(e)
  }
}

async function loadNewsData(id) {
  try {
    const newsResponse = await axios.get(`/news/${id}`)
    if (newsResponse.status === 200 && newsResponse.data) {
      newsId.value = newsResponse.data.id
      newsDescription.value = newsResponse.data.description
      newsTitle.value = newsResponse.data.title
      newsImage.value = newsResponse.data.image
    }
  } catch (e) {
    console.error(e)
  }
}

function goBack() {
  if (window.history.state.back) {
    router.back()
  } else {
    router.replace('/news')
  }
}

onMounted(() => {
  if (route.query.news_id) {
    loadNewsData(route.query.news_id)
  }
})
</script>

<template>
  <div class="view-content">
    <input
      type="text"
      class="news-title"
      v-model="newsTitle"
      :placeholder="$t(`fields.news.placeholder.title`)"
    />
    <input
      type="file"
      ref="imagePicker"
      accept="image/png, image/jpeg"
      style="display: none"
      @change="handleImageUpload"
    />
    <img
      class="news-image"
      :src="imagePreview"
      @click="$refs.imagePicker.click()"
      style="cursor: pointer"
      alt="news image"
    />
    <textarea
      :placeholder="$t(`fields.news.placeholder.desc`)"
      v-model="newsDescription"
      @input="autoResize"
    ></textarea>
    <div class="news-actions">
      <md-text-button @click="goBack">{{ $t(`buttons.cancel`) }}</md-text-button>
      <md-filled-button :disabled="!newsSavable" @click="saveNews">{{
        $t(`buttons.publish`)
      }}</md-filled-button>
    </div>
  </div>
</template>

<style scoped>
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
  padding: 0 24px;
  max-width: 800px;
  width: 100%;
}

.news-title {
  font-family: inherit;
  margin-bottom: 16px;
  font-size: 32px;
  padding: 12px;
  border: none;
  text-align: center;
  background-color: var(--secondary-color);
  box-sizing: border-box;
  border-radius: 16px;
  width: 100%;
}

.news-image {
  border-radius: 12px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}

.news-actions {
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>
