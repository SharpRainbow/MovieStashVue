<script setup>
import Pagination from '@/components/Pagination.vue'
import { onMounted, ref } from 'vue'
import ListItem from '@/components/ListItem.vue'

const contents = ref([])
const currentPage = ref(1)
const totalPages = ref(5)

function onPageChange(page) {
  console.log(page)
  currentPage.value = page
  if (currentPage.value === totalPages.value) {
    totalPages.value += 1
  }
  loadItems()
}

function loadItems() {
  const collectionArr = Array.from({ length: 2 }, (_, index) => ({
    id: 10 * (currentPage.value - 1) + index + 1,
    name: `Name ${10 * (currentPage.value - 1) + index + 1}`,
    date: `Date ${10 * (currentPage.value - 1) + index + 1}`,
    src: `/src/assets/images/placeholder.jpg`,
  }))
  contents.value = []
  collectionArr.forEach((item) => {
    contents.value.push(item)
  })
}

function removeContent(content) {
  contents.value.splice(contents.value.indexOf(content), 1)
}

onMounted(() => {
  loadItems()
})
</script>

<template>
  <div class="view-content">
    <h2>Collection name</h2>
    <p>Collection description</p>
    <div class="content-list">
      <div v-for="item in contents" :key="item.id" class="collection-item-container">
        <ListItem
          :name="item.name"
          :date="item.date"
          :image="item.image"
        />
        <div class="icon-container" @click="removeContent(item)">
          <md-icon>close</md-icon>
        </div>
      </div>
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

.view-content {
  display: flex;
  flex-direction: column;
  align-self: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 1000px;
  width: 100%;
  height: 100%;
}

.content-list {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  width: 100%;
  height: 100%;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.collection-item-container {
  display: flex;
  gap: 16px;
  align-items: center;
}

.icon-container {
  width: 60px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-container:hover {
  background-color: var(--focus-color);
}

@media screen and (max-device-width: 480px) {
  .content-list {
    border: 0;
  }

  h2 {
    font-size: 20px;
    margin: 0;
  }
}
</style>
