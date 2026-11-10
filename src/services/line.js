// LINE 官方帳號：產生加好友連結。
// 之後要做 LINE Login / Messaging API，請放在後端，前端只負責導向。
import { integrations } from '../config/integrations.js'

export function lineAddFriendUrl(id = integrations.line.oaId) {
  if (!id) return null
  const normalized = id.startsWith('@') ? id : `@${id}`
  return `https://line.me/R/ti/p/${encodeURIComponent(normalized)}`
}
