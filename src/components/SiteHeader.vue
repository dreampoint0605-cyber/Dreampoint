<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { site } from '../content.js'

const links = [
  { href: '#features', label: 'AI 怎麼幫你' },
  { href: '#story', label: '品牌故事' },
  { href: '#promise', label: '我們的承諾' },
]

const scrolled = ref(false)
const open = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'is-solid': scrolled || open }">
    <div class="container bar">
      <a href="#top" class="brand" @click="open = false">
        <svg class="logo" viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="14" fill="currentColor" />
          <circle cx="32" cy="34" r="13" fill="#f6c453" />
          <path d="M14 46h36" stroke="#fff" stroke-width="4" stroke-linecap="round" />
        </svg>
        <span>{{ site.name }}</span>
      </a>

      <button
        class="menu-btn"
        :aria-expanded="open"
        aria-label="開啟選單"
        @click="open = !open"
      >
        <span /><span /><span />
      </button>

      <nav class="nav" :class="{ 'is-open': open }">
        <a v-for="l in links" :key="l.href" :href="l.href" @click="open = false">{{ l.label }}</a>
        <a href="#contact" class="nav-cta" @click="open = false">免費諮詢</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  color: var(--white);
  transition: background 0.3s, box-shadow 0.3s, color 0.3s;
}

.header.is-solid {
  background: rgba(251, 250, 246, 0.94);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--line);
  color: var(--sky-900);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.08em;
}

.logo {
  width: 34px;
  height: 34px;
  color: var(--sky-700);
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav a {
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  opacity: 0.9;
}

.nav a:hover {
  opacity: 1;
}

.nav-cta {
  background: var(--sun-300);
  color: var(--sky-900);
  padding: 8px 18px;
  border-radius: 999px;
  font-weight: 700 !important;
  opacity: 1 !important;
}

.menu-btn {
  display: none;
  background: none;
  border: 0;
  padding: 8px;
  cursor: pointer;
  color: inherit;
}

.menu-btn span {
  display: block;
  width: 22px;
  height: 2px;
  margin: 5px 0;
  background: currentColor;
  border-radius: 2px;
}

@media (max-width: 760px) {
  .menu-btn {
    display: block;
  }

  .nav {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 20px 20px;
    background: var(--paper);
    box-shadow: 0 12px 24px rgba(18, 58, 86, 0.1);
    display: none;
  }

  .nav.is-open {
    display: flex;
  }

  .nav a {
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
    color: var(--sky-900);
  }

  .nav-cta {
    margin-top: 12px;
    text-align: center;
    border-bottom: 0 !important;
  }
}
</style>
