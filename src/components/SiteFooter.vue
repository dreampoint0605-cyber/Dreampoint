<script setup>
import { site } from '../content.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container inner">
      <p class="brand">{{ site.name }} <span>{{ site.nameEn }}</span></p>
      <p>{{ site.location }} · {{ site.tagline }}</p>
      <p class="copy">© {{ year }} {{ site.nameEn }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0d2b40;
  color: rgba(255, 255, 255, 0.75);
  padding: 36px 0;
  font-size: 0.9rem;
}

.inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 24px;
}

.brand {
  font-family: var(--font-serif);
  color: var(--white);
  font-weight: 700;
  font-size: 1rem;
}

.brand span {
  font-family: var(--font-sans);
  font-weight: 400;
  opacity: 0.7;
  margin-left: 6px;
}

.copy {
  opacity: 0.6;
}
</style>
