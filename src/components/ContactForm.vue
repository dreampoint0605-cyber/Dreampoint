<script setup>
import { reactive, ref } from 'vue'
import { submitContact, validateContact } from '../services/contact.js'

const form = reactive({ name: '', company: '', phone: '', email: '', message: '', website: '' })
const errors = ref({})
const status = ref('idle') // idle | sending | success | error
const errorMsg = ref('')

async function onSubmit() {
  if (form.website) return // 防機器人欄位
  errors.value = validateContact(form)
  if (Object.keys(errors.value).length) return

  status.value = 'sending'
  try {
    await submitContact(form)
    status.value = 'success'
  } catch (err) {
    errorMsg.value = err.message || '送出失敗，請改用電話或 LINE 聯絡'
    status.value = 'error'
  }
}
</script>

<template>
  <div v-if="status === 'success'" class="done" role="status">
    <strong>已收到你的訊息！</strong>
    <p>我會在 1 個工作天內回覆你。</p>
  </div>

  <form v-else class="form" novalidate @submit.prevent="onSubmit">
    <div class="row">
      <label>
        <span>稱呼 *</span>
        <input v-model="form.name" autocomplete="name" :aria-invalid="!!errors.name" />
        <small v-if="errors.name">{{ errors.name }}</small>
      </label>
      <label>
        <span>公司 / 工廠</span>
        <input v-model="form.company" autocomplete="organization" />
      </label>
    </div>
    <div class="row">
      <label>
        <span>電話</span>
        <input v-model="form.phone" type="tel" autocomplete="tel" :aria-invalid="!!errors.phone" />
        <small v-if="errors.phone">{{ errors.phone }}</small>
      </label>
      <label>
        <span>Email</span>
        <input v-model="form.email" type="email" autocomplete="email" :aria-invalid="!!errors.email" />
        <small v-if="errors.email">{{ errors.email }}</small>
      </label>
    </div>
    <label>
      <span>想解決的問題 *</span>
      <textarea
        v-model="form.message"
        rows="4"
        placeholder="例如：每天 LINE 接單很多，常漏單或抄錯數量"
        :aria-invalid="!!errors.message"
      />
      <small v-if="errors.message">{{ errors.message }}</small>
    </label>
    <input v-model="form.website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

    <p v-if="status === 'error'" class="error" role="alert">{{ errorMsg }}</p>
    <button type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? '送出中…' : '送出，預約免費諮詢' }}
    </button>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: 14px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
label {
  display: grid;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--sky-700);
}
input,
textarea {
  font: inherit;
  font-weight: 400;
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px 12px;
  background: var(--paper);
}
input:focus,
textarea:focus {
  outline: 2px solid var(--sky-500);
  outline-offset: 1px;
  border-color: transparent;
}
[aria-invalid='true'] {
  border-color: #c0392b;
}
small,
.error {
  color: #c0392b;
  font-weight: 500;
}
.hp {
  position: absolute;
  left: -9999px;
}
button {
  font: inherit;
  font-weight: 700;
  border: 0;
  border-radius: 999px;
  padding: 12px 20px;
  background: var(--sun-300);
  color: var(--sky-900);
  cursor: pointer;
}
button:hover:not(:disabled) {
  background: var(--sun-500);
}
button:disabled {
  opacity: 0.6;
  cursor: wait;
}
.done {
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  background: var(--sky-100);
  color: var(--sky-900);
}
@media (max-width: 520px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
