<script setup>
import { features } from '../content.js'

const icons = {
  chat: 'M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 5h8M8 13h5',
  sheet: 'M5 3h10l4 4v14H5zM15 3v4h4M8 11h8M8 15h8M12 11v8',
  bell: 'M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
}
</script>

<template>
  <section id="features" class="section">
    <div class="container">
      <header class="section-head reveal">
        <span class="kicker">{{ features.kicker }}</span>
        <h2 class="section-title">{{ features.title }}</h2>
      </header>

      <!-- 流程示意：LINE / Excel → AI 整理 → 清楚的結果 -->
      <div class="flow reveal" aria-hidden="true">
        <div class="flow-step">
          <span class="chip chip-line">LINE</span>
          <span class="chip chip-excel">Excel</span>
          <small>你原本的工具</small>
        </div>
        <span class="arrow">→</span>
        <div class="flow-step">
          <span class="chip chip-ai">AI 整理</span>
          <small>在背後默默做</small>
        </div>
        <span class="arrow">→</span>
        <div class="flow-step">
          <span class="chip chip-out">訂單 · 報價 · 交期</span>
          <small>清清楚楚</small>
        </div>
      </div>

      <div class="grid">
        <article
          v-for="(item, i) in features.items"
          :key="item.title"
          class="card reveal"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div class="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path :d="icons[item.icon]" />
            </svg>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </article>
      </div>

      <p class="note reveal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4" />
        </svg>
        {{ features.note }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.flow-step small {
  color: var(--ink-soft);
  font-size: 0.8rem;
}

.flow-step:first-child {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 180px;
}

.flow-step:first-child small {
  width: 100%;
  text-align: center;
}

.chip {
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
}

.chip-line { background: #e3f6e8; color: #127a35; }
.chip-excel { background: #e4f1ea; color: #1d6b43; }
.chip-ai { background: var(--sky-700); color: var(--white); padding: 12px 22px; }
.chip-out { background: var(--sun-100); color: #7a4f00; }

.arrow {
  font-size: 1.5rem;
  color: var(--sky-500);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 36px 28px;
  box-shadow: var(--shadow);
}

.icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--sky-100);
  color: var(--sky-700);
  margin-bottom: 20px;
}

.icon svg {
  width: 28px;
  height: 28px;
}

.card h3 {
  font-size: 1.25rem;
  color: var(--sky-900);
  margin-bottom: 10px;
}

.card p {
  color: var(--ink-soft);
}

.note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
  text-align: center;
  color: var(--sky-900);
  font-weight: 500;
}

.note svg {
  flex: none;
  width: 22px;
  height: 22px;
  color: var(--sky-700);
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .arrow {
    transform: rotate(90deg);
  }
  .flow {
    flex-direction: column;
    gap: 10px;
  }
  .note {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
