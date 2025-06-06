<script setup>

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  dimension: {
    type: Number,
    default: 150
  },
  icon: {
    type: String,
    default: 'movie'
  }
})
</script>

<template>
<div
  class="collection-container"
>
  <md-icon slot="icon">{{ props.icon || 'movie' }}</md-icon>
  <label>{{ props.name }}</label>
</div>
</template>

<style scoped>
.collection-container {
  width: v-bind(dimension + 'px');
  height: v-bind(dimension + 'px');
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 16px;
  background-color: var(--secondary-color);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.collection-container label {
  text-align: center;
}

@media screen and (max-width: 480px) {
  .collection-container {
    width: 100px;
    height: 100px;
    padding: 16px;
  }

  label {
    font-size: 12px;
  }
}
</style>