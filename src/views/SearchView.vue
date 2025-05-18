<script setup>
import { ref, onMounted } from 'vue'
import ListItem from '@/components/ListItem.vue'

const searchItems = ref([])

onMounted(() => {
  const searchArr = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    src: `/src/assets/images/placeholder.jpg`,
    name: `Person${index + 1}`,
    date: `Date${index + 1}`,
  }))
  searchArr.forEach((item) => {
    searchItems.value.push(item)
  })
})
</script>

<template>
  <div class="content">
    <div class="search-container">
      <input type="text" class="search-input" placeholder="Поиск">
      <button class="close-button">&times;</button>
    </div>
    <md-tabs id="search-tabs">
      <md-primary-tab>
        <md-icon slot="icon">theaters</md-icon>
        Фильмы
      </md-primary-tab>
      <md-primary-tab>
        <md-icon slot="icon">cinematic_blur</md-icon>
        Знаменитости
      </md-primary-tab>
    </md-tabs>
    <md-linear-progress id="load-indicator" indeterminate></md-linear-progress>
    <div class="results">
      <ListItem
        v-for="item in searchItems"
        :key="item.id"
        :name="item.name"
        :date="item.date"
        :image="item.src"
      >
      </ListItem>
    </div>
  </div>
</template>

<style scoped>
md-tabs {
  --md-primary-tab-container-color: transparent;
  --md-sys-color-primary: #4A5671;
  flex-shrink: 0;
}

md-primary-tab {
  color: #aed1ff;
}

md-linear-progress {
  --md-linear-progress-active-indicator-color: #4A5671;
  visibility: collapse;
  flex-shrink: 0;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #272D36;
  padding: 12px 24px;
  border: 1px solid #4A5671;
  border-radius: 48px;
  margin: 0 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.search-input {
  flex: 1;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  color: #4A5671;
  font-size: 24px;
}

.search-input::placeholder {
  color: #888;
}

.close-button {
  background: none;
  border: none;
  color: #4A5671;
  font-size: 32px;
  cursor: pointer;
}

.results {
  background: #272D36;
  flex-grow: 1;
  border-radius: 20px;
  margin: 10px 40px;
  padding: 40px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media screen and (max-device-width: 480px) {
  .results {
    margin: 10px 20px;
    padding: 20px;
    gap: 8px;
  }

  .search-container {
    padding: 8px 16px;
    margin: 0 12px;
    box-sizing: border-box;
  }

  .search-input {
    font-size: 20px;
  }

}
</style>