<script setup>
import { story } from '../content.js'
import RichText from './RichText.vue'

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <section id="story" class="section story">
    <div class="container">
      <header class="section-head reveal">
        <span class="kicker">{{ story.kicker }}</span>
        <h2 class="section-title">{{ story.title }}</h2>
      </header>

      <ol class="timeline">
        <li
          v-for="(ch, i) in story.chapters"
          :key="ch.title"
          class="chapter reveal"
          :class="{ last: i === story.chapters.length - 1 }"
        >
          <span class="num">{{ pad(i + 1) }}</span>
          <div class="content">
            <h3>{{ ch.title }}</h3>
            <p><RichText :text="ch.body" /></p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.story {
  background: var(--white);
  border-block: 1px solid var(--line);
}

.timeline {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 760px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 27px;
  width: 2px;
  background: linear-gradient(var(--sky-100), var(--sky-500) 60%, var(--sun-300));
}

.chapter {
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 28px;
  padding-bottom: 48px;
}

.chapter:last-child {
  padding-bottom: 0;
}

.num {
  position: relative;
  z-index: 1;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--white);
  border: 2px solid var(--sky-500);
  color: var(--sky-700);
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.1rem;
}

.chapter.last .num {
  background: var(--sun-300);
  border-color: var(--sun-300);
  color: var(--sky-900);
}

.content {
  padding-top: 10px;
}

.content h3 {
  font-size: 1.3rem;
  color: var(--sky-900);
  margin-bottom: 12px;
}

.content p {
  color: var(--ink-soft);
  font-size: 1.02rem;
}

@media (max-width: 600px) {
  .chapter {
    grid-template-columns: 44px 1fr;
    gap: 18px;
  }
  .num {
    width: 44px;
    height: 44px;
    font-size: 0.95rem;
  }
  .timeline::before {
    left: 21px;
  }
  .content {
    padding-top: 4px;
  }
}
</style>
