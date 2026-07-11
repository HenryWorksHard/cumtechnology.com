// ============================================
// SINGLE SOURCE OF TRUTH FOR THE TOKEN
//
// After launch: paste the contract address into CA below.
// Every CA display, copy button, buy button, pump.fun and
// dexscreener link on the site derives from that one value.
// Leave CA empty and everything shows TBA / COMING SOON.
// ============================================

// PASTE CA HERE AFTER LAUNCH
const CA = ''

// Social links
const TWITTER = 'https://x.com/CxM5HOT'
const TWITTER_HANDLE = '@CxM5HOT'
const GITHUB = 'https://github.com/HenryWorksHard/cumtechnology.com'

// Token info
const TOKEN_NAME = '$CUM'
const TOKEN_SYMBOL = 'CUM'

// ============================================
// Derived from CA - do not edit below
// ============================================
const LAUNCHED = CA.length > 0

export const TOKEN_CONFIG = {
  CA,
  LAUNCHED,
  CA_DISPLAY: LAUNCHED ? CA : 'TBA',
  PUMP_FUN: LAUNCHED ? `https://pump.fun/coin/${CA}` : '',
  DEXSCREENER: LAUNCHED ? `https://dexscreener.com/solana/${CA}` : '',
  BUY_LINK: LAUNCHED ? `https://pump.fun/coin/${CA}` : '#',
  TWITTER,
  TWITTER_HANDLE,
  GITHUB,
  TOKEN_NAME,
  TOKEN_SYMBOL,
}
