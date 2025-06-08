<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@material/web/all.js'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
authStore.checkToken()
const accountLink = computed(() => {
  return authStore.isLoggedIn ? '/account' : '/login'
})
</script>

<template>
  <main>
    <div class="nav-rail">
      <RouterLink id="search-btn" to="/search">
        <md-fab aria-label="Edit">
          <md-icon slot="icon">search</md-icon>
        </md-fab>
      </RouterLink>
      <div class="left">
        <RouterLink to="/">
          <div class="nav-item">
            <div class="icon-container">
              <md-icon slot="icon">home</md-icon>
            </div>
            <span class="nav-label">{{ $t(`labels.main.home`) }}</span>
          </div>
        </RouterLink>
        <RouterLink to="/collections">
          <div class="nav-item">
            <div class="icon-container">
              <md-icon slot="icon">collections_bookmark</md-icon>
            </div>
            <span class="nav-label">{{ $t(`labels.main.collections`) }}</span>
          </div>
        </RouterLink>
      </div>
      <div class="right">
        <RouterLink to="/news">
          <div class="nav-item">
            <div class="icon-container">
              <md-icon slot="icon">newsmode</md-icon>
            </div>
            <span class="nav-label">{{ $t(`labels.main.news`) }}</span>
          </div>
        </RouterLink>
        <RouterLink :to="accountLink">
          <div class="nav-item">
            <div class="icon-container">
              <md-icon slot="icon">person</md-icon>
            </div>
            <span class="nav-label">{{ $t(`labels.main.account`) }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div id="main-container">
      <header id="main-header">
        <md-icon slot="icon">movie</md-icon>
        <h1>MovieStash</h1>
      </header>
      <div id="main-content">
        <RouterView />
      </div>
      <footer id="footer">
        <div class="footer-content">
          <div class="footer-left">
            <p>&copy; 2025 MovieStash</p>
          </div>
          <div class="footer-right">
            <div class="social-icons">
              <a href="https://vk.com" target="_blank">
                <img src="/src/assets/icons/vk.svg" alt="Vk" width="24" height="24" />
              </a>
              <a href="https://twitter.com" target="_blank">
                <img src="/src/assets/icons/x.svg" alt="Twitter" width="24" height="24" />
              </a>
              <a href="https://telegram.org" target="_blank">
                <img src="/src/assets/icons/tg.svg" alt="LinkedIn" width="24" height="24" />
              </a>
              <a href="https://youtube.com" target="_blank">
                <img src="/src/assets/icons/yt.svg" alt="YouTube" width="24" height="24" />
              </a>
            </div>
            <nav class="footer-nav">
              <RouterLink to="/">{{ $t(`labels.main.home`) }}</RouterLink>
              <RouterLink to="/collections">{{ $t(`labels.main.collections`) }}</RouterLink>
              <RouterLink to="/news">{{ $t(`labels.main.news`) }}</RouterLink>
              <RouterLink :to="accountLink">{{ $t(`labels.main.account`) }}</RouterLink>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  font-family: Roboto, system-ui, sans-serif;
  background: var(--background-color);
}

.nav-rail {
  width: 80px;
  flex-shrink: 0;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}

.nav-item {
  width: 60px;
  height: 60px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-item .icon-container {
  width: 60px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  text-decoration: none;
}

.nav-item:hover .icon-container {
  background-color: var(--focus-color);
}

.router-link-active .nav-item .icon-container {
  font-variation-settings: 'FILL' 1;
  background-color: var(--focus-color);
}

.nav-label {
  margin-top: 5px;
  font-size: 12px;
  color: var(--icon-color);
  font-weight: bold;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  --md-icon-size: 48px;
  gap: 8px;
}

md-fab {
  --md-sys-color-surface-container-high: var(--focus-color);
  --md-sys-color-primary: black;
}

#search-btn {
  padding-top: 20px;
  padding-bottom: 20px;
}

#main-content {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  flex-grow: 1;
  box-sizing: border-box;
}

#main-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

footer {
  color: var(--icon-color);
  padding: 20px;
  flex-shrink: 0;
  position: relative;
  border-top: 2px solid var(--secondary-color);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 0 auto;
}

.footer-left p {
  margin: 0;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.footer-nav {
  display: flex;
  gap: 20px;
}

.footer-nav a {
  color: var(--icon-color);
  text-decoration: none;
  font-weight: 500;
}

.footer-nav a:hover {
  text-decoration: underline;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icons a img {
  width: 24px;
  height: 24px;
}

.social-icons a:hover img {
  opacity: 0.8;
}

@media screen and (max-device-width: 480px) {
  main {
    flex-direction: column-reverse;
  }

  .left {
    display: flex;
    gap: 24px;
  }

  .right {
    display: flex;
    gap: 24px;
  }

  #main-container {
    padding-bottom: 56px;
  }

  .nav-rail {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: env(safe-area-inset-bottom);
  }

  #search-btn {
    position: absolute;
    padding: 0;
    left: 50%;
    transform: translateX(-50%);
    --md-fab-container-height: 48px;
    --md-fab-container-width: 48px;
    --md-fab-icon-size: 24px;
  }

  header {
    --md-icon-size: 36px;
    font-size: 12px;
  }

  .nav-label {
    display: none;
  }

  .nav-item {
    width: 40px;
    height: 40px;
  }

  footer {
    font-size: 12px;
    padding: 10px;
  }

  .footer-content {
    flex-direction: column-reverse;
    align-items: center;
  }

  .footer-left {
    margin-top: 10px;
  }

  .footer-right {
    align-items: center;
  }

  #main-header h1 {
    margin: 10px 0;
  }

  md-fab {
    width: 50px;
    height: 50px;
  }
}
</style>
