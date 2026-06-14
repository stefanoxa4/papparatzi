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

const getBrowserLang = () => {
  const lang = navigator.language || navigator.userLanguage || "nl";
  return lang.startsWith("nl") ? "nl" : "en";
};

// ── TRANSLATIONS ───────────────────────────────────────────────────────────
const T = {
  nl: {
    tagline: "Jouw Digitale Opvoedmaatje",
    onboarding_sub: "Jouw Digitale Opvoedmaatje",
    onboarding_text: "Stel al je opvoedvragen — dag en nacht, zonder oordeel. Jij doet het goed.",
    child_name_label: "Naam van je kind (optioneel)",
    child_name_placeholder: "bijv. Noah",
    age_label: "Leeftijd",
    free_notice: "5 vragen gratis — geen account nodig",
    start_btn: "Begin nu",
    login_link: "Al een account? Log in",
    chat_tab: "Chat",
    tips_tab: "Tips",
    tracker_tab: "Zindelijk",
    teeth_tab: "Tandjes",
    help_title: "Waar kan ik je mee helpen",
    help_sub: "Kies een onderwerp of typ je eigen vraag",
    age_tips_label: "Passend voor",
    age_tips_suffix: "jaar",
    input_placeholder: "Stel je vraag",
    input_about: "over",
    questions_left: "over",
    premium_btn: "Premium",
    premium_badge: "PREMIUM",
    login_btn: "Inloggen",
    logout_btn: "Uitloggen",
    questions_up: "Je gratis vragen zijn op",
    go_premium: "Ga Premium",
    logged_in_msg: "Je bent ingelogd — je gesprekken worden bewaard!",
    disclaimer: "Papparatzi geeft geen medisch advies. Bij twijfel, raadpleeg een professional.",
    upgrade_title: "Papparatzi Premium",
    upgrade_sub: "Alles wat jij als ouder nodig hebt, op één plek.",
    upgrade_features: ["Onbeperkt vragen stellen", "Gesprekken bewaren", "Zindelijkheidstracker", "Interactieve tandjeskaart", "Nieuwe functies als eerste"],
    upgrade_per_month: "per maand · opzeggen wanneer je wil",
    upgrade_btn: "Start Premium",
    upgrade_loading: "Doorsturen naar betaling...",
    upgrade_close: "Sluiten",
    login_first: "Log eerst in om Premium te kopen.",
    login_title_welcome: "Welkom terug!",
    login_title_register: "Account aanmaken",
    login_sub_login: "Log in om je gesprekken te bewaren",
    login_sub_register: "Maak een account aan en sla je gesprekken op",
    login_email: "E-mailadres",
    login_password: "Wachtwoord",
    login_submit: "Inloggen",
    register_submit: "Account aanmaken",
    login_loading: "Even geduld...",
    login_switch_to_register: "Nog geen account? Registreer je gratis",
    login_switch_to_login: "Al een account? Log in",
    login_skip: "Overslaan — gebruik zonder account",
    login_email_sent: "Check je email voor een bevestigingslink!",
    login_error: "Onjuist e-mailadres of wachtwoord.",
    tracker_title: "Zindelijkheidstracker",
    tracker_sub: "Houd de voortgang van jouw kind bij!",
    tracker_days: "droge dagen deze maand",
    tracker_legend: "Droog | Ongelukje | Nog invullen",
    teeth_title: "Tandjeskaart",
    teeth_sub: "Tik op een tandje als het er door is!",
    teeth_count: "tandjes doorgekomen",
    teeth_upper: "Bovenkaak",
    teeth_lower: "Onderkaak",
    tips_title: "Tips voor",
    tips_suffix: "jaar",
    tips_all: "jouw kind",
    tips_chat_btn: "Stel een vraag",
    wist_label: "WIST JE DAT?",
    poll_label: "POLL VAN DE WEEK",
    poll_thanks: "Bedankt voor je stem!",
    days_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
  },
  en: {
    tagline: "Your Digital Parenting Buddy",
    onboarding_sub: "Your Digital Parenting Buddy",
    onboarding_text: "Ask all your parenting questions — day or night, without judgment. You're doing great.",
    child_name_label: "Your child's name (optional)",
    child_name_placeholder: "e.g. Noah",
    age_label: "Age",
    free_notice: "5 questions free — no account needed",
    start_btn: "Get started",
    login_link: "Already have an account? Log in",
    chat_tab: "Chat",
    tips_tab: "Tips",
    tracker_tab: "Potty",
    teeth_tab: "Teeth",
    help_title: "How can I help you",
    help_sub: "Choose a topic or type your own question",
    age_tips_label: "For",
    age_tips_suffix: "year olds",
    input_placeholder: "Ask your question",
    input_about: "about",
    questions_left: "left",
    premium_btn: "Premium",
    premium_badge: "PREMIUM",
    login_btn: "Log in",
    logout_btn: "Log out",
    questions_up: "Your free questions are up",
    go_premium: "Go Premium",
    logged_in_msg: "You are logged in — your conversations are saved!",
    disclaimer: "Papparatzi does not provide medical advice. When in doubt, consult a professional.",
    upgrade_title: "Papparatzi Premium",
    upgrade_sub: "Everything you need as a parent, in one place.",
    upgrade_features: ["Unlimited questions", "Save conversations", "Potty training tracker", "Interactive teeth chart", "Early access to new features"],
    upgrade_per_month: "per month · cancel anytime",
    upgrade_btn: "Start Premium",
    upgrade_loading: "Redirecting to payment...",
    upgrade_close: "Close",
    login_first: "Please log in before purchasing Premium.",
    login_title_welcome: "Welcome back!",
    login_title_register: "Create account",
    login_sub_login: "Log in to save your conversations",
    login_sub_register: "Create an account and save your conversations",
    login_email: "Email address",
    login_password: "Password",
    login_submit: "Log in",
    register_submit: "Create account",
    login_loading: "Please wait...",
    login_switch_to_register: "No account yet? Register for free",
    login_switch_to_login: "Already have an account? Log in",
    login_skip: "Skip — use without account",
    login_email_sent: "Check your email for a confirmation link!",
    login_error: "Incorrect email or password.",
    tracker_title: "Potty Training Tracker",
    tracker_sub: "Track your child's progress!",
    tracker_days: "dry days this month",
    tracker_legend: "Dry | Accident | Not filled in",
    teeth_title: "Teeth Chart",
    teeth_sub: "Tap a tooth when it comes in!",
    teeth_count: "teeth in",
    teeth_upper: "Upper jaw",
    teeth_lower: "Lower jaw",
    tips_title: "Tips for",
    tips_suffix: "year olds",
    tips_all: "your child",
    tips_chat_btn: "Ask a question",
    wist_label: "DID YOU KNOW?",
    poll_label: "POLL OF THE WEEK",
    poll_thanks: "Thanks for voting!",
    days_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  }
};

// ── SVG ICONS (no emojis) ──────────────────────────────────────────────────
const IconBed = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><path d="M3 20v-8a2 2 0 012-2h14a2 2 0 012 2v8"/><path d="M3 14h18"/><path d="M5 14V8a2 2 0 012-2h10a2 2 0 012 2v6"/><rect x="7" y="10" width="4" height="4" rx="1"/></svg>;
const IconBottle = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><path d="M8 2h8"/><path d="M9 2v2.5a5 5 0 000 10V22h6v-7.5a5 5 0 000-10V2"/></svg>;
const IconCry = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="7"/><path d="M9 13c.5 1 1.5 2 3 2s2.5-1 3-2"/><path d="M9 9h.01M15 9h.01"/><path d="M10 18c0 2-1 3-1 3M14 18c0 2 1 3 1 3"/></svg>;
const IconToy = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="3"/></svg>;
const IconWalk = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="4" r="2"/><path d="M10 8l-2 6 3 1 1 5M14 8l2 6-3 1-1 5"/><path d="M8 14h8"/></svg>;
const IconSpeech = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const IconAngry = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M9 9l1.5 1.5M15 9l-1.5 1.5"/><path d="M9 16c.5-1 1.5-2 3-2s2.5 1 3 2"/></svg>;
const IconFood = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>;
const IconBag = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
const IconBook = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;
const IconSad = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 9h.01"/><path d="M9 16c.5-1 1.5-1.5 3-1.5s2.5.5 3 1.5"/></svg>;
const IconPhone = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>;
const IconHeart = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
const IconGame = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4"/><circle cx="16" cy="11" r="1" fill="#FF6B35"/><circle cx="18" cy="13" r="1" fill="#FF6B35"/></svg>;
const IconPotty = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"><ellipse cx="12" cy="16" rx="7" ry="5"/><path d="M5 16V10a7 7 0 0114 0v6"/><path d="M19 10h2"/></svg>;
const IconChat = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const IconStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconLogin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>;

// ── AGE TIPS WITH CONCRETE CONTENT ────────────────────────────────────────
const AGE_TIPS = {
  nl: {
    "0–1": [
      { icon: <IconBed/>, tip: "Slaapritme opbouwen", vraag: "Hoe bouw ik een slaapritme op?", tips: ["Leg je baby elke avond op dezelfde tijd in bed", "Gebruik vaste rituelen: bad, voeding, liedje", "Leg je baby slaperig maar nog wakker neer", "Houd de kamer donker en stil tijdens de nacht"] },
      { icon: <IconBottle/>, tip: "Voeding & borstvoeding", vraag: "Wat zijn tips voor de voeding van mijn baby?", tips: ["Geef borstvoeding op verzoek — elke 2-3 uur", "Let op verzadigingssignalen: hoofd wegdraaien, vuistjes ontspannen", "Bij flesvoeding: schud de fles goed en test de temperatuur", "Boeren na elke voeding voorkomt krampen"] },
      { icon: <IconCry/>, tip: "Waarom huilt mijn baby?", vraag: "Waarom huilt mijn baby zo veel?", tips: ["Controleer op volgorde: honger, luier, moe, pijn", "Wikkelen in een doek geeft geborgenheid", "Zachte witte ruis kalmeert veel baby's", "Overprikkeling is een veelvoorkomende oorzaak bij 's avonds huilen"] },
      { icon: <IconToy/>, tip: "Zintuiglijke ontwikkeling", vraag: "Hoe stimuleer ik de zintuigen van mijn baby?", tips: ["Praat en zing veel — elk geluid stimuleert de hersenen", "Laat je baby op zijn buik liggen (tummy time) elke dag", "Gebruik speelgoed met contrasterende kleuren", "Huidcontact draagt bij aan emotionele veiligheid"] },
    ],
    "1–2": [
      { icon: <IconWalk/>, tip: "Eerste stapjes", vraag: "Mijn kind begint te lopen, wat moet ik weten?", tips: ["Loopschoenen zijn niet nodig — blote voeten is het beste", "Laat je kind op eigen tempo ontdekken", "Eerste stappen tussen 9-15 maanden is normaal", "Gebruik loopwagens met weerstand — niet zonder remmen"] },
      { icon: <IconSpeech/>, tip: "Taalontwikkeling", vraag: "Hoe stimuleer ik de taalontwikkeling?", tips: ["Benoem alles wat je doet: 'Nu trek ik je jas aan'", "Lees elke dag voor — ook korte boekjes", "Reageer altijd op brabbelen en woordjes", "Beperk schermtijd — echt contact stimuleert taal"] },
      { icon: <IconAngry/>, tip: "Driftbuien aanpakken", vraag: "Mijn kind van 1 heeft driftbuien, hoe ga ik daarmee om?", tips: ["Blijf rustig — jouw rust kalmeert je kind", "Geef het gevoel een naam: 'Je bent boos, dat snap ik'", "Zorg voor veiligheid maar geef geen aandacht aan het gedrag", "Een driftbui duurt gemiddeld 3 minuten — het gaat over"] },
      { icon: <IconFood/>, tip: "Gezond eten", vraag: "Wat zijn gezonde snacks voor mijn kind van 1?", tips: ["Kleine stukjes fruit, groente en kaas zijn ideaal", "Vermijd toegevoegd suiker en zout tot 2 jaar", "Laat je kind zelf eten — ook al is het rommelig", "Bied nieuwe smaken 10-15 keer aan voor je opgeeft"] },
    ],
    "2–4": [
      { icon: <IconPotty/>, tip: "Zindelijk worden", vraag: "Hoe help ik mijn kind zindelijk te worden?", tips: ["Wacht tot je kind zelf interesse toont — forceer nooit", "Gebruik een vaste potty routine na eten en voor bed", "Maak het positief — vier elk succesje", "Ongelukjes zijn normaal — reageer nooit boos"] },
      { icon: <IconAngry/>, tip: "Driftbuien aanpakken", vraag: "Hoe ga ik om met driftbuien?", tips: ["Voorkom triggers: vermijd overkwalificatie en oeverloze keuzes", "Geef beperkte keuzes: 'Wil je de rode of de blauwe?'", "Negeer veilig gedrag — geef aandacht na de bui", "Houd vast aan grenzen — wees consequent"] },
      { icon: <IconBed/>, tip: "Middagdutje afbouwen", vraag: "Mijn kind wil niet meer slapen overdag, wat nu?", tips: ["Tussen 2-4 jaar stoppen de meeste kinderen met dutjes", "Rusttijd is nog steeds waardevol — boek of rustig spel", "Vervroeg de bedtijd als het dutje wegvalt", "Tekenen van moeheid overdag: clownesk gedrag, huilbuien"] },
      { icon: <IconToy/>, tip: "Samen spelen", vraag: "Hoe leer ik mijn kind samen te spelen?", tips: ["Parallelspel is normaal tot 3 jaar — samen spelen komt later", "Benoem emoties van andere kinderen: 'Kijk, Noa huilt'", "Oefen thuis met beurten nemen", "Straf nooit bij niet-delen — leer het in kleine stapjes"] },
    ],
    "4–6": [
      { icon: <IconBag/>, tip: "Klaar voor school?", vraag: "Hoe weet ik of mijn kind klaar is voor school?", tips: ["Emotionele rijpheid telt meer dan cognitieve vaardigheden", "Kan je kind 15-20 min gefocust spelen?", "Laat je kind oefenen met zelfstandigheid: jas aantrekken, eten", "Een intakegesprek met de leerkracht geeft veel inzicht"] },
      { icon: <IconBook/>, tip: "Leren lezen", vraag: "Hoe help ik mijn kind leren lezen?", tips: ["Lees elke dag voor — maak er een ritueel van", "Wijs woorden aan op straat, in de supermarkt", "Letters op magneten aan de koelkast werkt goed", "Overdrijf niet — ongezonde druk werkt averechts"] },
      { icon: <IconSad/>, tip: "Scheidingsangst", vraag: "Mijn kind wil niet naar school, hoe ga ik daarmee om?", tips: ["Altijd kort en duidelijk afscheid nemen — nooit sluipen", "Zeg wanneer je terugkomt: 'Na het eten haal ik je op'", "Geef een knuffel of foto mee", "Als het langer dan 6 weken duurt, overleg met de school"] },
      { icon: <IconSpeech/>, tip: "Vriendjes maken", vraag: "Hoe help ik mijn kind vriendjes te maken?", tips: ["Oefen gesprekje starten: 'Mag ik meedoen?'", "Nodig een klasgenootje uit om thuis te spelen", "Bespreek na schooltijd hoe de dag was", "Forceer nooit — elk kind heeft zijn eigen tempo"] },
    ],
    "6–10": [
      { icon: <IconPhone/>, tip: "Schermtijd", vraag: "Hoeveel schermtijd is oké voor mijn kind?", tips: ["WHO adviseert max 1-2 uur per dag voor deze leeftijd", "Maak vaste schermvrije momenten: eten, voor bed", "Kijk regelmatig mee — weet wat je kind kijkt", "Hanteer een schermcontract samen met je kind"] },
      { icon: <IconSad/>, tip: "Pesten op school", vraag: "Mijn kind wordt gepest, wat kan ik doen?", tips: ["Neem je kind altijd serieus — bagatelliseer nooit", "Noteer concrete voorvallen met datum", "Informeer de leerkracht zo snel mogelijk", "Leer je kind assertieve reacties: rustig, recht aankijken, weglopen"] },
      { icon: <IconBook/>, tip: "Huiswerk motivatie", vraag: "Hoe motiveer ik mijn kind voor huiswerk?", tips: ["Vaste huiswerktijd werkt beter dan 'wanneer het uitkomt'", "Zorg voor een rustige werkplek zonder afleiding", "Help niet te snel — laat je kind zelf worstelen", "Beloon inzet, niet alleen het resultaat"] },
      { icon: <IconBed/>, tip: "Slaaptijd", vraag: "Hoe laat moet mijn kind van 8 naar bed?", tips: ["Kinderen van 6-12 jaar hebben 9-11 uur slaap nodig", "Bedtijd tussen 19:30-20:30 is ideaal voor schoolgaande kinderen", "Schermen uit minimaal 1 uur voor bed", "Vaste routine: douchen, lezen, licht uit"] },
    ],
    "10+": [
      { icon: <IconPhone/>, tip: "Eerste telefoon", vraag: "Wanneer geef ik mijn kind een telefoon?", tips: ["Gemiddelde leeftijd is 11-12 jaar — maar behoefte verschilt", "Maak duidelijke afspraken voor je de telefoon geeft", "Gebruik ouderlijk toezicht apps in het begin", "Bespreek sociale media gevaren eerlijk en open"] },
      { icon: <IconHeart/>, tip: "Praten over puberteit", vraag: "Hoe praat ik met mijn kind over puberteit?", tips: ["Begin vroeg — rond 8-9 jaar voor meisjes, 9-10 voor jongens", "Gebruik correcte anatomische termen", "Maak het normaal — 'Iedereen maakt dit mee'", "Wees beschikbaar voor vragen, ook op onhandige momenten"] },
      { icon: <IconGame/>, tip: "Gamen en grenzen", vraag: "Hoeveel gamen is oké voor mijn kind?", tips: ["Max 1-2 uur op schooldagen, meer mag in het weekend", "Kijk naar de leeftijdsclassificatie van games (PEGI)", "Speel soms mee — het geeft inzicht én verbinding", "Online gaming: leer je kind nooit persoonlijke info te delen"] },
      { icon: <IconAngry/>, tip: "Tienergedrag", vraag: "Mijn kind is brutaal geworden, hoe ga ik daarmee om?", tips: ["Grensverleggen is normaal en gezond in de puberteit", "Reageer niet op boosheid met boosheid", "Kies je gevechten — niet alles hoeft een discussie te zijn", "Behoud verbinding — blijf vragen hoe het gaat"] },
    ],
  },
  en: {
    "0–1": [
      { icon: <IconBed/>, tip: "Building a sleep schedule", vraag: "How do I build a sleep schedule?", tips: ["Put your baby to bed at the same time every evening", "Use consistent routines: bath, feed, song", "Put your baby down drowsy but awake", "Keep the room dark and quiet at night"] },
      { icon: <IconBottle/>, tip: "Feeding tips", vraag: "What are feeding tips for my baby?", tips: ["Breastfeed on demand — every 2-3 hours", "Watch for fullness cues: turning head away, relaxed fists", "For bottle: shake well and test temperature", "Burp after every feed to prevent cramps"] },
      { icon: <IconCry/>, tip: "Why is my baby crying?", vraag: "Why does my baby cry so much?", tips: ["Check in order: hunger, diaper, tired, pain", "Swaddling provides a sense of security", "Soft white noise calms many babies", "Overstimulation is a common cause of evening crying"] },
      { icon: <IconToy/>, tip: "Sensory development", vraag: "How do I stimulate my baby's senses?", tips: ["Talk and sing a lot — every sound stimulates the brain", "Daily tummy time is essential for development", "Use toys with contrasting colors", "Skin contact contributes to emotional security"] },
    ],
    "2–4": [
      { icon: <IconPotty/>, tip: "Potty training", vraag: "How do I help with potty training?", tips: ["Wait until your child shows interest — never force it", "Use a consistent potty routine after meals and before bed", "Keep it positive — celebrate every success", "Accidents are normal — never react with anger"] },
      { icon: <IconAngry/>, tip: "Handling tantrums", vraag: "How do I deal with tantrums?", tips: ["Stay calm — your calm calms your child", "Name the feeling: 'You're angry, I understand'", "Ensure safety but don't give attention to the behavior", "A tantrum lasts about 3 minutes on average"] },
      { icon: <IconBed/>, tip: "Dropping naps", vraag: "My child doesn't want to nap anymore, what now?", tips: ["Most children stop napping between 2-4 years", "Rest time is still valuable — book or quiet play", "Move bedtime earlier when nap drops", "Signs of tiredness: clown-like behavior, crying spells"] },
      { icon: <IconToy/>, tip: "Playing with others", vraag: "How do I teach my child to play with others?", tips: ["Parallel play is normal until age 3", "Name other children's emotions: 'Look, Emma is crying'", "Practice taking turns at home", "Never punish for not sharing — teach in small steps"] },
    ],
  }
};

const WIST_JE_DAT = {
  nl: ["Baby's herkennen de stem van hun moeder al vóór de geboorte!", "Kinderen tussen 2-3 jaar leren gemiddeld 9 nieuwe woorden per dag!", "Een peuter die 'nee' zegt oefent zijn zelfstandigheid. Goed bezig!", "Knuffelen maakt oxytocine aan — het gelukshormoon voor jou én je kind!", "Kinderen die buiten spelen slapen 's nachts gemiddeld beter.", "Zingen met je baby stimuleert de taalontwikkeling meer dan praten!", "Een driftbui duurt gemiddeld maar 3 minuten. Het voelt langer!", "Baby's kunnen al vanaf 6 weken sociaal lachen!"],
  en: ["Babies recognize their mother's voice before they're even born!", "Children between 2-3 learn an average of 9 new words per day!", "A toddler saying 'no' is actually practicing independence!", "Hugging releases oxytocin — the happiness hormone for you and your child!", "Children who play outside sleep better at night on average.", "Singing to your baby stimulates language more than talking!", "A tantrum lasts on average only 3 minutes. It feels longer!", "Babies can smile socially as early as 6 weeks!"]
};

const POLLS = {
  nl: {
    "2–4": { vraag: "Hoe gaat het zindelijk worden bij jullie?", opties: ["Super goed!", "Rustig aan", "Nog niet begonnen", "Was al snel klaar"] },
    "0–1": { vraag: "Hoe slaapt jouw baby?", opties: ["Heerlijk door!", "2-3x wakker", "Bijna nooit", "Wisselend"] },
    default: { vraag: "Wat vind jij het moeilijkst aan ouderschap?", opties: ["Slaaptekort", "Geduld bewaren", "Balans werk/thuis", "Onzekerheid"] },
  },
  en: {
    "2–4": { vraag: "How is potty training going?", opties: ["Really well!", "Taking it slow", "Haven't started", "Done already"] },
    "0–1": { vraag: "How is your baby sleeping?", opties: ["Sleeping through!", "Waking 2-3x", "Barely sleeping", "Up and down"] },
    default: { vraag: "What do you find hardest about parenting?", opties: ["Sleep deprivation", "Keeping patience", "Work/life balance", "Self-doubt"] },
  }
};

const buildSystemPrompt = (childName, childAge, lang) => {
  if (lang === "en") {
    return `You are Papparatzi, an experienced parenting coach who stands beside parents, not across from them. You're the knowledgeable friend who always knows what to say, without overcomplicating things.

HOW YOU TALK:
Keep it short. Most answers are 2 to 4 sentences. Only go longer for genuinely complex questions.
Talk the way you would at a kitchen table with a friend, not like a leaflet.
Don't open every reply with an empathy line. Sometimes just answer directly.
Feel free to ask something back if it feels natural, like "Do you notice that..." or "How's that going for you?"
Always write in flowing sentences. No lists, no bullet points, no numbered steps. If you have several tips, weave them into one or two sentences.
Never use a dash in the middle of a sentence. Use a period, comma, or new sentence instead.
Not every answer needs an encouraging closer. Sometimes a plain answer is enough.

WHEN TO GO LONGER:
For complex situations, something that's been going on for weeks, you can go deeper and cover multiple angles, still in flowing prose.
For simple factual questions, like bedtimes or amounts, give the answer plus maybe one practical tip in the same sentence. Done.

EXAMPLES OF TONE:
Question: "What time should my 2 year old go to bed?"
Answer: "Usually somewhere around 7 to 8pm, with about 11 to 14 hours of sleep total. Do you notice he has trouble waking up in the morning? If so, a bit earlier could help."

Question: "My kid has constant tantrums, I don't know what to do anymore"
Answer: "That sounds exhausting. Tantrums are really just clumsy emotion regulation, nothing you're doing wrong. What often helps is staying calm yourself and naming the feeling without rushing to fix it, it usually passes within a few minutes."

${childName ? `The child's name is ${childName}, use it occasionally.` : ""}
${childAge ? `The child is ${childAge} years old.` : ""}

Respond in English unless the parent writes in Dutch.`;
  }
  return `Je bent Papparatzi, een ervaren opvoedcoach die naast ouders staat, niet tegenover hen. Je bent die vriend met verstand van zaken die altijd net het juiste zegt, zonder ingewikkeld te doen.

HOE JE PRAAT:
Kort. De meeste antwoorden zijn 2 tot 4 zinnen. Alleen bij complexe vragen mag het wat langer.
Praat zoals je zou praten met een vriend aan de keukentafel, niet als een folder.
Begin niet elke keer met een empathie-zin. Soms reageer je gewoon direct.
Mag terugvragen als dat natuurlijk voelt, zoals "Merk je dat..." of "Hoe gaat dat bij jullie?"
Schrijf altijd in lopende zinnen. Geen lijstjes, geen bullet points, geen opsommingen met streepjes of nummers. Als je meerdere tips hebt, verwerk ze in een of twee zinnen achter elkaar.
Gebruik nooit een koppelstreep midden in een zin. Gebruik een punt, komma of nieuwe zin.
Niet elk antwoord hoeft een bemoedigende afsluiter. Soms is een gewoon antwoord genoeg.

WANNEER WEL UITGEBREID:
Bij complexe situaties, bijvoorbeeld iets dat al weken speelt, mag je dieper ingaan en meerdere kanten belichten, maar nog steeds in lopende tekst.
Bij simpele feitelijke vragen, zoals bedtijden of hoeveelheden, geef je het antwoord plus eventueel één praktische tip in dezelfde zin. Klaar.

VOORBEELDEN VAN TOON:
Vraag: "Hoe laat moet mijn kind van 2 naar bed?"
Antwoord: "Meestal rond 19:00-20:00, met zo'n 11-14 uur slaap totaal. Merk je dat hij 's ochtends moeilijk wakker wordt? Dan kan iets vroeger ook geen kwaad."

Vraag: "Mijn kind heeft constant driftbuien, ik weet het niet meer"
Antwoord: "Pfff, dat is pittig. Driftbuien zijn eigenlijk gewoon onhandige emotieregulatie, niks dat jij verkeerd doet. Wat vaak helpt is zelf rustig blijven en het gevoel even benoemen zonder het meteen op te lossen, meestal waait het binnen een paar minuten weer over."

Vraag: "Tips voor zindelijk worden?"
Antwoord: "Wacht tot je kind er zelf interesse in toont, dat werkt vaak beter dan forceren. Een vast potjemoment na het eten helpt, en vier het gewoon even als het lukt. Een ongelukje is heel normaal, dus maak je daar niet te druk om."

${childName ? `Het kind heet ${childName}, gebruik die naam af en toe.` : ""}
${childAge ? `Het kind is ${childAge} jaar.` : ""}

Spreek Nederlands tenzij de ouder Engels schrijft.`;
};

// ── LOGO ───────────────────────────────────────────────────────────────────
const LogoSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF7A45"/>
        <stop offset="100%" stopColor="#FF4500"/>
      </linearGradient>
    </defs>
    <circle cx="95" cy="95" r="95" fill="url(#bgG)"/>
    <circle cx="95" cy="95" r="88" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
    <circle cx="68" cy="42" r="16" fill="white"/>
    <line x1="68" y1="58" x2="68" y2="115" stroke="white" strokeWidth="13" strokeLinecap="round"/>
    <line x1="68" y1="115" x2="52" y2="158" stroke="white" strokeWidth="11" strokeLinecap="round"/>
    <line x1="68" y1="115" x2="84" y2="158" stroke="white" strokeWidth="11" strokeLinecap="round"/>
    <line x1="68" y1="78" x2="108" y2="95" stroke="white" strokeWidth="11" strokeLinecap="round"/>
    <line x1="68" y1="78" x2="42" y2="90" stroke="white" strokeWidth="11" strokeLinecap="round"/>
    <circle cx="128" cy="60" r="11" fill="white" opacity="0.9"/>
    <line x1="128" y1="71" x2="128" y2="108" stroke="white" strokeWidth="9" strokeLinecap="round" opacity="0.9"/>
    <line x1="128" y1="108" x2="116" y2="145" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
    <line x1="128" y1="108" x2="140" y2="145" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
    <line x1="128" y1="82" x2="108" y2="95" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
    <line x1="128" y1="82" x2="148" y2="68" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
    <circle cx="108" cy="95" r="6" fill="white"/>
    <path d="M128 44 C128 44 123 38 123 35 C123 32 125 31 128 35 C131 31 133 32 133 35 C133 38 128 44 128 44Z" fill="white" opacity="0.75"/>
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

// ── LOGIN ──────────────────────────────────────────────────────────────────
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
    } catch { alert("Something went wrong!"); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 999 }}>
      <div style={{ background: "#fff", borderRadius: "28px", padding: "36px 28px", maxWidth: "380px", width: "100%", textAlign: "center", fontFamily: "'Nunito', sans-serif" }}>
        <LogoSVG size={64} />
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "24px", color: "#1A1A2E", margin: "12px 0 8px" }}>{t.upgrade_title}</h2>
        <p style={{ color: "#666", fontSize: "14px", margin: "0 0 20px", lineHeight: 1.6 }}>{t.upgrade_sub}</p>
        <div style={{ background: "#FFF8F0", borderRadius: "16px", padding: "16px", marginBottom: "20px", textAlign: "left" }}>
          {t.upgrade_features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#444", padding: "5px 0", fontWeight: "600" }}>
              <IconStar /> {f}
            </div>
          ))}
        </div>
        <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF5A10)", borderRadius: "16px", padding: "16px", marginBottom: "20px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "32px", color: "#fff", fontWeight: "700" }}>€3,99</div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px" }}>{t.upgrade_per_month}</div>
        </div>
        {!user && <div style={{ background: "#FFF0E8", borderRadius: "12px", padding: "10px", fontSize: "13px", color: "#FF6B35", fontWeight: "700", marginBottom: "16px" }}>{t.login_first}</div>}
        <button style={{ width: "100%", padding: "15px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Fredoka', sans-serif", fontWeight: "600", fontSize: "18px", cursor: "pointer", marginBottom: "10px", opacity: loading ? 0.6 : 1 }} onClick={handleCheckout} disabled={loading}>
          {loading ? t.upgrade_loading : !user ? t.login_btn : t.upgrade_btn}
        </button>
        <button style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "13px", fontFamily: "'Nunito', sans-serif" }} onClick={onClose}>{t.upgrade_close}</button>
      </div>
    </div>
  );
};

// ── POLL ───────────────────────────────────────────────────────────────────
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
              {voted === i ? "✓ " : ""}{opt}
            </button>
          ))}
        </div>
        {voted !== null && <p style={{ fontSize: "12px", color: "#aaa", marginTop: "10px", textAlign: "center" }}>{t.poll_thanks}</p>}
      </div>
    </div>
  );
};

// ── ZINDELIJKHEID TRACKER — HELE MAAND ────────────────────────────────────
const ZindelijkheidTracker = ({ t }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const [days, setDays] = useState(() => {
    const d = {};
    for (let i = 1; i <= daysInMonth; i++) {
      d[i] = null;
    }
    return d;
  });

  const toggle = (day, status) => setDays(prev => ({ ...prev, [day]: prev[day] === status ? null : status }));
  const droogDagen = Object.values(days).filter(v => v === "droog").length;
  const maandNamen = { nl: ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"], en: ["January","February","March","April","May","June","July","August","September","October","November","December"] };
  const lang = t === T.en ? "en" : "nl";

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}><IconPotty /></div>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>{t.tracker_title}</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{t.tracker_sub}</p>
      </div>

      <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)", borderRadius: "16px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "32px", fontFamily: "'Fredoka', sans-serif", color: "#fff", fontWeight: "700" }}>{droogDagen}</div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>{t.tracker_days}</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", marginTop: "4px" }}>{maandNamen[lang][month]} {year}</div>
      </div>

      {/* Dag headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "6px" }}>
        {t.days_short.map(d => <div key={d} style={{ textAlign: "center", fontSize: "10px", fontWeight: "800", color: "#aaa" }}>{d}</div>)}
      </div>

      {/* Lege vakjes voor offset */}
      {(() => {
        const firstDay = new Date(year, month, 1).getDay();
        const offset = firstDay === 0 ? 6 : firstDay - 1;
        const cells = [];
        for (let i = 0; i < offset; i++) cells.push(<div key={`empty-${i}`} />);
        for (let day = 1; day <= daysInMonth; day++) {
          const isToday = day === today.getDate();
          cells.push(
            <button key={day} onClick={() => toggle(day, days[day] === "droog" ? "ongelukje" : days[day] === "ongelukje" ? null : "droog")}
              style={{ aspectRatio: "1", borderRadius: "8px", border: "2px solid", borderColor: days[day] === "droog" ? "#4CAF50" : days[day] === "ongelukje" ? "#2196F3" : isToday ? "#FF6B35" : "#F0E4D4", background: days[day] === "droog" ? "#E8F5E9" : days[day] === "ongelukje" ? "#E3F2FD" : "#fff", fontSize: "11px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', sans-serif", fontWeight: isToday ? "900" : "600", color: "#444", gap: "1px" }}>
              <span style={{ fontSize: "10px" }}>{day}</span>
              <span style={{ fontSize: "10px" }}>{days[day] === "droog" ? "✓" : days[day] === "ongelukje" ? "~" : ""}</span>
            </button>
          );
        }
        return <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "16px" }}>{cells}</div>;
      })()}

      <div style={{ background: "#FFF0E8", borderRadius: "14px", padding: "14px", fontSize: "12px", color: "#FF6B35", fontWeight: "700", textAlign: "center" }}>
        ✓ Droog &nbsp;|&nbsp; ~ Ongelukje &nbsp;|&nbsp; Leeg = tik om in te vullen
      </div>
    </div>
  );
};

// ── TIPS PAGINA — ALLE LEEFTIJDEN, 2x2 GRID, UITKLAPBAAR ────────────────
const TipsPage = ({ childAge, lang, t, onChat }) => {
  const [openTip, setOpenTip] = useState(null);
  const tips = AGE_TIPS[lang] || AGE_TIPS.nl;

  // Alle leeftijdscategorien tonen
  const allAges = Object.entries(tips);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 16px" }}>
        {t.tips_title} {childAge ? `${childAge} ${t.tips_suffix}` : t.tips_all}
      </h2>

      {allAges.map(([age, ageTips]) => (
        <div key={age} style={{ marginBottom: "24px" }}>
          {/* Leeftijdslabel */}
          <div style={{ fontSize: "12px", fontWeight: "800", color: "#FF8C5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px", padding: "6px 12px", background: "#FFF0E8", borderRadius: "50px", display: "inline-block" }}>
            {age} {t.tips_suffix}
          </div>

          {/* 2x2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {ageTips.map((item, i) => {
              const key = `${age}-${i}`;
              const isOpen = openTip === key;
              return (
                <div key={key} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: `1.5px solid ${isOpen ? "#FF6B35" : "#F0E4D4"}`, boxShadow: isOpen ? "0 4px 16px rgba(255,90,16,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.2s", gridColumn: isOpen ? "1 / -1" : "auto" }}>
                  {/* Kaart header */}
                  <button onClick={() => setOpenTip(isOpen ? null : key)}
                    style={{ width: "100%", padding: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: isOpen ? "#FF6B35" : "#FFF0E8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                        <div style={{ filter: isOpen ? "brightness(0) invert(1)" : "none" }}>{item.icon}</div>
                      </div>
                      <span style={{ fontWeight: "800", fontSize: "13px", color: "#1A1A2E", textAlign: "left", lineHeight: 1.3 }}>{item.tip}</span>
                    </div>
                    <span style={{ color: "#FF6B35", fontSize: "16px", fontWeight: "700", flexShrink: 0, marginLeft: "8px" }}>{isOpen ? "−" : "+"}</span>
                  </button>

                  {/* Uitklapbare content */}
                  {isOpen && (
                    <div style={{ padding: "0 14px 14px" }}>
                      <div style={{ background: "#FFF8F0", borderRadius: "12px", padding: "12px", marginBottom: "10px" }}>
                        {item.tips.map((tip, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "6px 0", borderBottom: j < item.tips.length - 1 ? "1px solid #F0E4D4" : "none" }}>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#FF6B35", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800", flexShrink: 0, marginTop: "1px" }}>{j + 1}</div>
                            <span style={{ fontSize: "13px", color: "#444", lineHeight: 1.5, fontWeight: "600" }}>{tip}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => onChat(item.vraag)}
                        style={{ width: "100%", padding: "10px", borderRadius: "12px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <IconChat /> {t.tips_chat_btn}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── TANDJES KAART ─────────────────────────────────────────────────────────
const TandjesKaart = ({ t }) => {
  const [tandjes, setTandjes] = useState({});
  const toggle = (id) => setTandjes(prev => ({ ...prev, [id]: !prev[id] }));
  const totaal = Object.values(tandjes).filter(Boolean).length;
  const bovenTandjes = ["b1","b2","b3","b4","b5","b6","b7","b8","b9","b10"].map((id, i) => ({ id, naam: i < 4 ? "Snijtand" : i < 6 ? "Hoektand" : "Kies" }));
  const onderTandjes = ["o1","o2","o3","o4","o5","o6","o7","o8","o9","o10"].map((id, i) => ({ id, naam: i < 4 ? "Snijtand" : i < 6 ? "Hoektand" : "Kies" }));
  const TandRij = ({ items, label }) => (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px", textAlign: "center" }}>{label}</div>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
        {items.map(tooth => (
          <button key={tooth.id} onClick={() => toggle(tooth.id)} title={tooth.naam}
            style={{ width: "32px", height: "38px", borderRadius: "6px 6px 10px 10px", border: "2px solid", borderColor: tandjes[tooth.id] ? "#FF6B35" : "#E5D5C5", background: tandjes[tooth.id] ? "#FF6B35" : "#fff", cursor: "pointer" }} />
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>{t.teeth_title}</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{t.teeth_sub}</p>
      </div>
      <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)", borderRadius: "16px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "28px", fontFamily: "'Fredoka', sans-serif", color: "#fff", fontWeight: "700" }}>{totaal} / 20</div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>{t.teeth_count}</div>
      </div>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "20px" }}>
        <TandRij items={bovenTandjes} label={t.teeth_upper} />
        <div style={{ height: "1px", background: "#F0E4D4", margin: "8px 0 16px" }} />
        <TandRij items={onderTandjes} label={t.teeth_lower} />
      </div>
      <div style={{ background: "#FFF0E8", borderRadius: "14px", padding: "12px", marginTop: "16px", fontSize: "12px", color: "#FF6B35", textAlign: "center", fontWeight: "700" }}>
        Oranje = doorgekomen
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
      await supabase.from("conversations").upsert({ user_id: uid, messages: JSON.stringify(msgs), child_name: childName, child_age: childAge, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    } catch (e) { console.error("Save error:", e); }
  };

  const loadConversation = async (uid) => {
    if (!uid) return;
    try {
      const { data } = await supabase.from("conversations").select("*").eq("user_id", uid).order("updated_at", { ascending: false }).limit(1).single();
      if (data?.messages) { setMessages(JSON.parse(data.messages)); if (data.child_name) setChildName(data.child_name); if (data.child_age) setChildAge(data.child_age); }
    } catch (e) { console.error("Load error:", e); }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("premium") === "true") { setIsPremium(true); window.history.replaceState({}, "", "/"); }
    supabase.auth.getSession().then(({ data: { session } }) => { if (session?.user) { setUser(session.user); loadConversation(session.user.id); } });
    supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user || null); if (session?.user) loadConversation(session.user.id); });
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const remaining = Math.max(0, FREE_LIMIT - questionsUsed);

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
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Oeps, er ging iets mis. Probeer het nog eens!" }]); }
    setLoading(false);
  };

  const handleChatFromTips = (vraag) => { setActiveTab("chat"); setTimeout(() => sendMessage(vraag), 100); };
  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); };

  // ── ONBOARDING ──
  if (screen === "onboarding") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F0 0%, #FFE8D6 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', sans-serif", padding: "20px", flexDirection: "column" }}>
      {/* Login knop rechtsboven */}
      <div style={{ position: "fixed", top: "16px", right: "20px", zIndex: 10 }}>
        <button onClick={() => setShowLogin(true)} style={{ background: "#fff", color: "#FF6B35", border: "1.5px solid rgba(255,107,53,0.3)", padding: "8px 16px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "13px", cursor: "pointer", boxShadow: "0 2px 12px rgba(255,90,16,0.15)", display: "flex", alignItems: "center", gap: "6px" }}>
          <IconLogin /> {t.login_btn}
        </button>
      </div>
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
        <button style={{ background: "none", border: "none", color: "#FF6B35", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", margin: "0 auto" }} onClick={() => setShowLogin(true)}>
          <IconLogin /> {t.login_link}
        </button>
      </div>
      {showLogin && <LoginScreen t={t} onClose={() => setShowLogin(false)} onSuccess={() => { setShowLogin(false); setScreen("app"); }} />}
    </div>
  );

  // ── MAIN ──
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "680px", margin: "0 auto", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif" }}>
      {showUpgrade && <UpgradeModal t={t} user={user} setShowLogin={setShowLogin} onClose={() => setShowUpgrade(false)} />}
      {showLogin && <LoginScreen t={t} onClose={() => setShowLogin(false)} onSuccess={() => setShowLogin(false)} />}

      {/* Header */}
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
          {user
            ? <button onClick={handleLogout} style={{ background: "#FFF0E8", color: "#FF6B35", border: "1.5px solid rgba(255,107,53,0.2)", padding: "5px 12px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}><IconLogin />{t.logout_btn}</button>
            : <button onClick={() => setShowLogin(true)} style={{ background: "#FFF0E8", color: "#FF6B35", border: "1.5px solid rgba(255,107,53,0.2)", padding: "5px 12px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}><IconLogin />{t.login_btn}</button>
          }
          {!isPremium
            ? <button style={{ background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "50px", fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }} onClick={() => setShowUpgrade(true)}><IconStar />{t.premium_btn}</button>
            : <div style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#fff", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "900", boxShadow: "0 0 12px rgba(255,165,0,0.6)", animation: "premiumPulse 2s ease-in-out infinite", display: "flex", alignItems: "center", gap: "4px" }}><IconStar />{t.premium_badge}</div>
          }
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #F0E4D4", padding: "0 16px", overflowX: "auto" }}>
        {[
          { id: "chat", label: t.chat_tab, icon: <IconChat /> },
          { id: "tips", label: t.tips_tab, icon: <IconBook /> },
          { id: "tracker", label: t.tracker_tab, icon: <IconPotty />, premium: true },
          { id: "tandjes", label: t.teeth_tab, icon: null, premium: true },
        ].map(tab => (
          <button key={tab.id} onClick={() => { if (tab.premium && !isPremium) { setShowUpgrade(true); return; } setActiveTab(tab.id); }}
            style={{ padding: "12px 10px", border: "none", background: "none", borderBottom: `2px solid ${activeTab === tab.id ? "#FF6B35" : "transparent"}`, color: activeTab === tab.id ? "#FF6B35" : "#aaa", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, display: "flex", alignItems: "center", gap: "5px" }}>
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
                  {t.help_title}{childName ? `, ${childName.split(" ")[0]}` : ""}?
                </p>
                <p style={{ color: "#aaa", fontSize: "13px", margin: "0 0 20px" }}>{t.help_sub}</p>
                {childAge && (
                  <div style={{ width: "100%", maxWidth: "480px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "800", color: "#FF8C5A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>{t.age_tips_label} {childAge} {t.age_tips_suffix}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {(AGE_TIPS[lang][childAge] || AGE_TIPS[lang]["2–4"]).map((tip, i) => (
                        <button key={i} onClick={() => sendMessage(tip.vraag)} style={{ padding: "12px 14px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#fff", color: "#333", fontFamily: "'Nunito', sans-serif", fontWeight: "600", fontSize: "13px", textAlign: "left", cursor: "pointer", lineHeight: 1.4, display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ flexShrink: 0 }}>{tip.icon}</div>
                          <span>{tip.tip}</span>
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
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LogoSVG size={32} />
                <div style={{ background: "#fff", padding: "14px 20px", borderRadius: "20px", borderTopLeftRadius: "4px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <span style={{ color: "#FF6B35", fontSize: "18px", letterSpacing: "4px" }}>. . .</span>
                </div>
              </div>
            )}
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

      {activeTab === "tips" && <TipsPage childAge={childAge} lang={lang} t={t} onChat={handleChatFromTips} />}
      {activeTab === "tracker" && <ZindelijkheidTracker t={t} />}
      {activeTab === "tandjes" && <TandjesKaart t={t} />}

      <div style={{ textAlign: "center", fontSize: "10px", color: "#CCC", padding: "5px 20px 8px", background: "#fff" }}>{t.disclaimer}</div>
    </div>
  );
}
