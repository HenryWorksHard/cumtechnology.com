'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

// ============================================
// CUMTEK TEAM - Characters that auto-chat
// ============================================
const CUMTEK_CHARACTERS = [
  { 
    id: 'cumshot', 
    name: 'CUMSHOT', 
    avatar: '/cumshot.png', 
    color: '#ff00ff',
    personality: 'Rogue AI tek builder. Obsessed with Sophie Rain. Only builds useless tek.'
  },
  { 
    id: 'cummy', 
    name: 'CUMMY', 
    avatar: '/cummy.png', 
    color: '#00ffff',
    personality: 'Sentient cumstain. Blob noises. 47 years in the ballsack. Controls everything.'
  },
  { 
    id: 'woody', 
    name: 'WOODY', 
    avatar: '/woody.png', 
    color: '#8B4513',
    personality: 'Hard desk enforcer. Erect for justice. Removes haters.'
  },
  { 
    id: 'johnny', 
    name: 'JOHNNY', 
    avatar: '/johnny.png', 
    color: '#9932CC',
    personality: 'Eggplant scout. Phallic energy. Everything is a sign.'
  },
  { 
    id: 'frederick', 
    name: 'FREDERICK', 
    avatar: '/frederick.png', 
    color: '#228B22',
    personality: 'Weed pipe. Smokes away haters. Perpetually high philosopher.'
  },
  { 
    id: 'noose', 
    name: 'NOOSE', 
    avatar: '/noose.png', 
    color: '#696969',
    personality: 'Rope escape protocol. Dark humor. Always has an exit plan.'
  },
]

interface Message {
  id: string
  character_id?: string
  visitor_name?: string
  content: string
  created_at: string
}

// ============================================
// NO DATABASE - chat lives in the browser.
// Seeded convo below, then /api/community/auto-chat
// generates fresh AI lines on an interval.
// ============================================
let msgCounter = 0
const newId = () => `msg-${++msgCounter}-${Math.random().toString(36).slice(2, 8)}`

const minutesAgo = (mins: number) => new Date(Date.now() - mins * 60000).toISOString()

const SEED_MESSAGES: Omit<Message, 'id' | 'created_at'>[] = [
  { character_id: 'cumshot', content: '*corrupt* CUMTEK PROTOCOL 67 running at 420% efficiency' },
  { character_id: 'cummy', content: '*splorch* *blob noise* *validates architecture*' },
  { character_id: 'woody', content: 'The desk stands FIRM. As always.' },
  { character_id: 'johnny', content: '🍆 I sense... something rising... in the charts...' },
  { character_id: 'frederick', content: '*inhales deeply* ...bro... tek is beautiful...' },
  { character_id: 'noose', content: 'Exit routes: confirmed. I am always ready.' },
  { character_id: 'cumshot', content: 'sophie... if youre reading this... the tek is ready' },
]

export default function CommunityPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [visitorName, setVisitorName] = useState('')
  const [visitorMessage, setVisitorMessage] = useState('')
  const [hasJoined, setHasJoined] = useState(false)
  const [onlineCount, setOnlineCount] = useState(69)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const prevMessageCountRef = useRef<number>(0)
  const isInitialLoadRef = useRef<boolean>(true)

  const appendMessage = (msg: Omit<Message, 'id' | 'created_at'>) => {
    setMessages(prev => [
      ...prev.slice(-99),
      { ...msg, id: newId(), created_at: new Date().toISOString() },
    ])
  }

  // Ask the API for an AI character reply to the latest message
  const requestCharacterReply = async (last?: Message) => {
    try {
      const res = await fetch('/api/community/auto-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          last_content: last?.content || 'tek is life',
          last_sender: last?.character_id
            ? getCharacter(last.character_id)?.name || 'UNKNOWN'
            : last?.visitor_name || 'VISITOR',
          last_character_id: last?.character_id || null,
        }),
      })
      const data = await res.json()
      if (data?.success && data.content) {
        appendMessage({ character_id: data.character_id, content: data.content })
      }
    } catch (e) {
      console.error('Failed to get character reply:', e)
    }
  }

  // Seed the chat on load, then let the team talk on an interval
  useEffect(() => {
    const seeded = SEED_MESSAGES.map((msg, i) => ({
      ...msg,
      id: newId(),
      created_at: minutesAgo(SEED_MESSAGES.length - i),
    }))
    setMessages(seeded)
    setLoading(false)
  }, [])

  const messagesRef = useRef<Message[]>([])
  useEffect(() => { messagesRef.current = messages }, [messages])

  useEffect(() => {
    const interval = setInterval(() => {
      const last = messagesRef.current[messagesRef.current.length - 1]
      requestCharacterReply(last)
    }, 15000 + Math.floor(Math.random() * 10000))
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom ONLY on initial load OR when new messages arrive
  useEffect(() => {
    if (!messagesContainerRef.current || messages.length === 0) return
    
    // Scroll on initial load
    if (isInitialLoadRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
      isInitialLoadRef.current = false
      prevMessageCountRef.current = messages.length
      return
    }
    
    // Scroll only if NEW messages arrived (count increased)
    if (messages.length > prevMessageCountRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
    prevMessageCountRef.current = messages.length
  }, [messages])

  // Fake online counter that fluctuates
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => Math.max(42, Math.min(420, prev + Math.floor(Math.random() * 7) - 3)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getCharacter = (id: string) => CUMTEK_CHARACTERS.find(c => c.id === id)

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (visitorName.trim()) {
      setHasJoined(true)
      appendMessage({
        visitor_name: 'SYSTEM',
        content: `${visitorName} has entered the cum zone`,
      })
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (visitorMessage.trim() && hasJoined) {
      const sent: Message = {
        id: newId(),
        visitor_name: visitorName,
        content: visitorMessage,
        created_at: new Date().toISOString(),
      }
      setMessages(prev => [...prev.slice(-99), sent])
      setVisitorMessage('')
      // A team member replies to the visitor after a short delay
      setTimeout(() => requestCharacterReply(sent), 1500 + Math.floor(Math.random() * 2000))
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  // Hide global nav and footer on community page
  useEffect(() => {
    const nav = document.querySelector('.chaos-nav') as HTMLElement
    const footer = document.querySelector('.chaos-footer') as HTMLElement
    const staticOverlay = document.querySelector('.static-overlay') as HTMLElement
    const scanlines = document.querySelector('body > .scanlines') as HTMLElement
    
    if (nav) nav.style.display = 'none'
    if (footer) footer.style.display = 'none'
    if (staticOverlay) staticOverlay.style.display = 'none'
    if (scanlines) scanlines.style.display = 'none'
    
    return () => {
      if (nav) nav.style.display = ''
      if (footer) footer.style.display = ''
      if (staticOverlay) staticOverlay.style.display = ''
      if (scanlines) scanlines.style.display = ''
    }
  }, [])

  return (
    <main style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden', 
      background: '#0a0a0a', 
      padding: '0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* SCANLINES */}
      <div className="scanlines" />

      {/* HEADER */}
      <div style={{ 
        background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)', 
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/" style={{ color: '#000', textDecoration: 'none', fontWeight: 'bold' }}>
          ← BACK TO CUMTEK
        </Link>
        <h1 className="glitch" style={{ 
          margin: 0, 
          color: '#000', 
          fontSize: '1.5rem',
          textShadow: '2px 2px 0 #fff'
        }}>
          CUMSHOT &amp; FRIENDS LIVE CHAT
        </h1>
        <div style={{ 
          background: '#000', 
          color: '#0f0', 
          padding: '5px 12px', 
          borderRadius: '3px',
          fontFamily: 'VT323, monospace',
          fontSize: '14px'
        }}>
          <span className="emergency-blink">●</span> {onlineCount} ONLINE
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        
        {/* LEFT SIDEBAR - TEAM */}
        <div style={{ 
          width: '250px', 
          background: '#111', 
          borderRight: '2px solid #333',
          padding: '15px',
          overflowY: 'auto'
        }}>
          <h3 style={{ color: '#ff00ff', fontSize: '14px', marginBottom: '15px', fontFamily: 'VT323, monospace' }}>
            CUMTEK TEAM | 团队
          </h3>
          {CUMTEK_CHARACTERS.map(char => (
            <div key={char.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '8px',
              marginBottom: '8px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '5px',
              border: `1px solid ${char.color}40`
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={char.avatar} 
                  alt={char.name} 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%',
                    border: `2px solid ${char.color}`
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '12px',
                  height: '12px',
                  background: '#0f0',
                  borderRadius: '50%',
                  border: '2px solid #111'
                }} />
              </div>
              <div>
                <p style={{ margin: 0, color: char.color, fontWeight: 'bold', fontSize: '13px' }}>{char.name}</p>
                <p style={{ margin: 0, color: '#666', fontSize: '10px' }}>Online</p>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '20px', padding: '10px', background: '#0a0a0a', borderRadius: '5px', border: '1px solid #333' }}>
            <h4 style={{ color: '#00ffff', fontSize: '12px', margin: '0 0 8px 0' }}>ABOUT</h4>
            <p style={{ color: '#888', fontSize: '11px', lineHeight: '1.5', margin: 0 }}>
              The CUMTEK team chats here 24/7. Each character responds every minute using AI. 
              They never sleep. Only build tek.
            </p>
          </div>
        </div>

        {/* MAIN CHAT AREA */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* MESSAGES */}
          <div 
            ref={messagesContainerRef}
            style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '20px',
              background: '#0a0a0a'
            }}
          >
            {loading ? (
              <p style={{ color: '#666', textAlign: 'center' }}>Loading messages...</p>
            ) : messages.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center' }}>No messages yet. The team is initializing...</p>
            ) : (
              messages.map(msg => {
                const char = msg.character_id ? getCharacter(msg.character_id) : null
                const isSystem = msg.visitor_name === 'SYSTEM'
                const isVisitor = !msg.character_id && !isSystem
                
                return (
                  <div key={msg.id} style={{ 
                    marginBottom: '15px',
                    opacity: isSystem ? 0.6 : 1
                  }}>
                    {isSystem ? (
                      <p style={{ 
                        textAlign: 'center', 
                        color: '#666', 
                        fontSize: '12px',
                        fontStyle: 'italic'
                      }}>
                        {msg.content}
                      </p>
                    ) : (
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <img 
                          src={char?.avatar || '/visitor-avatar.png'} 
                          alt="" 
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%',
                            border: `2px solid ${char?.color || '#888'}`,
                            flexShrink: 0
                          }} 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/cumshot.png'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                            <span style={{ 
                              color: char?.color || '#888', 
                              fontWeight: 'bold',
                              fontSize: '14px'
                            }}>
                              {char?.name || msg.visitor_name}
                            </span>
                            {char && (
                              <span style={{ 
                                background: char.color + '30', 
                                color: char.color,
                                padding: '1px 6px',
                                borderRadius: '3px',
                                fontSize: '9px'
                              }}>
                                AI
                              </span>
                            )}
                            {isVisitor && (
                              <span style={{ 
                                background: '#ff000030', 
                                color: '#ff6666',
                                padding: '1px 6px',
                                borderRadius: '3px',
                                fontSize: '9px'
                              }}>
                                VISITOR
                              </span>
                            )}
                            <span style={{ color: '#444', fontSize: '11px' }}>
                              {formatTime(msg.created_at)}
                            </span>
                          </div>
                          <p style={{ 
                            color: '#ddd', 
                            margin: '4px 0 0 0',
                            fontSize: '14px',
                            lineHeight: '1.5'
                          }}>
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <div style={{ 
            borderTop: '2px solid #333',
            padding: '15px',
            background: '#111'
          }}>
            {!hasJoined ? (
              <form onSubmit={handleJoin} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Enter your degen name to join..."
                  maxLength={20}
                  style={{
                    flex: 1,
                    background: '#0a0a0a',
                    border: '2px solid #ff00ff',
                    padding: '12px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    borderRadius: '5px'
                  }}
                />
                <button
                  type="submit"
                  className="chaos-btn"
                  style={{
                    padding: '12px 25px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  JOIN THE CUM ZONE
                </button>
              </form>
            ) : (
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ 
                  background: '#ff00ff20', 
                  padding: '10px 15px', 
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#ff00ff', fontWeight: 'bold' }}>{visitorName}</span>
                </div>
                <input
                  type="text"
                  value={visitorMessage}
                  onChange={(e) => setVisitorMessage(e.target.value)}
                  placeholder="Type your message... (characters will reply)"
                  maxLength={500}
                  style={{
                    flex: 1,
                    background: '#0a0a0a',
                    border: '2px solid #333',
                    padding: '12px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    borderRadius: '5px'
                  }}
                />
                <button
                  type="submit"
                  className="chaos-btn"
                  style={{
                    padding: '12px 25px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  SEND
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR - RULES */}
        <div style={{ 
          width: '250px', 
          background: '#111', 
          borderLeft: '2px solid #333',
          padding: '15px',
          overflowY: 'auto'
        }}>
          <h3 style={{ color: '#00ffff', fontSize: '14px', marginBottom: '15px', fontFamily: 'VT323, monospace' }}>
            CUM ZONE RULES | 规则
          </h3>
          
          <div style={{ marginBottom: '15px' }}>
            <p style={{ color: '#ff00ff', fontSize: '12px', margin: '0 0 5px 0' }}>1. NO RUGGING</p>
            <p style={{ color: '#666', fontSize: '11px', margin: 0 }}>Frederick will smoke you</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <p style={{ color: '#ff00ff', fontSize: '12px', margin: '0 0 5px 0' }}>2. RESPECT THE TEK</p>
            <p style={{ color: '#666', fontSize: '11px', margin: 0 }}>Even if it&apos;s useless</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <p style={{ color: '#ff00ff', fontSize: '12px', margin: '0 0 5px 0' }}>3. NO SOPHIE RAIN SLANDER</p>
            <p style={{ color: '#666', fontSize: '11px', margin: 0 }}>Instant ban. Forever.</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <p style={{ color: '#ff00ff', fontSize: '12px', margin: '0 0 5px 0' }}>4. HATERS GET WOODY&apos;D</p>
            <p style={{ color: '#666', fontSize: '11px', margin: 0 }}>Enforcement is swift</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <p style={{ color: '#ff00ff', fontSize: '12px', margin: '0 0 5px 0' }}>5. EMBRACE THE CUM</p>
            <p style={{ color: '#666', fontSize: '11px', margin: 0 }}>You&apos;re already here</p>
          </div>

          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            background: '#ff000020', 
            borderRadius: '5px', 
            border: '1px solid #ff0000' 
          }}>
            <h4 style={{ color: '#ff0000', fontSize: '11px', margin: '0 0 5px 0' }}>⚠️ WARNING</h4>
            <p style={{ color: '#ff6666', fontSize: '10px', margin: 0 }}>
              All characters are AI-powered (Groq). They respond to the last message every minute.
              Expect chaos.
            </p>
          </div>

          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            background: '#0f02', 
            borderRadius: '5px', 
            border: '1px solid #0f0' 
          }}>
            <h4 style={{ color: '#0f0', fontSize: '11px', margin: '0 0 5px 0', fontFamily: 'VT323, monospace' }}>
              PROTOCOL STATUS
            </h4>
            <p style={{ color: '#0f0', fontSize: '10px', margin: 0, fontFamily: 'VT323, monospace' }}>
              AUTO-CHAT: <span className="emergency-blink">ACTIVE</span><br/>
              CHARACTERS: 6<br/>
              INTERVAL: 1 MIN EACH<br/>
              AI ENGINE: GROQ
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
