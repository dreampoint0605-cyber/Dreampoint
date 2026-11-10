// 外部串接設定：全部從環境變數（.env 或 GitHub Actions Variables）讀取。
// 沒設定的功能會自動關閉，網站維持原本的樣子。詳見 .env.example。

const env = import.meta.env
const read = (key) => (env[key] ?? '').toString().trim()

const contactProvider = read('VITE_CONTACT_PROVIDER') // formspree | gas | webhook
const contactEndpoint = read('VITE_CONTACT_ENDPOINT')

const lineOaId = read('VITE_LINE_OA_ID') // 例如 @dreamify

const chatEndpoint = read('VITE_CHAT_ENDPOINT')

export const integrations = {
  contact: {
    enabled: Boolean(contactProvider && contactEndpoint),
    provider: contactProvider,
    endpoint: contactEndpoint,
  },
  line: {
    enabled: Boolean(lineOaId),
    oaId: lineOaId,
  },
  chat: {
    enabled: Boolean(chatEndpoint),
    endpoint: chatEndpoint,
    welcome: read('VITE_CHAT_WELCOME') || '你好，我是晴境的 AI 助理。想了解 AI 怎麼幫你整理訂單嗎？',
  },
}
