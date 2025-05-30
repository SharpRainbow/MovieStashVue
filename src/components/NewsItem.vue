<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
})
</script>

<template>
  <div class="news-container">
    <img v-if="props.image" :src="props.image" alt="news image">
    <div class="news-body">
      <h3> {{ props.title }} </h3>
      <p> {{ props.text }} </p>
    </div>
  </div>
</template>

<style scoped>
.news-container {
  display: flex;
  align-items: stretch;
  border-radius: 16px; /* Rounded corners */
  background-color: #272D36; /* Background color of the rectangle */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow effect */
  gap: 12px;
  padding: 20px;
  cursor: pointer;
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

}
</style>