<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Mousewheel } from 'swiper/modules'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'swiper/css'
import 'swiper/css/navigation'
import Review from '@/components/Review.vue'

const router = useRouter()
const personItems = ref([])
const reviewItems = ref([])
const userCollections = ref([])
const rateDialogRef = ref(null)
const addDialogRef = ref(null)
const props = defineProps(['id'])

function showRateDialog() {
  rateDialogRef.value.show()
}

function showAddDialog() {
  addDialogRef.value.show()
}

function notifySuccess(text) {
  toast.success(text, {
    position: toast.POSITION.TOP_RIGHT,
    theme: "dark"
  })
}

function notifyError(text) {
  toast.error(text, {
    position: toast.POSITION.TOP_RIGHT,
    theme: "dark"
  })
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
  const reviewArr = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    author: `Person${index + 1}`,
    date: `00.00.0000`,
    title: `News title`,
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius erat vel magna aliquam pharetra. Etiam semper maximus dolor in maximus. Nunc consectetur ultrices ligula, in vehicula metus cursus venenatis. Nam id nunc eget enim dapibus pretium. Duis vel urna et justo euismod porttitor. In blandit enim ac elementum faucibus. Sed porta orci eu metus posuere rhoncus. Nam iaculis libero ac odio eleifend egestas. Proin euismod vehicula semper. Nullam tristique ultrices aliquet. Mauris non magna eget tortor cursus hendrerit.

Pellentesque a justo vel massa molestie iaculis. Nam non mauris placerat nisl lacinia interdum non et nisi. Vivamus ac dui feugiat, pretium neque et, laoreet elit. Maecenas lacus diam, luctus vel sapien at, suscipit ullamcorper augue. Vivamus vel ligula non neque convallis volutpat sit amet ut orci. Nam eu metus vitae purus vulputate malesuada at facilisis velit. Nam consequat tortor vitae tempor tristique. Integer faucibus iaculis nunc, ac commodo nisi cursus ac. Etiam facilisis risus a lacus imperdiet, eu varius lectus maximus. Sed eu pellentesque nulla.

Mauris efficitur augue mauris, in accumsan massa dapibus sit amet. Fusce id risus venenatis, laoreet enim et, sagittis ipsum. Morbi laoreet arcu nec diam sagittis tempor. Donec eget quam id lacus facilisis tincidunt. Phasellus lobortis venenatis tellus eget viverra. Sed massa massa, accumsan a arcu sed, rutrum pretium felis. Vivamus vel varius velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus arcu erat, blandit sit amet lorem at, blandit pellentesque lorem. Sed pulvinar dolor nunc, et luctus nibh bibendum vestibulum. Fusce vulputate neque ullamcorper urna bibendum ultricies. Fusce malesuada dui in leo placerat porttitor. Donec bibendum gravida quam, a mattis nisl laoreet ac. Pellentesque eleifend accumsan urna, non imperdiet urna porttitor et. Proin enim odio, laoreet ut maximus vitae, mattis sed enim. Sed volutpat lacus id mattis semper.

Morbi ac purus id odio lobortis placerat. Morbi facilisis, ipsum vel ultrices sagittis, urna felis faucibus nulla, non ultricies velit mi sed mauris. Etiam lobortis, ex quis feugiat aliquet, velit sem porta turpis, id sodales dolor lectus sit amet nulla. Morbi et ex semper, gravida dolor non, lobortis quam. Aenean auctor id felis ut sagittis. Praesent a enim auctor, lacinia odio eu, feugiat justo. Maecenas orci odio, tincidunt id mollis quis, iaculis id velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae orci at nulla sollicitudin ornare vitae eu turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse dictum leo nec nulla consectetur, accumsan lacinia est semper.

Morbi sed posuere nunc. Cras maximus purus at lorem tempor dignissim. Donec id interdum est. Morbi suscipit augue in ex maximus pharetra. Proin ultricies dui a orci blandit, quis vestibulum nulla lacinia. Nulla placerat tellus ut auctor vulputate. Nunc quis nunc fermentum, suscipit nisi vel, cursus sapien. Curabitur mattis ultrices pulvinar. Vivamus tristique, massa in laoreet tincidunt, odio mauris hendrerit neque, sit amet vestibulum eros ex nec tortor. Fusce euismod aliquet metus sed dapibus. Suspendisse ac libero nisi. Praesent eros libero, semper at leo vel, maximus tristique massa. Integer imperdiet ipsum ut diam volutpat, ut blandit arcu dapibus. Nulla facilisi. In tincidunt in quam et luctus.`,
  }))
  reviewArr.forEach((item) => {
    reviewItems.value.push(item)
  })
  const collectionsArr = Array.from({ length: 55 }, (_, index) => ({
    id: index + 1,
    name: `Name ${index + 1}`,
  }))
  collectionsArr.forEach((item) => {
    userCollections.value.push(item)
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
        @click="router.push(`/person/${item.id}`)"
      >
        <div class="image-container">
          <img :src="item.src" alt="Description 1">
        </div>
        <div class="person-name">{{ item.name }}</div>
        <div class="person-role">{{ item.role }}</div>
      </SwiperSlide>
    </Swiper>
    <md-dialog id="rate-dialog" ref="rateDialogRef">
      <div slot="headline">Поставьте оценку</div>
      <form slot="content" id="form-id" method="dialog">
        <md-slider step="1" ticks value="0" min="0" max="10"></md-slider>
      </form>
      <div slot="actions">
        <md-text-button form="form-id" value="cancel">Отмена</md-text-button>
        <md-text-button form="form-id" value="ok">Ок</md-text-button>
      </div>
    </md-dialog>
    <md-dialog id="collections-dialog" ref="addDialogRef">
      <div slot="headline">Выберите коллекцию</div>
      <div
        slot="content"
        class="user-collection"
        v-for="item in userCollections"
        @click="notifySuccess(`Фильм успешно добавлен!`)"
      >
        <p>{{ item.name }}</p>
      </div>
    </md-dialog>
    <h1 class="main-page-text">Отзывы</h1>
    <Review
      v-for="item in reviewItems"
      :key="item.id"
      :author="item.author"
      :date="item.date"
      :title="item.title"
      :description="item.desc"
    >
    </Review>
    <div class="review-actions">
      <md-text-button
        @click="router.push('/review/add')"
      >
        Добавить
      </md-text-button>
    </div>
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
