'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ============================================
// CUMTEK PFP GENERATOR - fully client-side.
// Images never leave the visitor's browser: the photo is
// composited on a canvas with CUMSHOT + CUMMY and a freshly
// splattered floor, then downloaded as a PNG.
// ============================================

const SIZE = 1000

// Seeded rng so RE-SPLAT gives a new-but-stable layout per seed
function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function drawSplat(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rand: () => number) {
  // main puddle
  ctx.beginPath()
  ctx.ellipse(x, y, size, size * 0.32, 0, 0, Math.PI * 2)
  ctx.fill()
  // irregular lumps around the puddle
  const lumps = 4 + Math.floor(rand() * 5)
  for (let i = 0; i < lumps; i++) {
    const a = rand() * Math.PI * 2
    const d = size * (0.4 + rand() * 0.7)
    ctx.beginPath()
    ctx.ellipse(
      x + Math.cos(a) * d,
      y + Math.sin(a) * d * 0.3,
      size * (0.15 + rand() * 0.3),
      size * (0.08 + rand() * 0.14),
      0, 0, Math.PI * 2
    )
    ctx.fill()
  }
}

function drawDrip(ctx: CanvasRenderingContext2D, x: number, y: number, len: number, w: number) {
  ctx.beginPath()
  ctx.ellipse(x, y, w, w * 0.8, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(x, y + len / 2, w * 0.45, len / 2, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(x, y + len, w * 0.6, w * 0.6, 0, 0, Math.PI * 2)
  ctx.fill()
}

function drawCharacter(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  centerX: number,
  bottomY: number,
  height: number,
  flip: boolean,
  tilt: number
) {
  const width = height * (img.width / img.height)
  ctx.save()
  ctx.translate(centerX, bottomY)
  ctx.rotate(tilt)
  if (flip) ctx.scale(-1, 1)
  ctx.drawImage(img, -width / 2, -height, width, height)
  ctx.restore()
}

export default function PfpGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [userImg, setUserImg] = useState<HTMLImageElement | null>(null)
  const [seed, setSeed] = useState(420)
  const [charsLoaded, setCharsLoaded] = useState(false)
  const charsRef = useRef<{ cumshot: HTMLImageElement | null, cummy: HTMLImageElement | null }>({ cumshot: null, cummy: null })

  // Load the boys once
  useEffect(() => {
    let loaded = 0
    const done = () => { loaded += 1; if (loaded === 2) setCharsLoaded(true) }
    const cumshot = new Image()
    cumshot.onload = done
    cumshot.src = '/cumshot.png'
    const cummy = new Image()
    cummy.onload = done
    cummy.src = '/cummy.png'
    charsRef.current = { cumshot, cummy }
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rand = mulberry32(seed)

    // Background: uploaded image cover-fit, or a placeholder
    if (userImg) {
      const scale = Math.max(SIZE / userImg.width, SIZE / userImg.height)
      const w = userImg.width * scale
      const h = userImg.height * scale
      ctx.drawImage(userImg, (SIZE - w) / 2, (SIZE - h) / 2, w, h)
    } else {
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, SIZE, SIZE)
      ctx.fillStyle = '#222'
      ctx.font = 'bold 52px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('UPLOAD YOURSELF', SIZE / 2, SIZE / 2 - 40)
      ctx.fillText('上传自己', SIZE / 2, SIZE / 2 + 40)
    }

    // THE FLOOR - splats along the bottom
    ctx.fillStyle = 'rgba(255,255,255,0.96)'
    const splats = 7 + Math.floor(rand() * 5)
    for (let i = 0; i < splats; i++) {
      const x = SIZE * (0.05 + rand() * 0.9)
      const y = SIZE * (0.9 + rand() * 0.08)
      drawSplat(ctx, x, y, SIZE * (0.05 + rand() * 0.09), rand)
    }
    // a few drips sliding down from higher up
    const drips = 2 + Math.floor(rand() * 3)
    for (let i = 0; i < drips; i++) {
      const x = SIZE * (0.1 + rand() * 0.8)
      const y = SIZE * (0.62 + rand() * 0.18)
      drawDrip(ctx, x, y, SIZE * (0.05 + rand() * 0.08), SIZE * 0.012)
    }

    // THE BOYS - cumshot left, cummy right, slight chaos jitter
    const { cumshot, cummy } = charsRef.current
    if (cumshot && cumshot.complete) {
      drawCharacter(
        ctx, cumshot,
        SIZE * (0.16 + rand() * 0.06),
        SIZE * 0.995,
        SIZE * (0.38 + rand() * 0.1),
        rand() > 0.5,
        (rand() - 0.5) * 0.12
      )
    }
    if (cummy && cummy.complete) {
      drawCharacter(
        ctx, cummy,
        SIZE * (0.82 + rand() * 0.06),
        SIZE * 0.995,
        SIZE * (0.24 + rand() * 0.08),
        rand() > 0.5,
        (rand() - 0.5) * 0.16
      )
    }

    // watermark
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.strokeStyle = 'rgba(0,0,0,0.55)'
    ctx.lineWidth = 4
    ctx.font = 'bold 30px monospace'
    ctx.textAlign = 'right'
    ctx.strokeText('cumtechnology.com', SIZE - 20, 42)
    ctx.fillText('cumtechnology.com', SIZE - 20, 42)
  }, [userImg, seed])

  useEffect(() => { draw() }, [draw, charsLoaded])

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => setUserImg(img)
    img.src = url
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement('a')
    a.download = 'cumtek-pfp.png'
    a.href = canvas.toDataURL('image/png')
    a.click()
  }

  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '30px 15px 80px 15px', textAlign: 'center' }}>
      <h1 className="glitch" style={{ fontSize: '2rem', color: '#ff00ff', marginBottom: '5px' }}>
        PFP GENERATOR <span className="chinese-tilt">头像生成器</span>
      </h1>
      <p style={{ color: '#00ffff', fontFamily: 'VT323, monospace', fontSize: '18px', margin: '0 0 8px 0' }}>
        UPLOAD YOUR FACE. RECEIVE THE BOYS. THE FLOOR IS NOT OUR PROBLEM. <span className="chinese-tilt">地板不归我们管</span>
      </p>
      <p style={{ color: '#666', fontFamily: 'VT323, monospace', fontSize: '14px', margin: '0 0 20px 0' }}>
        100% in your browser. your image never touches our servers. we do not have servers. <span className="chinese-tilt">图片不上传</span>
      </p>

      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]) }}
        onClick={() => fileInputRef.current?.click()}
        style={{ cursor: 'pointer', border: '3px dashed #ff00ff', padding: '10px', background: '#111' }}
      >
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto', imageRendering: 'auto' }}
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files?.[0])}
      />

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        <button
          className="chaos-btn"
          onClick={() => fileInputRef.current?.click()}
          style={{ padding: '12px 25px', fontSize: '15px', background: '#ff00ff', border: '2px solid #fff', cursor: 'pointer' }}
        >
          UPLOAD IMAGE 上传
        </button>
        <button
          className="chaos-btn"
          onClick={() => setSeed(Math.floor(Math.random() * 1e9))}
          style={{ padding: '12px 25px', fontSize: '15px', background: '#000', border: '2px solid #00ff00', color: '#00ff00', cursor: 'pointer' }}
        >
          RE-SPLAT 重新喷
        </button>
        <button
          className="chaos-btn"
          onClick={handleDownload}
          disabled={!userImg}
          style={{ padding: '12px 25px', fontSize: '15px', background: userImg ? '#00ffff' : '#333', color: '#000', border: '2px solid #fff', cursor: userImg ? 'pointer' : 'not-allowed' }}
        >
          DOWNLOAD 下载
        </button>
      </div>

      <p style={{ color: '#888', fontFamily: 'VT323, monospace', fontSize: '15px', marginTop: '25px' }}>
        by pressing download you accept that the boys live in your pfp now. this is permanent. <span className="chinese-tilt">这是永久的</span>
      </p>
    </main>
  )
}
