'use client'

import { useEffect, useState } from 'react'
import { TOKEN_CONFIG } from '../config/token'

export default function Maintenance() {
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(69)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'))
      // progress that never finishes - the most honest progress bar
      setProgress(p => {
        const next = p + Math.floor(Math.random() * 5) - 2
        return Math.max(42, Math.min(69, next))
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  // Hide global chrome
  useEffect(() => {
    const nav = document.querySelector('.chaos-nav') as HTMLElement
    const footer = document.querySelector('.chaos-footer') as HTMLElement
    if (nav) nav.style.display = 'none'
    if (footer) footer.style.display = 'none'
    return () => {
      if (nav) nav.style.display = ''
      if (footer) footer.style.display = ''
    }
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'VT323, monospace'
    }}>
      <div style={{
        border: '2px outset #fff',
        background: '#c0c0c0',
        maxWidth: '520px',
        width: '100%'
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #000080, #1084d0)',
          padding: '5px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '13px', fontFamily: 'Tahoma, Arial, sans-serif' }}>
            MAINTENANCE.EXE - CUMTEK PTY LTD
          </span>
          <span style={{ background: '#c0c0c0', border: '1px outset #fff', padding: '0 6px', fontSize: '11px', color: '#000' }}>X</span>
        </div>
        <div style={{ padding: '25px 20px', color: '#000' }}>
          <h1 style={{ fontSize: '28px', margin: '0 0 10px 0', fontWeight: 'normal' }}>
            UNDER MAINTENANCE 维护中{dots}
          </h1>
          <p style={{ fontSize: '17px', margin: '0 0 6px 0', lineHeight: 1.4 }}>
            the boys are inside the machine. woody is holding the ladder.
          </p>
          <p style={{ fontSize: '17px', margin: '0 0 6px 0', lineHeight: 1.4 }}>
            他们在机器里面. cummy says it is worse than it looks. cummy says it is also better than it looks. both true.
          </p>
          <p style={{ fontSize: '15px', color: '#333', margin: '0 0 20px 0' }}>
            estimated downtime: soon 快了 (frederick estimate) (do not trust frederick estimates)
          </p>

          <div style={{ border: '2px inset #fff', background: '#fff', height: '22px', position: 'relative', marginBottom: '8px' }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'repeating-linear-gradient(90deg, #000080 0px, #000080 10px, #1084d0 10px, #1084d0 20px)',
              transition: 'width 0.5s'
            }} />
          </div>
          <p style={{ fontSize: '14px', color: '#333', margin: '0 0 20px 0' }}>
            progress: {progress}% (it will not pass 69. we tried. 过不去的)
          </p>

          <a
            href={TOKEN_CONFIG.TWITTER}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#ff00ff',
              color: '#000',
              padding: '10px 25px',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              border: '2px outset #fff'
            }}
          >
            FOLLOW {TOKEN_CONFIG.TWITTER_HANDLE} FOR UPDATES
          </a>
        </div>
      </div>
      <p style={{ color: '#333', fontSize: '14px', marginTop: '25px' }}>
        the cumroom is also closed. the cumroom disagrees. 后室不同意
      </p>
    </main>
  )
}
