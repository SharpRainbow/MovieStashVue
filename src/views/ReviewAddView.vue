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
      class="review-title"
      v-model="newData.title"
      placeholder="Заголовок рецензии"
    />
    <select>
      <option selected disabled>Тип рецензии</option>
      <option>Положительная</option>
      <option>Отрицательная</option>
      <option>Нейтральная</option>
    </select>
    <input
      type="file"
      ref="imagePicker"
      accept="image/png, image/jpeg"
      style="display: none"
      @change="handleImageUpload"
    />
    <textarea
      placeholder="Текст рецензии..."
      v-model="newData.description"
      @input="autoResize"
    ></textarea>
    <div class="review-actions">
      <md-text-button>Отмена</md-text-button>
      <md-filled-button :disabled="!newsSavable">Опубликовать</md-filled-button>
    </div>
  </div>
</template>

<style scoped>

select {
  width: 100%;
  padding: 14px;
  font-size: 14px;
  border: none;
  border-radius: 16px;
  background-color: var(--secondary-color);
  cursor: pointer;
  font-weight: bold;
  font-family: inherit;
}

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

.review-title {
  width: 100%;
  font-family: inherit;
  margin-bottom: 16px;
  font-size: 24px;
  padding: 12px;
  border: none;
  background-color: var(--secondary-color);
  border-radius: 16px;
  box-sizing: border-box;
}

.review-actions {
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 16px;
}

</style>
