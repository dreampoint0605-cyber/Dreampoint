// 聯絡表單送出。用 VITE_CONTACT_PROVIDER 切換後端，表單元件不需要知道細節。
import { integrations } from '../config/integrations.js'
import { postJson, request } from './http.js'

const adapters = {
  // Formspree：https://formspree.io/f/xxxx
  formspree: (endpoint, data) => postJson(endpoint, data),

  // Google Apps Script 網頁應用程式（寫入 Google Sheets）。
  // 用 text/plain 避免 CORS preflight，Apps Script 端用 JSON.parse(e.postData.contents) 讀取。
  gas: (endpoint, data) =>
    request(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    }),

  // 自架後端或 n8n / Make 等 webhook，收 JSON。
  webhook: (endpoint, data) => postJson(endpoint, data),
}

export function validateContact({ name, phone, email, message }) {
  const errors = {}
  if (!name?.trim()) errors.name = '請填寫稱呼'
  if (!phone?.trim() && !email?.trim()) errors.phone = '電話或 Email 至少填一項'
  if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Email 格式不正確'
  if (!message?.trim()) errors.message = '請簡單描述你的需求'
  return errors
}

export async function submitContact(form) {
  const { enabled, provider, endpoint } = integrations.contact
  if (!enabled) throw new Error('聯絡表單尚未設定')
  const adapter = adapters[provider]
  if (!adapter) throw new Error(`不支援的表單服務：${provider}`)

  const payload = {
    name: form.name.trim(),
    company: form.company?.trim() || '',
    phone: form.phone?.trim() || '',
    email: form.email?.trim() || '',
    message: form.message.trim(),
    source: typeof location !== 'undefined' ? location.href : '',
    submittedAt: new Date().toISOString(),
  }
  return adapter(endpoint, payload)
}
