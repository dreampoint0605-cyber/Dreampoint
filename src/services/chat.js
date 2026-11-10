// AI 聊天助理。前端只呼叫你自己的後端代理（VITE_CHAT_ENDPOINT），
// AI 服務的 API 金鑰一定要放在後端，絕對不能寫進前端或 VITE_ 變數。
//
// 後端約定：
//   POST { messages: [{ role: 'user' | 'assistant', content: string }] }
//   回應 { reply: string }
import { integrations } from '../config/integrations.js'
import { postJson } from './http.js'

const MAX_HISTORY = 20

export async function sendChat(messages, { signal } = {}) {
  const { enabled, endpoint } = integrations.chat
  if (!enabled) throw new Error('AI 助理尚未設定')
  const data = await postJson(
    endpoint,
    { messages: messages.slice(-MAX_HISTORY) },
    { signal, timeout: 60000 },
  )
  const reply = typeof data === 'string' ? data : data?.reply
  if (!reply) throw new Error('AI 助理暫時沒有回應，請稍後再試')
  return reply
}
