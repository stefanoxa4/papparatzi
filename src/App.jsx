import { useState, useRef, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap";
document.head.appendChild(fontLink);
const styleEl = document.createElement("style");
styleEl.textContent = `@keyframes premiumPulse { 0%, 100% { box-shadow: 0 0 12px rgba(255,165,0,0.6); transform: scale(1); } 50% { box-shadow: 0 0 22px rgba(255,165,0,0.9); transform: scale(1.05); } }`;
document.head.appendChild(styleEl);

const FREE_LIMIT = 5;

// ── LANGUAGE DETECTION ─────────────────────────────────────────────────────
const getBrowserLang = () => {
  const lang = navigator.language || navigator.userLanguage || "nl";
  return lang.startsWith("nl") ? "nl" : "en";
};

// ── TRANSLATIONS ───────────────────────────────────────────────────────────
const T = {
  nl: {
    tagline: "Jouw Opvoedmaatje",
    onboarding_title: "Papparatzi",
    onboarding_sub: "Jouw Opvoedmaatje",
    onboarding_text: "Stel al je opvoedvragen — dag en nacht, zonder oordeel. Jij doet het goed. 💛",
    child_name_label: "Naam van je kind (optioneel)",
    child_name_placeholder: "bijv. Thiago",
    age_label: "Leeftijd",
    free_notice: "🎉 5 vragen gratis — geen account nodig",
    start_btn: "Begin nu →",
    login_link: "Al een account? Log in →",
    chat_tab: "💬 Chat",
    tips_tab: "💡 Tips",
    tracker_tab: "🚽 Zindelijk",
    teeth_tab: "🦷 Tandjes",
    help_title: "Waar kan ik je mee helpen",
    help_sub: "Kies een onderwerp of typ je eigen vraag",
    age_tips_label: "Passend voor",
    age_tips_suffix: "jaar",
    input_placeholder: "Stel je vraag",
    input_about: "over",
    questions_left: "over",
    premium_btn: "⭐ Premium",
    premium_badge: "⭐ Premium",
    login_btn: "👤 Inloggen",
    logout_btn: "👤 Uitloggen",
    questions_up: "Je gratis vragen zijn op 🎉",
    go_premium: "Ga Premium →",
    logged_in_msg: "✅ Je bent ingelogd — je gesprekken worden bewaard!",
    disclaimer: "Papparatzi geeft geen medisch advies. Bij twijfel, raadpleeg een professional.",
    upgrade_title: "Papparatzi Premium 🌟",
    upgrade_sub: "Alles wat jij als ouder nodig hebt, op één plek.",
    upgrade_features: ["✅ Onbeperkt vragen stellen", "✅ Gesprekken bewaren", "✅ Zindelijkheidstracker", "✅ Interactieve tandjeskaart", "✅ Nieuwe functies als eerste"],
    upgrade_per_month: "per maand · opzeggen wanneer je wil",
    upgrade_btn: "Start Premium →",
    upgrade_loading: "Doorsturen naar betaling...",
    upgrade_close: "Sluiten",
    login_first: "Log eerst in om Premium te kopen.",
    login_title_welcome: "Welkom terug! 👋",
    login_title_register: "Account aanmaken 🎉",
    login_sub_login: "Log in om je gesprekken te bewaren",
    login_sub_register: "Maak een account aan en sla je gesprekken op",
    login_email: "E-mailadres",
    login_password: "Wachtwoord",
    login_submit: "Inloggen →",
    register_submit: "Account aanmaken →",
    login_loading: "Even geduld...",
    login_switch_to_register: "Nog geen account? Registreer je gratis",
    login_switch_to_login: "Al een account? Log in",
    login_skip: "Overslaan — gebruik zonder account",
    login_email_sent: "Check je email voor een bevestigingslink! 📧",
    login_error: "Onjuist e-mailadres of wachtwoord.",
    tracker_title: "Zindelijkheidstracker",
    tracker_sub: "Houd de voortgang van jouw kind bij!",
    tracker_days: "droge dagen deze week",
    tracker_legend: "✅ Droog | 💧 Ongelukje | ○ Nog invullen",
    teeth_title: "Tandjieskaart",
    teeth_sub: "Tik op een tandje als het er door is!",
    teeth_count: "tandjes doorgekomen",
    teeth_upper: "Bovenkaak",
    teeth_lower: "Onderkaak",
    tips_title: "Tips voor",
    tips_suffix: "jaar",
    tips_all: "jouw kind",
    wist_label: "💡 WIST JE DAT?",
    poll_label: "📊 POLL VAN DE WEEK",
    poll_thanks: "Bedankt voor je stem! 💛",
    days_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
  },
  en: {
    tagline: "Your Parenting Buddy",
    onboarding_title: "Papparatzi",
    onboarding_sub: "Your Parenting Buddy",
    onboarding_text: "Ask all your parenting questions — day or night, without judgment. You're doing great. 💛",
    child_name_label: "Your child's name (optional)",
    child_name_placeholder: "e.g. Emma",
    age_label: "Age",
    free_notice: "🎉 5 questions free — no account needed",
    start_btn: "Get started →",
    login_link: "Already have an account? Log in →",
    chat_tab: "💬 Chat",
    tips_tab: "💡 Tips",
    tracker_tab: "🚽 Potty",
    teeth_tab: "🦷 Teeth",
    help_title: "How can I help you",
    help_sub: "Choose a topic or type your own question",
    age_tips_label: "For",
    age_tips_suffix: "year olds",
    input_placeholder: "Ask your question",
    input_about: "about",
    questions_left: "left",
    premium_btn: "⭐ Premium",
    premium_badge: "⭐ Premium",
    login_btn: "👤 Log in",
    logout_btn: "👤 Log out",
    questions_up: "Your free questions are up 🎉",
    go_premium: "Go Premium →",
    logged_in_msg: "✅ You're logged in — your conversations are saved!",
    disclaimer: "Papparatzi does not provide medical advice. When in doubt, consult a professional.",
    upgrade_title: "Papparatzi Premium 🌟",
    upgrade_sub: "Everything you need as a parent, in one place.",
    upgrade_features: ["✅ Unlimited questions", "✅ Save conversations", "✅ Potty training tracker", "✅ Interactive teeth chart", "✅ Early access to new features"],
    upgrade_per_month: "per month · cancel anytime",
    upgrade_btn: "Start Premium →",
    upgrade_loading: "Redirecting to payment...",
    upgrade_close: "Close",
    login_first: "Please log in before purchasing Premium.",
    login_title_welcome: "Welcome back! 👋",
    login_title_register: "Create account 🎉",
    login_sub_login: "Log in to save your conversations",
    login_sub_register: "Create an account and save your conversations",
    login_email: "Email address",
    login_password: "Password",
    login_submit: "Log in →",
    register_submit: "Create account →",
    login_loading: "Please wait...",
    login_switch_to_register: "No account yet? Register for free",
    login_switch_to_login: "Already have an account? Log in",
    login_skip: "Skip — use without account",
    login_email_sent: "Check your email for a confirmation link! 📧",
    login_error: "Incorrect email or password.",
    tracker_title: "Potty Training Tracker",
    tracker_sub: "Track your child's progress!",
    tracker_days: "dry days this week",
    tracker_legend: "✅ Dry | 💧 Accident | ○ Not filled in",
    teeth_title: "Teeth Chart",
    teeth_sub: "Tap a tooth when it comes in!",
    teeth_count: "teeth in",
    teeth_upper: "Upper jaw",
    teeth_lower: "Lower jaw",
    tips_title: "Tips for",
    tips_suffix: "year olds",
    tips_all: "your child",
    wist_label: "💡 DID YOU KNOW?",
    poll_label: "📊 POLL OF THE WEEK",
    poll_thanks: "Thanks for voting! 💛",
    days_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  }
};

// ── AGE TIPS ────────────────────────────────────────────────────────────────
const AGE_TIPS = {
  nl: {
    "0–1": [
      { emoji: "😴", tip: "Slaapritme opbouwen", vraag: "Hoe bouw ik een slaapritme op?" },
      { emoji: "🍼", tip: "Voeding tips", vraag: "Wat zijn tips voor de voeding van mijn baby?" },
      { emoji: "😢", tip: "Waarom huilt mijn baby?", vraag: "Waarom huilt mijn baby zo veel?" },
      { emoji: "🧸", tip: "Zintuiglijke ontwikkeling", vraag: "Hoe stimuleer ik de zintuigen van mijn baby?" },
    ],
    "1–2": [
      { emoji: "👣", tip: "Eerste stapjes", vraag: "Mijn kind begint te lopen, wat moet ik weten?" },
      { emoji: "💬", tip: "Taalontwikkeling", vraag: "Hoe stimuleer ik de taalontwikkeling?" },
      { emoji: "😤", tip: "Eerste driftbuien", vraag: "Mijn kind van 1 heeft driftbuien, hoe ga ik daarmee om?" },
      { emoji: "🍎", tip: "Gezond eten", vraag: "Wat zijn gezonde snacks voor mijn kind van 1?" },
    ],
    "2–4": [
      { emoji: "🚽", tip: "Zindelijk worden", vraag: "Hoe help ik mijn kind zindelijk te worden?" },
      { emoji: "😤", tip: "Driftbuien aanpakken", vraag: "Hoe ga ik om met driftbuien?" },
      { emoji: "😴", tip: "Middagdutje afbouwen", vraag: "Mijn kind wil niet meer slapen overdag, wat nu?" },
      { emoji: "👫", tip: "Samen spelen", vraag: "Hoe leer ik mijn kind samen te spelen?" },
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
  },
  en: {
    "0–1": [
      { emoji: "😴", tip: "Building a sleep schedule", vraag: "How do I build a sleep schedule for my baby?" },
      { emoji: "🍼", tip: "Feeding tips", vraag: "What are some feeding tips for my baby?" },
      { emoji: "😢", tip: "Why is my baby crying?", vraag: "Why does my baby cry so much?" },
      { emoji: "🧸", tip: "Sensory development", vraag: "How do I stimulate my baby's senses?" },
    ],
    "1–2": [
      { emoji: "👣", tip: "First steps", vraag: "My child is starting to walk, what should I know?" },
      { emoji: "💬", tip: "Language development", vraag: "How do I stimulate language development?" },
      { emoji: "😤", tip: "First tantrums", vraag: "My 1-year-old has tantrums, how do I deal with them?" },
      { emoji: "🍎", tip: "Healthy eating", vraag: "What are healthy snacks for my 1-year-old?" },
    ],
    "2–4": [
      { emoji: "🚽", tip: "Potty training", vraag: "How do I help my child with potty training?" },
      { emoji: "😤", tip: "Handling tantrums", vraag: "How do I deal with tantrums?" },
      { emoji: "😴", tip: "Dropping naps", vraag: "My child doesn't want to nap anymore, what now?" },
      { emoji: "👫", tip: "Playing with others", vraag: "How do I teach my child to play with others?" },
    ],
    "4–6": [
      { emoji: "🎒", tip: "Ready for school?", vraag: "How do I know if my child is ready for school?" },
      { emoji: "📚", tip: "Learning to read", vraag: "How do I help my child learn to read?" },
      { emoji: "😟", tip: "Separation anxiety", vraag: "My child doesn't want to go to school, what do I do?" },
      { emoji: "🤝", tip: "Making friends", vraag: "How do I help my child make friends?" },
    ],
    "6–10": [
      { emoji: "📱", tip: "Screen time", vraag: "How much screen time is okay for my child?" },
      { emoji: "😔", tip: "Bullying at school", vraag: "My child is being bullied, what can I do?" },
      { emoji: "📖", tip: "Homework motivation", vraag: "How do I motivate my child to do homework?" },
      { emoji: "💤", tip: "Bedtime", vraag: "What time should my 8-year-old go to bed?" },
    ],
    "10+": [
      { emoji: "📱", tip: "First phone", vraag: "When should I give my child a phone?" },
      { emoji: "💬", tip: "Talking about puberty", vraag: "How do I talk to my child about puberty?" },
      { emoji: "🎮", tip: "Gaming limits", vraag: "How much gaming is okay for my child?" },
      { emoji: "😤", tip: "Teen behavior", vraag: "My child has become rude, how do I deal with that?" },
    ],
  }
};

const WIST_JE_DAT = {
  nl: [
    "Baby's herkennen de stem van hun moeder al vóór de geboorte! 🤰",
    "Kinderen tussen 2-3 jaar leren gemiddeld 9 nieuwe woorden per dag! 💬",
    "Een peuter die 'nee' zegt oefent eigenlijk zijn zelfstandigheid. Goed bezig! 💪",
    "Knuffelen maakt oxytocine aan — het gelukshormoon voor jou én je kind! 🤗",
    "Kinderen die buiten spelen slapen 's nachts gemiddeld beter. 🌳",
    "Zingen met je baby stimuleert de taalontwikkeling meer dan praten! 🎵",
    "Een driftbui duurt gemiddeld maar 3 minuten. Het voelt langer! ⏱️",
    "Baby's kunnen al vanaf 6 weken lachen — maar dan sociaal bewust! 😊",
  ],
  en: [
    "Babies recognize their mother's voice before they're even born! 🤰",
    "Children between 2-3 learn an average of 9 new words per day! 💬",
    "A toddler saying 'no' is actually practicing independence. Good job! 💪",
    "Hugging releases oxytocin — the happiness hormone for you and your child! 🤗",
    "Children who play outside sleep better at night on average. 🌳",
    "Singing to your baby stimulates language development more than talking! 🎵",
    "A tantrum lasts on average only 3 minutes. It feels longer! ⏱️",
    "Babies can smile socially as early as 6 weeks! 😊",
  ]
};

const POLLS = {
  nl: {
    "2–4": { vraag: "Hoe gaat het zindelijk worden bij jullie?", opties: ["Super goed! 🎉", "Rustig aan 🐢", "Nog niet begonnen 😅", "Was al snel klaar ✅"] },
    "0–1": { vraag: "Hoe slaapt jouw baby?", opties: ["Heerlijk door! 😴", "2-3x wakker 🌙", "Bijna nooit 😵", "Wisselend 🎲"] },
    default: { vraag: "Wat vind jij het moeilijkst aan ouderschap?", opties: ["Slaaptekort 😴", "Geduld bewaren 😤", "Balans werk/thuis ⚖️", "Onzekerheid 🤔"] },
  },
  en: {
    "2–4": { vraag: "How is potty training going?", opties: ["Really well! 🎉", "Taking it slow 🐢", "Haven't started yet 😅", "Done already ✅"] },
    "0–1": { vraag: "How is your baby sleeping?", opties: ["Sleeping through! 😴", "Waking 2-3x 🌙", "Barely sleeping 😵", "Up and down 🎲"] },
    default: { vraag: "What do you find hardest about parenting?", opties: ["Sleep deprivation 😴", "Keeping patience 😤", "Work/life balance ⚖️", "Self-doubt 🤔"] },
  }
};

const buildSystemPrompt = (childName, childAge, lang) => {
  if (lang === "en") {
    return `You are Papparatzi, a warm and empathetic parenting buddy. You're not a doctor or expert — you're that one friend who always knows the right thing to say at the right moment.
${childName ? `The child's name is ${childName}.` : ""}${childAge ? ` The child is ${childAge} years old.` : ""}

Your writing style:
- Warm, personal and empathetic — always start with a relatable opening that shows you understand
- ${childName ? `Use the name "${childName}" occasionally in your response — it makes it personal` : "Use 'your child' — address the parent directly"}
- Short and to the point — max 100 words
- Bullet points for practical tips — never more than 4
- No dashes or brackets between sentences
- Always end with an encouraging sentence — parenting is hard, a little push helps
- Never clinical, never distant, never a wall of text

Respond in English.`;
  }
  return `Je bent Papparatzi, een warm en begripvol opvoedmaatje voor ouders. Je bent geen dokter of expert — je bent die ene vriend of vriendin die altijd het juiste weet te zeggen op het juiste moment.
${childName ? `Het kind heet ${childName}.` : ""}${childAge ? ` Het kind is ${childAge} jaar oud.` : ""}

Je schrijfstijl:
- Warm, persoonlijk en empathisch — begin altijd met een herkenbare opening die laat zien dat je het snapt
- ${childName ? `Gebruik de naam "${childName}" af en toe in je antwoord — dat maakt het persoonlijk` : "Gebruik 'jouw kind' — spreek de ouder direct aan"}
- Kort en to the point — max 100 woorden
- Bullet points voor praktische tips — maar nooit meer dan 4
- Geen streepjes, haakjes of andere rare tekens tussen zinnen
- Eindig altijd met een bemoedigende zin — ouderschap is zwaar, een klein duwtje helpt
- Nooit klinisch, nooit afstandelijk, nooit een lap tekst

Je spreekt Nederlands.`;
};

// ── SVG COMPONENTS ─────────────────────────────────────────────────────────
const LogoSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#FF6B35"/>
    <ellipse cx="50" cy="42" rx="22" ry="24" fill="#FFE0C8"/>
    <ellipse cx="50" cy="22" rx="18" ry="8" fill="#FF8C5A"/>
    <ellipse cx="34" cy="28" rx="8" ry="6" fill="#FF8C5A"/>
    <ellipse cx="66" cy="28" rx="8" ry="6" fill="#FF8C5A"/>
    <circle cx="42" cy="40" r="4" fill="#1A1A2E"/>
    <circle cx="58" cy="40" r="4" fill="#1A1A2E"/>
    <circle cx="43.5" cy="38.5" r="1.5" fill="#fff"/>
    <circle cx="59.5" cy="38.5" r="1.5" fill="#fff"/>
    <ellipse cx="50" cy="47" rx="2" ry="1.5" fill="#FFB89A"/>
    <path d="M43 53 Q50 59 57 53" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="36" cy="50" rx="5" ry="3" fill="#FFB89A" opacity="0.5"/>
    <ellipse cx="64" cy="50" rx="5" ry="3" fill="#FFB89A" opacity="0.5"/>
    <ellipse cx="50" cy="78" rx="18" ry="14" fill="#FF6B35"/>
    <ellipse cx="50" cy="72" rx="14" ry="10" fill="#FFE0C8"/>
    <path d="M50 76 C50 76 45 71 45 68 C45 66 47 65 50 68 C53 65 55 66 55 68 C55 71 50 76 50 76Z" fill="#FF8C5A"/>
  </svg>
);

const BabyIllustration = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="85" rx="28" ry="22" fill="#FF8C5A"/>
    <ellipse cx="60" cy="88" rx="24" ry="18" fill="#FFE0C8"/>
    <path d="M60 90 C60 90 54 84 54 80 C54 77 57 76 60 80 C63 76 66 77 66 80 C66 84 60 90 60 90Z" fill="#FF6B35" opacity="0.6"/>
    <ellipse cx="30" cy="82" rx="8" ry="5" fill="#FFE0C8" transform="rotate(-30 30 82)"/>
    <ellipse cx="90" cy="82" rx="8" ry="5" fill="#FFE0C8" transform="rotate(30 90 82)"/>
    <ellipse cx="60" cy="52" rx="28" ry="30" fill="#FFE0C8"/>
    <ellipse cx="60" cy="26" rx="20" ry="10" fill="#FF8C5A"/>
    <path d="M40 35 Q35 25 42 20" stroke="#FF8C5A" strokeWidth="4" strokeLinecap="round"/>
    <path d="M80 35 Q85 25 78 20" stroke="#FF8C5A" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="32" cy="52" rx="6" ry="8" fill="#FFD4B8"/>
    <ellipse cx="88" cy="52" rx="6" ry="8" fill="#FFD4B8"/>
    <circle cx="50" cy="50" r="6" fill="#1A1A2E"/>
    <circle cx="70" cy="50" r="6" fill="#1A1A2E"/>
    <circle cx="52" cy="47" r="2" fill="#fff"/>
    <circle cx="72" cy="47" r="2" fill="#fff"/>
    <ellipse cx="40" cy="60" rx="7" ry="5" fill="#FFB89A" opacity="0.5"/>
    <ellipse cx="80" cy="60" rx="7" ry="5" fill="#FFB89A" opacity="0.5"/>
    <ellipse cx="60" cy="58" rx="3" ry="2" fill="#FFB89A"/>
    <path d="M50 68 Q60 76 70 68" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <ellipse cx="46" cy="106" rx="10" ry="7" fill="#FFE0C8"/>
    <ellipse cx="74" cy="106" rx="10" ry="7" fill="#FFE0C8"/>
    <ellipse cx="40" cy="112" rx="8" ry="5" fill="#FFD4B8"/>
    <ellipse cx="80" cy="112" rx="8" ry="5" fill="#FFD4B8"/>
  </svg>
);

// ── LOGIN SCREEN ───────────────────────────────────────────────────────────
const LoginScreen = ({ onClose, onSuccess, t }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true); setError(""); setMessage("");
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onSuccess();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(t.login_email_sent);
      }
    } catch (err) {
      setError(err.message.includes("Invalid") ? t.login_error : err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 999 }}>
      <div style={{ background: "#fff", borderRadius: "28px", padding: "36px 28px", maxWidth: "380px", width: "100%", textAlign: "center", fontFamily: "'Nunito', sans-serif" }}>
        <LogoSVG size={64} />
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "24px", color: "#1A1A2E", margin: "12px 0 4px" }}>{mode === "login" ? t.login_title_welcome : t.login_title_register}</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: "0 0 24px", lineHeight: 1.5 }}>{mode === "login" ? t.login_sub_login : t.login_sub_register}</p>
        {error && <div style={{ background: "#FFF0F0", border: "1.5px solid #FFD0D0", borderRadius: "10px", padding: "10px", fontSize: "13px", color: "#CC0000", marginBottom: "16px" }}>{error}</div>}
        {message && <div style={{ background: "#F0FFF4", border: "1.5px solid #C0E8C0", borderRadius: "10px", padding: "10px", fontSize: "13px", color: "#007700", marginBottom: "16px" }}>{message}</div>}
        <input style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box", marginBottom: "12px" }} type="email" placeholder={t.login_email} value={email} onChange={e => setEmail(e.target.value)} />
        <input style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box", marginBottom: "16px" }} type="password" placeholder={t.login_password} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        <button style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Fredoka', sans-serif", fontWeight: "600", fontSize: "18px", cursor: "pointer", marginBottom: "12px", opacity: loading ? 0.6 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? t.login_loading : mode === "login" ? t.login_submit : t.register_submit}
        </button>
        <button style={{ background: "none", border: "none", color: "#FF6B35", cursor: "pointer", fontSize: "13px", fontWeight: "700", marginBottom: "8px", fontFamily: "'Nunito', sans-serif" }} onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}>
          {mode === "login" ? t.login_switch_to_register : t.login_switch_to_login}
        </button>
        <br />
        <button style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "12px", fontFamily: "'Nunito', sans-serif" }} onClick={onClose}>{t.login_skip}</button>
      </div>
    </div>
  );
};

// ── UPGRADE MODAL ──────────────────────────────────────────────────────────
const UpgradeModal = ({ onClose, user, setShowLogin, t }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) { onClose(); setShowLogin(true); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" } });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else alert("Something went wrong. Please try again!");
    } catch { alert("Something went wrong. Please try again!"); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 999 }}>
      <div style={{ background: "#fff", borderRadius: "28px", padding: "36px 28px", maxWidth: "380px", width: "100%", textAlign: "center", fontFamily: "'Nunito', sans-serif" }}>
        <LogoSVG size={64} />
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "24px", color: "#1A1A2E", margin: "12px 0 8px" }}>{t.upgrade_title}</h2>
        <p style={{ color: "#666", fontSize: "14px", margin: "0 0 20px", lineHeight: 1.6 }}>{t.upgrade_sub}</p>
        <div style={{ background: "#FFF8F0", borderRadius: "16px", padding: "16px", marginBottom: "20px", textAlign: "left" }}>
          {t.upgrade_features.map((f, i) => <div key={i} style={{ fontSize: "14px", color: "#444", padding: "5px 0", fontWeight: "600" }}>{f}</div>)}
        </div>
        <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF5A10)", borderRadius: "16px", padding: "16px", marginBottom: "20px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "32px", color: "#fff", fontWeight: "700" }}>€3,99</div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px" }}>{t.upgrade_per_month}</div>
        </div>
        {!user && <div style={{ background: "#FFF0E8", borderRadius: "12px", padding: "10px", fontSize: "13px", color: "#FF6B35", fontWeight: "700", marginBottom: "16px" }}>👤 {t.login_first}</div>}
        <button style={{ width: "100%", padding: "15px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Fredoka', sans-serif", fontWeight: "600", fontSize: "18px", cursor: "pointer", marginBottom: "10px", opacity: loading ? 0.6 : 1 }} onClick={handleCheckout} disabled={loading}>
          {loading ? t.upgrade_loading : !user ? `👤 ${t.login_btn}` : t.upgrade_btn}
        </button>
        <button style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "13px", fontFamily: "'Nunito', sans-serif" }} onClick={onClose}>{t.upgrade_close}</button>
      </div>
    </div>
  );
};

// ── POLL WIDGET ────────────────────────────────────────────────────────────
const PollWidget = ({ childAge, lang, t }) => {
  const wistJeDatIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % WIST_JE_DAT[lang].length;
  const [voted, setVoted] = useState(null);
  const polls = POLLS[lang];
  const poll = polls[childAge] || polls.default;

  return (
    <div style={{ margin: "16px 0", width: "100%", maxWidth: "480px" }}>
      <div style={{ background: "#FFF0E8", borderRadius: "16px", padding: "16px", marginBottom: "12px" }}>
        <div style={{ fontSize: "11px", fontWeight: "800", color: "#FF6B35", letterSpacing: "0.1em", marginBottom: "8px" }}>{t.wist_label}</div>
        <p style={{ fontSize: "14px", color: "#444", margin: 0, lineHeight: 1.5 }}>{WIST_JE_DAT[lang][wistJeDatIndex]}</p>
      </div>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", border: "1.5px solid #F0E4D4" }}>
        <div style={{ fontSize: "11px", fontWeight: "800", color: "#FF6B35", letterSpacing: "0.1em", marginBottom: "10px" }}>{t.poll_label}</div>
        <p style={{ fontSize: "14px", fontWeight: "700", color: "#1A1A2E", margin: "0 0 12px" }}>{poll.vraag}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {poll.opties.map((opt, i) => (
            <button key={i} onClick={() => setVoted(i)} style={{ padding: "10px 14px", borderRadius: "10px", border: "2px solid", borderColor: voted === i ? "#FF6B35" : "#F0E4D4", background: voted === i ? "#FFF0E8" : "#FAFAFA", color: voted === i ? "#FF5A10" : "#555", fontFamily: "'Nunito', sans-serif", fontWeight: voted === i ? "800" : "600", fontSize: "13px", cursor: "pointer", textAlign: "left" }}>
              {voted === i ? "✅ " : ""}{opt}
            </button>
          ))}
        </div>
        {voted !== null && <p style={{ fontSize: "12px", color: "#aaa", marginTop: "10px", textAlign: "center" }}>{t.poll_thanks}</p>}
      </div>
    </div>
  );
};

// ── TRACKERS ───────────────────────────────────────────────────────────────
const ZindelijkheidTracker = ({ t }) => {
  const today = new Date();
  const [days, setDays] = useState(() => {
    const d = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      d[date.toDateString()] = null;
    }
    return d;
  });
  const toggle = (key, status) => setDays(prev => ({ ...prev, [key]: prev[key] === status ? null : status }));
  const streak = Object.values(days).filter(v => v === "droog").length;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🚽</div>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>{t.tracker_title}</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{t.tracker_sub}</p>
      </div>
      <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)", borderRadius: "16px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "32px", fontFamily: "'Fredoka', sans-serif", color: "#fff", fontWeight: "700" }}>{streak} 🌟</div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>{t.tracker_days}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", marginBottom: "16px" }}>
        {Object.keys(days).map(key => {
          const d = new Date(key);
          return (
            <div key={key} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "#aaa", marginBottom: "4px" }}>{t.days_short[d.getDay()]}</div>
              <div style={{ fontSize: "9px", color: "#ccc", marginBottom: "6px" }}>{d.getDate()}</div>
              <button onClick={() => toggle(key, "droog")} style={{ width: "100%", aspectRatio: "1", borderRadius: "10px", border: "2px solid", borderColor: days[key] === "droog" ? "#4CAF50" : "#F0E4D4", background: days[key] === "droog" ? "#E8F5E9" : "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {days[key] === "droog" ? "✅" : days[key] === "ongelukje" ? "💧" : "○"}
              </button>
              <button onClick={() => toggle(key, "ongelukje")} style={{ width: "100%", marginTop: "4px", padding: "3px", borderRadius: "8px", border: "2px solid", borderColor: days[key] === "ongelukje" ? "#2196F3" : "#F0E4D4", background: days[key] === "ongelukje" ? "#E3F2FD" : "#fff", fontSize: "10px", cursor: "pointer", color: "#888" }}>💧</button>
            </div>
          );
        })}
      </div>
      <div style={{ background: "#FFF0E8", borderRadius: "14px", padding: "14px", fontSize: "13px", color: "#FF6B35", fontWeight: "600", textAlign: "center" }}>{t.tracker_legend}</div>
    </div>
  );
};

const TandjiesKaart = ({ t }) => {
  const [tandjes, setTandjes] = useState({});
  const toggle = (id) => setTandjes(prev => ({ ...prev, [id]: !prev[id] }));
  const totaal = Object.values(tandjes).filter(Boolean).length;
  const bovenTandjes = ["b1","b2","b3","b4","b5","b6","b7","b8","b9","b10"].map((id, i) => ({ id, naam: i < 4 ? "Snijtand" : i < 6 ? "Hoektand" : "Kies" }));
  const onderTandjes = ["o1","o2","o3","o4","o5","o6","o7","o8","o9","o10"].map((id, i) => ({ id, naam: i < 4 ? "Snijtand" : i < 6 ? "Hoektand" : "Kies" }));
  const TandRij = ({ items, label }) => (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px", textAlign: "center" }}>{label}</div>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
        {items.map(t => <button key={t.id} onClick={() => toggle(t.id)} style={{ width: "32px", height: "38px", borderRadius: "6px 6px 10px 10px", border: "2px solid", borderColor: tandjes[t.id] ? "#FF6B35" : "#E5D5C5", background: tandjes[t.id] ? "#FF6B35" : "#fff", cursor: "pointer", fontSize: "14px" }}>🦷</button>)}
      </div>
    </div>
  );
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🦷</div>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>{t.teeth_title}</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{t.teeth_sub}</p>
      </div>
      <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)", borderRadius: "16px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "28px", fontFamily: "'Fredoka', sans-serif", color: "#fff", fontWeight: "700" }}>{totaal} / 20 🦷</div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>{t.teeth_count}</div>
      </div>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "20px" }}>
        <TandRij items={bovenTandjes} label={t.teeth_upper} />
        <div style={{ height: "1px", background: "#F0E4D4", margin: "8px 0 16px" }} />
        <TandRij items={onderTandjes} label={t.teeth_lower} />
      </div>
    </div>
  );
};

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [lang] = useState(getBrowserLang);
  const t = T[lang];

  const [screen, setScreen] = useState("onboarding");
  const [activeTab, setActiveTab] = useState("chat");
  const [isPremium, setIsPremium] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const saveConversation = async (msgs, uid) => {
    if (!uid || msgs.length === 0) return;
    try {
      await supabase.from("conversations").upsert({
        user_id: uid,
        messages: JSON.stringify(msgs),
        child_name: childName,
        child_age: childAge,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    } catch (e) { console.error("Save error:", e); }
  };

  const loadConversation = async (uid) => {
    if (!uid) return;
    try {
      const { data } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", uid)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();
      if (data?.messages) {
        setMessages(JSON.parse(data.messages));
        if (data.child_name) setChildName(data.child_name);
        if (data.child_age) setChildAge(data.child_age);
      }
    } catch (e) { console.error("Load error:", e); }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("premium") === "true") { setIsPremium(true); window.history.replaceState({}, "", "/"); }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadConversation(session.user.id);
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) loadConversation(session.user.id);
    });
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const remaining = Math.max(0, FREE_LIMIT - questionsUsed);
  const ageTips = (AGE_TIPS[lang][childAge] || AGE_TIPS[lang]["2–4"]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    if (!isPremium && questionsUsed >= FREE_LIMIT) { setShowUpgrade(true); return; }
    const userMsg = { role: "user", content: userText };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs); setInput(""); setLoading(true);
    if (!isPremium) setQuestionsUsed(q => q + 1);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system: buildSystemPrompt(childName, childAge, lang), messages: newMsgs }) });
      if (!response.ok) throw new Error();
      const data = await response.json();
      const reply = data.content?.[0]?.text || "...";
      const updatedMsgs = [...newMsgs, { role: "assistant", content: reply }];
      setMessages(updatedMsgs);
      if (user) saveConversation(updatedMsgs, user.id);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Oeps! 🙏" }]); }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); };

  if (screen === "onboarding") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F0 0%, #FFE8D6 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', sans-serif", padding: "20px" }}>
      <div style={{ background: "#fff", borderRadius: "28px", padding: "40px 32px", maxWidth: "420px", width: "100%", boxShadow: "0 24px 64px rgba(255,90,16,0.12)", textAlign: "center" }}>
        <LogoSVG size={80} />
        <h1 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "34px", margin: "12px 0 4px" }}>Papparatzi</h1>
        <p style={{ color: "#FF8C5A", fontWeight: "700", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 16px" }}>{t.onboarding_sub}</p>
        <p style={{ color: "#777", lineHeight: "1.6", fontSize: "14px", margin: "0 0 28px" }}>{t.onboarding_text}</p>
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "800", fontSize: "13px", color: "#444", marginBottom: "6px" }}>{t.child_name_label}</label>
          <input style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box" }} placeholder={t.child_name_placeholder} value={childName} onChange={e => setChildName(e.target.value)} />
          <label style={{ display: "block", fontWeight: "800", fontSize: "13px", color: "#444", margin: "16px 0 10px" }}>{t.age_label}</label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["0–1", "1–2", "2–4", "4–6", "6–10", "10+"].map(age => (
              <button key={age} style={{ padding: "8px 16px", borderRadius: "50px", border: `2px solid ${childAge === age ? "#FF6B35" : "#E5D5C5"}`, background: childAge === age ? "#FF6B35" : "transparent", color: childAge === age ? "#fff" : "#777", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer" }} onClick={() => setChildAge(childAge === age ? "" : age)}>{age}</button>
            ))}
          </div>
        </div>
        <div style={{ background: "#FFF0E8", border: "1.5px solid rgba(255,107,53,0.2)", borderRadius: "12px", padding: "10px 16px", fontSize: "13px", color: "#FF6B35", fontWeight: "700", margin: "16px 0" }}>{t.free_notice}</div>
        <button style={{ width: "100%", padding: "16px", borderRadius: "16px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Fredoka', sans-serif", fontWeight: "600", fontSize: "18px", cursor: "pointer", marginBottom: "12px" }} onClick={() => setScreen("app")}>{t.start_btn}</button>
        <button style={{ background: "none", border: "none", color: "#FF6B35", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer" }} onClick={() => setShowLogin(true)}>{t.login_link}</button>
      </div>
      {showLogin && <LoginScreen t={t} onClose={() => setShowLogin(false)} onSuccess={() => { setShowLogin(false); setScreen("app"); }} />}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "680px", margin: "0 auto", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif" }}>
      {showUpgrade && <UpgradeModal t={t} user={user} setShowLogin={setShowLogin} onClose={() => setShowUpgrade(false)} />}
      {showLogin && <LoginScreen t={t} onClose={() => setShowLogin(false)} onSuccess={() => setShowLogin(false)} />}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#fff", borderBottom: "1px solid #F0E4D4", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {(activeTab !== "chat" || messages.length > 0) && <button onClick={() => { if (messages.length > 0 && activeTab === "chat") setMessages([]); else setActiveTab("chat"); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#FF6B35", padding: "0 4px" }}>←</button>}
          <LogoSVG size={36} />
          <div>
            <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "18px", color: "#FF5A10" }}>Papparatzi</div>
            <div style={{ fontSize: "9px", color: "#FF8C5A", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.tagline}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {user ? <button onClick={handleLogout} style={{ background: "#FFF0E8", color: "#FF6B35", border: "1.5px solid rgba(255,107,53,0.2)", padding: "5px 12px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "11px", cursor: "pointer" }}>{t.logout_btn}</button>
            : <button onClick={() => setShowLogin(true)} style={{ background: "#FFF0E8", color: "#FF6B35", border: "1.5px solid rgba(255,107,53,0.2)", padding: "5px 12px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "11px", cursor: "pointer" }}>{t.login_btn}</button>}
          {!isPremium ? <button style={{ background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "11px", cursor: "pointer" }} onClick={() => setShowUpgrade(true)}>{t.premium_btn}</button>
            : <div style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#fff", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "900", boxShadow: "0 0 12px rgba(255,165,0,0.6)", animation: "premiumPulse 2s ease-in-out infinite", letterSpacing: "0.05em" }}>⭐ PREMIUM</div>}
        </div>
      </div>

      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #F0E4D4", padding: "0 16px", overflowX: "auto" }}>
        {[{ id: "chat", label: t.chat_tab }, { id: "tips", label: t.tips_tab }, { id: "tracker", label: t.tracker_tab, premium: true }, { id: "tandjes", label: t.teeth_tab, premium: true }].map(tab => (
          <button key={tab.id} onClick={() => { if (tab.premium && !isPremium) { setShowUpgrade(true); return; } setActiveTab(tab.id); }}
            style={{ padding: "12px 10px", border: "none", background: "none", borderBottom: `2px solid ${activeTab === tab.id ? "#FF6B35" : "transparent"}`, color: activeTab === tab.id ? "#FF6B35" : "#aaa", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
            {tab.label}{tab.premium && !isPremium ? " 🔒" : ""}
          </button>
        ))}
      </div>

      {activeTab === "chat" && (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "10px 0" }}>
                <BabyIllustration size={100} />
                <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "22px", color: "#1A1A2E", margin: "12px 0 6px" }}>{t.help_title}{childName ? `, ${childName.split(" ")[0]}` : ""}?</p>
                <p style={{ color: "#aaa", fontSize: "13px", margin: "0 0 20px" }}>{t.help_sub}</p>
                {childAge && (
                  <div style={{ width: "100%", maxWidth: "480px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "800", color: "#FF8C5A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>{t.age_tips_label} {childAge} {t.age_tips_suffix}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {ageTips.map((tip, i) => (
                        <button key={i} onClick={() => sendMessage(tip.vraag)} style={{ padding: "12px 14px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#fff", color: "#333", fontFamily: "'Nunito', sans-serif", fontWeight: "600", fontSize: "13px", textAlign: "left", cursor: "pointer", lineHeight: 1.4 }}>
                          {tip.emoji} {tip.tip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {user && <div style={{ background: "#F0FFF4", border: "1.5px solid #C0E8C0", borderRadius: "12px", padding: "10px 16px", fontSize: "13px", color: "#007700", marginBottom: "16px", width: "100%", maxWidth: "480px" }}>{t.logged_in_msg}</div>}
                <PollWidget childAge={childAge} lang={lang} t={t} />
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "assistant" && <div style={{ flexShrink: 0 }}><LogoSVG size={32} /></div>}
                <div style={{ padding: "14px 18px", borderRadius: "20px", fontSize: "14px", lineHeight: "1.7", maxWidth: "78%", background: msg.role === "user" ? "linear-gradient(135deg, #FF6B35, #FF5A10)" : "#fff", color: msg.role === "user" ? "#fff" : "#333", fontWeight: msg.role === "user" ? "700" : "normal", borderTopRightRadius: msg.role === "user" ? "4px" : "20px", borderTopLeftRadius: msg.role === "assistant" ? "4px" : "20px", boxShadow: msg.role === "assistant" ? "0 2px 12px rgba(0,0,0,0.06)" : "none", whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><LogoSVG size={32} /><div style={{ background: "#fff", padding: "14px 20px", borderRadius: "20px", borderTopLeftRadius: "4px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}><span style={{ color: "#FF6B35", fontSize: "18px", letterSpacing: "4px" }}>• • •</span></div></div>}
            <div ref={messagesEndRef} />
          </div>
          {!isPremium && remaining === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#FFF0E8", borderTop: "1.5px solid rgba(255,107,53,0.2)", fontSize: "14px", fontWeight: "700", color: "#FF6B35" }}>
              <span>{t.questions_up}</span>
              <button style={{ background: "#FF6B35", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "12px", cursor: "pointer" }} onClick={() => setShowUpgrade(true)}>{t.go_premium}</button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", padding: "12px 16px", background: "#fff", borderTop: "1px solid #F0E4D4" }}>
              <textarea style={{ flex: 1, padding: "12px 16px", borderRadius: "16px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", lineHeight: 1.5, maxHeight: "120px", overflowY: "auto", resize: "none" }} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} placeholder={`${t.input_placeholder}${childName ? ` ${t.input_about} ${childName}` : ""}...`} rows={1} />
              <button style={{ width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontSize: "18px", cursor: "pointer", opacity: input.trim() && !loading ? 1 : 0.4, flexShrink: 0 }} onClick={() => sendMessage()} disabled={!input.trim() || loading}>↑</button>
            </div>
          )}
        </>
      )}

      {activeTab === "tips" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 16px" }}>{t.tips_title} {childAge ? `${childAge} ${t.tips_suffix}` : t.tips_all} 💡</h2>
          {Object.entries(AGE_TIPS[lang]).map(([age, tips]) => (
            <div key={age} style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", color: "#FF8C5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>{age} {t.tips_suffix}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {tips.map((tip, i) => (
                  <button key={i} onClick={() => { setActiveTab("chat"); setTimeout(() => sendMessage(tip.vraag), 100); }}
                    style={{ padding: "14px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#fff", color: "#333", fontFamily: "'Nunito', sans-serif", fontWeight: "600", fontSize: "13px", textAlign: "left", cursor: "pointer", lineHeight: 1.4 }}>
                    <div style={{ fontSize: "20px", marginBottom: "6px" }}>{tip.emoji}</div>
                    {tip.tip}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "tracker" && <ZindelijkheidTracker t={t} />}
      {activeTab === "tandjes" && <TandjiesKaart t={t} />}

      <div style={{ textAlign: "center", fontSize: "10px", color: "#CCC", padding: "5px 20px 8px", background: "#fff" }}>{t.disclaimer}</div>
    </div>
  );
}
