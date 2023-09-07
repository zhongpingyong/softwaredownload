import { createI18n } from 'vue-i18n'
import zhCN from './langs/zh-CN'
import enUS from './langs/en-US'

export const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})
