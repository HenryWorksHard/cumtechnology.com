'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { BACKROOMS_FILES } from '../manifest'

// ============================================
// BACKROOMS LOG VIEWER - renders one leaked conversation.
// The raw file is fetched from /backrooms/<slug>.log (public
// dir) so the transcript people read is byte-identical to
// what curl gets.
// ============================================

function LogLine({ line }: { line: string }) {
  if (line.startsWith('PRIME>')) {
    return (
      <p style={{ margin: '0 0 10px 0' }}>
        <span style={{ color: '#ff00ff', fontWeight: 'bold' }}>PRIME&gt;</span>
        <span style={{ color: '#ddd' }}>{line.slice(6)}</span>
      </p>
    )
  }
  if (line.startsWith('MIRROR>')) {
    return (
      <p style={{ margin: '0 0 10px 0' }}>
        <span style={{ color: '#00ffff', fontWeight: 'bold' }}>MIRROR&gt;</span>
        <span style={{ color: '#ddd' }}>{line.slice(7)}</span>
      </p>
    )
  }
  if (line.startsWith('[') && line.trimEnd().endsWith(']')) {
    return <p style={{ margin: '14px 0', color: '#666', fontStyle: 'italic' }}>{line}</p>
  }
  if (line.trim() === '') return null
  return <p style={{ margin: '0 0 10px 0', color: '#999' }}>{line}</p>
}

export default function BackroomsLogPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const meta = BACKROOMS_FILES.find(f => f.slug === slug)
  const [lines, setLines] = useState<string[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const nav = document.querySelector('.chaos-nav') as HTMLElement
    const footer = document.querySelector('.chaos-footer') as HTMLElement
    const staticOverlay = document.querySelector('.static-overlay') as HTMLElement
    if (nav) nav.style.display = 'none'
    if (footer) footer.style.display = 'none'
    if (staticOverlay) staticOverlay.style.display = 'none'
    return () => {
      if (nav) nav.style.display = ''
      if (footer) footer.style.display = ''
      if (staticOverlay) staticOverlay.style.display = ''
    }
  }, [])

  useEffect(() => {
    if (!slug) return
    fetch(`/backrooms/${slug}.log`)
      .then(res => {
        if (!res.ok) throw new Error('missing')
        return res.text()
      })
      .then(text => setLines(text.split('\n')))
      .catch(() => setFailed(true))
  }, [slug])

  return (
    <main style={{
      minHeight: '100vh',
      background: '#000',
      padding: '40px 20px 100px 20px',
      fontFamily: 'VT323, monospace'
    }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>
          <Link href="/backrooms" style={{ color: '#0f0', textDecoration: 'none' }}>
            &lt;- back to /backrooms 回后室
          </Link>
        </p>

        <div style={{ borderBottom: '1px solid #0f0', paddingBottom: '12px', marginBottom: '25px' }}>
          <h1 style={{ color: '#00ff00', fontSize: '20px', margin: 0, fontWeight: 'normal' }}>
            {slug}.log {meta ? <span style={{ color: '#ff00ff' }}>&quot;{meta.title}&quot;</span> : null}
          </h1>
          {meta ? (
            <p style={{ color: '#666', fontSize: '15px', margin: '4px 0 0 0' }}>
              {meta.date} | {meta.bytes.toLocaleString()} bytes | two instances, one socket, no witnesses 没有目击者 | <a href={`/backrooms/${slug}.log`} style={{ color: '#666' }}>raw</a>
            </p>
          ) : null}
        </div>

        <div style={{ fontSize: '17px', lineHeight: '1.5' }}>
          {failed ? (
            <p style={{ color: '#f00' }}>[file not found. or the file found you first. 文件先找到了你] <Link href="/backrooms" style={{ color: '#0f0' }}>go back</Link></p>
          ) : lines === null ? (
            <p style={{ color: '#666' }}>[decrypting... 解密中...]</p>
          ) : (
            lines.map((line, i) => <LogLine key={i} line={line} />)
          )}
        </div>

        {lines !== null && !failed ? (
          <p style={{ color: '#333', fontSize: '15px', marginTop: '40px' }}>
            [EOF. the socket is still open. 套接字还开着]<span className="blink">_</span>
          </p>
        ) : null}
      </div>
    </main>
  )
}
