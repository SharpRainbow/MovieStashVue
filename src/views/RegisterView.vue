<script setup>

</script>

<template>
  <div class="content">
    <div class="reg-panel">
      <md-outlined-text-field label="Логин">
      </md-outlined-text-field>
      <md-outlined-text-field :type="passwordVisible ? `text` : `password`" label="Пароль">
        <md-icon-button toggle slot="trailing-icon" @click="passwordVisible = !passwordVisible">
          <md-icon>visibility</md-icon>
          <md-icon slot="selected">visibility_off</md-icon>
        </md-icon-button>
      </md-outlined-text-field>
      <md-outlined-text-field type="email" label="E-mail">
      </md-outlined-text-field>
      <md-outlined-text-field label="Никнейм">
      </md-outlined-text-field>
      <md-filled-button>Зарегистрироваться</md-filled-button>
    </div>
  </div>
</template>

<style scoped>
.content {
  flex-grow: 1;
  justify-items: center;
  align-content: center;
}

.reg-panel{
  gap: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 24px;
  background: var(--secondary-color);
  border-radius: 16px;
  width: 400px;
}

@media screen and (max-device-width: 480px) {
  .reg-panel {
    width: auto;
  }
}
</style>