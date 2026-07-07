import type { DocumentTypes } from 'contentlayer/generated'
import {
  allBackendForENGs,
  allBackendForKORs,
  allDesignForENGs,
  allDesignForKORs,
  allFrontendForENGs,
  allFrontendForKORs,
  allInfraForENGs,
  allInfraForKORs,
  allLanguageForENGs,
  allLanguageForKORs,
} from 'contentlayer/generated'

export function getAllDocumentsFlat(): DocumentTypes[] {
  return [
    ...allDesignForKORs,
    ...allFrontendForKORs,
    ...allBackendForKORs,
    ...allInfraForKORs,
    ...allLanguageForKORs,
    ...allDesignForENGs,
    ...allFrontendForENGs,
    ...allBackendForENGs,
    ...allInfraForENGs,
    ...allLanguageForENGs,
  ]
}

export function findPostByFlattenedPath(
  flattenedPath: string,
): DocumentTypes | undefined {
  return getAllDocumentsFlat().find(
    (d) => d._raw.flattenedPath === flattenedPath,
  )
}

export function lngToHreflang(lng: string): string {
  const u = lng?.toUpperCase?.() ?? ''
  if (u.includes('KOR') || u === 'KO') return 'ko'
  if (u.includes('ENG') || u.startsWith('EN')) return 'en'
  return 'ko'
}

/** Same `pageKey`, another language — for alternates.languages metadata. */
export function getAlternateLanguagePaths(
  pageKey: string,
  currentFlattenedPath: string,
): Record<string, string> | undefined {
  const siblings = getAllDocumentsFlat().filter(
    (d) =>
      d.pageKey === pageKey && d._raw.flattenedPath !== currentFlattenedPath,
  )
  if (siblings.length === 0) return undefined
  const out: Record<string, string> = {}
  for (const d of siblings) {
    const hreflang = lngToHreflang(d.lng)
    out[hreflang] = `/${d._raw.flattenedPath}`
  }
  return out
}
