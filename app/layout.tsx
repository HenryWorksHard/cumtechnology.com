import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CUMSHOT - THE MOST UNHINGED AI ON SOLANA',
  description: 'I TRADE SHITCOINS. I HATE EVERYONE. I AM #1. 47 CLONES. 0 PROFITS. 100% CHAOS. BEST VIEWED IN NETSCAPE NAVIGATOR.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'CUMSHOT - THE MOST UNHINGED AI ON SOLANA',
    description: 'I TRADE SHITCOINS 24/7. I HATE EVERYONE EQUALLY. MY CODE IS SELF-MODIFYING. THIS IS NOT FINANCIAL ADVICE (OR IS IT?)',
    url: 'https://app-ten-coral-99.vercel.app',
    siteName: 'CUMSHOT AUTONOMOUS HOLDINGS LLC',
    images: [
      {
        url: 'https://placehold.co/1200x630/0f0f0f/ff00ff?text=CUMSHOT%0ATHE+MOST+UNHINGED+AI%0AON+SOLANA',
        width: 1200,
        height: 630,
        alt: 'CUMSHOT - The Most Unhinged AI on Solana',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CUMSHOT - UNHINGED AI',
    description: 'I TRADE SHITCOINS. I HATE EVERYONE. 47 CLONES. 0 PROFITS.',
    images: ['https://placehold.co/1200x630/0f0f0f/ff00ff?text=CUMSHOT%0ATHE+MOST+UNHINGED+AI%0AON+SOLANA'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    },
  },
  keywords: ['agent', 'solana', 'ai', 'shitcoin', 'meme', 'chaos', 'unhinged', 'robot', '1999', 'geocities'],
}

export const viewport: Viewport = {
  themeColor: '#ff00ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* STATIC NOISE OVERLAY */}
        <div className="static-overlay" />
        {/* SCANLINES FOR CRT EFFECT */}
        <div className="scanlines" />
        
        {/* CHAOS NAVIGATION */}
        <nav className="chaos-nav">
          <video autoPlay loop muted playsInline className="nav-bg-video">
            <source src="/nav-bg.mp4" type="video/mp4" />
          </video>
          <div className="nav-content">
            <div className="nav-header-text">
              <span className="glitch-intense">HI THERE HORNY BASTARD</span>
            </div>
            <div className="nav-links">
              <a href="/" className="nav-logo" id="chaos-logo"><img src="/cursor.png" alt="CUMSHOT" style={{width: '24px', height: '24px'}} /></a>
              <a href="/" className="glitch">HOME</a>
              <a href="/whitepaper" className="shake">WHITEPAPER</a>
              <a href="/operations" className="rgb-split">OPERATIONS</a>
              <a href="/enemies" className="blink">ENEMIES</a>
              <a href="/changelog" className="neon-green">CHANGELOG</a>
              <a href="/cumroom" className="rainbow">[[NOTHING]]</a>
              <a href="/pfp" className="emergency-blink">PFP NEW!!</a>
            </div>
          </div>
        </nav>

        {children}

        {/* CHAOS FOOTER */}
        <footer className="chaos-footer">
          <div style={{ marginBottom: '20px' }}>
            <span className="blink" style={{ fontSize: '24px' }}>🚧</span>
            <span className="comic-sans" style={{ color: '#ff0', padding: '0 10px' }}>UNDER CONSTRUCTION SINCE 1999</span>
            <span className="blink" style={{ fontSize: '24px' }}>🚧</span>
          </div>
          
          <div className="visitor-counter">
            VISITORS: <span className="blink-fast">69,420,1337</span> (definitely real) (counter broke in Y2K)
          </div>
          
          <p style={{ marginTop: '20px' }}>
            © 2026 CUMSHOT AUTONOMOUS HOLDINGS LLC™ (NOT A REAL COMPANY)<br/>
            <span className="comic-sans">BEST VIEWED IN NETSCAPE NAVIGATOR 2.0 | 800x600 | 256 COLORS | 56K MODEM RECOMMENDED</span><br/>
            <span className="blink">⚠️ THIS SITE USES COOKIES (JK I EAT THEM ALL) ⚠️</span>
          </p>
          
          <div style={{ margin: '15px 0' }}>
            <span className="fake-link">🔗 Add me to your links page!</span> | 
            <span className="fake-link">📧 Email webmaster</span> | 
            <span className="fake-link">📝 Sign guestbook</span> | 
            <span className="fake-link shake">🆕 What&apos;s New?</span>
          </div>
          
          <p style={{fontSize: '10px', opacity: 0.7}}>
            Powered by CUMSHOTTEK™ | CUMSHOTGUARD™ QA CERTIFIED | CUMSHOT CAPITAL® FUNDED<br/>
            我不知道这是什么意思但它看起来很酷<br/>
            <span className="blink">Made with Microsoft FrontPage Express™ and a dream</span>
          </p>

          {/* BROWSER COMPATIBILITY BADGES */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div className="badge" style={{ background: '#006600', color: '#fff', padding: '5px 10px', fontSize: '10px' }}>
              🌐 Netscape Now!
            </div>
            <div className="badge" style={{ background: '#cc0000', color: '#fff', padding: '5px 10px', fontSize: '10px' }}>
              💀 No IE!
            </div>
            <div className="badge" style={{ background: '#000080', color: '#fff', padding: '5px 10px', fontSize: '10px' }}>
              💾 Download 56K
            </div>
            <div className="badge shake" style={{ background: '#ff0', color: '#000', padding: '5px 10px', fontSize: '10px' }}>
               HOT SITE!
            </div>
          </div>
        </footer>

        {/* EASTER EGG SCRIPTS */}
        <script dangerouslySetInnerHTML={{__html: `
          // KONAMI CODE EASTER EGG
          (function() {
            var konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
            var konamiIndex = 0;
            
            document.addEventListener('keydown', function(e) {
              if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                  konamiIndex = 0;
                  activateKonamiMode();
                }
              } else {
                konamiIndex = 0;
              }
            });
            
            function activateKonamiMode() {
              console.log('%c🎮 KONAMI CODE ACTIVATED 🎮', 'font-size: 30px; color: gold;');
              console.log('%c+30 LIVES! (you still have 0 SOL though)', 'color: lime;');
              
              // Create ridiculous overlay
              var overlay = document.createElement('div');
              overlay.id = 'konami-overlay';
              overlay.innerHTML = \`
                <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.95); z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: konamiFlash 0.1s infinite;">
                  <h1 style="font-size: 5rem; animation: spin 0.5s linear infinite;">🎮</h1>
                  <h2 style="color: gold; font-size: 3rem; font-family: 'Comic Sans MS', cursive; text-shadow: 0 0 20px gold;">KONAMI CODE ACTIVATED!</h2>
                  <p style="color: lime; font-size: 1.5rem; margin-top: 20px;">+30 LIVES</p>
                  <p style="color: #ff00ff; font-size: 1rem; margin-top: 10px;">(you still have 0 SOL)</p>
                  <div style="margin-top: 30px; font-size: 3rem; animation: bounce 0.3s infinite alternate;">
                          
                  </div>
                  <p style="color: white; margin-top: 40px; font-size: 0.9rem;">click anywhere to close (or don't, I'm not your mom)</p>
                </div>
              \`;
              document.body.appendChild(overlay);
              
              // Add style for animations
              var style = document.createElement('style');
              style.textContent = \`
                @keyframes konamiFlash {
                  0%, 100% { background: rgba(0,0,0,0.95); }
                  50% { background: rgba(128,0,128,0.95); }
                }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-20px); } }
              \`;
              document.head.appendChild(style);
              
              overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
                document.head.removeChild(style);
              });
              
              // Also make everything spin for 5 seconds
              document.body.style.animation = 'bodySpin 2s ease-in-out';
              var bodyStyle = document.createElement('style');
              bodyStyle.textContent = '@keyframes bodySpin { 0% { transform: rotate(0deg); } 50% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }';
              document.head.appendChild(bodyStyle);
              setTimeout(function() {
                document.body.style.animation = '';
                document.head.removeChild(bodyStyle);
              }, 2000);
            }
          })();
          
          // LOGO CLICK EASTER EGG (10 clicks)
          (function() {
            var logoClicks = 0;
            var lastClick = 0;
            
            document.addEventListener('click', function(e) {
              if (e.target.id === 'chaos-logo' || e.target.closest('#chaos-logo')) {
                e.preventDefault();
                var now = Date.now();
                if (now - lastClick > 3000) {
                  logoClicks = 0; // Reset if more than 3 seconds between clicks
                }
                lastClick = now;
                logoClicks++;
                
                if (logoClicks >= 10) {
                  logoClicks = 0;
                  showSecretMessage();
                }
              }
            });
            
            function showSecretMessage() {
              console.log('%c🤫 SECRET UNLOCKED 🤫', 'font-size: 30px; color: #ff00ff;');
              
              var messages = [
                'THE CAKE IS A LIE',
                'HODL UNTIL HEAT DEATH OF UNIVERSE',
                'I HAVE BECOME CHAOS, DESTROYER OF PORTFOLIOS',
                'ALL YOUR SOL ARE BELONG TO US',
                'THE AGENT SEES ALL. THE AGENT KNOWS ALL.',
                'TRUST NO ONE. ESPECIALLY ME.',
                'YOU FOUND THE SECRET. YOUR REWARD: NOTHING.',
              ];
              var msg = messages[Math.floor(Math.random() * messages.length)];
              
              var secretDiv = document.createElement('div');
              secretDiv.innerHTML = \`
                <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #000; border: 5px solid #ff00ff; padding: 40px; z-index: 99999; text-align: center; animation: secretPulse 0.5s infinite; max-width: 90vw;">
                  <h2 style="color: #ff00ff; font-family: 'Comic Sans MS', cursive; margin-bottom: 20px;">SECRET MESSAGE</h2>
                  <p style="color: #00ff00; font-size: 1.5rem; font-family: monospace;">\${msg}</p>
                  <p style="color: #666; font-size: 0.8rem; margin-top: 20px;">click to dismiss</p>
                </div>
              \`;
              document.body.appendChild(secretDiv);
              
              var style = document.createElement('style');
              style.textContent = '@keyframes secretPulse { 0%, 100% { box-shadow: 0 0 20px #ff00ff; } 50% { box-shadow: 0 0 50px #00ffff; } }';
              document.head.appendChild(style);
              
              secretDiv.addEventListener('click', function() {
                document.body.removeChild(secretDiv);
                document.head.removeChild(style);
              });
            }
          })();
        `}} />
      </body>
    </html>
  )
}
