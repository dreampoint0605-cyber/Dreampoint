<script setup>
import { promises } from '../content.js'
</script>

<template>
  <section id="promise" class="section">
    <div class="container">
      <header class="section-head reveal">
        <span class="kicker">{{ promises.kicker }}</span>
        <h2 class="section-title">{{ promises.title }}</h2>
      </header>

      <div class="grid">
        <article
          v-for="(p, i) in promises.items"
          :key="p.tag"
          class="item reveal"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <span class="tag">{{ p.tag }}</span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.item {
  position: relative;
  padding: 32px 28px 32px;
  border-radius: var(--radius);
  background: linear-gradient(180deg, var(--sky-100), var(--paper));
  border: 1px solid var(--line);
}

.tag {
  display: inline-grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--sky-700);
  color: var(--white);
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 20px;
  box-shadow: 0 0 0 6px rgba(61, 139, 194, 0.15);
}

.item h3 {
  font-size: 1.2rem;
  color: var(--sky-900);
  margin-bottom: 8px;
}

.item p {
  color: var(--ink-soft);
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
