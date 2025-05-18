<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import NewsItem from '@/components/NewsItem.vue'
import CollectionItem from '@/components/CollectionItem.vue'

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
        @click="router.push(`/collection/${item.id}`)"
        class="collection-container"
      >
        <CollectionItem
          :name="item.name"
        >
        </CollectionItem>
      </SwiperSlide>
    </Swiper>
    <h1 class="section-name">Последние новости</h1>
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

.swiper-slide {
  width: auto;
}

.image-container {
  width: 150px;
  height: 250px;
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

.news-list {
  margin: 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media screen and (max-device-width: 480px) {

  .image-container {
    width: 100px;
    height: 150px;
    padding: 12px;
  }

  .section-name {
    font-size: 24px;
    padding-left: 8px;
  }

  .news-list {
    margin: 10px 12px;
    font-size: 12px;
  }

  .my-swiper {
    padding: 10px 12px;
  }

  label {
    font-size: 12px;
  }
}
</style>
