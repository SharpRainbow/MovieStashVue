<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/utils/axiosInstance.js'
import { useAuthStore } from '@/stores/authStore.js'
import { notifyError, notifyInfo, notifySuccess } from '@/utils/notifications.js'
import { useI18n } from 'vue-i18n'
import { useConfirmableAction } from '@/composables/useConfirmableAction.js'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const reviewData = ref({
  id: 1,
  date: '',
  title: '',
  userName: '',
  description: ''
})
const banReason = ref('')
const removeReviewDialogRef = ref(null)
const {
  requestAction: showRemoveDialog,
  confirmAction: confirmRemoval
} = useConfirmableAction(removeReviewDialogRef)

const banUserDialogRef = ref(null)
const {
  requestAction: showBanDialog,
  confirmAction: confirmBan,
} = useConfirmableAction(banUserDialogRef)

const isAuthor = computed(() => {
  return Number(reviewData.value.userId) === Number(authStore.user.userId)
})

const opinionColor = computed(() => {
  const name = reviewData.value?.opinion?.name
  if (name === 'Хорошо')
    return '#76FF03'
  else if (name === 'Плохо')
    return '#FF1744'
  else
    return '#BDBDBD'
})

async function loadReview() {
  try {
    const reviewResponse = await axios.get(
      `/reviews/${route.params.id}`
    )
    if (reviewResponse.status === 200) {
      reviewData.value = reviewResponse.data
    }
  } catch (e) {
    console.error(e)
  }
}

function banReasonChanged(event) {
  banReason.value = event.target.value
}

function goBack() {
  if (window.history.state.back) {
    router.back()
  } else if (reviewData.value.contentId) {
    router.replace(`content/${reviewData.value.contentId}`)
  } else {
    router.replace('/')
  }
}

async function removeReview(reviewId) {
  try {
    const createReviewResponse = await axios.delete(
      `/reviews/${reviewId}`
    )
    if (createReviewResponse.status === 200) {
      goBack()
      notifySuccess(t('notifications.content.review_deleted'))
    }
  } catch (error) {
    console.error(error)
    notifyError(t('notifications.content.review_delete_error'))
  }
}

function changeReview() {
  router.push({ path: '/reviews/add', query: { content_id: reviewData.value.contentId } })
}

async function blockUser(userId) {
  try {
    const banResponse = await axios.patch(
      `/users/${userId}/ban`,
      { banReason: banReason.value }
    )
    if (banResponse.status === 200) {
      notifySuccess(t('notifications.users.banned'))
    }
  } catch (error) {
    console.error(error)
    notifyError(t('notifications.users.banned_error'))
  }
}

onMounted(() => {
  loadReview()
})
</script>

<template>
  <div class="view-content">
    <div class="review-info">
      <p>
        {{ reviewData.userName }} {{ $t(`labels.review.added_review`) }}
        <span :style="{color: opinionColor}">
          {{ reviewData?.opinion?.name }}
        </span>
      </p>
      <p>{{ reviewData.date }}</p>
    </div>
    <h1 class="review-title">{{ reviewData.title }}</h1>
    <pre class="review-data"> {{ reviewData.description }} </pre>
    <div class="review-actions" v-if="authStore.isLoggedIn">
      <md-filled-button
        v-if="authStore.hasRole('moderator') && reviewData.userId"
        @click="showBanDialog(reviewData.userId)"
      >
        {{ $t(`buttons.block_user`) }}
      </md-filled-button>
      <md-filled-button
        v-if="isAuthor && reviewData.contentId"
        @click="changeReview"
      >
        {{ $t(`buttons.edit`) }}
      </md-filled-button>
      <md-filled-button
        v-if="isAuthor || authStore.hasRole('moderator')"
        @click="showRemoveDialog(reviewData.id)"
      >
        {{ $t(`buttons.delete`) }}
      </md-filled-button>
    </div>
  </div>
  <md-dialog ref="removeReviewDialogRef">
    <div slot="headline">{{ $t(`dialogs.review.delete.header`) }}</div>
    <form slot="content" id="remove-dialog" method="dialog">
      {{ $t(`dialogs.review.delete.message`) }}
    </form>
    <div slot="actions">
      <md-text-button form="remove-dialog">
        {{ $t(`buttons.cancel`) }}
      </md-text-button>
      <md-filled-button form="remove-dialog" @click="confirmRemoval(removeReview)">
        {{ $t(`buttons.ok`) }}
      </md-filled-button>
    </div>
  </md-dialog>
  <md-dialog ref="banUserDialogRef">
    <div slot="headline">{{ $t(`dialogs.users.ban.header`) }}</div>
    <form slot="content" id="ban-dialog" method="dialog">
      <div>{{ $t(`dialogs.users.ban.message`, { name: reviewData.userName }) }}</div>
      <md-outlined-text-field
        :label="$t('fields.users.placeholder.ban')"
        :value="banReason"
        @input="banReasonChanged"
      >
      </md-outlined-text-field>
    </form>
    <div slot="actions">
      <md-text-button form="ban-dialog">
        {{ $t(`buttons.cancel`) }}
      </md-text-button>
      <md-filled-button :disabled="!banReason" form="ban-dialog" @click="confirmBan(blockUser)">
        {{ $t(`buttons.ok`) }}
      </md-filled-button>
    </div>
  </md-dialog>
</template>

<style scoped>

.view-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 800px;
  width: 100%;
}

.review-title {
  margin: 0;
}

.review-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.review-info p {
  color: gray;
}

.review-data {
  font-family: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
}

#ban-dialog {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review-actions {
  display: flex;
  gap: 12px;
  align-self: end;
}

md-outlined-text-field {
  width: 100%;
}

@media screen and (max-device-width: 480px) {
  .review-info {
    flex-direction: column;
    width: auto;
    align-items: center;
  }
  .review-info p {
    margin: 0 0 12px 0;
  }

  .review-actions {
    flex-direction: column-reverse;
    align-items: end;
  }
}

</style>