import { useState, useRef, useEffect } from "react";

const FREE_LIMIT = 5;

// ── FONTS ──────────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap";
document.head.appendChild(fontLink);

// ── SYSTEM PROMPT ──────────────────────────────────────────────────────────
const buildSystemPrompt = (childName, childAge) => `Je bent Papparatzi, een warm en begripvol opvoedmaatje voor ouders. Je bent geen dokter of expert — je bent die ene vriend of vriendin die altijd het juiste weet te zeggen op het juiste moment.
${childName ? `Het kind heet ${childName}.` : ""}${childAge ? ` Het kind is ${childAge} jaar oud.` : ""}

Je schrijfstijl:
- Warm, persoonlijk en empathisch — begin altijd met een herkenbare opening die laat zien dat je het snapt
- ${childName ? `Gebruik de naam "${childName}" af en toe in je antwoord — dat maakt het persoonlijk` : "Gebruik 'jouw kind' — spreek de ouder direct aan"}
- Kort en to the point — max 100 woorden
- Bullet points voor praktische tips — maar nooit meer dan 4
- Geen streepjes, haakjes of andere rare tekens tussen zinnen
- Eindig altijd met een bemoedigende zin — ouderschap is zwaar, een klein duwtje helpt
- Nooit klinisch, nooit afstandelijk, nooit een lap tekst

Je spreekt Nederlands tenzij de ouder Engels schrijft.`;

// ── LEEFTIJD TIPS ──────────────────────────────────────────────────────────
const AGE_TIPS = {
  "0–1": [
    { emoji: "😴", tip: "Slaapritme opbouwen", vraag: "Hoe bouw ik een slaapritme op?" },
    { emoji: "🍼", tip: "Borstvoeding vs flesvoeding", vraag: "Wat zijn tips voor borstvoeding?" },
    { emoji: "😢", tip: "Waarom huilt mijn baby?", vraag: "Waarom huilt mijn baby zo veel?" },
    { emoji: "🧸", tip: "Zintuiglijke ontwikkeling", vraag: "Hoe stimuleer ik de zintuigen van mijn baby?" },
  ],
  "1–2": [
    { emoji: "👣", tip: "Eerste stapjes", vraag: "Mijn kind begint te lopen, wat moet ik weten?" },
    { emoji: "💬", tip: "Taalontwikkeling", vraag: "Hoe stimuleer ik de taalontwikkeling?" },
    { emoji: "😤", tip: "Eerste driftbuien", vraag: "Mijn kind van 1 heeft driftbuien, hoe ga ik daarmee om?" },
    { emoji: "🍎", tip: "Gezond eten voor peuters", vraag: "Wat zijn gezonde snacks voor mijn kind van 1?" },
  ],
  "2–4": [
    { emoji: "🚽", tip: "Zindelijk worden", vraag: "Hoe help ik mijn kind zindelijk te worden?" },
    { emoji: "😤", tip: "Driftbuien aanpakken", vraag: "Hoe ga ik om met driftbuien?" },
    { emoji: "😴", tip: "Middagdutje afbouwen", vraag: "Mijn kind wil niet meer slapen overdag, wat nu?" },
    { emoji: "👫", tip: "Spelen met andere kinderen", vraag: "Hoe leer ik mijn kind samen te spelen?" },
  ],
  "4–6": [
    { emoji: "🎒", tip: "Klaar voor school?", vraag: "Hoe weet ik of mijn kind klaar is voor school?" },
    { emoji: "📚", tip: "Leren lezen", vraag: "Hoe help ik mijn kind leren lezen?" },
    { emoji: "😟", tip: "Scheidingsangst", vraag: "Mijn kind wil niet naar school, hoe ga ik daarmee om?" },
    { emoji: "🤝", tip: "Vriendjes maken", vraag: "Hoe help ik mijn kind vriendjes te maken?" },
  ],
  "6–10": [
    { emoji: "📱", tip: "Schermtijd", vraag: "Hoeveel schermtijd is oké voor mijn kind?" },
    { emoji: "😔", tip: "Pesten op school", vraag: "Mijn kind wordt gepest, wat kan ik doen?" },
    { emoji: "📖", tip: "Huiswerk motivatie", vraag: "Hoe motiveer ik mijn kind voor huiswerk?" },
    { emoji: "💤", tip: "Slaaptijd", vraag: "Hoe laat moet mijn kind van 8 naar bed?" },
  ],
  "10+": [
    { emoji: "📱", tip: "Eerste telefoon", vraag: "Wanneer geef ik mijn kind een telefoon?" },
    { emoji: "💬", tip: "Praten over puberteit", vraag: "Hoe praat ik met mijn kind over puberteit?" },
    { emoji: "🎮", tip: "Gamen en grenzen", vraag: "Hoeveel gamen is oké voor mijn kind?" },
    { emoji: "😤", tip: "Tienergedrag", vraag: "Mijn kind is brutaal geworden, hoe ga ik daarmee om?" },
  ],
};

// ── WIST JE DAT ────────────────────────────────────────────────────────────
const WIST_JE_DAT = [
  "Baby's herkennen de stem van hun moeder al vóór de geboorte! 🤰",
  "Kinderen tussen 2-3 jaar leren gemiddeld 9 nieuwe woorden per dag! 💬",
  "Een peuter die 'nee' zegt oefent eigenlijk zijn zelfstandigheid. Goed bezig! 💪",
  "Knuffelen maakt oxytocine aan — het 'gelukshormoon' voor jou én je kind! 🤗",
  "Kinderen die buiten spelen slapen 's nachts gemiddeld beter. 🌳",
  "Zingen met je baby stimuleert de taalontwikkeling meer dan praten! 🎵",
  "Een driftbui duurt gemiddeld maar 3 minuten. Het voelt langer! ⏱️",
  "Baby's kunnen al vanaf 6 weken lachen — maar dan sociaal bewust! 😊",
];

// ── LOGO SVG ───────────────────────────────────────────────────────────────
const LogoSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#FF6B35"/>
    {/* Hoofd */}
    <ellipse cx="50" cy="42" rx="22" ry="24" fill="#FFE0C8"/>
    {/* Haar */}
    <ellipse cx="50" cy="22" rx="18" ry="8" fill="#FF8C5A"/>
    <ellipse cx="34" cy="28" rx="8" ry="6" fill="#FF8C5A"/>
    <ellipse cx="66" cy="28" rx="8" ry="6" fill="#FF8C5A"/>
    {/* Ogen */}
    <circle cx="42" cy="40" r="4" fill="#1A1A2E"/>
    <circle cx="58" cy="40" r="4" fill="#1A1A2E"/>
    <circle cx="43.5" cy="38.5" r="1.5" fill="#fff"/>
    <circle cx="59.5" cy="38.5" r="1.5" fill="#fff"/>
    {/* Neus */}
    <ellipse cx="50" cy="47" rx="2" ry="1.5" fill="#FFB89A"/>
    {/* Mond */}
    <path d="M43 53 Q50 59 57 53" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    {/* Wangen */}
    <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB89A" opacity="0.5"/>
    <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB89A" opacity="0.5"/>
    {/* Lichaampje */}
    <ellipse cx="50" cy="78" rx="18" ry="14" fill="#FF6B35"/>
    <ellipse cx="50" cy="72" rx="14" ry="10" fill="#FFE0C8"/>
    {/* Hartje op buik */}
    <path d="M50 76 C50 76 45 71 45 68 C45 66 47 65 50 68 C53 65 55 66 55 68 C55 71 50 76 50 76Z" fill="#FF8C5A"/>
  </svg>
);

// ── BABY ILLUSTRATIE ───────────────────────────────────────────────────────
const BabyIllustration = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lichaam */}
    <ellipse cx="60" cy="85" rx="28" ry="22" fill="#FF8C5A"/>
    {/* Rompertje */}
    <ellipse cx="60" cy="88" rx="24" ry="18" fill="#FFE0C8"/>
    {/* Hartje */}
    <path d="M60 90 C60 90 54 84 54 80 C54 77 57 76 60 80 C63 76 66 77 66 80 C66 84 60 90 60 90Z" fill="#FF6B35" opacity="0.6"/>
    {/* Armpjes */}
    <ellipse cx="30" cy="82" rx="8" ry="5" fill="#FFE0C8" transform="rotate(-30 30 82)"/>
    <ellipse cx="90" cy="82" rx="8" ry="5" fill="#FFE0C8" transform="rotate(30 90 82)"/>
    {/* Hoofd */}
    <ellipse cx="60" cy="52" rx="28" ry="30" fill="#FFE0C8"/>
    {/* Haar */}
    <ellipse cx="60" cy="26" rx="20" ry="10" fill="#FF8C5A"/>
    <path d="M40 35 Q35 25 42 20" stroke="#FF8C5A" strokeWidth="4" strokeLinecap="round"/>
    <path d="M80 35 Q85 25 78 20" stroke="#FF8C5A" strokeWidth="4" strokeLinecap="round"/>
    {/* Oren */}
    <ellipse cx="32" cy="52" rx="6" ry="8" fill="#FFD4B8"/>
    <ellipse cx="88" cy="52" rx="6" ry="8" fill="#FFD4B8"/>
    {/* Ogen */}
    <circle cx="50" cy="50" r="6" fill="#1A1A2E"/>
    <circle cx="70" cy="50" r="6" fill="#1A1A2E"/>
    <circle cx="52" cy="47" r="2" fill="#fff"/>
    <circle cx="72" cy="47" r="2" fill="#fff"/>
    {/* Wangen */}
    <ellipse cx="40" cy="60" rx="7" ry="5" fill="#FFB89A" opacity="0.5"/>
    <ellipse cx="80" cy="60" rx="7" ry="5" fill="#FFB89A" opacity="0.5"/>
    {/* Neus */}
    <ellipse cx="60" cy="58" rx="3" ry="2" fill="#FFB89A"/>
    {/* Glimlach */}
    <path d="M50 68 Q60 76 70 68" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" fill="none"/>
    {/* Beentjes */}
    <ellipse cx="46" cy="106" rx="10" ry="7" fill="#FFE0C8"/>
    <ellipse cx="74" cy="106" rx="10" ry="7" fill="#FFE0C8"/>
    {/* Voetjes */}
    <ellipse cx="40" cy="112" rx="8" ry="5" fill="#FFD4B8"/>
    <ellipse cx="80" cy="112" rx="8" ry="5" fill="#FFD4B8"/>
  </svg>
);

// ── ZINDELIJKHEID TRACKER ─────────────────────────────────────────────────
const ZindelijkheidTracker = ({ onBack }) => {
  const today = new Date();
  const [days, setDays] = useState(() => {
    const d = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toDateString();
      d[key] = d[key] || null;
    }
    return d;
  });

  const toggle = (key, status) => {
    setDays(prev => ({ ...prev, [key]: prev[key] === status ? null : status }));
  };

  const dateKeys = Object.keys(days);
  const streak = dateKeys.filter(k => days[k] === "droog").length;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🚽</div>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>Zindelijkheidstracker</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>Houd de voortgang van jouw kind bij!</p>
      </div>

      <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)", borderRadius: "16px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "32px", fontFamily: "'Fredoka', sans-serif", color: "#fff", fontWeight: "700" }}>{streak} 🌟</div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>droge dagen deze week</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", marginBottom: "16px" }}>
        {dateKeys.map(key => {
          const d = new Date(key);
          const dagNamen = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
          return (
            <div key={key} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "#aaa", marginBottom: "4px" }}>{dagNamen[d.getDay()]}</div>
              <div style={{ fontSize: "9px", color: "#ccc", marginBottom: "6px" }}>{d.getDate()}</div>
              <button onClick={() => toggle(key, "droog")} style={{ width: "100%", aspectRatio: "1", borderRadius: "10px", border: "2px solid", borderColor: days[key] === "droog" ? "#4CAF50" : "#F0E4D4", background: days[key] === "droog" ? "#E8F5E9" : "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {days[key] === "droog" ? "✅" : days[key] === "ongelukje" ? "💧" : "○"}
              </button>
              <button onClick={() => toggle(key, "ongelukje")} style={{ width: "100%", marginTop: "4px", padding: "3px", borderRadius: "8px", border: "2px solid", borderColor: days[key] === "ongelukje" ? "#2196F3" : "#F0E4D4", background: days[key] === "ongelukje" ? "#E3F2FD" : "#fff", fontSize: "10px", cursor: "pointer", color: "#888" }}>
                💧
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ background: "#FFF0E8", borderRadius: "14px", padding: "14px", fontSize: "13px", color: "#FF6B35", fontWeight: "600", textAlign: "center" }}>
        ✅ Droog &nbsp;|&nbsp; 💧 Ongelukje &nbsp;|&nbsp; ○ Nog invullen
      </div>
    </div>
  );
};

// ── TANDJES KAART ──────────────────────────────────────────────────────────
const TandjiesKaart = ({ onBack }) => {
  const [tandjes, setTandjes] = useState({});

  const bovenTandjes = [
    { id: "b1", naam: "Snijtand", x: 20 }, { id: "b2", naam: "Snijtand", x: 35 },
    { id: "b3", naam: "Snijtand", x: 50 }, { id: "b4", naam: "Snijtand", x: 65 },
    { id: "b5", naam: "Hoektand", x: 80 }, { id: "b6", naam: "Kies", x: 93 },
    { id: "b7", naam: "Snijtand", x: 7 }, { id: "b8", naam: "Hoektand", x: 112 },
    { id: "b9", naam: "Kies", x: 125 },
  ];

  const onderTandjes = [
    { id: "o1", naam: "Snijtand", x: 20 }, { id: "o2", naam: "Snijtand", x: 35 },
    { id: "o3", naam: "Snijtand", x: 50 }, { id: "o4", naam: "Snijtand", x: 65 },
    { id: "o5", naam: "Hoektand", x: 80 }, { id: "o6", naam: "Kies", x: 93 },
    { id: "o7", naam: "Snijtand", x: 7 }, { id: "o8", naam: "Hoektand", x: 112 },
    { id: "o9", naam: "Kies", x: 125 },
  ];

  const toggle = (id) => setTandjes(prev => ({ ...prev, [id]: !prev[id] }));
  const totaal = Object.values(tandjes).filter(Boolean).length;

  const TandRij = ({ items, label }) => (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px", textAlign: "center" }}>{label}</div>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
        {items.map(t => (
          <button key={t.id} onClick={() => toggle(t.id)} title={t.naam}
            style={{ width: "32px", height: "38px", borderRadius: t.naam === "Kies" ? "6px" : "6px 6px 10px 10px", border: "2px solid", borderColor: tandjes[t.id] ? "#FF6B35" : "#E5D5C5", background: tandjes[t.id] ? "#FF6B35" : "#fff", cursor: "pointer", transition: "all 0.2s", fontSize: "10px", color: tandjes[t.id] ? "#fff" : "#ccc" }}>
            🦷
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🦷</div>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>Tandjieskaart</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>Tik op een tandje als het er door is!</p>
      </div>

      <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)", borderRadius: "16px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "28px", fontFamily: "'Fredoka', sans-serif", color: "#fff", fontWeight: "700" }}>{totaal} / 20 🦷</div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>tandjes doorgekomen</div>
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", padding: "20px" }}>
        <TandRij items={bovenTandjes} label="Bovenkaak" />
        <div style={{ height: "1px", background: "#F0E4D4", margin: "8px 0 16px" }} />
        <TandRij items={onderTandjes} label="Onderkaak" />
      </div>

      <div style={{ background: "#FFF0E8", borderRadius: "14px", padding: "12px", marginTop: "16px", fontSize: "12px", color: "#FF6B35", textAlign: "center" }}>
        Oranje = doorgekomen 🎉
      </div>
    </div>
  );
};

// ── POLL COMPONENT ─────────────────────────────────────────────────────────
const PollWidget = ({ childAge }) => {
  const wistJeDatIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % WIST_JE_DAT.length;
  const [voted, setVoted] = useState(null);

  const polls = {
    "2–4": { vraag: "Hoe gaat het zindelijk worden bij jullie?", opties: ["Super goed! 🎉", "Rustig aan 🐢", "Nog niet begonnen 😅", "Was al snel klaar ✅"] },
    "0–1": { vraag: "Hoe slaapt jouw baby?", opties: ["Heerlijk door! 😴", "2-3x wakker 🌙", "Bijna nooit 😵", "Wisselend 🎲"] },
    "1–2": { vraag: "Wanneer zette jouw kind de eerste stapjes?", opties: ["Voor 12 maanden", "Tussen 12-14 maanden", "Na 15 maanden", "Nog niet"] },
  };

  const poll = polls[childAge] || { vraag: "Wat vind jij het moeilijkst aan ouderschap?", opties: ["Slaaptekort 😴", "Geduld bewaren 😤", "Balans werk/thuis ⚖️", "Onzekerheid 🤔"] };

  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ background: "#FFF0E8", borderRadius: "16px", padding: "16px", marginBottom: "12px" }}>
        <div style={{ fontSize: "11px", fontWeight: "800", color: "#FF6B35", letterSpacing: "0.1em", marginBottom: "8px" }}>💡 WIST JE DAT?</div>
        <p style={{ fontSize: "14px", color: "#444", margin: 0, lineHeight: 1.5 }}>{WIST_JE_DAT[wistJeDatIndex]}</p>
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", border: "1.5px solid #F0E4D4" }}>
        <div style={{ fontSize: "11px", fontWeight: "800", color: "#FF6B35", letterSpacing: "0.1em", marginBottom: "10px" }}>📊 POLL VAN DE WEEK</div>
        <p style={{ fontSize: "14px", fontWeight: "700", color: "#1A1A2E", margin: "0 0 12px" }}>{poll.vraag}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {poll.opties.map((opt, i) => (
            <button key={i} onClick={() => setVoted(i)} style={{ padding: "10px 14px", borderRadius: "10px", border: "2px solid", borderColor: voted === i ? "#FF6B35" : "#F0E4D4", background: voted === i ? "#FFF0E8" : "#FAFAFA", color: voted === i ? "#FF5A10" : "#555", fontFamily: "'Nunito', sans-serif", fontWeight: voted === i ? "800" : "600", fontSize: "13px", cursor: "pointer", textAlign: "left" }}>
              {voted === i ? "✅ " : ""}{opt}
            </button>
          ))}
        </div>
        {voted !== null && <p style={{ fontSize: "12px", color: "#aaa", marginTop: "10px", textAlign: "center" }}>Bedankt voor je stem! 💛</p>}
      </div>
    </div>
  );
};

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("onboarding");
  const [activeTab, setActiveTab] = useState("chat");
  const [isPremium, setIsPremium] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const remaining = Math.max(0, FREE_LIMIT - questionsUsed);
  const ageTips = AGE_TIPS[childAge] || AGE_TIPS["2–4"];

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    if (!isPremium && questionsUsed >= FREE_LIMIT) { setShowUpgrade(true); return; }
    const userMsg = { role: "user", content: userText };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    if (!isPremium) setQuestionsUsed(q => q + 1);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: buildSystemPrompt(childName, childAge), messages: newMsgs }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Er ging iets mis, probeer het nog eens!";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Oeps, er ging iets mis. Probeer het nog eens! 🙏" }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // ── ONBOARDING ──
  if (screen === "onboarding") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F0 0%, #FFE8D6 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', sans-serif", padding: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "28px", padding: "40px 32px", maxWidth: "420px", width: "100%", boxShadow: "0 24px 64px rgba(255,90,16,0.12)", textAlign: "center" }}>
          <LogoSVG size={80} />
          <h1 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "34px", margin: "12px 0 4px", letterSpacing: "0.5px" }}>Papparatzi</h1>
          <p style={{ color: "#FF8C5A", fontWeight: "700", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 16px" }}>Jouw Opvoedmaatje</p>
          <p style={{ color: "#777", lineHeight: "1.6", fontSize: "14px", margin: "0 0 28px" }}>Stel al je opvoedvragen — dag en nacht, zonder oordeel. Jij doet het goed. 💛</p>
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "800", fontSize: "13px", color: "#444", marginBottom: "6px" }}>Naam van je kind (optioneel)</label>
            <input style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box" }} placeholder="bijv. Thiago" value={childName} onChange={e => setChildName(e.target.value)} />
            <label style={{ display: "block", fontWeight: "800", fontSize: "13px", color: "#444", margin: "16px 0 10px" }}>Leeftijd</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["0–1", "1–2", "2–4", "4–6", "6–10", "10+"].map(age => (
                <button key={age} style={{ padding: "8px 16px", borderRadius: "50px", border: `2px solid ${childAge === age ? "#FF6B35" : "#E5D5C5"}`, background: childAge === age ? "#FF6B35" : "transparent", color: childAge === age ? "#fff" : "#777", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer" }} onClick={() => setChildAge(childAge === age ? "" : age)}>{age}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "#FFF0E8", border: "1.5px solid rgba(255,107,53,0.2)", borderRadius: "12px", padding: "10px 16px", fontSize: "13px", color: "#FF6B35", fontWeight: "700", margin: "16px 0" }}>🎉 5 vragen gratis — geen account nodig</div>
          <button style={{ width: "100%", padding: "16px", borderRadius: "16px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Fredoka', sans-serif", fontWeight: "600", fontSize: "18px", cursor: "pointer", letterSpacing: "0.5px" }} onClick={() => setScreen("app")}>Begin nu →</button>
        </div>
      </div>
    );
  }

  // ── MAIN SCREEN ──
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "680px", margin: "0 auto", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif" }}>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 999 }}>
          <div style={{ background: "#fff", borderRadius: "28px", padding: "36px 28px", maxWidth: "380px", width: "100%", textAlign: "center" }}>
            <LogoSVG size={64} />
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "24px", color: "#1A1A2E", margin: "12px 0 8px" }}>Je gratis vragen zijn op!</h2>
            <p style={{ color: "#666", fontSize: "14px", margin: "0 0 24px", lineHeight: 1.6 }}>Ga Premium voor <strong>onbeperkt vragen</strong>, opgeslagen gesprekken, de zindelijkheidstracker en tandjeskaart.</p>
            <button style={{ width: "100%", padding: "15px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Fredoka', sans-serif", fontWeight: "600", fontSize: "18px", cursor: "pointer", marginBottom: "10px" }} onClick={() => { setIsPremium(true); setShowUpgrade(false); }}>Start voor €3,99/maand →</button>
            <button style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "13px" }} onClick={() => setShowUpgrade(false)}>Sluiten</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#fff", borderBottom: "1px solid #F0E4D4", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {activeTab !== "chat" || messages.length > 0 ? (
            <button onClick={() => { if (messages.length > 0 && activeTab === "chat") setMessages([]); else setActiveTab("chat"); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#FF6B35", padding: "0 4px" }}>←</button>
          ) : null}
          <LogoSVG size={36} />
          <div>
            <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "18px", color: "#FF5A10", letterSpacing: "0.5px" }}>Papparatzi</div>
            <div style={{ fontSize: "9px", color: "#FF8C5A", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase" }}>Jouw Opvoedmaatje</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {!isPremium ? (
            <>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#aaa" }}>{remaining} over</span>
              <button style={{ background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "11px", cursor: "pointer" }} onClick={() => setShowUpgrade(true)}>⭐ Premium</button>
            </>
          ) : (
            <div style={{ background: "#FFF0E8", color: "#FF6B35", padding: "5px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: "800", border: "1.5px solid rgba(255,107,53,0.2)" }}>⭐ Premium</div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #F0E4D4", padding: "0 16px" }}>
        {[
          { id: "chat", label: "💬 Chat" },
          { id: "tips", label: "💡 Tips" },
          { id: "tracker", label: "🚽 Zindelijk", premium: true },
          { id: "tandjes", label: "🦷 Tandjes", premium: true },
        ].map(tab => (
          <button key={tab.id} onClick={() => { if (tab.premium && !isPremium) { setShowUpgrade(true); return; } setActiveTab(tab.id); }}
            style={{ padding: "12px 10px", border: "none", background: "none", borderBottom: `2px solid ${activeTab === tab.id ? "#FF6B35" : "transparent"}`, color: activeTab === tab.id ? "#FF6B35" : "#aaa", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap" }}>
            {tab.label}{tab.premium && !isPremium ? " 🔒" : ""}
          </button>
        ))}
      </div>

      {/* CHAT TAB */}
      {activeTab === "chat" && (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "10px 0" }}>
                <BabyIllustration size={100} />
                <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "22px", color: "#1A1A2E", margin: "12px 0 6px" }}>
                  Waar kan ik je mee helpen{childName ? `, ${childName.split(" ")[0]}` : ""}?
                </p>
                <p style={{ color: "#aaa", fontSize: "13px", margin: "0 0 20px" }}>Kies een onderwerp of typ je eigen vraag</p>
                {childAge && (
                  <div style={{ width: "100%", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "800", color: "#FF8C5A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>Passend voor {childAge} jaar</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {ageTips.map((t, i) => (
                        <button key={i} onClick={() => sendMessage(t.vraag)} style={{ padding: "12px 14px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#fff", color: "#333", fontFamily: "'Nunito', sans-serif", fontWeight: "600", fontSize: "13px", textAlign: "left", cursor: "pointer", lineHeight: 1.4 }}>
                          {t.emoji} {t.tip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <PollWidget childAge={childAge} />
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "assistant" && <div style={{ flexShrink: 0 }}><LogoSVG size={32} /></div>}
                <div style={{ padding: "14px 18px", borderRadius: "20px", fontSize: "14px", lineHeight: "1.7", maxWidth: "78%", background: msg.role === "user" ? "linear-gradient(135deg, #FF6B35, #FF5A10)" : "#fff", color: msg.role === "user" ? "#fff" : "#333", fontWeight: msg.role === "user" ? "700" : "normal", borderTopRightRadius: msg.role === "user" ? "4px" : "20px", borderTopLeftRadius: msg.role === "assistant" ? "4px" : "20px", boxShadow: msg.role === "assistant" ? "0 2px 12px rgba(0,0,0,0.06)" : "none", whiteSpace: "pre-wrap", fontFamily: "'Nunito', sans-serif" }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LogoSVG size={32} />
                <div style={{ background: "#fff", padding: "14px 20px", borderRadius: "20px", borderTopLeftRadius: "4px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <span style={{ color: "#FF6B35", fontSize: "18px", letterSpacing: "4px" }}>• • •</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {!isPremium && remaining === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#FFF0E8", borderTop: "1.5px solid rgba(255,107,53,0.2)", fontSize: "14px", fontWeight: "700", color: "#FF6B35" }}>
              <span>Je gratis vragen zijn op 🎉</span>
              <button style={{ background: "#FF6B35", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "12px", cursor: "pointer" }} onClick={() => setShowUpgrade(true)}>Ga Premium →</button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", padding: "12px 16px", background: "#fff", borderTop: "1px solid #F0E4D4" }}>
              <textarea style={{ flex: 1, padding: "12px 16px", borderRadius: "16px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", lineHeight: 1.5, maxHeight: "120px", overflowY: "auto", resize: "none" }} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} placeholder={`Stel je vraag${childName ? ` over ${childName}` : ""}...`} rows={1} />
              <button style={{ width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontSize: "18px", cursor: "pointer", opacity: input.trim() && !loading ? 1 : 0.4, flexShrink: 0 }} onClick={() => sendMessage()} disabled={!input.trim() || loading}>↑</button>
            </div>
          )}
        </>
      )}

      {/* TIPS TAB */}
      {activeTab === "tips" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 16px" }}>
            Tips voor {childAge ? `${childAge} jaar` : "jouw kind"} 💡
          </h2>
          {Object.entries(AGE_TIPS).map(([age, tips]) => (
            <div key={age} style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", color: "#FF8C5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>{age} jaar</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {tips.map((t, i) => (
                  <button key={i} onClick={() => { setActiveTab("chat"); sendMessage(t.vraag); }}
                    style={{ padding: "14px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#fff", color: "#333", fontFamily: "'Nunito', sans-serif", fontWeight: "600", fontSize: "13px", textAlign: "left", cursor: "pointer", lineHeight: 1.4 }}>
                    <div style={{ fontSize: "20px", marginBottom: "6px" }}>{t.emoji}</div>
                    {t.tip}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TRACKER TAB */}
      {activeTab === "tracker" && <ZindelijkheidTracker onBack={() => setActiveTab("chat")} />}

      {/* TANDJES TAB */}
      {activeTab === "tandjes" && <TandjiesKaart onBack={() => setActiveTab("chat")} />}

      <div style={{ textAlign: "center", fontSize: "10px", color: "#CCC", padding: "5px 20px 8px", background: "#fff" }}>
        Papparatzi geeft geen medisch advies. Bij twijfel, raadpleeg een professional.
      </div>
    </div>
  );
}
