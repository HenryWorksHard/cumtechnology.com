import { NextResponse } from 'next/server'

// ============================================
// STATELESS AUTO-CHAT - NO DATABASE
// The client keeps chat history in the browser and sends the
// last message as context. This route only generates a reply.
// ============================================

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

// Main handler - client sends last message context, gets a character reply
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const targetCharacter = body.character_id
    const lastContent: string = (body.last_content || 'tek is life').slice(0, 500)
    const lastSender: string = (body.last_sender || 'VISITOR').slice(0, 50)
    const lastCharacterId: string | null = body.last_character_id || null

    // Pick character - never reply to yourself
    let pool = CHARACTERS.filter(c => c.id !== lastCharacterId)
    if (targetCharacter) {
      const chosen = CHARACTERS.find(c => c.id === targetCharacter)
      if (chosen && chosen.id !== lastCharacterId) pool = [chosen]
    }
    const character = pool[Math.floor(Math.random() * pool.length)]

    const content = await generateWithGroq(character, lastContent, lastSender)

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
    mode: 'stateless (no database)',
    characters: CHARACTERS.map(c => ({ id: c.id, name: c.name })),
    description: 'CUMTEK Community Auto-Chat API',
    usage: {
      'POST /': 'Send {last_content, last_sender, last_character_id} - returns a character reply',
    }
  })
}
