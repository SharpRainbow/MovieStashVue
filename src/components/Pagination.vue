<script setup>
import { computed } from 'vue'

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['pagechanged'])

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1;
  }

  if (props.currentPage === props.totalPages && props.totalPages >= props.maxVisibleButtons) {
    return props.totalPages - props.maxVisibleButtons + 1;
  }

  return props.currentPage - 1;
})
const pages = computed(() => {
  const range = [];

  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage
    });
  }

  return range;
})
const isInFirstPage = computed(() => {
  return props.currentPage === 1;
})
const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
})

function onClickFirstPage() {
  emit('pagechanged', 1);
}

function onClickPreviousPage() {
  emit('pagechanged', props.currentPage - 1);
}

function onClickPage(page) {
  emit('pagechanged', page);
}

function onClickNextPage() {
  emit('pagechanged', props.currentPage + 1);
}

function onClickLastPage() {
  emit('pagechanged', props.totalPages);
}

function isPageActive(page) {
  return props.currentPage === page;
}
</script>

<template>
  <ul class="pagination" v-if="totalPages > 0">
    <li class="pagination-item">
      <md-text-button
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        В начало
      </md-text-button>
    </li>

<!--    <li class="pagination-item">-->
<!--      <md-text-button-->
<!--        type="button"-->
<!--        @click="onClickPreviousPage"-->
<!--        :disabled="isInFirstPage"-->
<!--      >-->
<!--        Previous-->
<!--      </md-text-button>-->
<!--    </li>-->

    <!-- Visible Buttons Start -->

    <li
      v-for="page in pages"
      class="pagination-item"
    >
      <div
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="['page-button', { active: isPageActive(page.name) }]"
      >
        {{ page.name }}
      </div>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <md-text-button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        дальше
      </md-text-button>
    </li>

<!--    <li class="pagination-item">-->
<!--      <button-->
<!--        type="button"-->
<!--        @click="onClickLastPage"-->
<!--        :disabled="isInLastPage"-->
<!--      >-->
<!--        Last-->
<!--      </button>-->
<!--    </li>-->
  </ul>
</template>

<style scoped>

.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;
}

.pagination-item {
  display: inline-block;
}

.page-button {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-button:hover {
  background-color: var(--focus-color);
}

.active {
  background-color: var(--focus-color);
  color: #ffffff;
}

</style>