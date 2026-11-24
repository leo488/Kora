import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ORG_SCHEMA, PAGES, SITE } from './src/seo.ts'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/* After the build: one HTML file per page with its own title, description,
   canonical and link-preview tags baked in (Vercel serves these before the
   SPA rewrite), plus sitemap.xml and robots.txt. Skipped for relative-base
   preview builds. */
function seoPages(): Plugin {
  let outDir = 'dist'
  let base = '/'
  return {
    name: 'koraa-seo-pages',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
      base = config.base
    },
    closeBundle() {
      if (base !== '/') return
      const shell = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const page of PAGES) {
        const url = `${SITE.url}${page.path === '/' ? '/' : page.path}`
        const head = [
          `<title>${esc(page.title)}</title>`,
          `<meta name="description" content="${esc(page.description)}" />`,
          page.unlisted ? `<meta name="robots" content="noindex, nofollow" />` : '',
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:site_name" content="${SITE.name}" />`,
          `<meta property="og:locale" content="${SITE.locale}" />`,
          `<meta property="og:type" content="${page.type ?? 'website'}" />`,
          `<meta property="og:title" content="${esc(page.title)}" />`,
          `<meta property="og:description" content="${esc(page.description)}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:image" content="${SITE.url}${SITE.image}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${esc(page.title)}" />`,
          `<meta name="twitter:description" content="${esc(page.description)}" />`,
          `<meta name="twitter:image" content="${SITE.url}${SITE.image}" />`,
          page.published ? `<meta property="article:published_time" content="${page.published}" />` : '',
          `<script type="application/ld+json">${JSON.stringify(ORG_SCHEMA)}</script>`,
        ]
          .filter(Boolean)
          .join('\n    ')
        const html = shell.replace(/<title>[\s\S]*?<\/title>/, head)
        const dir = page.path === '/' ? outDir : join(outDir, page.path)
        mkdirSync(dir, { recursive: true })
        writeFileSync(join(dir, 'index.html'), html)
      }
      const today = new Date().toISOString().slice(0, 10)
      const urls = PAGES.filter((p) => !p.unlisted).map(
        (p) =>
          `  <url><loc>${SITE.url}${p.path === '/' ? '/' : p.path}</loc><lastmod>${p.published ?? today}</lastmod></url>`,
      ).join('\n')
      writeFileSync(
        join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      writeFileSync(
        join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPages()],
})
