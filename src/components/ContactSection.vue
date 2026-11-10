<script setup>
import { computed } from 'vue'
import { contact } from '../content.js'
import { integrations } from '../config/integrations.js'
import { lineAddFriendUrl } from '../services/line.js'
import ContactForm from './ContactForm.vue'

// 還是「[ ... ]」佔位文字時，不產生連結
const isPlaceholder = (v) => /^\[.*\]$/.test(v.trim())

const channels = computed(() => [
  {
    label: '電話',
    value: contact.phone,
    href: isPlaceholder(contact.phone) ? null : `tel:${contact.phone.replace(/[^\d+]/g, '')}`,
  },
  {
    label: 'Email',
    value: contact.email,
    href: isPlaceholder(contact.email) ? null : `mailto:${contact.email}`,
  },
  // 有設定 LINE 官方帳號時，改由下方的「加入好友」按鈕呈現
  ...(integrations.line.enabled
    ? []
    : [
        {
          label: 'LINE',
          value: contact.line,
          href: isPlaceholder(contact.line)
            ? null
            : `https://line.me/R/ti/p/${encodeURIComponent(contact.line)}`,
        },
      ]),
])

const lineUrl = lineAddFriendUrl()
</script>

<template>
  <section id="contact" class="contact">
    <div class="container inner reveal">
      <div class="text">
        <h2>{{ contact.title }}</h2>
        <p class="lead">{{ contact.lead }}</p>
        <p class="badge">第一次諮詢免費 · 到廠看流程</p>
      </div>

      <div class="card">
        <p class="person">
          <strong>{{ contact.person }}</strong>
          <span>{{ contact.role }}</span>
        </p>
        <ul>
          <li v-for="c in channels" :key="c.label">
            <span class="label">{{ c.label }}</span>
            <a v-if="c.href" :href="c.href" target="_blank" rel="noopener">{{ c.value }}</a>
            <mark v-else class="todo" title="請在 src/content.js 填入">{{ c.value }}</mark>
          </li>
        </ul>

        <a v-if="lineUrl" class="line-btn" :href="lineUrl" target="_blank" rel="noopener">
          加入 LINE 官方帳號
        </a>

        <ContactForm v-if="integrations.contact.enabled" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: 96px 0;
  background: linear-gradient(135deg, var(--sky-900), var(--sky-700));
  color: var(--white);
}

.inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;
}

h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin-bottom: 16px;
}

.lead {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 24px;
}

.badge {
  display: inline-block;
  background: var(--sun-300);
  color: var(--sky-900);
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 999px;
}

.card {
  background: var(--white);
  color: var(--ink);
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

.person {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}

.person strong {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  color: var(--sky-900);
}

.person span {
  color: var(--ink-soft);
  font-size: 0.95rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
}

li {
  display: flex;
  align-items: center;
  gap: 16px;
}

.label {
  flex: none;
  width: 64px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--sky-700);
}

li a {
  font-weight: 500;
  text-decoration: none;
  color: var(--sky-900);
  word-break: break-all;
}

li a:hover {
  text-decoration: underline;
}

.line-btn {
  display: block;
  margin-top: 20px;
  padding: 12px 20px;
  border-radius: 999px;
  background: #06c755;
  color: var(--white);
  font-weight: 700;
  text-align: center;
  text-decoration: none;
}

.line-btn:hover {
  background: #05b04b;
}

@media (max-width: 860px) {
  .contact {
    padding: 72px 0;
  }
  .inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .card {
    padding: 24px;
  }
}
</style>
