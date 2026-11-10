// 共用的 fetch 包裝：逾時、錯誤訊息統一處理。

export class ApiError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.cause = cause
  }
}

export async function request(url, { method = 'GET', headers, body, timeout = 15000, signal } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  signal?.addEventListener('abort', () => controller.abort(), { once: true })

  try {
    const res = await fetch(url, { method, headers, body, signal: controller.signal })
    const type = res.headers.get('content-type') || ''
    const data = type.includes('application/json') ? await res.json() : await res.text()
    if (!res.ok) {
      throw new ApiError(`請求失敗（${res.status}）`, { status: res.status, cause: data })
    }
    return data
  } catch (err) {
    if (err instanceof ApiError) throw err
    if (err.name === 'AbortError') throw new ApiError('連線逾時，請稍後再試', { cause: err })
    throw new ApiError('網路連線失敗，請檢查網路後再試', { cause: err })
  } finally {
    clearTimeout(timer)
  }
}

export const postJson = (url, payload, opts = {}) =>
  request(url, {
    ...opts,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...opts.headers },
    body: JSON.stringify(payload),
  })
