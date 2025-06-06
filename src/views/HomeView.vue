<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useSwiperData } from '@/composables/useSwiperData.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import NewsItem from '@/components/NewsItem.vue'
import CollectionItem from '@/components/CollectionItem.vue'
import axios from '@/utils/axiosInstance.js'

const newsItems = ref([])

const router = useRouter()

const {
  items: swiperContentItems,
  loadMore: loadMoreContents
} = useSwiperData(
  (page) =>
    axios.get(`/contents?page=${page}&limit=10`)
);

const {
  items: swiperCollectionItems,
  loadMore: loadMoreCollections
} = useSwiperData(
  (page) =>
    axios.get(`/genres/present?page=${page}&limit=10`)
);

async function fetchRecentNews() {
  try {
    const response = await axios.get("/news?page=1&limit=5")
    response.data.forEach(item => {
      newsItems.value.push(item)
    })
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  loadMoreContents()
  loadMoreCollections()
  fetchRecentNews()
})
</script>

<template>
  <div class="content">
    <h1 class="section-name">{{ $t(`labels.home.popular`) }}</h1>
    <Swiper
      :modules="[Navigation, Mousewheel]"
      :mousewheel="true"
      :navigation="true"
      :spaceBetween=12
      class="my-swiper"
      slidesPerView="auto"
      @reachEnd="loadMoreContents"
    >
      <SwiperSlide
        v-for="item in swiperContentItems"
        :key="item.id"
        class="image-container"
        @click="router.push(`/content/${item.id}`)"
      >
        <img :src="item.image" :alt="item.name" />
      </SwiperSlide>
    </Swiper>
    <h1 class="section-name">{{ $t(`labels.home.collections`) }}</h1>
    <Swiper
      :modules="[Navigation, Mousewheel]"
      :mousewheel="true"
      :navigation="true"
      :spaceBetween=12
      class="my-swiper"
      slidesPerView="auto"
      @reachEnd="loadMoreCollections"
    >
      <SwiperSlide
        v-for="item in swiperCollectionItems"
        :key="item.id"
        @click="router.push(`/collections/genre/${item.id}`)"
        class="collection-container"
      >
        <CollectionItem
          :name="item.name"
          :icon="item.icon"
        >
        </CollectionItem>
      </SwiperSlide>
    </Swiper>
    <h1 class="section-name">{{ $t(`labels.home.news`) }}</h1>
    <div class="news-list">
      <news-item
        v-for="item in newsItems"
        :key="item.id"
        :news-id="item.id"
        :title="item.title"
        :text="item.description"
        :image="item.image"
        :click-action="() => router.push(`/news/${item.id}`)"
      >
      </news-item>
    </div>
  </div>
</template>

<style scoped>

.content {
  max-width: 100vw;
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
  background-color: var(--secondary-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  user-select: none;
}

.news-list {
  margin: 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
    margin: 12px 12px;
    font-size: 12px;
    gap: 12px;
  }

  .my-swiper {
    padding: 12px 12px;
  }

  label {
    font-size: 12px;
  }
}
</style>
