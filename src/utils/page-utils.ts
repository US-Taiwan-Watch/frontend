export function getStaticPathsWithLocale<P>(paths: P[], locales?: string[]): (P & { locale?: string })[] {
  return (locales || [undefined]).map(locale => paths.map(p => ({
    ...p, locale,
  }))).flat()
} 