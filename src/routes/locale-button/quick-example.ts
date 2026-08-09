export const quickExample = `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'sv5ui-plus'
 import { setLocale, toLocale } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]

 let locale = 'en'
</script>

<LocaleButton
 {locales}
 {locale}
 onLocaleChange={(nextLocale) => {
  locale = nextLocale
  const target = toLocale(nextLocale)
  if (target) {
   return setLocale(target, { reload: false })
  }
 }}
/>`
