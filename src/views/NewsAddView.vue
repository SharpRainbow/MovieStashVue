<script setup>
import { computed, ref } from 'vue'

const newData = ref({
  id: '1',
  image: '/src/assets/images/placeholder.jpg',
  title: '',
  description: '',
})
const autoResize = (event) => {
  event.target.style.height = 'auto'
  event.target.style.height = event.target.scrollHeight + 'px'
}
const newsSavable = computed(() => {
  return newData.value.title.toString().trim() !== '' &&
    newData.value.description.toString().trim() !== ''
})
const imagePicker = ref(null);
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newData.value.image = e.target.result; // Update image source with data URL
    };
    reader.readAsDataURL(file); // Convert file to data URL
  }
};
</script>

<template>
  <div class="view-content">
    <input
      type="text"
      class="news-title"
      v-model="newData.title"
      :placeholder="$t(`fields.news.placeholder.title`)"
    />
    <input
      type="file"
      ref="imagePicker"
      accept="image/png, image/jpeg"
      style="display: none"
      @change="handleImageUpload"
    />
    <img
      class="news-image"
      :src="newData.image"
      @click="$refs.imagePicker.click()"
      style="cursor: pointer"
      alt="news image"
    />
    <textarea
      :placeholder="$t(`fields.news.placeholder.desc`)"
      v-model="newData.description"
      @input="autoResize"
    ></textarea>
    <div class="news-actions">
      <md-text-button>{{ $t(`buttons.cancel`) }}</md-text-button>
      <md-filled-button :disabled="!newsSavable">{{ $t(`buttons.publish`) }}</md-filled-button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  font-family: inherit;
  width: 100%;
  min-height: 160px;
  resize: none;
  margin: 16px;
  padding: 12px;
  box-sizing: border-box;
  border: none;
  background-color: var(--secondary-color);
  border-radius: 16px;
  font-size: 14px;
}

.view-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 800px;
  width: 100%;
}

.news-title {
  font-family: inherit;
  margin-bottom: 16px;
  font-size: 32px;
  padding: 12px;
  border: none;
  text-align: center;
  background-color: var(--secondary-color);
  border-radius: 5px;
}

.news-image {
  border-radius: 12px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}

.news-actions {
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 16px;
}

</style>
