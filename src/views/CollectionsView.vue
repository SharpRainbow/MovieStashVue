<script setup>
import { ref, onMounted } from 'vue'
import Pagination from '@/components/Pagination.vue'

const collections = ref([])
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
    name: `Collection ${10 * (currentPage.value - 1) + index + 1}`,
    desc: `Description ${10 * (currentPage.value - 1) + index + 1}`,
  }))
  collections.value = []
  collectionArr.forEach((item) => {
    collections.value.push(item)
  })
}

onMounted(() => {
  loadItems()
})
</script>

<template>
<div class="content">
  <div class="collections">
    <div
      v-for="item in collections"
      :key="item.id"
      class="col"
    >
      <div class="collection-container">
        <md-icon slot="icon">movie</md-icon>
      </div>
      <div class="collection-description">
        <h2>{{ item.name }}</h2>
        <p>{{ item.desc }}</p>
      </div>
    </div>
  </div>
  <pagination
    :currentPage="currentPage"
    :perPage="10"
    :totalPages="totalPages"
    @pagechanged="onPageChange"
  />
</div>
</template>

<style scoped>

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 24px;
}

.col {
  display: flex;
  gap: 32px;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
}

.collection-description p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.collection-description {
  overflow: hidden;
  flex: 1;
}

.collections {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1000px;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
}

.container {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  box-sizing: border-box;
  padding: 24px;
}

.container {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  box-sizing: border-box;
  padding: 24px;
}

.collection-container {
  width: 115px;
  height: 115px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 16px; /* Rounded corners */
  background-color: #272D36; /* Background color of the rectangle */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow effect */
}

@media screen and (max-device-width: 480px) {

  .collection-description {
    overflow: hidden;
  }

  .collections {
    border: 0;
  }

  h2 {
    font-size: 20px;
  }

}
</style>