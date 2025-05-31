<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import ListItem from '@/components/ListItem.vue'
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'
import { useListData } from '@/composables/useListData.js'

const router = useRouter()
// const searchItems = ref([])
const currentTab = ref(0)
const searchText = ref('')
const itemTypeUrl = computed(() => {
  return currentTab.value === 0 ? 'content' : 'person'
})
const itemLimit = 5
const {
  items: collectionSearchItems,
  loadPage: loadMoreSearchItems,
  totalPages,
  currentPage,
} = useListData((page) => {
  if (currentTab.value === 0) {
    return axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/contents?page=${page}&limit=${itemLimit}&name=${searchText.value}`,
    )
  } else {
    return axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/celebrities?page=${page}&limit=${itemLimit}&name=${searchText.value}`,
    )
  }
})
const debouncedSearch = debounce(() => {
  resetSearchResults()
}, 500)

watch(searchText, () => {
  debouncedSearch()
})

function resetSearchResults() {
  debouncedSearch.cancel()
  totalPages.value = 0
  currentPage.value = 1
  collectionSearchItems.value = []
  if (searchText.value) {
    calculatePages()
    loadMoreSearchItems()
  }
}

function onPageChange(page) {
  currentPage.value = page
  if (page === totalPages.value) {
    calculatePages()
  }
  loadMoreSearchItems()
}

function onTabChange(event) {
  currentTab.value = event.target.activeTabIndex
  resetSearchResults()
}

async function calculatePages() {
  let itemsCount
  let searchResult
  const pageNumber = currentPage.value > 1 ? Math.ceil(currentPage.value / 3) + 1 : 1
  try {
    if (currentTab.value === 0) {
      searchResult = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/contents?page=${pageNumber}&limit=${itemLimit * 3}&name=${searchText.value}`,
      )
    } else {
      searchResult = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/celebrities?page=${pageNumber}&limit=${itemLimit * 3}&name=${searchText.value}`,
      )
    }
    itemsCount = searchResult.data.length / itemLimit
    totalPages.value += Math.ceil(itemsCount)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  resetSearchResults()
})
</script>

<template>
  <div class="content">
    <div class="search-container">
      <input type="text" class="search-input" placeholder="Поиск" v-model="searchText" />
      <button class="close-button" @click="searchText = ''">&times;</button>
    </div>
    <md-tabs id="search-tabs" @change="onTabChange">
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
        v-for="item in collectionSearchItems"
        :key="item.id"
        :name="item.name"
        :date="item.releaseDate"
        :image="item.image"
        @click="router.push(`/${itemTypeUrl}/${item.id}`)"
      >
      </ListItem>
    </div>
    <div class="pagination-wrapper">
      <pagination
        :currentPage="currentPage"
        :perPage="10"
        :totalPages="totalPages"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped>
md-tabs {
  --md-primary-tab-container-color: transparent;
  --md-sys-color-primary: #4a5671;
  flex-shrink: 0;
}

md-primary-tab {
  color: #aed1ff;
}

md-linear-progress {
  --md-linear-progress-active-indicator-color: #4a5671;
  visibility: collapse;
  flex-shrink: 0;
}

html,
body {
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
  background-color: #272d36;
  padding: 12px 24px;
  border: 1px solid #4a5671;
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
  font-size: 24px;
}

.search-input::placeholder {
  color: #888;
}

.close-button {
  background: none;
  border: none;
  color: #4a5671;
  font-size: 32px;
  cursor: pointer;
}

.results {
  background: #272d36;
  flex-grow: 1;
  border-radius: 20px;
  margin: 10px 40px;
  padding: 40px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
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