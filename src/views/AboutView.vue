<script setup>

</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <label>
      Material 3
      <md-checkbox checked></md-checkbox>
    </label>

    <md-outlined-button>Back</md-outlined-button>
    <md-filled-button>Next</md-filled-button>
    <md-icon slot="icon">home</md-icon>
  </div>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
}
</style>