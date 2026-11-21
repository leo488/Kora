const { chromium } = require('playwright'); const fs = require('fs'); const http = require('http'); const path = require('path')
const srv = http.createServer((q, r) => { const f = path.join(__dirname, decodeURIComponent(q.url.split('?')[0])); try { const b = fs.readFileSync(f); r.writeHead(200, { 'Content-Type': f.endsWith('.js') ? 'text/javascript' : 'text/html' }); r.end(b) } catch { r.writeHead(404); r.end() } }).listen(5055)
;(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
  const pg = await b.newPage(); pg.on('console', m => console.log(m.text())); pg.on('pageerror', e => console.log('ERR', e.message))
  const q = process.argv[2] || ''; const out = process.argv[3] || 'out.png'
  await pg.goto('http://localhost:5055/render.html?' + q)
  await pg.waitForFunction(() => window.DONE, null, { timeout: 180000 })
  const d = await pg.evaluate(() => window.DONE)
  fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64'))
  await b.close(); srv.close()
})()
