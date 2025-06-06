<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useListData } from '@/composables/useListData.js'
import axios from '@/utils/axiosInstance.js'
import Pagination from '@/components/Pagination.vue'
import { useConfirmableAction } from '@/composables/useConfirmableAction.js'
import { notifyError, notifySuccess } from '@/utils/notifications.js'

const { t } = useI18n()

const itemLimit = 1
const {
  items: userItems,
  loadPage: loadMoreUsers,
  totalPages,
  currentPage,
} = useListData((page) => {
  return axios.get(`/users/banned?page=${page}&limit=${itemLimit}`)
})

const unblockDialogRef = ref(null)
const {
  selectedItem: bannedUser,
  requestAction: showUnblockDialog,
  confirmAction: confirmUnblock,
} = useConfirmableAction(unblockDialogRef)

async function calculatePages() {
  let items
  let content
  const pageNumber = currentPage.value > 1 ? Math.ceil(currentPage.value / 3) + 1 : 1
  try {
    content = await axios.get(`/users/banned?page=${pageNumber}&limit=${itemLimit * 3}`)
    items = content.data.length / itemLimit
    totalPages.value += Math.ceil(items)
  } catch (error) {
    console.error(error)
  }
}

function resetUserList() {
  totalPages.value = 0
  currentPage.value = 1
  userItems.value = []
  calculatePages()
  loadMoreUsers()
}

async function unblockUser(user) {
  try {
    const banResponse = await axios.patch(`/users/${user.id}/unban`)
    if (banResponse.status === 200) {
      notifySuccess(t('notifications.users.unbanned'))
      resetUserList()
    }
  } catch (error) {
    console.error(error)
    notifyError(t('notifications.users.unbanned_error'))
  }
}

function onPageChange(page) {
  currentPage.value = page
  if (currentPage.value === totalPages.value) {
    calculatePages()
  }
  loadMoreUsers()
}

onMounted(() => {
  resetUserList()
})
</script>

<template>
  <div class="content">
    <div class="users-list">
      <div class="user-item" v-for="user in userItems" :key="user.id">
        <div class="user-container">
          <div class="user-body">
            <h3>{{ user.nickname }} {{ user.email }}</h3>
            <p>
              <i18n-t keypath="labels.users.ban_message">
                <template #date>
                  {{ user.banDate }}
                </template>
                <template #reason>
                  <b>{{ user.banReason }}</b>
                </template>
              </i18n-t>
            </p>
          </div>
          <div class="user-actions">
            <md-filled-button @click="showUnblockDialog(user)">
              {{ $t('buttons.unblock_user') }}
            </md-filled-button>
          </div>
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
  <md-dialog ref="unblockDialogRef">
    <div slot="headline">{{ $t(`dialogs.users.unban.header`) }}</div>
    <form slot="content" id="unban-dialog" method="dialog">
      {{ $t(`dialogs.users.unban.message`, { name: bannedUser?.nickname }) }}
    </form>
    <div slot="actions">
      <md-text-button form="unban-dialog">
        {{ $t(`buttons.cancel`) }}
      </md-text-button>
      <md-filled-button form="unban-dialog" @click="confirmUnblock(unblockUser)">
        {{ $t(`buttons.ok`) }}
      </md-filled-button>
    </div>
  </md-dialog>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 1000px;
  width: 100%;
  height: 100%;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  width: 100%;
  height: 100%;
}

.user-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 16px;
  background-color: var(--secondary-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  gap: 12px;
  padding: 20px;
}

.user-container p, h3 {
  margin: 0;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.user-body {
  display: flex;
  flex-direction: column;
  word-break: break-word;
  gap: 8px;
}

.user-actions {
  display: flex;
  justify-content: end;
}

@media screen and (max-width: 480px) {

  .user-container h3 {
    font-size: 16px;
  }

  .user-container p {
    font-size: 14px;
  }

  .content {
    padding: 0 12px;
  }

  .users-list {
    gap: 12px;
    padding: 0;
    border: 0;
  }
}
</style>