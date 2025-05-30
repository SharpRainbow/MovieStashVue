<script setup>
import { onMounted, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Navigation } from 'swiper/modules'
import { useRoute, useRouter } from 'vue-router'
import 'swiper/css'
import 'swiper/css/navigation'
import Review from '@/components/Review.vue'
import axios from 'axios'
import { useSwiperData } from '@/composables/useSwiperData.js'
import { useAuthStore } from '@/stores/authStore.js'
import { notifyError, notifySuccess, notifyInfo } from '@/utils/notifications.js'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const reviewItems = ref([])
const userCollections = ref([])
const rateDialogRef = ref(null)
const addDialogRef = ref(null)
const reviewAdded = ref(false)
const ratingSlider = ref(null)
const ratingId = ref(0)
const ratingValue = ref(0)

watch(
  () => reviewItems.value.length,
  () => {
    if (authStore.isLoggedIn && reviewItems.value.length > 0) {
      reviewAdded.value = Number(reviewItems.value[0].userId) === Number(authStore.user.userId)
      if (reviewAdded.value) {
        reviewItems.value[0].actions = true
        reviewItems.value[0].deleteAction = removeReview
      }
    }
  },
)

const contentInfo = ref({
  boxOffice: 0,
  budget: 0,
  countries: '',
  description: '',
  duration: '',
  genres: '',
  id: 0,
  image: '',
  name: '',
  rating: 0,
  ratingImdb: 0,
  ratingKinopoisk: 0,
  releaseDate: '',
})

function showRateDialog() {
  rateDialogRef.value.show()
}

function showAddDialog() {
  if (userCollections.value.length <= 0) {
    notifyInfo('Для добавления фильма создайте коллекцию!')
    return
  }
  addDialogRef.value.show()
}

async function removeReview(reviewId) {
  try {
    const createReviewResponse = await axios.delete(
      `https://168882.msk.web.highserver.ru/api/v1/reviews/${reviewId}`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    if (createReviewResponse.status === 200) {
      await loadContentReviews()
    }
  } catch (error) {
    console.error(error)
    notifyError('Не удалось удалить рецензию!')
  }
}

async function addContentToCollection(collection) {
  try {
    const addToCollectionResponse = await axios.post(
      `https://168882.msk.web.highserver.ru/api/v1/collections/personal/${collection.id}/contents?content=${route.params.id}`,
      null,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    if (addToCollectionResponse.status === 201) {
      notifySuccess('Коллекция обновлена!')
    }
  } catch (error) {
    console.error(error)
    notifyError('Не удалось добавить фильм в коллекцию!')
  }
  addDialogRef.value.close()
}

async function loadUserCollections() {
  try {
    const collectionsResponse = await axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/collections/personal?limit=-1`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    if (collectionsResponse.status === 200 && collectionsResponse.data.length > 0) {
      userCollections.value.push(...collectionsResponse.data)
    }
  } catch (error) {
    console.error(error)
  }
}

async function loadContentInfo() {
  try {
    const request = await axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/contents/${route.params.id}`,
    )
    contentInfo.value = request.data
    contentInfo.value.genres = contentInfo.value.genres.map((entry) => entry.name).join(', ')
    contentInfo.value.countries = contentInfo.value.countries.map((entry) => entry.name).join(', ')
  } catch (err) {
    console.error(err)
  }
}

async function loadContentReviews() {
  try {
    const request = await axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/contents/${route.params.id}/reviews?limit=5`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    if (request.status === 200) {
      reviewItems.value = []
      reviewItems.value.push(...request.data)
    }
  } catch (err) {
    notifyError('Не удалось загрузить рецензии!')
  }
}

async function loadRating() {
  try {
    const request = await axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/stars?content_id=${route.params.id}`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    if (request.status === 200) {
      ratingValue.value = request.data.rating
      ratingId.value = request.data.id
    }
  } catch (err) {
    if (err.status === 404) {
      ratingValue.value = 0
      ratingId.value = 0
    }
    console.error(err)
  }
}

async function rateContent() {
  try {
    const rating = ratingSlider.value.value
    let request
    if (ratingId.value > 0) {
      request = await axios.patch(
        `https://168882.msk.web.highserver.ru/api/v1/stars/${ratingId.value}?rating=${rating}`,
        null,
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )
    } else {
      request = await axios.post(
        `https://168882.msk.web.highserver.ru/api/v1/stars`,
        {
          content_id: Number(route.params.id),
          rating: rating,
        },
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )
    }
    if (request.status === 200) await loadRating()
  } catch (err) {
    notifyError('Не удалось поставить оценку!')
  }
}

const { items: swiperCelebritiesItems, loadMore: loadMoreCelebrities } = useSwiperData((page) =>
  axios.get(
    `https://168882.msk.web.highserver.ru/api/v1/contents/${route.params.id}/celebrities?page=${page}&limit=20`,
  ),
)

onMounted(() => {
  loadMoreCelebrities()
  loadContentReviews()
  loadContentInfo()
  if (authStore.isLoggedIn) {
    loadUserCollections()
    loadRating()
  }
})
</script>

<template>
  <div class="content">
    <div id="upper-content" class="horizontal-container">
      <div class="img-container">
        <img id="poster" :src="contentInfo.image" alt="poster" />
      </div>
      <div class="content-container">
        <h1 id="content-name">{{ contentInfo.name }}</h1>
        <div id="rating-values" class="horizontal-container">
          <div class="rating">
            <div id="rt-kp">{{ contentInfo.ratingKinopoisk }}</div>
            <img class="service-icons" src="/src/assets/icons/kp.svg" alt="ico-kp" />
          </div>
          <div class="rating">
            <div id="rt-imdb">{{ contentInfo.ratingImdb }}</div>
            <img class="service-icons" src="/src/assets/icons/imdb.svg" alt="ico-imdb" />
          </div>
          <div class="rating">
            <div id="rt-mvstsh">{{ contentInfo.rating }}</div>
            <md-icon slot="icon">movie</md-icon>
          </div>
        </div>
        <div id="action-buttons" class="horizontal-container" v-if="authStore.isLoggedIn">
          <md-filled-button @click="showAddDialog">
            Добавить
            <md-icon slot="icon">create_new_folder</md-icon>
          </md-filled-button>
          <md-filled-button @click="showRateDialog">
            Оценить
            <md-icon slot="icon">star</md-icon>
          </md-filled-button>
        </div>
      </div>
      <div class="movie-info">
        <h1 id="about-mov">О фильме</h1>
        <p id="content-description">
          {{ contentInfo.description }}
        </p>
        <div class="horizontal-container">
          <md-icon slot="icon">theater_comedy</md-icon>
          <div class="property">Жанры:</div>
          <div id="genres" class="value">{{ contentInfo.genres }}</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">language</md-icon>
          <div class="property">Страна производства:</div>
          <div id="country" class="value">{{ contentInfo.countries }}</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">event</md-icon>
          <div class="property">Дата выхода:</div>
          <div id="release-date" class="value">{{ contentInfo.releaseDate }}</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">schedule</md-icon>
          <div class="property">Продолжительность:</div>
          <div id="duration" class="value">{{ contentInfo.duration }}</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">pie_chart</md-icon>
          <div class="property">Бюджет:</div>
          <div id="budget" class="value">${{ contentInfo.budget }}</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">attach_money</md-icon>
          <div class="property">Сборы:</div>
          <div id="box-office" class="value">${{ contentInfo.boxOffice }}</div>
        </div>
      </div>
    </div>
    <h1 class="main-page-text">Актерский состав</h1>
    <Swiper
      :modules="[Navigation, Mousewheel]"
      :mousewheel="true"
      :navigation="true"
      :spaceBetween="12"
      class="my-swiper"
      slidesPerView="auto"
      @reachEnd="loadMoreCelebrities"
    >
      <SwiperSlide
        v-for="item in swiperCelebritiesItems"
        :key="item.id"
        class="person-container"
        @click="router.push(`/person/${item.id}`)"
      >
        <div class="image-container">
          <img :src="item.image" alt="person image" />
        </div>
        <div class="person-name">{{ item.name }}</div>
        <div class="person-role">{{ item.role }}</div>
      </SwiperSlide>
    </Swiper>
    <md-dialog id="rate-dialog" ref="rateDialogRef">
      <div slot="headline">Поставьте оценку</div>
      <form slot="content" id="form-id" method="dialog">
        <md-slider
          step="1"
          ticks
          min="0"
          max="10"
          ref="ratingSlider"
          :value="ratingValue"
        ></md-slider>
      </form>
      <div slot="actions">
        <md-text-button form="form-id" value="cancel">Отмена</md-text-button>
        <md-text-button form="form-id" value="ok" @click="rateContent">Ок</md-text-button>
      </div>
    </md-dialog>
    <md-dialog id="collections-dialog" ref="addDialogRef">
      <div slot="headline">Выберите коллекцию</div>
      <div
        slot="content"
        class="user-collection"
        v-for="item in userCollections"
        @click="addContentToCollection(item)"
      >
        <p>{{ item.name }}</p>
      </div>
    </md-dialog>
    <h1 class="main-page-text">Отзывы</h1>
    <Review
      v-for="item in reviewItems"
      :key="item.id"
      :reviewId="item.id"
      :author="item.userName"
      :date="item.date"
      :title="item.title"
      :description="item.description"
      :actionsVisibility="item.actions"
      :delete-action="item.deleteAction"
    >
    </Review>
    <div class="review-actions" v-if="!reviewAdded">
      <md-text-button
        @click="router.push({ path: '/review/add', query: { content_id: 1 } })"
        v-if="authStore.isLoggedIn"
      >
        Добавить
      </md-text-button>
    </div>
  </div>
</template>

<style scoped>
#content-name,
#about-mov {
  text-align: center;
  margin-top: 0;
}

#content-name {
  width: 300px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: normal;
}

h3 {
  margin-bottom: 4px;
}

body {
  margin: 0;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-container {
  width: 100%;
  height: 100%;
  max-width: 300px;
  min-width: 200px;
  aspect-ratio: 2 / 3;
  border-radius: 16px;
  margin-right: 10px;
  overflow: hidden;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  user-select: none;
}

.movie-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: flex-start;
}

.main-page-text {
  margin-left: 20px;
}

.movie-info h1 {
  margin-bottom: 0;
}

.movie-info .horizontal-container {
  align-items: center;
  margin-top: 10px;
}

.horizontal-container {
  display: flex;
  gap: 10px;
}

#upper-content {
  max-width: 100%;
  overflow-x: auto;
  padding-left: 32px;
  padding-right: 32px;
}

#rating-values {
  gap: 50px;
}

#action-buttons {
  margin-top: 24px;
}

.my-swiper {
  padding: 0 32px;
}

.property {
  /*min-width: fit-content;*/
  min-width: 200px;
}

.rating img {
  width: 40px;
  height: 40px;
}

.rating md-icon {
  --md-icon-size: 40px;
  font-variation-settings: 'FILL' 1;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--focus-color);
  font-weight: bold;
}

.value {
  word-wrap: break-word;
}

.person-container {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.image-container {
  width: 100px; /* Set your desired width */
  flex: 0 0 auto;
  aspect-ratio: 2 / 3;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Image Styling */
.image-container img {
  width: 100%;
  height: 100%;
  /*object-fit: fill;*/
  user-select: none;
}

.person-name,
.person-role {
  text-align: center;
  width: 110px;
}

.review-actions {
  display: flex;
  justify-content: end;
  margin-right: 32px;
}

.user-collection {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 16px; /* Rounded corners */
  background-color: var(--focus-color); /* Background color of the rectangle */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow effect */
  padding: 0 16px;
  margin: 12px 20px;
}

.review-form {
  justify-self: center;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 24px;
    margin-left: 0;
    padding-left: 0;
  }

  .my-swiper {
    padding-left: 12px;
  }

  #about-mov ~ * {
    padding-left: 4px;
  }

  #upper-content {
    padding-left: 8px;
    padding-right: 8px;
  }

  #upper-content.horizontal-container {
    flex-direction: column;
  }

  .movie-info {
    font-size: 12px;
    margin-left: 0;
  }

  .img-container {
    width: 100%;
    height: 100%;
    max-width: 150px; /* Optional: maximum allowed width */
    min-width: 150px; /* Minimum allowed width */
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    align-self: center;
  }

  .content-container {
    align-self: center;
  }

  .image-container {
    width: 100px;
    height: 150px;
  }

  .main-page-text {
    margin-left: 8px;
  }
}
</style>
