<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { useRouter, useRoute } from 'vue-router'
import CollectionItem from '@/components/CollectionItem.vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore.js'
import { useListData } from '@/composables/useListData.js'
import { useConfirmableAction } from '@/composables/useConfirmableAction.js'
import { notifyError, notifySuccess } from '@/utils/notifications.js'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const collectionContentRoute = route.meta.requiresAuth ? '/collection/personal' : '/collection'
const createCollectionDialogRef = ref(null)
const deleteCollectionDialogRef = ref(null)
const itemLimit = 5
const collectionName = ref('')
const collectionDescription = ref('')
const collectionSavable = computed(() => {
  return collectionName.value
})
const {
  items: collectionItems,
  loadPage: loadMoreCollectionItems,
  totalPages,
  currentPage,
} = useListData((page) => {
  if (route.meta.requiresAuth) {
    return axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/collections/personal?page=${page}&limit=${itemLimit}`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
  } else {
    return axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/collections?page=${page}&limit=${itemLimit}`,
    )
  }
})
const {
  selectedItem: selectedCollectionData,
  requestAction: showRemoveDialog,
  confirmAction: confirmRemoval,
} = useConfirmableAction(deleteCollectionDialogRef)

function resetCollectionsList() {
  totalPages.value = 0
  currentPage.value = 1
  collectionItems.value = []
  calculatePages()
  loadMoreCollectionItems()
}

function showAddDialog() {
  createCollectionDialogRef.value.show()
}

async function createCollection() {
  try {
    const createResponse = await axios.post(
      'https://168882.msk.web.highserver.ru/api/v1/collections/personal',
      {
        name: collectionName.value,
        description: collectionDescription.value,
      },
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    if (createResponse.status === 201) {
      notifySuccess('Подборка успешно добавлена!')
      resetCollectionsList()
    }
  } catch (error) {
    notifyError('Не удалось создать подборку!')
  }
}

function collectionNameChanged(event) {
  collectionName.value = event.target.value
}

function collectionDescChanged(event) {
  collectionDescription.value = event.target.value
}

function onPageChange(page) {
  currentPage.value = page
  if (currentPage.value === totalPages.value) {
    calculatePages()
  }
  loadMoreCollectionItems()
}

async function calculatePages() {
  let items
  let collections
  const pageNumber = currentPage.value > 1 ? Math.ceil(currentPage.value / 3) + 1 : 1
  try {
    if (route.meta.requiresAuth) {
      collections = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/collections/personal?page=${pageNumber}&limit=${itemLimit * 3}`,
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )
    } else {
      collections = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/collections?page=${pageNumber}&limit=${itemLimit * 3}`,
      )
    }
    items = collections.data.length / itemLimit
    totalPages.value += Math.ceil(items)
  } catch (e) {
    console.error(e)
  }
}

async function removeCollection(collection) {
  try {
    const deleteResponse = await axios.delete(
      `https://168882.msk.web.highserver.ru/api/v1/collections/personal/${collection.id}`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    if (deleteResponse.status === 200) {
      notifySuccess('Подборка удалена!')
      resetCollectionsList()
    }
  } catch (error) {
    notifyError('Не удалось удалить подборку!')
  }
}

watch(
  () => route.meta,
  () => {
    resetCollectionsList()
  },
  { immediate: true },
)
</script>

<template>
  <div class="content">
    <div class="collection-list">
      <div v-for="item in collectionItems" :key="item.id" class="col">
        <CollectionItem
          name=""
          dimension="115"
          @click="router.push(`${collectionContentRoute}/${item.id}`)"
        >
        </CollectionItem>
        <div class="collection-description">
          <h2>{{ item.name }}</h2>
          <p>{{ item.desc }}</p>
        </div>
        <div class="icon-container" @click="showRemoveDialog(item)" v-if="route.meta.requiresAuth">
          <md-icon>close</md-icon>
        </div>
      </div>
    </div>
    <div class="user-collection-actions" v-if="route.meta.requiresAuth">
      <md-filled-button @click="showAddDialog">Добавить</md-filled-button>
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
  <md-dialog ref="createCollectionDialogRef">
    <div slot="headline">Введите параметры подборки</div>
    <form slot="content" id="create-dialog" method="dialog">
      <md-outlined-text-field label="Название" @input="collectionNameChanged">
      </md-outlined-text-field>
      <md-outlined-text-field label="Описание" @input="collectionDescChanged">
      </md-outlined-text-field>
    </form>
    <div slot="actions">
      <md-text-button form="create-dialog">Отмена</md-text-button>
      <md-filled-button
        form="create-dialog"
        :disabled="!collectionSavable"
        @click="createCollection"
      >
        Ок
      </md-filled-button>
    </div>
  </md-dialog>
  <md-dialog ref="deleteCollectionDialogRef">
    <div slot="headline">Удаление подборки</div>
    <form slot="content" id="remove-dialog" method="dialog">
      Подборка "{{ selectedCollectionData?.name }}" будет удалена! Продолжить?
    </form>
    <div slot="actions">
      <md-text-button form="remove-dialog">Отмена</md-text-button>
      <md-filled-button form="remove-dialog" @click="confirmRemoval(removeCollection)">
        Ок
      </md-filled-button>
    </div>
  </md-dialog>
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

#create-dialog {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
