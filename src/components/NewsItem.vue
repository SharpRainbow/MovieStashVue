<script setup>
import { ref } from 'vue'
import { useConfirmableAction } from '@/composables/useConfirmableAction.js'

const props = defineProps({
  newsId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  deleteAction: {
    type: Function,
    required: false,
    default: null
  },
  changeAction: {
    type: Function,
    required: false,
    default: null
  },
  clickAction: {
    type: Function,
    required: false,
    default: null
  }
})
const deleteNewsDialogRef = ref(null)

const {
  requestAction: showNewRemovalDialog,
  confirmAction: confirmNewRemoval,
} = useConfirmableAction(deleteNewsDialogRef)
</script>

<template>
  <div class="news-container">
    <div class="news-body" @click="clickAction">
      <img v-if="props.image" :src="props.image" alt="news image">
      <div class="news-data">
        <h3> {{ props.title }} </h3>
        <p> {{ props.text }} </p>
      </div>
    </div>
    <div class="news-actions">
      <md-filled-button v-if="changeAction !== null" @click="changeAction(props.newsId)">
        {{ $t(`buttons.edit`) }}
      </md-filled-button>
      <md-filled-button v-if="props.deleteAction !== null" @click="showNewRemovalDialog(props.newsId)">
        {{ $t(`buttons.delete`) }}
      </md-filled-button>
    </div>
  </div>
  <md-dialog ref="deleteNewsDialogRef">
    <div slot="headline">{{ $t('dialogs.news.delete.header') }}</div>
    <form slot="content" id="remove-dialog" method="dialog">
      {{ $t('dialogs.news.delete.message', { name: props.title }) }}
    </form>
    <div slot="actions">
      <md-text-button form="remove-dialog">{{ $t('buttons.cancel') }}</md-text-button>
      <md-filled-button form="remove-dialog" @click="confirmNewRemoval(props.deleteAction)">
        {{ $t('buttons.ok') }}
      </md-filled-button>
    </div>
  </md-dialog>
</template>

<style scoped>
.news-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 16px;
  background-color: var(--secondary-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  gap: 12px;
  padding: 20px;
}

.news-container img {
  height: 96px;
  border-radius: 12px;
  aspect-ratio: 1.25;
  object-fit: cover;
}

.news-data {
  flex-grow: 1;
  min-width: 0;
  overflow: hidden;
  cursor: pointer;
}

.news-data h3 {
  margin: 0;
  padding: 0;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.news-data p {
  margin: 8px 0 0;
  padding: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 1.4;
}

.news-body {
  display: flex;
  gap: 12px;
}

.news-actions {
  display: flex;
  justify-content: end;
  gap: 12px;
}

@media screen and (max-device-width: 480px) {

  .news-container {
    padding: 16px;
  }

  .news-container img {
    height: 64px;
  }

  .news-data p {
    -webkit-line-clamp: 2;
    line-height: 1.2;
  }

}
</style>