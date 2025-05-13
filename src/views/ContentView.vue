<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const personItems = ref([])
const dialogRef = ref(null)
const props = defineProps(['id'])

function showDialog() {
  dialogRef.value.show()
}

onMounted(() => {
  const personArr = Array.from({ length: 55 }, (_, index) => ({
    id: index + 1,
    src: `/src/assets/images/placeholder.jpg`,
    name: `Person${index + 1}`,
    role: `Role${index + 1}`,
  }))
  personArr.forEach((item) => {
    personItems.value.push(item)
  })
})
</script>

<template>
  <div class="content">
    <div id="upper-content" class="horizontal-container">
      <div class="img-container">
        <img id="poster" src="/src/assets/images/placeholder.jpg" alt="poster">
      </div>
      <div class="content-container">
        <h1 id="content-name">{{ `Название ${props.id}` }}</h1>
        <div id="rating-values" class="horizontal-container">
          <div class="rating">
            <div id="rt-kp">8.0</div>
            <img class="service-icons" src="/src/assets/icons/kp.svg" alt="ico-kp">
          </div>
          <div class="rating">
            <div id="rt-imdb">8.0</div>
            <img class="service-icons" src="/src/assets/icons/imdb.svg" alt="ico-imdb">
          </div>
          <div class="rating">
            <div id="rt-mvstsh">8.0</div>
            <md-icon slot="icon">movie</md-icon>
          </div>
        </div>
        <div id="action-buttons" class="horizontal-container">
          <md-filled-button>
            Добавить
            <md-icon slot="icon">create_new_folder</md-icon>
          </md-filled-button>
          <md-filled-button id="rate" @click="showDialog">
            Оценить
            <md-icon slot="icon">star</md-icon>
          </md-filled-button>
        </div>
      </div>
      <div class="movie-info">
        <h1 id="about-mov">О фильме</h1>
        <p id="content-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div class="horizontal-container">
          <md-icon slot="icon">theater_comedy</md-icon>
          <div class="property">Жанры: </div>
          <div id="genres" class="value">2000000 $</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">language</md-icon>
          <div class="property">Страна производства: </div>
          <div id="country" class="value">Страна</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">event</md-icon>
          <div class="property">Дата выхода: </div>
          <div id="release-date" class="value">00.00.0000</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">schedule</md-icon>
          <div class="property">Продолжительность: </div>
          <div id="duration" class="value">02:00:00</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">pie_chart</md-icon>
          <div class="property">Бюджет: </div>
          <div id="budget" class="value">1000000 $</div>
        </div>
        <div class="horizontal-container">
          <md-icon slot="icon">attach_money</md-icon>
          <div class="property">Сборы: </div>
          <div id="box-office" class="value">2000000 $</div>
        </div>
      </div>
    </div>
    <h1 class="main-page-text">Актерский состав</h1>
    <Swiper
      :modules="[Navigation, Mousewheel]"
      :mousewheel="true"
      :navigation="true"
      :spaceBetween=12
      class="my-swiper"
      slidesPerView="auto"
    >
      <SwiperSlide
        v-for="item in personItems"
        :key="item.id"
        class="person-container"
      >
        <div class="image-container">
          <img :src="item.src" alt="Description 1">
        </div>
        <div class="person-name">{{ item.name }}</div>
        <div class="person-role">{{ item.role }}</div>
      </SwiperSlide>
    </Swiper>
    <!--<h1>Отзывы</h1>-->
    <md-dialog id="rate-dialog" ref="dialogRef">
      <div slot="headline">Поставьте оценку</div>
      <form slot="content" id="form-id" method="dialog">
        <md-slider step="1" ticks value="0" min="0" max="10"></md-slider>
      </form>
      <div slot="actions">
        <md-text-button form="form-id" value="cancel">Отмена</md-text-button>
        <md-text-button form="form-id" value="ok">Ок</md-text-button>
      </div>
    </md-dialog>
  </div>
</template>

<style scoped>

#content-name, #about-mov {
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

md-dialog {
  align-self: center;
  --md-dialog-container-color: var(--secondary-color);
  --md-dialog-headline-color: var(--icon-color);
}

md-slider {
  --md-slider-active-track-color: var(--focus-color);
  --md-slider-handle-color: var(--focus-color);
  --md-slider-pressed-handle-color: var(--focus-color);
  --md-slider-hover-handle-color: var(--focus-color);
  --md-slider-focus-handle-color: var(--focus-color);
}

.person-name, .person-role {
  text-align: center;
  width: 110px;
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

  #person-name, #person-role {
    font-size: 12px;
  }

  .content-container {
    align-self: center;
  }

  .image-container {
    width: 100px;
    height: 150px;
  }

  .scroll-button {
    width: 10px;
    justify-content: center;
  }

  .right {
    display: flex;
  }

  .main-page-text {
    margin-left: 8px;
  }
}
</style>
