<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const contentItems = ref([])
const collectionItems = ref([])
const newsItems = ref([])

const router = useRouter()

onMounted(() => {
  const contentArr = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    src: `https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/69a24e4b-d83e-4753-9cb4-f5aacdbc59f3/1920x`,
    alt: `desc${index + 1}`,
  }))
  contentArr.forEach((item) => {
    contentItems.value.push(item)
  })
  const collectionArr = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `collection${index + 1}`,
  }))
  collectionArr.forEach((item) => {
    collectionItems.value.push(item)
  })
  const newsArr = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    src: `/src/assets/images/placeholder.jpg`,
    alt: `desc${index + 1}`,
    title: "News title",
    text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet."
  }))
  newsArr.forEach((item) => {
    newsItems.value.push(item)
  })
})
</script>

<template>
  <div class="content">
    <h1 class="section-name">Популярно сейчас</h1>
    <Swiper
      :modules="[Navigation, Mousewheel]"
      :mousewheel="true"
      :navigation="true"
      :spaceBetween=12
      class="my-swiper"
      slidesPerView="auto"
    >
      <SwiperSlide
        v-for="item in contentItems"
        :key="item.id"
        class="image-container"
        @click="router.push(`/content/${item.id}`)"
      >
        <img :src="item.src" :alt="item.alt" />
      </SwiperSlide>
    </Swiper>
    <h1 class="section-name">Выбор редакторов</h1>
    <Swiper
      :modules="[Navigation, Mousewheel]"
      :mousewheel="true"
      :navigation="true"
      :spaceBetween=12
      class="my-swiper"
      slidesPerView="auto"
    >
      <SwiperSlide
        v-for="item in collectionItems"
        :key="item.id"
        class="collection-container"
        @click="router.push(`/collection/${item.id}`)"
      >
        <md-icon slot="icon">movie</md-icon>
        <label>{{ item.name }}</label>
      </SwiperSlide>
    </Swiper>
    <h1 class="section-name">Последние новости</h1>
    <div class="news-list">
      <div
        v-for="item in newsItems"
        :key="item.id"
        class="news-container"
        @click="router.push(`/news/${item.id}`)"
      >
        <img :src="item.src" :alt="item.alt">
        <div class="news-body">
          <h3> {{ item.title }} </h3>
          <p> {{ item.text }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.content {
  max-width: 100vw; /* Prevent stretching */
  overflow-x: hidden;
  box-sizing: border-box;
}

.section-name {
  margin: 0;
  padding: 0 0 0 20px;
}

body {
  font-family: Roboto, system-ui, sans-serif;
  margin: 0;
}

.my-swiper {
  padding: 12px 32px;
}

.image-container {
  width: 150px; /* Set your desired width */
  height: 250px; /* Set your desired height */
  padding: 20px;
  border-radius: 16px;
  background-color: #272D36;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: fill; /* Ensure the image fits within container dimensions */
  user-select: none;
}

.collection-container {
  width: 150px;
  height: 150px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 16px; /* Rounded corners */
  background-color: #272D36; /* Background color of the rectangle */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow effect */
}

.collection-container label {
  text-align: center;
}

.news-list {
  margin: 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-container {
  display: flex;
  align-items: stretch;
  border-radius: 16px; /* Rounded corners */
  background-color: #272D36; /* Background color of the rectangle */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow effect */
  gap: 12px;
  padding: 20px;
}

.news-container img {
  height: 96px;
  border-radius: 12px;
  aspect-ratio: 1.25;
  object-fit: cover;
}

.news-body {
  flex-grow: 1; /* Allow news-body to take up available space */
  min-width: 0; /* Important: Allow shrinking below content size */
  overflow: hidden;
}

.news-body h3 {
  margin: 0;
  padding: 0;
  font-size: 12px;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.news-body p {
  margin: 8px 0 0;
  padding: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Constrain to 2 lines for the paragraph */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 1.4; /* Adjust line height for better readability */
}

@media screen and (max-device-width: 480px) {

  .image-container {
    width: 100px;
    height: 150px;
    padding: 12px;
  }

  .collection-container {
    width: 100px;
    height: 100px;
    padding: 16px;
  }

  .section-name {
    font-size: 24px;
    padding-left: 8px;
  }

  .news-list {
    margin: 10px 12px;
    font-size: 12px;
  }

  .news-container {
    padding: 16px;
  }

  .news-container img {
    height: 64px;
  }

  .news-body p {
    -webkit-line-clamp: 2; /* Constrain to 2 lines for the paragraph */
    line-height: 1.2; /* Adjust line height for better readability */
  }

  label {
    font-size: 12px;
  }
}
</style>
