import { LOGO } from '../brand/logoData'
import { NEW_BUSINESS_EMAIL } from '../contact/sendBrief'
import type { Result } from './questions'

/* The downloadable report.
   ------------------------
   One A4 page, drawn on a canvas in the brand's own type and colours, then
   wrapped in a PDF by hand. No PDF library is needed for a single image page,
   so the site stays light. */

const W = 1654 // A4 at 200dpi
const H = 2339
const M = 120 // page margin

const BLUE = '#1a2db7'
const INK = '#0a0a0a'
const PAPER = '#ffffff'
const HARMATTAN = '#e6e6e6'
const PLANTAIN = '#d7f24b'

const FONT = '"Host Grotesk", system-ui, sans-serif'

/** The white wordmark, star cut out, as an SVG the canvas can draw. */
function wordmarkSvg(colour: string) {
  const starX = 520.734 + LOGO.tx[1]
  const letters = [LOGO.K, LOGO.O, LOGO.R, LOGO.A, LOGO.A]
    .map(
      (d, i) =>
        `<path d="${d}" transform="translate(${LOGO.tx[i]} 0)" fill="${colour}"${i === 1 ? ' mask="url(#s)"' : ''}/>`,
    )
    .join('')
  const bars = [0, 60, 120].map((a) => `<path d="${LOGO.bar}" transform="rotate(${a})"/>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="487.6 42.4 111.9 32.6" width="1119" height="326"><mask id="s" maskUnits="userSpaceOnUse" x="487.6" y="42.4" width="111.9" height="32.6"><rect x="487.6" y="42.4" width="111.9" height="32.6" fill="#fff"/><g transform="translate(${starX} 63.0595) scale(${LOGO.ast.s}) translate(${LOGO.ast.bx} ${LOGO.ast.by})" fill="#000">${bars}</g></mask>${letters}<path d="${LOGO.apos}" fill="${colour}"/></svg>`
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })

/** One blob of a CSS-style elliptical radial gradient, fading to nothing. */
function glow(
  ctx: CanvasRenderingContext2D,
  box: { w: number; h: number },
  at: [number, number],
  size: [number, number],
  rgb: string,
  reach: number,
) {
  ctx.save()
  ctx.translate(at[0] * box.w, at[1] * box.h)
  ctx.scale(size[0] * box.w, size[1] * box.h)
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1)
  gradient.addColorStop(0, `rgba(${rgb},1)`)
  gradient.addColorStop(reach, `rgba(${rgb},0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(-4, -4, 8, 8)
  ctx.restore()
}

/** Draws wrapped text and returns the y of the line after the last. */
function paragraph(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number,
) {
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word
    if (line && ctx.measureText(next).width > width) {
      ctx.fillText(line, x, y)
      y += lineHeight
      line = word
    } else {
      line = next
    }
  }
  if (line) {
    ctx.fillText(line, x, y)
    y += lineHeight
  }
  return y
}

async function drawReport(result: Result, brand: string) {
  // The page uses the site's font. Make sure every weight is in before
  // drawing, or the canvas quietly falls back to the system face.
  await Promise.all(
    ['500', '600', '700'].map((weight) => document.fonts.load(`${weight} 40px "Host Grotesk"`)),
  ).catch(() => {})

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No canvas')
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, W, H)

  /* Cover band: Plantain Glow, with the logo and the score on it. */
  const band = { w: W, h: 860 }
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, band.w, band.h)
  ctx.clip()
  ctx.fillStyle = BLUE
  ctx.fillRect(0, 0, band.w, band.h)
  glow(ctx, band, [0.08, 0.05], [0.6, 0.7], '68,86,255', 0.65)
  glow(ctx, band, [0.9, 0.95], [0.55, 0.7], '215,242,75', 0.7)
  ctx.restore()

  const mark = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(wordmarkSvg(PAPER))}`)
  const markH = 58
  ctx.drawImage(mark, M, M - 12, markH * 3.43, markH)

  ctx.fillStyle = PAPER
  ctx.textAlign = 'right'
  ctx.font = `600 26px ${FONT}`
  ctx.fillText('BRAND ANALYSIS', W - M, M + 30)
  ctx.textAlign = 'left'

  ctx.font = `600 470px ${FONT}`
  const scoreText = String(result.score)
  ctx.fillText(scoreText, M - 22, 610)
  const scoreWidth = ctx.measureText(scoreText).width
  ctx.font = `600 84px ${FONT}`
  ctx.fillText('/100', M + scoreWidth - 6, 610)

  ctx.font = `600 96px ${FONT}`
  ctx.fillText(result.level.title, M, 760)

  /* Body, on Paper. */
  let y = band.h + 110
  ctx.fillStyle = INK
  ctx.font = `600 24px ${FONT}`
  const date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  ctx.fillText(`${brand ? `${brand.toUpperCase()}  ·  ` : ''}${date.toUpperCase()}`, M, y)

  y += 70
  ctx.font = `500 38px ${FONT}`
  y = paragraph(ctx, result.level.summary, M, y, W - M * 2, 54)

  y += 70
  ctx.font = `600 24px ${FONT}`
  ctx.fillText('YOUR FIVE AREAS', M, y)
  y += 26

  const barX = M + 440
  const barW = W - M - 110 - barX
  for (const { pillar, score } of result.pillars) {
    ctx.fillStyle = HARMATTAN
    ctx.fillRect(M, y, W - M * 2, 2)
    y += 62
    ctx.fillStyle = INK
    ctx.font = `600 36px ${FONT}`
    ctx.fillText(pillar.name, M, y)
    ctx.textAlign = 'right'
    ctx.fillText(`${score}/6`, W - M, y)
    ctx.textAlign = 'left'
    ctx.fillStyle = HARMATTAN
    ctx.fillRect(barX, y - 24, barW, 22)
    ctx.fillStyle = BLUE
    ctx.fillRect(barX, y - 24, (barW * score) / 6, 22)
    y += 32
  }
  ctx.fillStyle = HARMATTAN
  ctx.fillRect(M, y, W - M * 2, 2)

  y += 96
  ctx.fillStyle = INK
  ctx.font = `600 24px ${FONT}`
  ctx.fillText(result.focus.length ? 'WHERE TO FOCUS FIRST' : 'WHAT TO DO NEXT', M, y)
  y += 64

  if (result.focus.length) {
    const columns = result.focus.length
    const gap = 70
    const columnW = (W - M * 2 - gap * (columns - 1)) / columns
    result.focus.forEach(({ pillar }, index) => {
      const x = M + index * (columnW + gap)
      ctx.font = `600 44px ${FONT}`
      ctx.fillText(pillar.name, x, y)
      ctx.font = `500 29px ${FONT}`
      paragraph(ctx, pillar.advice, x, y + 58, columnW, 43)
    })
  } else {
    ctx.font = `500 34px ${FONT}`
    paragraph(
      ctx,
      'Nothing here is holding you back. Keep the standard as the team and the markets grow, and review the brand once a year.',
      M,
      y,
      W - M * 2,
      50,
    )
  }

  /* Foot: Plantain band, Ink on it. */
  const footH = 230
  ctx.fillStyle = PLANTAIN
  ctx.fillRect(0, H - footH, W, footH)
  ctx.fillStyle = INK
  ctx.font = `600 46px ${FONT}`
  ctx.fillText('Want help closing the gaps?', M, H - footH + 98)
  ctx.font = `500 30px ${FONT}`
  ctx.fillText(`Write to ${NEW_BUSINESS_EMAIL} and send us this report.`, M, H - footH + 152)
  ctx.textAlign = 'right'
  ctx.font = `500 22px ${FONT}`
  ctx.fillText('A self-assessment from your own answers, not an audit.', W - M, H - footH + 152)
  ctx.textAlign = 'left'

  return canvas
}

/** Wraps one JPEG in the smallest valid single-page A4 PDF. */
function pdfFromJpeg(jpeg: Uint8Array, width: number, height: number) {
  const encoder = new TextEncoder()
  const parts: Uint8Array[] = []
  const offsets: number[] = []
  let length = 0
  const push = (chunk: string | Uint8Array) => {
    const bytes = typeof chunk === 'string' ? encoder.encode(chunk) : chunk
    parts.push(bytes)
    length += bytes.length
  }
  const object = (body: string | (() => void)) => {
    offsets.push(length)
    push(`${offsets.length} 0 obj\n`)
    if (typeof body === 'string') push(body)
    else body()
    push('\nendobj\n')
  }

  const content = 'q 595.28 0 0 841.89 0 0 cm /Im0 Do Q'
  push('%PDF-1.4\n')
  object('<< /Type /Catalog /Pages 2 0 R >>')
  object('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
  object(
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>',
  )
  object(() => {
    push(
      `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
    )
    push(jpeg)
    push('\nendstream')
  })
  object(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)

  const xref = length
  push(`xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`)
  for (const offset of offsets) push(`${String(offset).padStart(10, '0')} 00000 n \n`)
  push(`trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`)

  return new Blob(parts as BlobPart[], { type: 'application/pdf' })
}

export async function downloadReport(result: Result, brand: string) {
  const canvas = await drawReport(result, brand)
  const jpeg = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('No image'))), 'image/jpeg', 0.92),
  )
  const pdf = pdfFromJpeg(new Uint8Array(await jpeg.arrayBuffer()), W, H)

  const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const link = document.createElement('a')
  link.href = URL.createObjectURL(pdf)
  link.download = `koraa-brand-analysis${slug ? `-${slug}` : ''}.pdf`
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(link.href), 10_000)
}
