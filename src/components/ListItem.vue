<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: '/src/assets/images/placeholder.jpg',
  }
})
</script>

<template>
  <div
    class="list-item-body"
  >
    <img :src="props.image" alt="search-image">
    <div class="list-item-data">
      <h3>{{ props.name }}</h3>
      <p>{{ props.date }}</p>
    </div>
  </div>
</template>

<style scoped>
.list-item-body {
  display: flex;
  gap: 12px;
  align-items: center;
}

.list-item-body img {
  height: 96px;
  aspect-ratio: 10 / 15;
  border-radius: 16px;
  object-fit: fill;
}

</style>