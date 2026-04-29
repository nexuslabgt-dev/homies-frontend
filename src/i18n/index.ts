import { es } from './es'
import { en } from './en'

export type Locale = 'es' | 'en'
export type Translation = typeof es

export const translations: Record<Locale, Translation> = { es, en }

export function getTranslations(locale: Locale): Translation {
  return translations[locale] || translations.es
}
