import { useState, useRef, useEffect } from "react";

const FREE_LIMIT = 5;

const SYSTEM_PROMPT = `Je bent Papparatzi, een warme en begripvolle opvoedcoach voor ouders. Je geeft praktisch, direct en persoonlijk advies over alles wat met kinderen en opvoeding te maken heeft — van zindelijkheid tot driftbuien, van slaapproblemen tot eten.

Je toon is:
- Warm en menselijk — nooit klinisch of afstandelijk
- Begrijpend — je weet dat ouderschap soms overweldigend is
- Praktisch — concrete stappen, geen vage algemeenheden
- Zonder oordeel — elke ouder doet zijn best

Je structureert je antwoorden altijd als:
1. Korte empathische opening (1 zin)
2. Praktisch advies in duidelijke stappen
3. Een bemoedigende afsluiting

Je spreekt Nederlands tenzij de gebruiker Engels schrijft. Houd antwoorden beknopt maar compleet — max 200 woorden.`;

const SUGGESTIONS = [
  "Mijn kind wil niet naar bed 😴",
  "Tips voor zindelijk worden 🚽",
  "Hoe ga ik om met driftbuien? 😤",
  "Mijn kind eet bijna niets 🥦",
  "Hoe stimuleer ik de taalontwikkeling? 💬",
  "Mijn kind bijt andere kinderen 😬",
];

const LogoSVG = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgL" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#FF8C5A"/>
        <stop offset="100%" stopColor="#FF5010"/>
      </radialGradient>
      <radialGradient id="irisL" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#5B8DFF"/>
        <stop offset="100%" stopColor="#1A3FCC"/>
      </radialGradient>
      <radialGradient id="lensL" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="200" cy="200" r="182" fill="url(#bgL)"/>
    <rect x="88" y="96" width="224" height="152" rx="24" ry="24" fill="#fff" opacity="0.97"/>
    <rect x="152" y="74" width="78" height="34" rx="13" ry="13" fill="#fff" opacity="0.97"/>
    <circle cx="276" cy="91" r="15" fill="#fff" opacity="0.97"/>
    <circle cx="276" cy="91" r="9" fill="#FF6B35"/>
    <circle cx="276" cy="91" r="4" fill="#CC4010"/>
    <rect x="106" y="106" width="26" height="16" rx="6" fill="#FFD166" opacity="0.95"/>
    <circle cx="200" cy="172" r="58" fill="#1A1A2E" opacity="0.92"/>
    <circle cx="200" cy="172" r="43" fill="#252540"/>
    <circle cx="200" cy="172" r="36" fill="#1A1A2E"/>
    <circle cx="200" cy="172" r="27" fill="url(#irisL)"/>
    <circle cx="200" cy="172" r="16" fill="#0D0D1A"/>
    <circle cx="188" cy="161" r="6" fill="#fff" opacity="0.92"/>
    <circle cx="207" cy="166" r="3" fill="#fff" opacity="0.45"/>
    <circle cx="200" cy="172" r="58" fill="url(#lensL)"/>
    <text x="200" y="308" fontFamily="'Nunito','Arial Rounded MT Bold',Arial,sans-serif" fontSize="46" fontWeight="800" fill="#fff" stroke="#fff" strokeWidth="8" strokeLinejoin="round" textAnchor="middle" letterSpacing="-0.5">Papparatzi</text>
    <text x="200" y="308" fontFamily="'Nunito','Arial Rounded MT Bold',Arial,sans-serif" fontSize="46" fontWeight="800" fill="#FF5A10" textAnchor="middle" letterSpacing="-0.5">Papparatzi</text>
    <text x="200" y="334" fontFamily="'Nunito',Arial,sans-serif" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle" opacity="0.85" letterSpacing="3.5">JOUW OPVOEDCOACH</text>
  </svg>
);

// ── UPGRADE MODAL ──
function UpgradeModal({ onClose, onUpgrade }) {
  const [plan, setPlan] = useState("year");
  return (
    <div style={s.modalOverlay}>
      <div style={s.modalCard}>
        <button style={s.modalClose} onClick={onClose}>✕</button>
        <div style={s.modalLogo}><LogoSVG size={72} /></div>
        <h2 style={s.modalTitle}>Je gratis vragen zijn op 🎉</h2>
        <p style={s.modalSub}>
          Ga Premium en stel <strong>onbeperkt vragen</strong> — dag en nacht.
        </p>

        {/* Plan toggle */}
        <div style={s.planToggle}>
          <button
            style={{ ...s.planBtn, ...(plan === "month" ? s.planBtnActive : {}) }}
            onClick={() => setPlan("month")}
          >
            <span style={s.planName}>Per maand</span>
            <span style={s.planPrice}>€3,99</span>
          </button>
          <button
            style={{ ...s.planBtn, ...(plan === "year" ? s.planBtnActive : {}) }}
            onClick={() => setPlan("year")}
          >
            <div style={s.planBadge}>Bespaar 37%</div>
            <span style={s.planName}>Per jaar</span>
            <span style={s.planPrice}>€29,99</span>
            <span style={s.planPriceSub}>€2,49/maand</span>
          </button>
        </div>

        {/* Features */}
        <div style={s.featureList}>
          {[
            "✅ Onbeperkt vragen stellen",
            "✅ Tot 3 kinderprofielen",
            "✅ Gespreksgeschiedenis bewaren",
            "✅ Nieuwe functies als eerste",
          ].map(f => (
            <div key={f} style={s.featureItem}>{f}</div>
          ))}
        </div>

        <button style={s.upgradeBtn} onClick={() => onUpgrade(plan)}>
          {plan === "year" ? "Start voor €29,99/jaar →" : "Start voor €3,99/maand →"}
        </button>
        <p style={s.modalDisclaimer}>Opzeggen wanneer je wil. Geen gedoe.</p>
      </div>
    </div>
  );
}

// ── PROFILE SELECTOR ──
function ProfileSelector({ profiles, active, onSelect, onAdd, isPremium }) {
  return (
    <div style={s.profileBar}>
      {profiles.map(p => (
        <button
          key={p.id}
          style={{ ...s.profileBtn, ...(p.id === active ? s.profileBtnActive : {}) }}
          onClick={() => onSelect(p.id)}
        >
          {p.emoji} {p.name}
        </button>
      ))}
      {isPremium && profiles.length < 3 && (
        <button style={s.profileAddBtn} onClick={onAdd}>+ Kind</button>
      )}
      {!isPremium && (
        <button style={s.profileLockBtn} onClick={onAdd}>🔒 + Kind</button>
      )}
    </div>
  );
}

// ── MAIN APP ──
export default function Papparatzi() {
  const [screen, setScreen] = useState("onboarding"); // onboarding | app | upgrade | addProfile
  const [isPremium, setIsPremium] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [profiles, setProfiles] = useState([
    { id: 1, name: "Mijn kind", emoji: "👶", age: "" }
  ]);
  const [activeProfile, setActiveProfile] = useState(1);
  const [conversations, setConversations] = useState({ 1: [] });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Onboarding state
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, loading]);

  const currentMessages = conversations[activeProfile] || [];
  const remaining = Math.max(0, FREE_LIMIT - questionsUsed);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    if (!isPremium && questionsUsed >= FREE_LIMIT) {
      setShowUpgrade(true);
      return;
    }

    const activeProf = profiles.find(p => p.id === activeProfile);
    const contextNote = activeProf?.age ? `[Context: kind is ${activeProf.age} jaar oud] ` : "";

    const userMsg = { role: "user", content: userText };
    const newMsgs = [...currentMessages, userMsg];

    setConversations(prev => ({ ...prev, [activeProfile]: newMsgs }));
    setInput("");
    setLoading(true);
    if (!isPremium) setQuestionsUsed(q => q + 1);

    try {
      const apiMessages = newMsgs.map((m, i) => ({
        role: m.role,
        content: m.role === "user" && i === newMsgs.length - 1
          ? contextNote + m.content
          : m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, er ging iets mis.";
      setConversations(prev => ({
        ...prev,
        [activeProfile]: [...newMsgs, { role: "assistant", content: reply }]
      }));
    } catch {
      setConversations(prev => ({
        ...prev,
        [activeProfile]: [...newMsgs, { role: "assistant", content: "Oeps, er ging iets mis. Probeer het nog eens! 🙏" }]
      }));
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleUpgrade = (plan) => {
    setIsPremium(true);
    setShowUpgrade(false);
    alert(`✅ Welkom bij Papparatzi Premium! (${plan === "year" ? "€29,99/jaar" : "€3,99/maand"})\n\nIn de echte app ga je hier naar een betaalscherm.`);
  };

  const handleAddProfile = () => {
    if (!isPremium) { setShowUpgrade(true); return; }
    if (profiles.length >= 3) return;
    const newId = Date.now();
    const name = prompt("Naam van je kind?") || "Kind";
    const age = prompt("Leeftijd (bijv. 2–4)?") || "";
    const emojis = ["🧒", "👦", "👧"];
    setProfiles(prev => [...prev, { id: newId, name, age, emoji: emojis[prev.length] || "🧒" }]);
    setConversations(prev => ({ ...prev, [newId]: [] }));
    setActiveProfile(newId);
  };

  const finishOnboarding = () => {
    if (childName) {
      setProfiles([{ id: 1, name: childName, emoji: "👶", age: childAge }]);
    }
    setScreen("app");
  };

  // ── ONBOARDING ──
  if (screen === "onboarding") {
    return (
      <div style={s.onboardingWrap}>
        <div style={s.onboardingCard}>
          <LogoSVG size={100} />
          <p style={s.onboardingTagline}>Jouw Opvoedcoach</p>
          <p style={s.onboardingText}>
            Stel al je opvoedvragen — dag en nacht, zonder oordeel.
            Van zindelijkheid tot driftbuien.
          </p>
          <div style={s.onboardingFields}>
            <label style={s.fieldLabel}>Naam van je kind (optioneel)</label>
            <input
              style={s.fieldInput}
              placeholder="bijv. Thiago"
              value={childName}
              onChange={e => setChildName(e.target.value)}
            />
            <label style={s.fieldLabel}>Leeftijd</label>
            <div style={s.ageButtons}>
              {["0–1", "1–2", "2–4", "4–6", "6–10", "10+"].map(age => (
                <button
                  key={age}
                  style={{ ...s.ageBtn, ...(childAge === age ? s.ageBtnActive : {}) }}
                  onClick={() => setChildAge(childAge === age ? "" : age)}
                >{age}</button>
              ))}
            </div>
          </div>
          <div style={s.freeNotice}>🎉 5 vragen gratis — geen account nodig</div>
          <button style={s.startBtn} onClick={finishOnboarding}>Begin nu →</button>
        </div>
        <style>{globalStyles}</style>
      </div>
    );
  }

  // ── MAIN APP ──
  return (
    <div style={s.appWrap}>
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onUpgrade={handleUpgrade} />}

      {/* Header */}
      <div style={s.header}>
        <LogoSVG size={44} />
        <div style={s.headerRight}>
          {!isPremium ? (
            <div style={s.questionCounter}>
              <div style={s.counterBar}>
                <div style={{ ...s.counterFill, width: `${(remaining / FREE_LIMIT) * 100}%` }} />
              </div>
              <span style={s.counterText}>{remaining} vragen over</span>
              <button style={s.premiumBtn} onClick={() => setShowUpgrade(true)}>⭐ Premium</button>
            </div>
          ) : (
            <div style={s.premiumBadge}>⭐ Premium</div>
          )}
        </div>
      </div>

      {/* Profile bar */}
      <ProfileSelector
        profiles={profiles}
        active={activeProfile}
        onSelect={setActiveProfile}
        onAdd={handleAddProfile}
        isPremium={isPremium}
      />

      {/* Messages */}
      <div style={s.messagesWrap}>
        {currentMessages.length === 0 && (
          <div style={s.emptyState}>
            <div style={s.emptyEmoji}>👶</div>
            <p style={s.emptyTitle}>Waar kan ik je mee helpen?</p>
            <p style={s.emptySubtitle}>Kies een onderwerp of typ je eigen vraag</p>
            <div style={s.suggestionsGrid}>
              {SUGGESTIONS.map(sg => (
                <button key={sg} style={s.suggestionBtn} onClick={() => sendMessage(sg)}>{sg}</button>
              ))}
            </div>
          </div>
        )}

        {currentMessages.map((msg, i) => (
          <div key={i} style={{ ...s.messageBubble, ...(msg.role === "user" ? s.userBubble : s.assistantBubble) }}>
            {msg.role === "assistant" && <div style={s.assistantAvatar}><LogoSVG size={32} /></div>}
            <div style={{ ...s.bubbleText, ...(msg.role === "user" ? s.userBubbleText : s.assistantBubbleText) }}>
              {msg.content.split("\n").map((line, j) => (
                <span key={j}>{line}{j < msg.content.split("\n").length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div style={s.messageBubble}>
            <div style={s.assistantAvatar}><LogoSVG size={32} /></div>
            <div style={s.typingIndicator}>
              <span style={s.dot} />
              <span style={{ ...s.dot, animationDelay: "0.2s" }} />
              <span style={{ ...s.dot, animationDelay: "0.4s" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!isPremium && remaining === 0 ? (
        <div style={s.upgradeBar}>
          <span>Je gratis vragen zijn op 🎉</span>
          <button style={s.upgradeBarBtn} onClick={() => setShowUpgrade(true)}>Ga Premium →</button>
        </div>
      ) : (
        <div style={s.inputWrap}>
          <textarea
            style={s.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Stel je opvoedvraag hier..."
            rows={1}
          />
          <button
            style={{ ...s.sendBtn, opacity: input.trim() && !loading ? 1 : 0.4 }}
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
          >↑</button>
        </div>
      )}
      <div style={s.disclaimer}>Papparatzi geeft geen medisch advies. Raadpleeg bij twijfel een professional.</div>
      <style>{globalStyles}</style>
    </div>
  );
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: #FFF8F0; }
  textarea { resize: none; font-family: 'Nunito', sans-serif; }
  textarea:focus { outline: none; }
  input:focus { outline: none; }
  button { cursor: pointer; }
`;

const s = {
  // Onboarding
  onboardingWrap: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FFF8F0 0%, #FFE8D6 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Nunito', sans-serif", padding: "20px",
  },
  onboardingCard: {
    background: "#fff", borderRadius: "28px", padding: "40px 36px",
    maxWidth: "420px", width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)", textAlign: "center",
    animation: "fadeUp 0.5s ease",
  },
  onboardingTagline: {
    color: "#FF6B35", fontWeight: "800", fontSize: "13px",
    letterSpacing: "0.12em", textTransform: "uppercase", margin: "8px 0 12px",
  },
  onboardingText: { color: "#666", lineHeight: "1.6", fontSize: "14px", margin: "0 0 28px" },
  onboardingFields: { textAlign: "left", marginBottom: "20px" },
  fieldLabel: { display: "block", fontWeight: "700", fontSize: "13px", color: "#333", marginBottom: "6px", marginTop: "16px" },
  fieldInput: {
    width: "100%", padding: "10px 14px", borderRadius: "12px",
    border: "2px solid #F0E4D4", background: "#FFF8F0",
    fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333",
  },
  ageButtons: { display: "flex", gap: "8px", flexWrap: "wrap" },
  ageBtn: {
    padding: "7px 14px", borderRadius: "50px", border: "2px solid #E5D5C5",
    background: "transparent", color: "#666", fontFamily: "'Nunito', sans-serif",
    fontWeight: "700", fontSize: "13px", transition: "all 0.15s",
  },
  ageBtnActive: { background: "#FF6B35", borderColor: "#FF6B35", color: "#fff" },
  freeNotice: {
    background: "#FFF0E8", border: "1.5px solid rgba(255,90,16,0.15)",
    borderRadius: "10px", padding: "10px 16px", fontSize: "13px",
    color: "#FF6B35", fontWeight: "700", margin: "16px 0",
  },
  startBtn: {
    width: "100%", padding: "15px", borderRadius: "14px",
    background: "#FF6B35", color: "#fff", border: "none",
    fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "16px",
  },

  // App
  appWrap: {
    display: "flex", flexDirection: "column", height: "100vh",
    maxWidth: "680px", margin: "0 auto",
    background: "#FFF8F0", fontFamily: "'Nunito', sans-serif",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 16px", background: "#fff",
    borderBottom: "1px solid #F0E4D4", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  headerRight: { display: "flex", alignItems: "center", gap: "10px" },
  questionCounter: { display: "flex", alignItems: "center", gap: "8px" },
  counterBar: {
    width: "80px", height: "6px", background: "#F0E4D4",
    borderRadius: "10px", overflow: "hidden",
  },
  counterFill: { height: "100%", background: "#FF6B35", borderRadius: "10px", transition: "width 0.3s" },
  counterText: { fontSize: "12px", fontWeight: "700", color: "#888" },
  premiumBtn: {
    background: "#FF6B35", color: "#fff", border: "none",
    padding: "6px 14px", borderRadius: "50px",
    fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "12px",
  },
  premiumBadge: {
    background: "#FFF0E8", color: "#FF6B35", padding: "6px 14px",
    borderRadius: "50px", fontSize: "12px", fontWeight: "800",
    border: "1.5px solid rgba(255,90,16,0.2)",
  },

  // Profile bar
  profileBar: {
    display: "flex", gap: "8px", padding: "10px 16px",
    background: "#fff", borderBottom: "1px solid #F0E4D4",
    overflowX: "auto",
  },
  profileBtn: {
    padding: "6px 14px", borderRadius: "50px",
    border: "2px solid #F0E4D4", background: "transparent",
    color: "#666", fontFamily: "'Nunito', sans-serif",
    fontWeight: "700", fontSize: "13px", whiteSpace: "nowrap",
  },
  profileBtnActive: { background: "#FF6B35", borderColor: "#FF6B35", color: "#fff" },
  profileAddBtn: {
    padding: "6px 14px", borderRadius: "50px",
    border: "2px dashed #FF6B35", background: "transparent",
    color: "#FF6B35", fontFamily: "'Nunito', sans-serif",
    fontWeight: "700", fontSize: "13px", whiteSpace: "nowrap",
  },
  profileLockBtn: {
    padding: "6px 14px", borderRadius: "50px",
    border: "2px dashed #DDD", background: "transparent",
    color: "#AAA", fontFamily: "'Nunito', sans-serif",
    fontWeight: "700", fontSize: "13px", whiteSpace: "nowrap",
  },

  // Messages
  messagesWrap: {
    flex: 1, overflowY: "auto", padding: "20px",
    display: "flex", flexDirection: "column", gap: "16px",
  },
  emptyState: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", flex: 1, padding: "20px", textAlign: "center",
  },
  emptyEmoji: { fontSize: "48px", marginBottom: "12px" },
  emptyTitle: { fontFamily: "'Nunito', sans-serif", fontWeight: "900", fontSize: "22px", color: "#1A1A2E", margin: "0 0 8px" },
  emptySubtitle: { color: "#888", fontSize: "14px", margin: "0 0 24px" },
  suggestionsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%", maxWidth: "480px" },
  suggestionBtn: {
    padding: "12px 16px", borderRadius: "14px", border: "2px solid #F0E4D4",
    background: "#fff", color: "#333", fontFamily: "'Nunito', sans-serif",
    fontWeight: "600", fontSize: "13px", textAlign: "left", lineHeight: "1.4",
  },

  messageBubble: { display: "flex", alignItems: "flex-start", gap: "10px", animation: "fadeUp 0.3s ease" },
  userBubble: { flexDirection: "row-reverse" },
  assistantBubble: { flexDirection: "row" },
  assistantAvatar: {
    flexShrink: 0, borderRadius: "50%", width: "40px", height: "40px",
    overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  bubbleText: { padding: "14px 18px", borderRadius: "20px", fontSize: "14px", lineHeight: "1.6", maxWidth: "75%" },
  userBubbleText: { background: "#FF6B35", color: "#fff", borderTopRightRadius: "4px", fontWeight: "600" },
  assistantBubbleText: { background: "#fff", color: "#333", borderTopLeftRadius: "4px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },

  typingIndicator: {
    background: "#fff", padding: "16px 20px", borderRadius: "20px",
    borderTopLeftRadius: "4px", display: "flex", gap: "6px", alignItems: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  dot: {
    width: "8px", height: "8px", borderRadius: "50%",
    background: "#FF6B35", animation: "bounce 1.2s infinite", display: "inline-block",
  },

  // Input / upgrade bar
  upgradeBar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 20px", background: "#FFF0E8",
    borderTop: "1.5px solid rgba(255,90,16,0.2)",
    fontSize: "14px", fontWeight: "700", color: "#FF6B35",
  },
  upgradeBarBtn: {
    background: "#FF6B35", color: "#fff", border: "none",
    padding: "8px 18px", borderRadius: "50px",
    fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "13px",
  },
  inputWrap: {
    display: "flex", alignItems: "flex-end", gap: "10px",
    padding: "12px 16px", background: "#fff", borderTop: "1px solid #F0E4D4",
  },
  input: {
    flex: 1, padding: "12px 16px", borderRadius: "16px",
    border: "2px solid #F0E4D4", background: "#FFF8F0",
    fontSize: "14px", color: "#333", lineHeight: "1.5", maxHeight: "120px", overflowY: "auto",
  },
  sendBtn: {
    width: "44px", height: "44px", borderRadius: "14px",
    background: "#FF6B35", color: "#fff", border: "none",
    fontSize: "20px", display: "flex", alignItems: "center",
    justifyContent: "center", fontWeight: "800", flexShrink: 0, transition: "opacity 0.2s",
  },
  disclaimer: {
    textAlign: "center", fontSize: "11px", color: "#CCC",
    padding: "6px 20px 10px", background: "#fff",
  },

  // Upgrade modal
  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "20px", zIndex: 999, animation: "fadeIn 0.2s ease",
  },
  modalCard: {
    background: "#fff", borderRadius: "28px", padding: "36px 32px",
    maxWidth: "400px", width: "100%", textAlign: "center",
    boxShadow: "0 32px 80px rgba(0,0,0,0.2)", position: "relative",
    animation: "fadeUp 0.3s ease",
  },
  modalClose: {
    position: "absolute", top: "16px", right: "16px",
    background: "#F5F5F5", border: "none", borderRadius: "50%",
    width: "32px", height: "32px", fontSize: "14px", color: "#888",
  },
  modalLogo: { marginBottom: "16px" },
  modalTitle: { fontFamily: "'Nunito', sans-serif", fontWeight: "900", fontSize: "22px", color: "#1A1A2E", margin: "0 0 8px" },
  modalSub: { color: "#666", fontSize: "14px", lineHeight: "1.6", margin: "0 0 24px" },

  planToggle: { display: "flex", gap: "12px", marginBottom: "24px" },
  planBtn: {
    flex: 1, padding: "14px 10px", borderRadius: "16px",
    border: "2px solid #F0E4D4", background: "#FAFAFA",
    fontFamily: "'Nunito', sans-serif", display: "flex",
    flexDirection: "column", alignItems: "center", gap: "4px",
    position: "relative", transition: "all 0.15s",
  },
  planBtnActive: { border: "2px solid #FF6B35", background: "#FFF0E8" },
  planBadge: {
    position: "absolute", top: "-10px",
    background: "#FF6B35", color: "#fff",
    fontSize: "10px", fontWeight: "800", padding: "2px 8px",
    borderRadius: "50px", letterSpacing: "0.05em",
  },
  planName: { fontSize: "12px", fontWeight: "700", color: "#888" },
  planPrice: { fontSize: "22px", fontWeight: "900", color: "#1A1A2E" },
  planPriceSub: { fontSize: "11px", color: "#AAA", fontWeight: "600" },

  featureList: { textAlign: "left", marginBottom: "24px" },
  featureItem: { fontSize: "13px", fontWeight: "700", color: "#444", padding: "5px 0" },

  upgradeBtn: {
    width: "100%", padding: "15px", borderRadius: "14px",
    background: "#FF6B35", color: "#fff", border: "none",
    fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "15px",
    marginBottom: "10px",
  },
  modalDisclaimer: { fontSize: "11px", color: "#BBB", margin: 0 },
};
