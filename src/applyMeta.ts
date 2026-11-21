import { SITE, metaFor } from './seo'

/* Keeps <head> in step with the page in the browser: title, description,
   canonical link and the link-preview tags. The built HTML already carries
   the same tags for each page, so crawlers that skip JavaScript see them. */

function tag(selector: string, make: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = make()
    document.head.appendChild(el)
  }
  return el
}

const meta = (attr: 'name' | 'property', key: string, content: string) =>
  tag(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute(attr, key)
    return m
  }).setAttribute('content', content)

export function applyMeta(pathname: string) {
  const page = metaFor(pathname)
  const url = `${SITE.url}${page.path === '/' ? '/' : page.path}`
  document.title = page.title
  meta('name', 'description', page.description)
  meta('property', 'og:title', page.title)
  meta('property', 'og:description', page.description)
  meta('property', 'og:url', url)
  meta('property', 'og:type', page.type ?? 'website')
  meta('name', 'twitter:title', page.title)
  meta('name', 'twitter:description', page.description)
  tag('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.rel = 'canonical'
    return l
  }).setAttribute('href', url)
}

