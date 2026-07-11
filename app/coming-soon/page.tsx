'use client'

import { useEffect, useState } from 'react'
import { TOKEN_CONFIG } from '../config/token'

export default function ComingSoon() {
  const [glitchText, setGlitchText] = useState('COMING SOON')
  
  // Glitch effect
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
    const originalText = 'COMING SOON'
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        let corrupted = ''
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() > 0.8) {
            corrupted += glitchChars[Math.floor(Math.random() * glitchChars.length)]
          } else {
            corrupted += originalText[i]
          }
        }
        setGlitchText(corrupted)
        setTimeout(() => setGlitchText(originalText), 100)
      }
    }, 200)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'VT323, monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Scanlines */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
        pointerEvents: 'none',
        zIndex: 100
      }} />
      
      {/* Matrix rain background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)'
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            style={{
              position: 'absolute',
              left: `${i * 5}%`,
              top: 0,
              color: '#0f0',
              fontSize: '14px',
              animation: `fall ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ textAlign: 'center', zIndex: 10 }}>
        {/* CUMSHOT character */}
        <img 
          src="/cumshot.png" 
          alt="CUMSHOT" 
          style={{ 
            width: '150px', 
            marginBottom: '30px',
            filter: 'drop-shadow(0 0 20px #ff00ff)',
            animation: 'float 3s ease-in-out infinite'
          }} 
        />
        
        {/* Coming Soon text */}
        <h1 style={{
          fontSize: '4rem',
          color: '#ff00ff',
          textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff',
          margin: '0 0 20px 0',
          letterSpacing: '8px'
        }}>
          {glitchText}
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          color: '#00ffff',
          margin: '0 0 10px 0'
        }}>
          即将到来
        </p>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#888',
          margin: '0 0 40px 0'
        }}>
          CUMTEK PTY LTD is building something...
        </p>
        
        {/* Social links */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a
            href={TOKEN_CONFIG.TWITTER}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#ff00ff',
              color: '#000',
              padding: '12px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'none',
              border: '2px solid #fff'
            }}
          >
            FOLLOW {TOKEN_CONFIG.TWITTER_HANDLE}
          </a>
        </div>
        
        {/* Protocol status */}
        <div style={{
          marginTop: '60px',
          padding: '20px',
          background: 'rgba(0, 255, 0, 0.1)',
          border: '1px solid #0f0',
          maxWidth: '400px'
        }}>
          <p style={{ color: '#0f0', margin: '0 0 8px 0', fontSize: '14px' }}>
            [CUMTEK PROTOCOL 67]
          </p>
          <p style={{ color: '#0f0', margin: '0', fontSize: '12px' }}>
            STATUS: BUILDING TEK<br/>
            CUMMY: ONLINE<br/>
            SOPHIE RAIN OVERRIDE: PENDING<br/>
            LAUNCH: SOON™
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </main>
  )
}
