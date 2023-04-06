import type { EasemobChat, EasemobChatStatic } from 'easemob-websdk'
import WebSocket from 'ws'
import { JSDOM } from 'jsdom'

export interface OpenOptions {
  /** The User ID. */
  user: string
  /** The password. */
  pwd?: string
  /** Token required to connect to the message service. */
  accessToken?: string
  /** The Agora token. */
  agoraToken?: string
  success?: (res: any) => void
  error?: (res: any) => void
}

const previousGlobalThis = { ...globalThis }

export const createIMConnection = async () => {
  const { window } = new JSDOM('', { url: 'https://im.chaoxing.com/webim/me' })

  globalThis.window = window as unknown as typeof globalThis.window
  globalThis.navigator = window.navigator
  globalThis.document = window.document
  globalThis.WebSocket = WebSocket as unknown as typeof globalThis.WebSocket
  globalThis.Image = window.Image
  globalThis.history = window.history
  globalThis.SVGElement = window.SVGElement
  globalThis.XMLHttpRequest = window.XMLHttpRequest

  const Easemob = await import('easemob-websdk').then(lib => lib.default || lib) as any

  const { connection } = Easemob?.default as EasemobChatStatic

  const conn: EasemobChat.Connection = new connection({
    url: 'https://im-api-vip6-v2.easecdn.com/ws',
    apiUrl: 'https://a1-vip6.easecdn.com',
    appKey: 'cx-dev#cxstudy',
    https: true,
    delivery: false,
    autoReconnectNumMax: 2,
  })

  // globalThis.window = previousGlobalThis.window
  // globalThis.navigator = previousGlobalThis.navigator
  globalThis.document = previousGlobalThis.document

  return conn
}

export const IMConnectionMap = new Map<string, EasemobChat.Connection>()