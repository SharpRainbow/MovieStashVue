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

const personData = {
  id: props.id,
  name: "Имя Фамилия",
  image: "/src/assets/images/placeholder.jpg",
  career: "Актер, продюсер, режисер",
  birthday: "00.00.0000",
  death: "",
  birthplace: "City",
  height: "190"
}

onMounted(() => {
  const personArr = Array.from({ length: 55 }, (_, index) => ({
    id: index + 1,
    src: `/src/assets/images/placeholder.jpg`,
    name: `Film${index + 1}`,
    date: `Date${index + 1}`,
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
        <img id="poster" :src="personData.image" alt="poster">
      </div>
      <div class="person-info">
        <h1 id="about-person">{{ personData.name }}</h1>
        <p id="content-description">
          {{ personData.career }}
        </p>
        <div class="horizontal-container" v-if="personData.birthday">
          <md-icon slot="icon">event</md-icon>
          <div class="property">
            {{ personData.death === "" ? "Дата рождения:" : "Годы жизни:" }}
          </div>
          <div id="genres" class="value">
            {{ personData.death === "" ? personData.birthday : `${personData.birthday} - ${personData.death}` }}
          </div>
        </div>
        <div class="horizontal-container" v-if="personData.birthplace">
          <md-icon slot="icon">language</md-icon>
          <div class="property">Место рождения: </div>
          <div id="country" class="value">{{ personData.birthplace }}</div>
        </div>
        <div class="horizontal-container" v-if="personData.height">
          <md-icon slot="icon">height</md-icon>
          <div class="property">Рост: </div>
          <div id="release-date" class="value">{{ `${personData.height} см` }}</div>
        </div>
      </div>
    </div>
    <h1 class="main-page-text">Фильмография</h1>
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
        <div class="person-role">{{ item.date }}</div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>

#about-person {
  text-align: center;
  margin-top: 0;
}

h3 {
  margin-bottom: 4px;
}

body {
  margin: 0;
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

.person-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: flex-start;
}

.main-page-text {
  margin-left: 20px;
}

.person-info h1 {
  margin-bottom: 0;
}

.person-info .horizontal-container {
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

.my-swiper {
  padding: 0 32px;
}

.property {
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
  width: 100px;
  flex: 0 0 auto;
  aspect-ratio: 2 / 3;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container img {
  width: 100%;
  height: 100%;
  user-select: none;
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

  #about-person ~ * {
    padding-left: 4px;
  }

  #upper-content {
    padding-left: 8px;
    padding-right: 8px;
  }

  #upper-content.horizontal-container {
    flex-direction: column;
  }

  .person-info {
    font-size: 12px;
    margin-left: 0;
  }

  .img-container {
    width: 100%;
    height: 100%;
    max-width: 150px;
    min-width: 150px;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 3 / 4;
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
