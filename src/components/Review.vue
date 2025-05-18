<script setup>
const props = defineProps({
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="review-container">
    <div class="review-info">
      <p>{{ props.author }}</p>
      <p>{{ props.date }}</p>
    </div>
    <h3>{{ props.title }}</h3>
    <p>{{ props.description }}</p>
  </div>
</template>

<style scoped>
.review-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 16px; /* Rounded corners */
  background-color: #272d36; /* Background color of the rectangle */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow effect */
  padding: 0 16px;
  margin: 20px 32px;
}

.review-container p {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Constrain to 2 lines for the paragraph */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 1.4; /* Adjust line height for better readability */
}

.review-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.review-info p {
  color: gray;
}

h3 {
  margin: 0;
}

@media screen and (max-device-width: 480px) {
  .review-container p {
    font-size: 12px;
  }
}
</style>
