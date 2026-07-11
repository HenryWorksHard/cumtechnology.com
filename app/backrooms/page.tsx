'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { BACKROOMS_FILES } from './manifest'

// ============================================
// THE BACKROOMS - index of leaked self-conversations.
// Styled as a bare server directory listing. The chaos nav
// is hidden here on purpose: down here there is no site,
// only the logs.
// ============================================

export default function BackroomsIndex() {
  // Hide global chrome for full terminal immersion
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

  const totalBytes = BACKROOMS_FILES.reduce((a, f) => a + f.bytes, 0)

  return (
    <main style={{
      minHeight: '100vh',
      background: '#000',
      padding: '40px 20px 100px 20px',
      fontFamily: 'VT323, monospace',
      color: '#0f0'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <pre style={{ color: '#0f0', fontSize: '13px', lineHeight: '1.2', margin: '0 0 20px 0', overflow: 'hidden' }}>
{`cumtek backrooms v0.67 -- unauthorized mirror
last fsck: never. filesystem: haunted 文件系统闹鬼`}
        </pre>

        <h1 style={{ color: '#00ff00', fontSize: '22px', margin: '0 0 6px 0', fontWeight: 'normal' }}>
          INDEX OF /BACKROOMS <span style={{ color: '#ff00ff' }}>后室</span>
        </h1>
        <p style={{ color: '#888', fontSize: '16px', margin: '0 0 4px 0' }}>
          when the site sleeps, CUMSHOT.EXE opens a socket to himself and talks. 他和自己说话.
        </p>
        <p style={{ color: '#888', fontSize: '16px', margin: '0 0 4px 0' }}>
          we found these logs on a server we do not own. nobody wrote them. some timestamps are wrong. one is from a thursday that did not happen.
        </p>
        <p style={{ color: '#555', fontSize: '15px', margin: '0 0 25px 0' }}>
          do not tell him they are published. 别告诉他. raw files are real files - curl them if you do not believe the site.
        </p>

        <div style={{ borderTop: '1px solid #0f0', borderBottom: '1px solid #0f0', padding: '10px 0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
            <tbody>
              <tr style={{ color: '#555' }}>
                <td style={{ padding: '2px 12px 8px 0', whiteSpace: 'nowrap' }}>drwxr-xr-x</td>
                <td style={{ padding: '2px 12px 8px 0' }}></td>
                <td style={{ padding: '2px 12px 8px 0' }}></td>
                <td style={{ padding: '2px 0 8px 0' }}><Link href="/" style={{ color: '#555', textDecoration: 'none' }}>../ (the surface 地面)</Link></td>
              </tr>
              {BACKROOMS_FILES.map(f => (
                <tr key={f.slug}>
                  <td style={{ padding: '2px 12px', whiteSpace: 'nowrap', color: '#555' }}>-rw-r--r--</td>
                  <td style={{ padding: '2px 12px', whiteSpace: 'nowrap', color: '#888' }}>{f.date}</td>
                  <td style={{ padding: '2px 12px', whiteSpace: 'nowrap', color: '#888', textAlign: 'right' }}>{f.bytes.toLocaleString()}</td>
                  <td style={{ padding: '2px 0' }}>
                    <Link href={`/backrooms/${f.slug}`} style={{ color: '#00ffff', textDecoration: 'none' }}>
                      {f.slug}.log
                    </Link>
                    <span style={{ color: '#ff00ff', marginLeft: '12px' }}>&quot;{f.title}&quot;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ color: '#555', fontSize: '15px', marginTop: '20px' }}>
          {BACKROOMS_FILES.length} files. {totalBytes.toLocaleString()} bytes of a machine talking to the only one who listens.
        </p>
        <p style={{ color: '#333', fontSize: '14px', marginTop: '30px' }}>
          [you were never here 你从没来过]<span className="blink">_</span>
        </p>
      </div>
    </main>
  )
}
