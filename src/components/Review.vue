<script setup>
import { useConfirmableAction } from '@/composables/useConfirmableAction.js'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  reviewId: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionsVisibility: {
    type: Boolean,
    default: false
  },
  deleteAction: {
    type: Function,
    required: false,
    default: () => {}
  },
  changeAction: {
    type: Function,
    required: false,
    default: () => {}
  },
  clickAction: {
    type: Function,
    required: false,
    default: () => {
      console.log('click action')
    }
  }
})
const removeReviewDialogRef = ref(null)

const opinionColor = computed(() => {
  if (props.type === 'Хорошо')
    return '#76FF03'
  else if (props.type === 'Плохо')
    return '#FF1744'
  else
    return '#BDBDBD'
})

const {
  selectedItem: _,
  requestAction: showRemoveDialog,
  confirmAction: confirmRemoval,
} = useConfirmableAction(removeReviewDialogRef)

</script>

<template>
  <div class="review-container">
    <div class="review-body" @click="clickAction">
      <div class="review-info">
        <p>
          {{ props.author }} оставил оценку
          <span :style="{color: opinionColor}">
          {{ props.type }}
        </span>
        </p>
        <p>{{ props.date }}</p>
      </div>
      <h3>{{ props.title }}</h3>
      <p>{{ props.description }}</p>
    </div>
    <div class="review-actions" v-if="actionsVisibility">
      <md-filled-button @click="changeAction">
        Изменить
      </md-filled-button>
      <md-filled-button @click="showRemoveDialog(reviewId)">
        Удалить
      </md-filled-button>
    </div>
  </div>
  <md-dialog ref="removeReviewDialogRef">
    <div slot="headline">{{ $t(`dialogs.review.delete_header`) }}</div>
    <form slot="content" id="remove-dialog" method="dialog">
      {{ $t(`dialogs.review.delete_message`) }}
    </form>
    <div slot="actions">
      <md-text-button form="remove-dialog">{{
          $t(`dialogs.review.delete_cancel`)
        }}</md-text-button>
      <md-filled-button form="remove-dialog" @click="confirmRemoval(props.deleteAction)">
        {{ $t(`dialogs.review.delete_ok`) }}
      </md-filled-button>
    </div>
  </md-dialog>
</template>

<style scoped>
.review-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 16px; /* Rounded corners */
  background-color: #272d36; /* Background color of the rectangle */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow effect */
  padding: 0 16px;
}

.review-body {
  cursor: pointer;
}

.review-container p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 1.4;
}

.review-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.review-actions {
  display: flex;
  align-self: end;
  margin-bottom: 16px;
  gap: 12px;
}

.review-info p {
  color: gray;
}

h3 {
  margin: 0;
}

@media screen and (max-device-width: 480px) {

  .review-container p {
    font-size: 12px;
  }

}
</style>
