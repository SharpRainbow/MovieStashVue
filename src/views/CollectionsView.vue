<script setup>
import { ref, onMounted } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { useRouter, useRoute } from 'vue-router'
import CollectionItem from '@/components/CollectionItem.vue'

const collections = ref([])
const currentPage = ref(1)
const totalPages = ref(5)
const router = useRouter()
const route = useRoute()

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
    name: `Collection ${10 * (currentPage.value - 1) + index + 1}`,
    desc: `Description ${10 * (currentPage.value - 1) + index + 1}`,
  }))
  collections.value = []
  collectionArr.forEach((item) => {
    collections.value.push(item)
  })
}

function removeCollection(content) {
  collections.value.splice(collections.value.indexOf(content), 1)
}

onMounted(() => {
  loadItems()
})
</script>

<template>
  <div class="content">
    <div class="collection-list">
      <div
        v-for="item in collections"
        :key="item.id"
        class="col"
      >
        <CollectionItem
          name=""
          dimension="115"
          @click="router.push(`/collection/${item.id}`)"
        >
        </CollectionItem>
        <div class="collection-description">
          <h2>{{ item.name }}</h2>
          <p>{{ item.desc }}</p>
        </div>
        <div class="icon-container" @click="removeCollection(item)">
          <md-icon>close</md-icon>
        </div>
      </div>
    </div>
    <div class="user-collection-actions" v-if="route.meta.requiresAuth">
      <md-filled-button>Добавить</md-filled-button>
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
.content {
  display: flex;
  flex-direction: column;
  align-self: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 1000px;
  width: 100%;
  height: 100%;
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

.collection-list {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  height: 100%;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.user-collection-actions {
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 12px;
  margin-right: 12px;
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
  background-color: var(--focus-color); /* Slightly darker blue on hover */
}

@media screen and (max-device-width: 480px) {
  .collection-description {
    overflow: hidden;
  }

  .collection-list {
    border: 0;
    gap: 12px;
    padding: 0;
  }

  h2 {
    font-size: 20px;
  }
}
</style>