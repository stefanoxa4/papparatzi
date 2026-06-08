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

function UpgradeModal({ onClose, onUpgrade }) {
  const [plan, setPlan] = useState("year");
  return (
    <div style={s.modalOverlay}>
      <div style={s.modalCard}>
        <button style={s.modalClose} onClick={onClose}>✕</button>
        <div style={s.modalLogo}><LogoSVG size={72} /></div>
        <h2 style={s.modalTitle}>Je gratis vragen zijn op 🎉</h2>
        <p style={s.modalSub}>Ga Premium en stel <strong>onbeperkt vragen</strong> — dag en nacht.</p>
        <div style={s.planToggle}>
          <button style={{ ...s.planBtn, ...(plan === "month" ? s.planBtnActive : {}) }} onClick={() => setPlan("month")}>
            <span style={s.planName}>Per maand</span>
            <span style={s.planPrice}>€3,99</span>
          </button>
          <button style={{ ...s.planBtn, ...(plan === "year" ? s.planBtnActive : {}) }} onClick={() => setPlan("year")}>
            <div style={s.planBadge}>Bespaar 37%</div>
            <span style={s.planName}>Per jaar</span>
            <span style={s.planPrice}>€29,99</span>
            <span style={s.planPriceSub}>€2,49/maand</span>
          </button>
        </div>
        <div style={s.featureList}>
          {["✅ Onbeperkt vragen stellen","✅ Tot 3 kinderprofielen","✅ Gespreksgeschiedenis bewaren","✅ Nieuwe functies als eerste"].map(f => (
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

function ProfileSelector({ profiles, active, onSelect, onAdd, isPremium }) {
  return (
    <div style={s.profileBar}>
      {profiles.map(p => (
        <button key={p.id} style={{ ...s.profileBtn, ...(p.id === active ? s.profileBtnActive : {}) }} onClick={() => onSelect(p.id)}>
          {p.emoji} {p.name}
        </button>
      ))}
      {isPremium && profiles.length < 3 && <button style={s.profileAddBtn} onClick={onAdd}>+ Kind</button>}
      {!isPremium && <button style={s.profileLockBtn} onClick={onAdd}>🔒 + Kind</button>}
    </div>
  );
}

export default function Papparatzi() {
  const [screen, setScreen] = useState("onboarding");
  const [isPremium, setIsPremium] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [profiles, setProfiles] = useState([{ id: 1, name: "Mijn kind", emoji: "👶", age: "" }]);
  const [activeProfile, setActiveProfile] = useState(1);
  const [conversations, setConversations] = useState({ 1: [] });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false
