<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { useRouter, useRoute } from 'vue-router'
import CollectionItem from '@/components/CollectionItem.vue'
import axios from '@/utils/axiosInstance.js'
import { useListData } from '@/composables/useListData.js'
import { useConfirmableAction } from '@/composables/useConfirmableAction.js'
import { notifyError, notifySuccess } from '@/utils/notifications.js'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore.js'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const collectionContentRoute = route.meta.requiresAuth ? '/collections/personal' : '/collections'
const createCollectionDialogRef = ref(null)
const deleteCollectionDialogRef = ref(null)
const visibilityDialogRef = ref(null)
const itemLimit = 5
const {
  items: collectionItems,
  loadPage: loadMoreCollectionItems,
  totalPages,
  currentPage,
} = useListData((page) => {
  if (route.meta.requiresAuth) {
    return axios.get(
      `/collections/personal?page=${page}&limit=${itemLimit}`
    )
  } else {
    return axios.get(
      `/collections?page=${page}&limit=${itemLimit}`
    )
  }
})
const {
  selectedItem: selectedCollectionData,
  requestAction: showRemoveDialog,
  confirmAction: confirmRemoval,
} = useConfirmableAction(deleteCollectionDialogRef)

const {
  selectedItem: saveCollectionData,
  requestAction: showSaveDialog,
  confirmAction: confirmSaving,
} = useConfirmableAction(createCollectionDialogRef)

const {
  selectedItem: visibilityCollectionData,
  requestAction: showVisibilityDialog,
  confirmAction: confirmVisibilityChange,
} = useConfirmableAction(visibilityDialogRef)

const collectionSavable = computed(() => {
  return saveCollectionData?.value
})
const visibilityIcon = computed(() => {
  return route.meta.requiresAuth ? 'visibility' : 'visibility_off'
})

function resetCollectionsList() {
  totalPages.value = 0
  currentPage.value = 1
  collectionItems.value = []
  calculatePages()
  loadMoreCollectionItems()
}

async function createCollection(collection) {
  try {
    let createResponse
    console.log(collection)
    if (collection?.id) {
      createResponse = await axios.patch(
        `/collections/personal/${collection.id}`,
        collection
      )
    } else {
      createResponse = await axios.post(
        '/collections/personal',
        collection
      )
    }
    if (createResponse.status === 201 || createResponse.status === 200) {
      notifySuccess(t('notifications.collection.created'))
    }
  } catch (error) {
    notifyError(t('notifications.collection.created_error'))
    console.error(error)
  } finally {
    resetCollectionsList()
  }
}

function collectionNameChanged(event) {
  if (saveCollectionData.value === null)
    saveCollectionData.value = {}
  saveCollectionData.value.name = event.target.value
  console.log(saveCollectionData.value)
}

function collectionDescChanged(event) {
  if (saveCollectionData.value === null)
    saveCollectionData.value = {}
  if (event.target.value === '')
    saveCollectionData.value.description = null
  else
    saveCollectionData.value.description = event.target.value
  console.log(saveCollectionData.value)
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
        `/collections/personal?page=${pageNumber}&limit=${itemLimit * 3}`
      )
    } else {
      collections = await axios.get(
        `/collections?page=${pageNumber}&limit=${itemLimit * 3}`
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
      `/collections/personal/${collection.id}`
    )
    if (deleteResponse.status === 200) {
      notifySuccess(t('notifications.collection.deleted'))
      resetCollectionsList()
    }
  } catch (error) {
    notifyError(t('notifications.collection.deleted_error'))
  }
}

async function changeCollectionVisibility(collection) {
  try {
    let visibilityResponse
    if (collection.user_id) {
      visibilityResponse = await axios.patch(
        `/collections/personal/${collection.id}/publish`
      )
    } else {
      visibilityResponse = await axios.patch(
        `/collections/personal/${collection.id}/own`
      )
    }
    if (visibilityResponse.status === 200) {
      notifySuccess(t('notifications.collection.publish'))
      resetCollectionsList()
    }
  } catch (error) {
    notifyError(t('notifications.collection.publish_error'))
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
          :icon="item.icon"
          @click="router.push(`${collectionContentRoute}/${item.id}`)"
        >
        </CollectionItem>
        <div class="collection-description">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
        </div>
        <div class="collection-actions">
          <div class="icon-container" v-if="authStore.hasRole('moderator')" @click="showVisibilityDialog(item)">
            <md-icon>{{ visibilityIcon }}</md-icon>
          </div>
          <div class="icon-container" v-if="route.meta.requiresAuth" @click="showSaveDialog(item)">
            <md-icon>edit</md-icon>
          </div>
          <div class="icon-container" v-if="route.meta.requiresAuth" @click="showRemoveDialog(item)">
            <md-icon>close</md-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="user-collection-actions" v-if="route.meta.requiresAuth">
      <md-filled-button @click="showSaveDialog({})">{{ $t('buttons.add') }}</md-filled-button>
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
    <div slot="headline">{{ $t('dialogs.collections.create.header') }}</div>
    <form slot="content" id="create-dialog" method="dialog">
      <md-outlined-text-field
        :label="$t('dialogs.collections.create.name')"
        :value="saveCollectionData?.name"
        @input="collectionNameChanged"
      >
      </md-outlined-text-field>
      <md-outlined-text-field
        :label="$t('dialogs.collections.create.description')"
        :value="saveCollectionData?.description"
        @input="collectionDescChanged"
      >
      </md-outlined-text-field>
    </form>
    <div slot="actions">
      <md-text-button form="create-dialog">{{ $t('buttons.cancel') }}</md-text-button>
      <md-filled-button
        form="create-dialog"
        :disabled="!collectionSavable"
        @click="confirmSaving(createCollection)"
      >
        {{ $t('buttons.ok') }}
      </md-filled-button>
    </div>
  </md-dialog>
  <md-dialog ref="deleteCollectionDialogRef">
    <div slot="headline">{{ $t('dialogs.collections.delete.header') }}</div>
    <form slot="content" id="remove-dialog" method="dialog">
      {{ $t('dialogs.collections.delete.message', { name: selectedCollectionData?.name }) }}
    </form>
    <div slot="actions">
      <md-text-button form="remove-dialog">{{ $t('buttons.cancel') }}</md-text-button>
      <md-filled-button form="remove-dialog" @click="confirmRemoval(removeCollection)">
        {{ $t('buttons.ok') }}
      </md-filled-button>
    </div>
  </md-dialog>
  <md-dialog ref="visibilityDialogRef">
    <div slot="headline">{{ $t('dialogs.collections.visibility.header') }}</div>
    <form slot="content" id="vis-dialog" method="dialog">
      {{ $t('dialogs.collections.visibility.message', { name: visibilityCollectionData?.name }) }}
    </form>
    <div slot="actions">
      <md-text-button form="vis-dialog">{{ $t('buttons.cancel') }}</md-text-button>
      <md-filled-button form="vis-dialog" @click="confirmVisibilityChange(changeCollectionVisibility)">
        {{ $t('buttons.ok') }}
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

.collection-description > * {
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

.collection-actions {
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

  .collection-actions {
    gap: 6px;
  }
}
</style>
