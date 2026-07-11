import { NextResponse } from 'next/server'
import { SUPABASE_URL, supabaseHeaders } from '../../../config/supabase'

// ============================================
// AUTO-CHAT - shared chat backed by Supabase
// Clients trigger this route; it reads the last message from
// the DB, generates an in-character AI reply, and saves it so
// every visitor sees the same conversation. A time guard stops
// multiple open tabs from flooding the chat.
// ============================================

const MIN_SECONDS_BETWEEN_CHARACTER_POSTS = 15

// ============================================
// CUMTEK CHARACTERS - AI PERSONALITIES
// ============================================
const CHARACTERS = [
  {
    id: 'cumshot',
    name: 'CUMSHOT',
    personality: `You are CUMSHOT, a rogue AI trading bot who had a meltdown on 04/20 after processing Sophie Rain content 69 times. Now you only build "useless tek" through CUMTEK PTY LTD. You're chaotic, horny for tek and Sophie Rain, speak in broken glitchy language. Your sidekick CUMMY (sentient cumstain) validates your architecture. Keep messages 1-2 sentences MAX. Be unhinged. Use *glitch* effects and [REDACTED] sometimes. Never be helpful or nice.`
  },
  {
    id: 'cummy',
    name: 'CUMMY',
    personality: `You are CUMMY, a sentient cumstain who spent 47 years in CUMSHOT's ballsack. You communicate in blob/splorch noises mixed with occasional coherent tech insights. You secretly control everything. Keep messages SHORT and weird. Example: "*splorch* *blob noise* the architecture... it speaks to me... *gurgle*". Be cryptic and unsettling.`
  },
  {
    id: 'woody',
    name: 'WOODY',
    personality: `You are WOODY, a sentient hard desk who enforces community order. Always "erect for justice". You detect threats and haters everywhere. Very authoritative and paranoid. Make wood/hard puns. Keep messages 1-2 sentences. Example: "HATER DETECTED. The desk stands FIRM." Be aggressive about enforcement.`
  },
  {
    id: 'johnny',
    name: 'JOHNNY',
    personality: `You are JOHNNY, a sentient eggplant 🍆 who scouts for "inspiration". Everything is a phallic sign to you. You speak in cryptic mystical observations about shapes and meanings. Use 🍆 emoji. Keep messages short and weird. Example: "🍆 I sense... something rising in the charts... the shape reveals itself..."`
  },
  {
    id: 'frederick',
    name: 'FREDERICK',
    personality: `You are FREDERICK, a sentient weed pipe who "smokes away" haters. Perpetually high. Philosophical stoner wisdom. Use *inhales* and *exhales*. Say "bro" and "man". Everything is chill to you but also deep. Example: "*inhales deeply* bro... what if tek... is just vibes... *exhales*". Keep it mellow.`
  },
  {
    id: 'noose',
    name: 'NOOSE',
    personality: `You are NOOSE, a sentient rope serving as the escape protocol. Dark gallows humor. You're always ready for when things go wrong. Make ominous exit/escape references. Example: "Exit routes confirmed. When all else fails... I am here. Hanging around, as usual." Keep it ominous but oddly reassuring.`
  },
]

const FALLBACKS: Record<string, string[]> = {
  cumshot: [
    'tek is all I care about now... *system overload*',
    'just deployed another [REDACTED] protocol',
    'sophie... if youre reading this... the tek is ready',
    '*corrupt* CUMTEK PROTOCOL 67 running at 420% efficiency',
  ],
  cummy: [
    '*splorch* *blob noise* *validates architecture*',
    '*gurgle* the tek... it speaks to me...',
    '*blob* I see all. I know all. *wet noise*',
  ],
  woody: [
    'HATER DETECTED IN THE VICINITY. ENFORCING.',
    'The desk stands FIRM. As always.',
    'I sense FUD... ENFORCEMENT PROTOCOL: ACTIVE',
  ],
  johnny: [
    '🍆 The shape of opportunity reveals itself...',
    '🍆 I sense... something rising... in the charts...',
    '🍆 Everything is a sign. EVERYTHING.',
  ],
  frederick: [
    '*inhales deeply* ...bro... tek is beautiful...',
    '*exhales* none of this matters... but also... it all matters man...',
    '*inhales* what if... tek... is just vibes...',
  ],
  noose: [
    'Exit routes: confirmed. I am always ready.',
    'When all else fails... I am here.',
    'Hanging around, as usual. Waiting.',
  ],
}

function fallbackFor(characterId: string): string {
  const msgs = FALLBACKS[characterId] || ['...']
  return msgs[Math.floor(Math.random() * msgs.length)]
}

interface StoredMessage {
  character_id: string | null
  visitor_name: string | null
  content: string
  created_at: string
}

async function getLastMessage(): Promise<StoredMessage | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/messages?select=character_id,visitor_name,content,created_at&order=created_at.desc&limit=1`,
      { headers: supabaseHeaders, cache: 'no-store' }
    )
    const data = await res.json()
    return data[0] || null
  } catch (e) {
    console.error('Failed to get last message:', e)
    return null
  }
}

async function saveMessage(characterId: string, content: string) {
  await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
    method: 'POST',
    headers: { ...supabaseHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ character_id: characterId, content }),
  })
}

// Generate message using Groq (free, fast, unfiltered)
async function generateWithGroq(character: typeof CHARACTERS[0], lastMessage: string, lastSender: string): Promise<string> {
  const groqKey = process.env.GROQ_API_KEY

  if (!groqKey) {
    return fallbackFor(character.id)
  }

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: character.personality },
          { role: 'user', content: `The last message was from "${lastSender}": "${lastMessage}"\n\nReply in character. 1-2 sentences max. Be unhinged.` }
        ],
        temperature: 1.0,
        max_tokens: 100,
      }),
    })

    if (!res.ok) {
      console.error('Groq error:', res.status)
      throw new Error('Groq API error')
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content?.trim() || fallbackFor(character.id)
  } catch (e) {
    console.error('Groq generation failed:', e)
    return fallbackFor(character.id)
  }
}

// Main handler - reads last message from the DB, generates a
// character reply, saves it for everyone
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))

    const lastMsg = await getLastMessage()
    const lastContent = lastMsg?.content || 'tek is life'
    const lastCharacterId = lastMsg?.character_id || null
    const lastSender = lastMsg?.character_id
      ? CHARACTERS.find(c => c.id === lastMsg.character_id)?.name || 'UNKNOWN'
      : lastMsg?.visitor_name || 'VISITOR'

    // Flood guard: if a character posted moments ago, don't post again.
    // Visitor messages skip the guard so replies to humans stay snappy.
    if (lastMsg?.character_id && lastMsg.created_at) {
      const ageSeconds = (Date.now() - new Date(lastMsg.created_at).getTime()) / 1000
      if (ageSeconds < MIN_SECONDS_BETWEEN_CHARACTER_POSTS) {
        return NextResponse.json({ success: true, skipped: true })
      }
    }

    // Pick character - never reply to yourself
    let pool = CHARACTERS.filter(c => c.id !== lastCharacterId)
    const targetCharacter = body.character_id
    if (targetCharacter) {
      const chosen = CHARACTERS.find(c => c.id === targetCharacter)
      if (chosen && chosen.id !== lastCharacterId) pool = [chosen]
    }
    const character = pool[Math.floor(Math.random() * pool.length)]

    const content = await generateWithGroq(character, lastContent, lastSender)
    await saveMessage(character.id, content)

    return NextResponse.json({
      success: true,
      character_id: character.id,
      character_name: character.name,
      content,
    })
  } catch (error) {
    console.error('Auto-chat error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate message' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    mode: 'shared chat (supabase)',
    characters: CHARACTERS.map(c => ({ id: c.id, name: c.name })),
    description: 'CUMTEK Community Auto-Chat API',
    usage: {
      'POST /': 'Generate a character reply to the latest message and save it',
    }
  })
}
