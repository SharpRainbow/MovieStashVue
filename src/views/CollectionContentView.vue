<script setup>
import Pagination from '@/components/Pagination.vue'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ListItem from '@/components/ListItem.vue'
import axios from 'axios'
import { useListData } from '@/composables/useListData.js'
import { useAuthStore } from '@/stores/authStore.js'
import { useConfirmableAction } from '@/composables/useConfirmableAction.js'
import { notifyError, notifySuccess } from '@/utils/notifications.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const itemLimit = 4
const router = useRouter()
const route = useRoute()
const deleteContentDialogRef = ref(null)
const collectionData = ref({
  name: '',
  description: '',
})
const {
  selectedItem: selectedContentData,
  requestAction: showRemoveContentDialog,
  confirmAction: confirmRemoval,
} = useConfirmableAction(deleteContentDialogRef)
const {
  items: collectionContentItems,
  loadPage: loadMoreContents,
  currentPage,
  totalPages,
} = useListData((page) => {
  if (route.meta.genre) {
    return axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/contents?genre=${route.params.id}&page=${page}&limit=${itemLimit}`,
    )
  } else if (route.meta.requiresAuth) {
    return axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/collections/personal/${route.params.id}/contents?page=${page}&limit=${itemLimit}`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
  } else {
    return axios.get(
      `https://168882.msk.web.highserver.ru/api/v1/collections/${route.params.id}/contents?page=${page}&limit=${itemLimit}`,
    )
  }
})

function resetContentList() {
  totalPages.value = 0
  currentPage.value = 1
  calculatePages()
  loadMoreContents()
}

function onPageChange(page) {
  currentPage.value = page
  if (page === totalPages.value) {
    calculatePages()
  }
  loadMoreContents()
}

async function removeContent(content) {
  try {
    const removeContentResponse = await axios.delete(
      `https://168882.msk.web.highserver.ru/api/v1/collections/personal/${route.params.id}/contents?content=${content.id}`,
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    if (removeContentResponse.status === 200) {
      notifySuccess(t(`notifications.content.updated`))
      resetContentList()
    }
  } catch (error) {
    notifyError(t(`notifications.content.update_error`))
  }
}

async function calculatePages() {
  let items
  let content
  const pageNumber = currentPage.value > 1 ? Math.ceil(currentPage.value / 3) + 1 : 1
  try {
    if (route.meta.genre) {
      content = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/contents?genre=${route.params.id}&page=${pageNumber}&limit=${itemLimit * 3}`,
      )
    } else if (route.meta.requiresAuth) {
      content = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/collections/personal/${route.params.id}/contents?page=${pageNumber}&limit=${itemLimit * 3}`,
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )
    } else {
      content = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/collections/${route.params.id}/contents?page=${pageNumber}&limit=${itemLimit * 3}`,
      )
    }
    items = content.data.length / itemLimit
    totalPages.value += Math.ceil(items)
  } catch (error) {
    console.error(error)
  }
}

async function getCollectionInfo() {
  try {
    if (route.meta.genre) {
      let request = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/genres/${route.params.id}`,
      )
      collectionData.value.name = request.data.name
    } else if (route.meta.requiresAuth) {
      let request = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/collections/personal/${route.params.id}`,
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )
      collectionData.value.name = request.data.name
      collectionData.value.description = request.data.description
    } else {
      let request = await axios.get(
        `https://168882.msk.web.highserver.ru/api/v1/collections/${route.params.id}`,
      )
      collectionData.value.name = request.data.name
      collectionData.value.description = request.data.description
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  getCollectionInfo()
  resetContentList()
})
</script>

<template>
  <div class="view-content">
    <h2>{{ collectionData.name }}</h2>
    <p>{{ collectionData.description }}</p>
    <div class="content-list">
      <div v-for="item in collectionContentItems" :key="item.id" class="collection-item-container">
        <ListItem
          :name="item.name"
          :date="item.releaseDate"
          :image="item.image"
          @click="router.push(`/content/${item.id}`)"
        />
        <div
          class="icon-container"
          @click="showRemoveContentDialog(item)"
          v-if="route.meta.requiresAuth"
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
  <md-dialog ref="deleteContentDialogRef">
    <div slot="headline">{{ $t(`dialogs.content.delete_header`) }}</div>
    <form slot="content" id="remove-dialog" method="dialog">
      {{ $t(`dialogs.content.delete_message`, { name: selectedContentData?.name }) }}
    </form>
    <div slot="actions">
      <md-text-button form="remove-dialog">{{
        $t(`dialogs.content.delete_cancel`)
      }}</md-text-button>
      <md-filled-button form="remove-dialog" @click="confirmRemoval(removeContent)">
        {{ $t(`dialogs.content.delete_ok`) }}
      </md-filled-button>
    </div>
  </md-dialog>
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
  align-items: start;
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
  justify-content: space-between;
  width: 100%;
}

.icon-container {
  width: 60px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
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
