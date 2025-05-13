<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps(['property'])

const newValue = ref('')
const isSavable = computed(() => newValue.value.trim() === '')
const router = useRouter()

function onInput(e) {
  newValue.value = e.target.value
}

function goBack() {
  if (window.history.state.back) {
    router.back()
  } else {
    router.replace('/account')
  }
}
</script>

<template>
<div class="content">
  <div class="external">
  <div class="horizontal-container">
    <RouterLink to="/account" @click="goBack">
      <md-icon>chevron_left</md-icon>
    </RouterLink>
    <h2>{{ $t(`fields.${props.property}.label`) }}</h2>
  </div>
  </div>
  <div class="container">
    <md-outlined-text-field
      :label="$t(`fields.${property}.label`)"
      :value="newValue"
      @input="onInput"
    />
    <h4>{{ $t(`fields.${props.property}.note`) }}</h4>
    <p>{{ $t(`fields.${props.property}.description`) }}</p>
    <div class="horizontal-container">
      <md-text-button>Отмена</md-text-button>
      <md-filled-button :disabled="isSavable">Сохранить</md-filled-button>
    </div>
  </div>
</div>
</template>

<style scoped>

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  border: 1px solid var(--secondary-color);
  box-sizing: border-box;
  padding: 24px;
  justify-items: center;
}

.container h4 {
  margin-top: 32px;
  margin-bottom: 0;
}

.external {
  width: 100%;
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--secondary-color);
}

.horizontal-container {
  display: flex;
  gap: 24px;
  justify-content: flex-start;
  align-items: center;
  max-width: 500px;
  margin: auto;
  width: 100%;
}

.container .horizontal-container {
  justify-content: flex-end;
}

h2 {
  padding: 0;
  margin: 0;
}

</style>