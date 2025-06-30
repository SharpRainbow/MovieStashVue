<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    default: 0
  },
  colored: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: '/images/placeholder.jpg',
  }
})

const ratingColor = computed(() => {
  if (!props.colored) {
    return '#EEF0F2'
  }
  const name = props.rating
  if (name > 7)
    return '#76FF03'
  else if (name > 5)
    return '#BDBDBD'
  else
    return '#FF1744'
})
</script>

<template>
  <div
    class="list-item-body"
  >
    <img :src="props.image || '/images/placeholder.jpg'" alt="search-image">
    <div class="list-item-data">
      <h3>{{ props.name }}</h3>
      <p>{{ props.date }}</p>
      <p v-if="props.rating > 0" :style="{ color: ratingColor }">{{ props.rating }}</p>
    </div>
  </div>
</template>

<style scoped>
.list-item-body {
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
}

.list-item-data {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-item-data > * {
  margin: 0;
}

.list-item-data h3 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-item-body img {
  height: 96px;
  aspect-ratio: 10 / 15;
  border-radius: 16px;
  object-fit: fill;
}

@media screen and (max-width: 480px) {
  .list-item-data h3 {
    -webkit-line-clamp: 1;
    font-size: 16px;
  }

  .list-item-data p {
    font-size: 12px;
  }
}

</style>