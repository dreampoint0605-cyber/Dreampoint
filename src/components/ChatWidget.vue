<script setup>
import { nextTick, ref } from 'vue'
import { integrations } from '../config/integrations.js'
import { sendChat } from '../services/chat.js'

const open = ref(false)
const input = ref('')
const sending = ref(false)
const listEl = ref(null)
const messages = ref([{ role: 'assistant', content: integrations.chat.welcome }])

const scrollToEnd = async () => {
  await nextTick()
  listEl.value?.scrollTo({ top: listEl.value.scrollHeight })
}

async function send() {
  const text = input.value.trim()
  if (!text || sending.value) return
  messages.value.push({ role: 'user', content: text })
  input.value = ''
  sending.value = true
  scrollToEnd()
  try {
    // 歡迎詞是前端產生的，不送給後端
    const reply = await sendChat(messages.value.slice(1))
    messages.value.push({ role: 'assistant', content: reply })
  } catch (err) {
    messages.value.push({ role: 'assistant', content: err.message, error: true })
  } finally {
    sending.value = false
    scrollToEnd()
  }
}
</script>

<template>
  <div class="chat">
    <section v-if="open" id="chat-panel" class="panel" aria-label="AI 助理">
      <header>
        <strong>晴境 AI 助理</strong>
        <button class="close" aria-label="關閉" @click="open = false">×</button>
      </header>
      <ol ref="listEl" class="list" aria-live="polite">
        <li v-for="(m, i) in messages" :key="i" :class="[m.role, { error: m.error }]">{{ m.content }}</li>
        <li v-if="sending" class="assistant typing">思考中…</li>
      </ol>
      <form @submit.prevent="send">
        <input v-model="input" placeholder="輸入你的問題…" aria-label="訊息" maxlength="500" />
        <button type="submit" :disabled="sending || !input.trim()">送出</button>
      </form>
      <p class="note">AI 回覆僅供參考，正式報價以工程師確認為準。</p>
    </section>

    <button
      class="fab"
      :aria-expanded="open"
      aria-controls="chat-panel"
      :aria-label="open ? '關閉 AI 助理' : '開啟 AI 助理'"
      @click="open = !open"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16v11H8l-4 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.chat {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}
.fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 0;
  background: var(--sky-700);
  color: var(--white);
  box-shadow: var(--shadow);
  cursor: pointer;
  display: grid;
  place-items: center;
}
.fab svg {
  width: 26px;
  height: 26px;
}
.panel {
  width: min(360px, calc(100vw - 40px));
  height: min(520px, calc(100vh - 120px));
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: 0 20px 40px rgba(18, 58, 86, 0.2);
  overflow: hidden;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: var(--sky-900);
  color: var(--white);
}
.close {
  background: none;
  border: 0;
  color: inherit;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}
.list {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--paper);
}
.list li {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.95rem;
}
.assistant {
  align-self: flex-start;
  background: var(--sky-100);
  color: var(--ink);
}
.user {
  align-self: flex-end;
  background: var(--sky-700);
  color: var(--white);
}
.error {
  background: #fdecea;
  color: #a93226;
}
.typing {
  opacity: 0.7;
}
form {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--line);
}
form input {
  flex: 1;
  font: inherit;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
}
form button {
  font: inherit;
  font-weight: 700;
  border: 0;
  border-radius: 999px;
  padding: 0 16px;
  background: var(--sun-300);
  color: var(--sky-900);
  cursor: pointer;
}
form button:disabled {
  opacity: 0.5;
  cursor: default;
}
.note {
  margin: 0;
  padding: 0 12px 10px;
  font-size: 0.75rem;
  color: var(--ink-soft);
}
</style>
