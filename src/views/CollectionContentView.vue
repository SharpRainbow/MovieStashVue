<script setup>
import Pagination from '@/components/Pagination.vue'
import { onMounted, ref } from 'vue'

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
  const collectionArr = Array.from({ length: 10 }, (_, index) => ({
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
      <div
        v-for="item in contents"
        :key="item.id"
        class="content-container"
      >
        <img :src="item.src" alt="search-image">
        <div class="search-result-body">
          <h3>{{ item.name }}</h3>
          <p>{{ item.date }}</p>
        </div>
        <div
          class="icon-container"
          @click="removeContent(item)"
        >
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  align-self: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 1000px;
  width: 100%;
}

.content-list {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  width: 100%;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.content-container {
  display: flex;
  gap: 16px;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 250px;
}

.content-container img {
  height: 96px;
  aspect-ratio: 10 / 15;
  border-radius: 16px;
  object-fit: fill;
}

.icon-container {
  width: 60px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container:hover {
  background-color: var(--focus-color); /* Slightly darker blue on hover */
}

@media screen and (max-device-width: 480px) {

  .content-list {
    border: 0;
  }

  h2 {
    font-size: 20px;
  }

}
</style>