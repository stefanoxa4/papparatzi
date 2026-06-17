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
styleEl.textContent = `@keyframes premiumPulse { 0%, 100% { box-shadow: 0 0 12px rgba(255,165,0,0.6); transform: scale(1); } 50% { box-shadow: 0 0 22px rgba(255,165,0,0.9); transform: scale(1.05); } } @keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }`;
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
    onboarding_text: "Stel al je opvoedvragen, dag en nacht, zonder oordeel. Jij doet het goed.",
    child_name_label: "Naam van je kind (optioneel)",
    child_name_placeholder: "bijv. Noah",
    age_label: "Leeftijd",
    free_notice: "5 vragen gratis, geen account nodig",
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
    logged_in_msg: "Je bent ingelogd, je gesprekken worden bewaard!",
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
    login_skip: "Overslaan (gebruik zonder account)",
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
    feedback_btn: "Feedback",
    feedback_title: "Deel je feedback",
    feedback_placeholder: "Wat vind je van Papparatzi? Wat kan beter?",
    feedback_send: "Versturen",
    feedback_thanks: "Bedankt voor je feedback!",
    forgot_password: "Wachtwoord vergeten?",
    forgot_password_sub: "Vul je e-mailadres in, we sturen een herstellink.",
    forgot_password_sent: "Check je inbox, we hebben een herstellink gestuurd!",
    coach_typing: "is aan het typen",
    lengte_title: "Lengte",
    lengte_sub: "Houd de lengte bij en bekijk het verloop",
    gewicht_title: "Gewicht",
    gewicht_sub: "Houd het gewicht bij en bekijk het verloop",
    growth_curve_title: "Officiële groeicurve",
    growth_curve_sub: "Vergelijk met de groeicurve via GroeiGids of Mijn CJG",
    menu_profile: "Profiel",
    instagram_label: "Volg ons op Instagram",
    tracker_chat_btn: "Stel een vraag hierover",
    milestone_first_smile: "Eerste lach",
    milestone_roll: "Zelfstandig omrollen",
    milestone_sit: "Zelfstandig zitten",
    milestone_crawl_tiger: "Tijgeren",
    milestone_crawl: "Kruipen",
    teeth_tip_title: "Tips voor melktandjes",
    dashboard_tab: "Vandaag",
    voortgang_tab: "Voortgang",
    dashboard_greeting: "Hoi",
    dashboard_tip_label: "TIP VAN DE DAG",
    dashboard_overview: "Jouw overzicht",
    dashboard_premium_teaser_title: "Ontgrendel je groeiboek",
    dashboard_premium_teaser_text: "Groeitracker, mijlpalen, vaccinatieschema en meer met Premium.",
    dashboard_no_data: "Nog geen data",
    voortgang_title: "Voortgang",
    groei_title: "Groeitracker",
    groei_sub: "Houd lengte en gewicht bij",
    groei_length: "Lengte (cm)",
    groei_weight: "Gewicht (kg)",
    groei_add: "Toevoegen",
    groei_empty: "Nog geen metingen toegevoegd",
    groei_history: "Geschiedenis",
    milestones_title: "Mijlpalen",
    milestones_sub: "Leg de mooiste momenten vast",
    milestone_first_word: "Eerste woordje",
    milestone_first_steps: "Eerste stapjes",
    milestone_first_tooth: "Eerste tandje",
    milestone_first_bite: "Eerste hapje",
    milestone_word_placeholder: "Welk woordje was het?",
    vaccinations_title: "Vaccinatieschema",
    vaccinations_sub: "Gebaseerd op het Rijksvaccinatieprogramma",
    vaccinations_progress: "afgevinkt",
    vaccinations_disclaimer: "Algemeen overzicht. De GGD-uitnodiging bepaalt de exacte planning.",
  },
  en: {
    tagline: "Your Digital Parenting Buddy",
    onboarding_sub: "Your Digital Parenting Buddy",
    onboarding_text: "Ask all your parenting questions, day or night, without judgment. You're doing great.",
    child_name_label: "Your child's name (optional)",
    child_name_placeholder: "e.g. Noah",
    age_label: "Age",
    free_notice: "5 questions free, no account needed",
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
    logged_in_msg: "You are logged in, your conversations are saved!",
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
    login_skip: "Skip (use without account)",
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
    feedback_btn: "Feedback",
    feedback_title: "Share your feedback",
    feedback_placeholder: "What do you think of Papparatzi? What could be better?",
    feedback_send: "Send",
    feedback_thanks: "Thanks for your feedback!",
    forgot_password: "Forgot your password?",
    forgot_password_sub: "Enter your email and we'll send a reset link.",
    forgot_password_sent: "Check your inbox, we sent a reset link!",
    coach_typing: "is typing",
    lengte_title: "Height",
    lengte_sub: "Track height and view the trend",
    gewicht_title: "Weight",
    gewicht_sub: "Track weight and view the trend",
    growth_curve_title: "Official growth chart",
    growth_curve_sub: "Compare with the growth chart via GroeiGids or your local youth health service",
    menu_profile: "Profile",
    instagram_label: "Follow us on Instagram",
    tracker_chat_btn: "Ask a question about this",
    milestone_first_smile: "First smile",
    milestone_roll: "Rolling over independently",
    milestone_sit: "Sitting up independently",
    milestone_crawl_tiger: "Commando crawling",
    milestone_crawl: "Crawling",
    teeth_tip_title: "Tips for baby teeth",
    dashboard_tab: "Today",
    voortgang_tab: "Progress",
    dashboard_greeting: "Hi",
    dashboard_tip_label: "TIP OF THE DAY",
    dashboard_overview: "Your overview",
    dashboard_premium_teaser_title: "Unlock the full picture",
    dashboard_premium_teaser_text: "Growth tracker, milestones, vaccination schedule and more with Premium.",
    dashboard_no_data: "No data yet",
    voortgang_title: "Progress",
    groei_title: "Growth tracker",
    groei_sub: "Track height and weight",
    groei_length: "Height (cm)",
    groei_weight: "Weight (kg)",
    groei_add: "Add",
    groei_empty: "No measurements added yet",
    groei_history: "History",
    milestones_title: "Milestones",
    milestones_sub: "Capture the special moments",
    milestone_first_word: "First word",
    milestone_first_steps: "First steps",
    milestone_first_tooth: "First tooth",
    milestone_first_bite: "First bite of food",
    milestone_word_placeholder: "What was the word?",
    vaccinations_title: "Vaccination schedule",
    vaccinations_sub: "Based on the Dutch national immunisation programme",
    vaccinations_progress: "checked off",
    vaccinations_disclaimer: "General overview. Your local health service determines the exact schedule.",
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
const IconHome = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"/></svg>;
const IconProgress = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><rect x="7" y="13" width="3" height="5"/><rect x="12" y="9" width="3" height="9"/><rect x="17" y="5" width="3" height="13"/></svg>;
const IconTooth = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.5 2 5 4.5 5 8.5c0 2 .5 3.5 1.2 5C7 15.5 7.5 18 8 21c.2 1 1.6 1 2-.2.4-1.5.8-3.8 2-3.8s1.6 2.3 2 3.8c.4 1.2 1.8 1.2 2 .2.5-3 1-5.5 1.8-7.5.7-1.5 1.2-3 1.2-5C19 4.5 15.5 2 12 2z"/></svg>;
const IconGrowth = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>;
const IconMilestone = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4"/><path d="M5 4h13l-3 4 3 4H5"/></svg>;
const IconVaccine = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M12 8v6M9 11h6"/></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>;
const IconExternal = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IconMenu = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconInstagram = ({ size = 22, color = "#E1306C" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill={color}/>
  </svg>
);

// ── AGE TIPS WITH CONCRETE CONTENT ────────────────────────────────────────
const AGE_TIPS = {
  nl: {
    "0–1": [
      { icon: <IconBed/>, tip: "Slaapritme opbouwen", vraag: "Hoe bouw ik een slaapritme op?", tips: ["Leg je baby elke avond op dezelfde tijd in bed", "Gebruik vaste rituelen: bad, voeding, liedje", "Leg je baby slaperig maar nog wakker neer", "Houd de kamer donker en stil tijdens de nacht"] },
      { icon: <IconBottle/>, tip: "Voeding & borstvoeding", vraag: "Wat zijn tips voor de voeding van mijn baby?", tips: ["Geef borstvoeding op verzoek, elke 2-3 uur", "Let op verzadigingssignalen: hoofd wegdraaien, vuistjes ontspannen", "Bij flesvoeding: schud de fles goed en test de temperatuur", "Boeren na elke voeding voorkomt krampen"] },
      { icon: <IconCry/>, tip: "Waarom huilt mijn baby?", vraag: "Waarom huilt mijn baby zo veel?", tips: ["Controleer op volgorde: honger, luier, moe, pijn", "Wikkelen in een doek geeft geborgenheid", "Zachte witte ruis kalmeert veel baby's", "Overprikkeling is een veelvoorkomende oorzaak bij 's avonds huilen"] },
      { icon: <IconToy/>, tip: "Zintuiglijke ontwikkeling", vraag: "Hoe stimuleer ik de zintuigen van mijn baby?", tips: ["Praat en zing veel, elk geluid stimuleert de hersenen", "Laat je baby op zijn buik liggen (tummy time) elke dag", "Gebruik speelgoed met contrasterende kleuren", "Huidcontact draagt bij aan emotionele veiligheid"] },
    ],
    "1–2": [
      { icon: <IconWalk/>, tip: "Eerste stapjes", vraag: "Mijn kind begint te lopen, wat moet ik weten?", tips: ["Loopschoenen zijn niet nodig, blote voeten is het beste", "Laat je kind op eigen tempo ontdekken", "Eerste stappen tussen 9-15 maanden is normaal", "Gebruik loopwagens met weerstand, niet zonder remmen"] },
      { icon: <IconSpeech/>, tip: "Taalontwikkeling", vraag: "Hoe stimuleer ik de taalontwikkeling?", tips: ["Benoem alles wat je doet: 'Nu trek ik je jas aan'", "Lees elke dag voor, ook korte boekjes", "Reageer altijd op brabbelen en woordjes", "Beperk schermtijd, echt contact stimuleert taal"] },
      { icon: <IconAngry/>, tip: "Driftbuien aanpakken", vraag: "Mijn kind van 1 heeft driftbuien, hoe ga ik daarmee om?", tips: ["Blijf rustig, jouw rust kalmeert je kind", "Geef het gevoel een naam: 'Je bent boos, dat snap ik'", "Zorg voor veiligheid maar geef geen aandacht aan het gedrag", "Een driftbui duurt gemiddeld 3 minuten, het gaat over"] },
      { icon: <IconFood/>, tip: "Gezond eten", vraag: "Wat zijn gezonde snacks voor mijn kind van 1?", tips: ["Kleine stukjes fruit, groente en kaas zijn ideaal", "Vermijd toegevoegd suiker en zout tot 2 jaar", "Laat je kind zelf eten, ook al is het rommelig", "Bied nieuwe smaken 10-15 keer aan voor je opgeeft"] },
    ],
    "2–4": [
      { icon: <IconPotty/>, tip: "Zindelijk worden", vraag: "Hoe help ik mijn kind zindelijk te worden?", tips: ["Wacht tot je kind zelf interesse toont, forceer nooit", "Gebruik een vaste potty routine na eten en voor bed", "Maak het positief, vier elk succesje", "Ongelukjes zijn normaal, reageer nooit boos"] },
      { icon: <IconAngry/>, tip: "Driftbuien aanpakken", vraag: "Hoe ga ik om met driftbuien?", tips: ["Voorkom triggers: vermijd overkwalificatie en oeverloze keuzes", "Geef beperkte keuzes: 'Wil je de rode of de blauwe?'", "Negeer veilig gedrag, geef aandacht na de bui", "Houd vast aan grenzen, wees consequent"] },
      { icon: <IconBed/>, tip: "Middagdutje afbouwen", vraag: "Mijn kind wil niet meer slapen overdag, wat nu?", tips: ["Tussen 2-4 jaar stoppen de meeste kinderen met dutjes", "Rusttijd is nog steeds waardevol, boek of rustig spel", "Vervroeg de bedtijd als het dutje wegvalt", "Tekenen van moeheid overdag: clownesk gedrag, huilbuien"] },
      { icon: <IconToy/>, tip: "Samen spelen", vraag: "Hoe leer ik mijn kind samen te spelen?", tips: ["Parallelspel is normaal tot 3 jaar, samen spelen komt later", "Benoem emoties van andere kinderen: 'Kijk, Noa huilt'", "Oefen thuis met beurten nemen", "Straf nooit bij niet-delen, leer het in kleine stapjes"] },
    ],
    "4–6": [
      { icon: <IconBag/>, tip: "Klaar voor school?", vraag: "Hoe weet ik of mijn kind klaar is voor school?", tips: ["Emotionele rijpheid telt meer dan cognitieve vaardigheden", "Kan je kind 15-20 min gefocust spelen?", "Laat je kind oefenen met zelfstandigheid: jas aantrekken, eten", "Een intakegesprek met de leerkracht geeft veel inzicht"] },
      { icon: <IconBook/>, tip: "Leren lezen", vraag: "Hoe help ik mijn kind leren lezen?", tips: ["Lees elke dag voor, maak er een ritueel van", "Wijs woorden aan op straat, in de supermarkt", "Letters op magneten aan de koelkast werkt goed", "Overdrijf niet, ongezonde druk werkt averechts"] },
      { icon: <IconSad/>, tip: "Scheidingsangst", vraag: "Mijn kind wil niet naar school, hoe ga ik daarmee om?", tips: ["Altijd kort en duidelijk afscheid nemen, nooit sluipen", "Zeg wanneer je terugkomt: 'Na het eten haal ik je op'", "Geef een knuffel of foto mee", "Als het langer dan 6 weken duurt, overleg met de school"] },
      { icon: <IconSpeech/>, tip: "Vriendjes maken", vraag: "Hoe help ik mijn kind vriendjes te maken?", tips: ["Oefen gesprekje starten: 'Mag ik meedoen?'", "Nodig een klasgenootje uit om thuis te spelen", "Bespreek na schooltijd hoe de dag was", "Forceer nooit, elk kind heeft zijn eigen tempo"] },
    ],
    "6–10": [
      { icon: <IconPhone/>, tip: "Schermtijd", vraag: "Hoeveel schermtijd is oké voor mijn kind?", tips: ["WHO adviseert max 1-2 uur per dag voor deze leeftijd", "Maak vaste schermvrije momenten: eten, voor bed", "Kijk regelmatig mee, weet wat je kind kijkt", "Hanteer een schermcontract samen met je kind"] },
      { icon: <IconSad/>, tip: "Pesten op school", vraag: "Mijn kind wordt gepest, wat kan ik doen?", tips: ["Neem je kind altijd serieus, bagatelliseer nooit", "Noteer concrete voorvallen met datum", "Informeer de leerkracht zo snel mogelijk", "Leer je kind assertieve reacties: rustig, recht aankijken, weglopen"] },
      { icon: <IconBook/>, tip: "Huiswerk motivatie", vraag: "Hoe motiveer ik mijn kind voor huiswerk?", tips: ["Vaste huiswerktijd werkt beter dan 'wanneer het uitkomt'", "Zorg voor een rustige werkplek zonder afleiding", "Help niet te snel, laat je kind zelf worstelen", "Beloon inzet, niet alleen het resultaat"] },
      { icon: <IconBed/>, tip: "Slaaptijd", vraag: "Hoe laat moet mijn kind van 8 naar bed?", tips: ["Kinderen van 6-12 jaar hebben 9-11 uur slaap nodig", "Bedtijd tussen 19:30-20:30 is ideaal voor schoolgaande kinderen", "Schermen uit minimaal 1 uur voor bed", "Vaste routine: douchen, lezen, licht uit"] },
    ],
    "10+": [
      { icon: <IconPhone/>, tip: "Eerste telefoon", vraag: "Wanneer geef ik mijn kind een telefoon?", tips: ["Gemiddelde leeftijd is 11-12 jaar, maar behoefte verschilt", "Maak duidelijke afspraken voor je de telefoon geeft", "Gebruik ouderlijk toezicht apps in het begin", "Bespreek sociale media gevaren eerlijk en open"] },
      { icon: <IconHeart/>, tip: "Praten over puberteit", vraag: "Hoe praat ik met mijn kind over puberteit?", tips: ["Begin vroeg, rond 8-9 jaar voor meisjes, 9-10 voor jongens", "Gebruik correcte anatomische termen", "Maak het normaal, 'Iedereen maakt dit mee'", "Wees beschikbaar voor vragen, ook op onhandige momenten"] },
      { icon: <IconGame/>, tip: "Gamen en grenzen", vraag: "Hoeveel gamen is oké voor mijn kind?", tips: ["Max 1-2 uur op schooldagen, meer mag in het weekend", "Kijk naar de leeftijdsclassificatie van games (PEGI)", "Speel soms mee, het geeft inzicht én verbinding", "Online gaming: leer je kind nooit persoonlijke info te delen"] },
      { icon: <IconAngry/>, tip: "Tienergedrag", vraag: "Mijn kind is brutaal geworden, hoe ga ik daarmee om?", tips: ["Grensverleggen is normaal en gezond in de puberteit", "Reageer niet op boosheid met boosheid", "Kies je gevechten, niet alles hoeft een discussie te zijn", "Behoud verbinding, blijf vragen hoe het gaat"] },
    ],
  },
  en: {
    "0–1": [
      { icon: <IconBed/>, tip: "Building a sleep schedule", vraag: "How do I build a sleep schedule?", tips: ["Put your baby to bed at the same time every evening", "Use consistent routines: bath, feed, song", "Put your baby down drowsy but awake", "Keep the room dark and quiet at night"] },
      { icon: <IconBottle/>, tip: "Feeding tips", vraag: "What are feeding tips for my baby?", tips: ["Breastfeed on demand, every 2-3 hours", "Watch for fullness cues: turning head away, relaxed fists", "For bottle: shake well and test temperature", "Burp after every feed to prevent cramps"] },
      { icon: <IconCry/>, tip: "Why is my baby crying?", vraag: "Why does my baby cry so much?", tips: ["Check in order: hunger, diaper, tired, pain", "Swaddling provides a sense of security", "Soft white noise calms many babies", "Overstimulation is a common cause of evening crying"] },
      { icon: <IconToy/>, tip: "Sensory development", vraag: "How do I stimulate my baby's senses?", tips: ["Talk and sing a lot, every sound stimulates the brain", "Daily tummy time is essential for development", "Use toys with contrasting colors", "Skin contact contributes to emotional security"] },
    ],
    "2–4": [
      { icon: <IconPotty/>, tip: "Potty training", vraag: "How do I help with potty training?", tips: ["Wait until your child shows interest, never force it", "Use a consistent potty routine after meals and before bed", "Keep it positive, celebrate every success", "Accidents are normal, never react with anger"] },
      { icon: <IconAngry/>, tip: "Handling tantrums", vraag: "How do I deal with tantrums?", tips: ["Stay calm, your calm calms your child", "Name the feeling: 'You're angry, I understand'", "Ensure safety but don't give attention to the behavior", "A tantrum lasts about 3 minutes on average"] },
      { icon: <IconBed/>, tip: "Dropping naps", vraag: "My child doesn't want to nap anymore, what now?", tips: ["Most children stop napping between 2-4 years", "Rest time is still valuable, book or quiet play", "Move bedtime earlier when nap drops", "Signs of tiredness: clown-like behavior, crying spells"] },
      { icon: <IconToy/>, tip: "Playing with others", vraag: "How do I teach my child to play with others?", tips: ["Parallel play is normal until age 3", "Name other children's emotions: 'Look, Emma is crying'", "Practice taking turns at home", "Never punish for not sharing, teach in small steps"] },
    ],
  }
};

const WIST_JE_DAT = {
  nl: ["Baby's herkennen de stem van hun moeder al vóór de geboorte!", "Kinderen tussen 2-3 jaar leren gemiddeld 9 nieuwe woorden per dag!", "Een peuter die 'nee' zegt oefent zijn zelfstandigheid. Goed bezig!", "Knuffelen maakt oxytocine aan, het gelukshormoon voor jou én je kind!", "Kinderen die buiten spelen slapen 's nachts gemiddeld beter.", "Zingen met je baby stimuleert de taalontwikkeling meer dan praten!", "Een driftbui duurt gemiddeld maar 3 minuten. Het voelt langer!", "Baby's kunnen al vanaf 6 weken sociaal lachen!"],
  en: ["Babies recognize their mother's voice before they're even born!", "Children between 2-3 learn an average of 9 new words per day!", "A toddler saying 'no' is actually practicing independence!", "Hugging releases oxytocin, the happiness hormone for you and your child!", "Children who play outside sleep better at night on average.", "Singing to your baby stimulates language more than talking!", "A tantrum lasts on average only 3 minutes. It feels longer!", "Babies can smile socially as early as 6 weeks!"]
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

// ── VACCINATIESCHEMA - gebaseerd op RVP 2026 (geboorte t/m 14 jaar) ────────
const VACCINATIE_SCHEMA = {
  nl: [
    { id: "v1", leeftijd: "Rond de geboorte", naam: "RS-virusprik (RSV)", url: "https://www.ggd.nl/themas/rsv-vaccinatie" },
    { id: "v2", leeftijd: "6 - 9 weken", naam: "Rotavirus, 1e dosis", url: "https://www.rivm.nl/rotavirus" },
    { id: "v3", leeftijd: "3 maanden", naam: "DKTP-Hib-HepB, Pneumokokken en Rotavirus (2e dosis)", url: "https://www.rivm.nl/dktp-hib-hepb" },
    { id: "v4", leeftijd: "5 maanden", naam: "DKTP-Hib-HepB en Pneumokokken, 2e dosis", url: "https://www.rivm.nl/pneumokokken" },
    { id: "v5", leeftijd: "11 maanden", naam: "DKTP-Hib-HepB en Pneumokokken, 3e dosis", url: "https://www.rivm.nl/dktp-hib-hepb" },
    { id: "v6", leeftijd: "14 maanden", naam: "BMR (1e dosis) en MenACWY", url: "https://www.rivm.nl/bmr-vaccin" },
    { id: "v7", leeftijd: "Rond 3 jaar", naam: "BMR, 2e dosis", url: "https://www.rivm.nl/bmr-vaccin" },
    { id: "v8", leeftijd: "Rond 5 - 6 jaar", naam: "DKT-booster", url: "https://www.rivm.nl/dktp" },
    { id: "v9", leeftijd: "9 - 10 jaar", naam: "HPV, 1e en 2e dosis", url: "https://www.rivm.nl/hpv-vaccinatie" },
    { id: "v10", leeftijd: "14 jaar", naam: "MenACWY-booster", url: "https://www.rivm.nl/meningokokkenvaccinatie" },
  ],
  en: [
    { id: "v1", leeftijd: "Around birth", naam: "RSV vaccine", url: "https://www.rivm.nl/en/rsv-vaccination" },
    { id: "v2", leeftijd: "6 - 9 weeks", naam: "Rotavirus, 1st dose", url: "https://www.rivm.nl/en/rotavirus" },
    { id: "v3", leeftijd: "3 months", naam: "DKTP-Hib-HepB, Pneumococcal and Rotavirus (2nd dose)", url: "https://www.rivm.nl/en/dktp" },
    { id: "v4", leeftijd: "5 months", naam: "DKTP-Hib-HepB and Pneumococcal, 2nd dose", url: "https://www.rivm.nl/en/pneumococcal" },
    { id: "v5", leeftijd: "11 months", naam: "DKTP-Hib-HepB and Pneumococcal, 3rd dose", url: "https://www.rivm.nl/en/dktp" },
    { id: "v6", leeftijd: "14 months", naam: "MMR (1st dose) and MenACWY", url: "https://www.rivm.nl/en/mmr-vaccine" },
    { id: "v7", leeftijd: "Around 3 years", naam: "MMR, 2nd dose", url: "https://www.rivm.nl/en/mmr-vaccine" },
    { id: "v8", leeftijd: "Around 5 - 6 years", naam: "DKT booster", url: "https://www.rivm.nl/en/dktp" },
    { id: "v9", leeftijd: "9 - 10 years", naam: "HPV, 1st and 2nd dose", url: "https://www.rivm.nl/en/hpv-vaccination" },
    { id: "v10", leeftijd: "14 years", naam: "MenACWY booster", url: "https://www.rivm.nl/en/meningococcal-vaccination" },
  ]
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
// ── COACH NAMEN ────────────────────────────────────────────────────────────
const COACH_NAMEN = ["Luca", "Thiago", "Beau", "Lisa", "Marieke", "Kubra", "Angelina", "Fabienne"];
const getRandomCoach = () => COACH_NAMEN[Math.floor(Math.random() * COACH_NAMEN.length)];

// ── FEEDBACK MODAL + BUTTON ────────────────────────────────────────────────
const FeedbackButton = ({ t, compact = false }) => {
  const [open, setOpen] = useState(false);
  const [tekst, setTekst] = useState("");
  const [verstuurd, setVerstuurd] = useState(false);

  const verstuur = () => {
    if (!tekst.trim()) return;
    const bestaand = JSON.parse(localStorage.getItem("papparatzi_feedback") || "[]");
    bestaand.push({ tekst, ts: new Date().toISOString() });
    localStorage.setItem("papparatzi_feedback", JSON.stringify(bestaand));
    setVerstuurd(true);
    setTimeout(() => { setOpen(false); setVerstuurd(false); setTekst(""); }, 2000);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#CCC", fontFamily: "'Nunito', sans-serif", fontSize: compact ? "11px" : "12px", fontWeight: "700", padding: compact ? "2px 6px" : "4px 10px", borderRadius: "20px", display: "inline-flex", alignItems: "center", gap: "4px", opacity: 0.75, transition: "opacity 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
        onMouseLeave={e => e.currentTarget.style.opacity = "0.75"}>
        💬 {t.feedback_btn}
      </button>

      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, padding: "0 0 16px" }}>
          <div style={{ background: "#fff", borderRadius: "20px 20px 16px 16px", padding: "24px 20px 20px", width: "100%", maxWidth: "440px", fontFamily: "'Nunito', sans-serif", boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "18px", color: "#FF5A10" }}>{t.feedback_title}</span>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", fontSize: "22px", color: "#aaa", cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            {verstuurd ? (
              <div style={{ textAlign: "center", padding: "24px 0", color: "#FF6B35", fontWeight: "800", fontSize: "15px" }}>🎉 {t.feedback_thanks}</div>
            ) : (
              <>
                <textarea value={tekst} onChange={e => setTekst(e.target.value)} placeholder={t.feedback_placeholder}
                  style={{ width: "100%", minHeight: "90px", padding: "12px", borderRadius: "12px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box", resize: "none", marginBottom: "12px" }} />
                <button onClick={verstuur}
                  style={{ width: "100%", padding: "13px", borderRadius: "12px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                  {t.feedback_send}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const LoginScreen = ({ onClose, onSuccess, t }) => {
  const [mode, setMode] = useState("login"); // login | signup | forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true); setError(""); setMessage("");
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: "https://papparatzi.app" });
        if (error) throw error;
        setMessage(t.forgot_password_sent);
      } else if (mode === "login") {
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

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box", marginBottom: "12px" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 999 }}>
      <div style={{ background: "#fff", borderRadius: "28px", padding: "36px 28px", maxWidth: "380px", width: "100%", textAlign: "center", fontFamily: "'Nunito', sans-serif" }}>
        <LogoSVG size={64} />
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "24px", color: "#1A1A2E", margin: "12px 0 4px" }}>
          {mode === "login" ? t.login_title_welcome : mode === "signup" ? t.login_title_register : t.forgot_password}
        </h2>
        <p style={{ color: "#888", fontSize: "13px", margin: "0 0 24px", lineHeight: 1.5 }}>
          {mode === "login" ? t.login_sub_login : mode === "signup" ? t.login_sub_register : t.forgot_password_sub}
        </p>
        {error && <div style={{ background: "#FFF0F0", border: "1.5px solid #FFD0D0", borderRadius: "10px", padding: "10px", fontSize: "13px", color: "#CC0000", marginBottom: "16px" }}>{error}</div>}
        {message && <div style={{ background: "#F0FFF4", border: "1.5px solid #C0E8C0", borderRadius: "10px", padding: "10px", fontSize: "13px", color: "#007700", marginBottom: "16px" }}>{message}</div>}

        <input style={inputStyle} type="email" placeholder={t.login_email} value={email} onChange={e => setEmail(e.target.value)} />
        {mode !== "forgot" && (
          <input style={inputStyle} type="password" placeholder={t.login_password} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        )}

        <button style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Fredoka', sans-serif", fontWeight: "600", fontSize: "18px", cursor: "pointer", marginBottom: "12px", opacity: loading ? 0.6 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? t.login_loading : mode === "login" ? t.login_submit : mode === "signup" ? t.register_submit : t.feedback_send}
        </button>

        {mode === "login" && (
          <button style={{ background: "none", border: "none", color: "#bbb", cursor: "pointer", fontSize: "12px", fontFamily: "'Nunito', sans-serif", display: "block", width: "100%", marginBottom: "8px" }}
            onClick={() => { setMode("forgot"); setError(""); setMessage(""); }}>
            {t.forgot_password}
          </button>
        )}
        {mode !== "forgot" && (
          <button style={{ background: "none", border: "none", color: "#FF6B35", cursor: "pointer", fontSize: "13px", fontWeight: "700", marginBottom: "8px", fontFamily: "'Nunito', sans-serif" }}
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}>
            {mode === "login" ? t.login_switch_to_register : t.login_switch_to_login}
          </button>
        )}
        {mode === "forgot" && (
          <button style={{ background: "none", border: "none", color: "#FF6B35", cursor: "pointer", fontSize: "13px", fontWeight: "700", marginBottom: "8px", fontFamily: "'Nunito', sans-serif" }}
            onClick={() => { setMode("login"); setError(""); setMessage(""); }}>
            ← {t.login_title_welcome}
          </button>
        )}
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
        <div style={{ background: "#FFF0E8", border: "2px solid #F0E4D4", borderRadius: "16px", padding: "16px", marginBottom: "20px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "32px", color: "#FF5A10", fontWeight: "700" }}>€3,99</div>
          <div style={{ color: "#888", fontSize: "13px" }}>{t.upgrade_per_month}</div>
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

// ── ZINDELIJKHEID TRACKER - HELE MAAND ────────────────────────────────────
const ZindelijkheidTracker = ({ t, days, setDays }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

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

// ── TIPS PAGINA - ALLE LEEFTIJDEN, 2x2 GRID, UITKLAPBAAR ────────────────
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
const TandjesKaart = ({ t, lang, tandjes, setTandjes, onChat }) => {
  const toggle = (id) => setTandjes(prev => ({ ...prev, [id]: !prev[id] }));
  const totaal = Object.values(tandjes).filter(Boolean).length;

  // Gebit layout: boven en onder, van midden naar buiten
  // Elk tand heeft: id, type (nl), breedte, hoogte, borderRadius (geeft tandvorm)
  const bovenRij = [
    { id: "b5", type: "Kies", w: 30, h: 28, r: "5px 5px 8px 8px" },
    { id: "b4", type: "Kies", w: 30, h: 28, r: "5px 5px 8px 8px" },
    { id: "b3", type: "Hoektand", w: 22, h: 34, r: "4px 4px 10px 10px" },
    { id: "b2", type: "Zijsnijtand", w: 22, h: 32, r: "4px 4px 9px 9px" },
    { id: "b1", type: "Snijtand", w: 26, h: 34, r: "4px 4px 10px 10px" },
    { id: "b6", type: "Snijtand", w: 26, h: 34, r: "4px 4px 10px 10px" },
    { id: "b7", type: "Zijsnijtand", w: 22, h: 32, r: "4px 4px 9px 9px" },
    { id: "b8", type: "Hoektand", w: 22, h: 34, r: "4px 4px 10px 10px" },
    { id: "b9", type: "Kies", w: 30, h: 28, r: "5px 5px 8px 8px" },
    { id: "b10", type: "Kies", w: 30, h: 28, r: "5px 5px 8px 8px" },
  ];
  const onderRij = [
    { id: "o5", type: "Kies", w: 30, h: 26, r: "8px 8px 5px 5px" },
    { id: "o4", type: "Kies", w: 30, h: 26, r: "8px 8px 5px 5px" },
    { id: "o3", type: "Hoektand", w: 22, h: 30, r: "10px 10px 4px 4px" },
    { id: "o2", type: "Zijsnijtand", w: 20, h: 28, r: "9px 9px 4px 4px" },
    { id: "o1", type: "Snijtand", w: 24, h: 30, r: "10px 10px 4px 4px" },
    { id: "o6", type: "Snijtand", w: 24, h: 30, r: "10px 10px 4px 4px" },
    { id: "o7", type: "Zijsnijtand", w: 20, h: 28, r: "9px 9px 4px 4px" },
    { id: "o8", type: "Hoektand", w: 22, h: 30, r: "10px 10px 4px 4px" },
    { id: "o9", type: "Kies", w: 30, h: 26, r: "8px 8px 5px 5px" },
    { id: "o10", type: "Kies", w: 30, h: 26, r: "8px 8px 5px 5px" },
  ];

  const [hovered, setHovered] = useState(null);

  const tips = [
    { icon: "🪥", tip: lang === "en" ? "Start brushing as soon as the first tooth appears, twice a day." : "Begin met poetsen zodra het eerste tandje doorkomt, twee keer per dag." },
    { icon: "💧", tip: lang === "en" ? "Use a tiny smear of fluoride toothpaste (max 0.5mm) until age 6." : "Gebruik een klein beetje fluoridetandpasta (max 0.5mm) tot 6 jaar." },
    { icon: "🍬", tip: lang === "en" ? "Avoid sugary drinks before bed. Milk and fruit juice can cause cavities too." : "Vermijd suikerhoudende dranken voor het slapen. Ook melk en vruchtensap kunnen gaatjes veroorzaken." },
    { icon: "🦷", tip: lang === "en" ? "The first dentist visit can be as early as age 1. Getting used to it early really helps!" : "Het eerste tandartsbezoek kan al op 1-jarige leeftijd. Vroeg wennen helpt!" },
    { icon: "😬", tip: lang === "en" ? "Baby teeth are important placeholders for adult teeth. Cavities in milk teeth matter." : "Melktandjes zijn plaatshouders voor het blijvend gebit. Gaatjes zijn dus niet onbelangrijk." },
  ];

  const chatVraag = lang === "en"
    ? "I have a question about my child's baby teeth and oral hygiene."
    : "Ik heb een vraag over de melktandjes en mondhygiëne van mijn kind.";

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

      {/* Gebitvorm */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
        {/* Tooltip */}
        <div style={{ textAlign: "center", height: "20px", marginBottom: "10px", fontSize: "12px", color: "#FF6B35", fontWeight: "700" }}>
          {hovered ? hovered : ""}
        </div>
        {/* Bovenkaak */}
        <div style={{ marginBottom: "4px" }}>
          <div style={{ fontSize: "10px", color: "#aaa", textAlign: "center", marginBottom: "6px", fontWeight: "700", letterSpacing: "0.08em" }}>{t.teeth_upper}</div>
          <div style={{ display: "flex", gap: "4px", justifyContent: "center", alignItems: "flex-end" }}>
            {bovenRij.map(tooth => (
              <button key={tooth.id} onClick={() => toggle(tooth.id)}
                onMouseEnter={() => setHovered(tooth.type)} onMouseLeave={() => setHovered(null)}
                title={tooth.type}
                style={{ width: `${tooth.w}px`, height: `${tooth.h}px`, borderRadius: tooth.r, border: "2px solid", borderColor: tandjes[tooth.id] ? "#FF6B35" : "#D4C4B4", background: tandjes[tooth.id] ? "linear-gradient(180deg,#FF8C5A,#FF6B35)" : "linear-gradient(180deg,#fff,#F5EFE8)", cursor: "pointer", transition: "all 0.15s", boxShadow: tandjes[tooth.id] ? "0 2px 6px rgba(255,107,53,0.3)" : "0 1px 3px rgba(0,0,0,0.08)", padding: 0, flexShrink: 0 }}
              />
            ))}
          </div>
        </div>
        {/* Tandvlees scheiding */}
        <div style={{ height: "10px", background: "linear-gradient(90deg, #FFD4D4, #FFCACA, #FFD4D4)", borderRadius: "4px", margin: "6px 4px" }} />
        {/* Onderkaak */}
        <div>
          <div style={{ display: "flex", gap: "4px", justifyContent: "center", alignItems: "flex-start" }}>
            {onderRij.map(tooth => (
              <button key={tooth.id} onClick={() => toggle(tooth.id)}
                onMouseEnter={() => setHovered(tooth.type)} onMouseLeave={() => setHovered(null)}
                title={tooth.type}
                style={{ width: `${tooth.w}px`, height: `${tooth.h}px`, borderRadius: tooth.r, border: "2px solid", borderColor: tandjes[tooth.id] ? "#FF6B35" : "#D4C4B4", background: tandjes[tooth.id] ? "linear-gradient(180deg,#FF6B35,#FF8C5A)" : "linear-gradient(180deg,#F5EFE8,#fff)", cursor: "pointer", transition: "all 0.15s", boxShadow: tandjes[tooth.id] ? "0 2px 6px rgba(255,107,53,0.3)" : "0 1px 3px rgba(0,0,0,0.08)", padding: 0, flexShrink: 0 }}
              />
            ))}
          </div>
          <div style={{ fontSize: "10px", color: "#aaa", textAlign: "center", marginTop: "6px", fontWeight: "700", letterSpacing: "0.08em" }}>{t.teeth_lower}</div>
        </div>

        {/* Legenda tandtypes */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px", justifyContent: "center" }}>
          {[["Snijtand", "#FF6B35"], ["Zijsnijtand", "#FF8C5A"], ["Hoektand", "#FFB347"], ["Kies", "#FFCF77"]].map(([label, color]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#666", fontWeight: "700" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: color }} />
              {label}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "11px", color: "#aaa" }}>Tik op een tandje om het aan te vinken als doorgekomen</div>
      </div>

      {/* Tips voor melktandjes */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: "800", color: "#1A1A2E", marginBottom: "12px" }}>{t.teeth_tip_title}</div>
        {tips.map((tip, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "8px 0", borderBottom: i < tips.length - 1 ? "1px solid #F0E4D4" : "none" }}>
            <span style={{ fontSize: "18px", flexShrink: 0 }}>{tip.icon}</span>
            <span style={{ fontSize: "13px", color: "#555", lineHeight: 1.5 }}>{tip.tip}</span>
          </div>
        ))}
      </div>

      {/* Chat knop */}
      <button onClick={() => onChat(chatVraag)} style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <IconChat /> {t.tracker_chat_btn}
      </button>
    </div>
  );
};

// ── METING CHART (SVG lijngrafiek met as-labels, geen externe libs) ───────
const MetingChart = ({ data, color, unit, lang }) => {
  if (data.length < 2) return null;
  const values = data.map(d => d.waarde);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = (max - min) || 1;
  const W = 300, H = 130, PL = 34, PR = 10, PT = 14, PB = 24;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;
  const coords = data.map((d, i) => ({
    x: PL + (i / (data.length - 1)) * innerW,
    y: PT + innerH - ((d.waarde - min) / range) * innerH,
  }));
  const pointsStr = coords.map(c => `${c.x},${c.y}`).join(" ");
  const formatShort = (d) => new Date(d).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short" });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: "360px", display: "block", margin: "0 auto" }}>
      <text x="2" y={PT + 4} fontSize="10" fill="#bbb">{max} {unit}</text>
      <text x="2" y={PT + innerH} fontSize="10" fill="#bbb">{min} {unit}</text>
      <line x1={PL} y1={PT} x2={PL} y2={PT + innerH} stroke="#F0E4D4" strokeWidth="1" />
      <line x1={PL} y1={PT + innerH} x2={W - PR} y2={PT + innerH} stroke="#F0E4D4" strokeWidth="1" />
      <polyline points={pointsStr} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {coords.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r="3.5" fill={color} />)}
      <text x={PL} y={H - 4} fontSize="10" fill="#bbb" textAnchor="start">{formatShort(data[0].datum)}</text>
      <text x={W - PR} y={H - 4} fontSize="10" fill="#bbb" textAnchor="end">{formatShort(data[data.length - 1].datum)}</text>
    </svg>
  );
};

// ── METINGTRACKER - generiek, voor Lengte of Gewicht apart ────────────────
const MetingTracker = ({ t, lang, title, sub, unit, gradient, lineColor, data, setData }) => {
  const [datum, setDatum] = useState("");
  const [waarde, setWaarde] = useState("");

  const add = () => {
    if (!datum || !waarde) return;
    const entry = { id: Date.now(), datum, waarde: parseFloat(waarde) };
    setData(prev => [...prev, entry].sort((a, b) => a.datum.localeCompare(b.datum)));
    setDatum(""); setWaarde("");
  };

  const remove = (id) => setData(prev => prev.filter(e => e.id !== id));
  const formatDate = (d) => new Date(d).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "short", year: "numeric" });
  const latest = data.length > 0 ? data[data.length - 1] : null;
  const inputStyle = { padding: "10px 12px", borderRadius: "10px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box" };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>{title}</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{sub}</p>
      </div>

      {latest && (
        <div style={{ background: gradient, borderRadius: "16px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "32px", fontFamily: "'Fredoka', sans-serif", color: "#fff", fontWeight: "700" }}>{latest.waarde} {unit}</div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "12px" }}>{formatDate(latest.datum)}</div>
        </div>
      )}

      {data.length >= 2 && (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", marginBottom: "16px" }}>
          <MetingChart data={data} color={lineColor} unit={unit} lang={lang} />
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <input type="date" value={datum} onChange={e => setDatum(e.target.value)} style={{ ...inputStyle, flex: "1 1 auto" }} />
          <input type="number" placeholder={unit} value={waarde} onChange={e => setWaarde(e.target.value)} style={{ ...inputStyle, width: "90px" }} />
        </div>
        <button onClick={add} style={{ width: "100%", padding: "12px", borderRadius: "12px", background: gradient, color: "#fff", border: "none", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer", marginTop: "10px" }}>{t.groei_add}</button>
      </div>

      {data.length > 0 ? (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "10px", fontWeight: "700" }}>{t.groei_history}</div>
          {[...data].reverse().map(entry => (
            <div key={entry.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F0E4D4" }}>
              <span style={{ fontSize: "13px", color: "#444", fontWeight: "700" }}>{formatDate(entry.datum)}</span>
              <span style={{ fontSize: "13px", color: "#666" }}>{entry.waarde} {unit}</span>
              <button onClick={() => remove(entry.id)} style={{ background: "none", border: "none", color: "#FF6B35", cursor: "pointer", fontSize: "18px", fontWeight: "700", padding: "0 4px" }}>×</button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "#aaa", fontSize: "13px", padding: "20px" }}>{t.groei_empty}</div>
      )}
    </div>
  );
};

// ── MIJLPALEN ──────────────────────────────────────────────────────────────
const Mijlpalen = ({ t, lang, data, setData, onChat }) => {
  const formatDate = (d) => d ? new Date(d).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-US", { day: "numeric", month: "long", year: "numeric" }) : "";
  const update = (key, field, value) => setData(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));

  const chatVraag = lang === "nl"
    ? "Ik heb een vraag over de ontwikkeling en mijlpalen van mijn kind."
    : "I have a question about my child's development and milestones.";

  const items = [
    { key: "lach",      icon: "😊", label: t.milestone_first_smile,  hasText: false },
    { key: "woord",     icon: <IconSpeech />, label: t.milestone_first_word,   hasText: true },
    { key: "omrollen",  icon: "🔄", label: t.milestone_roll,          hasText: false },
    { key: "zitten",    icon: "🪑", label: t.milestone_sit,           hasText: false },
    { key: "tijgeren",  icon: "🐯", label: t.milestone_crawl_tiger,   hasText: false },
    { key: "kruipen",   icon: "👶", label: t.milestone_crawl,         hasText: false },
    { key: "stapjes",   icon: <IconWalk />, label: t.milestone_first_steps,   hasText: false },
    { key: "tandje",    icon: <IconTooth />, label: t.milestone_first_tooth,   hasText: false },
    { key: "hapje",     icon: <IconFood />, label: t.milestone_first_bite,    hasText: false },
  ];

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: "10px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box" };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>{t.milestones_title}</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{t.milestones_sub}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
        {items.map(item => {
          const entry = data[item.key] || {};
          const isSet = !!entry.datum;
          return (
            <div key={item.key} style={{ background: "#fff", borderRadius: "16px", padding: "16px", border: isSet ? "1.5px solid #FF6B35" : "1.5px solid #F0E4D4" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: isSet ? "#FF6B35" : "#FFF0E8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: typeof item.icon === "string" ? "20px" : "inherit" }}>
                  {typeof item.icon === "string"
                    ? <span style={{ filter: isSet ? "grayscale(0)" : "none" }}>{item.icon}</span>
                    : <div style={{ filter: isSet ? "brightness(0) invert(1)" : "none" }}>{item.icon}</div>
                  }
                </div>
                <span style={{ fontWeight: "800", fontSize: "14px", color: "#1A1A2E" }}>{item.label}</span>
                {isSet && <span style={{ marginLeft: "auto", fontSize: "16px" }}>✓</span>}
              </div>
              {item.hasText && (
                <input type="text" placeholder={t.milestone_word_placeholder} value={entry.waarde || ""} onChange={e => update(item.key, "waarde", e.target.value)} style={{ ...inputStyle, marginBottom: "8px" }} />
              )}
              <input type="date" value={entry.datum || ""} onChange={e => update(item.key, "datum", e.target.value)} style={inputStyle} />
              {isSet && <div style={{ fontSize: "12px", color: "#FF6B35", fontWeight: "700", marginTop: "8px" }}>{formatDate(entry.datum)}{entry.waarde ? `: "${entry.waarde}"` : ""}</div>}
            </div>
          );
        })}
      </div>

      <button onClick={() => onChat(chatVraag)} style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <IconChat /> {t.tracker_chat_btn}
      </button>
    </div>
  );
};

// ── VACCINATIESCHEMA - afvinklijst gebaseerd op RVP ───────────────────────
const Vaccinatieschema = ({ t, lang, data, setData, onChat }) => {
  const schema = VACCINATIE_SCHEMA[lang] || VACCINATIE_SCHEMA.nl;
  const toggle = (id) => setData(prev => ({ ...prev, [id]: !prev[id] }));
  const checkedCount = Object.values(data).filter(Boolean).length;
  const chatVraag = lang === "nl"
    ? "Ik heb een vraag over de vaccinaties van mijn kind."
    : "I have a question about my child's vaccinations.";

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 4px" }}>{t.vaccinations_title}</h2>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{t.vaccinations_sub}</p>
      </div>

      <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF8C5A)", borderRadius: "16px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "28px", fontFamily: "'Fredoka', sans-serif", color: "#fff", fontWeight: "700" }}>{checkedCount} / {schema.length}</div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>{t.vaccinations_progress}</div>
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", padding: "8px", marginBottom: "16px" }}>
        {schema.map((item, i) => (
          <div key={item.id} style={{ borderBottom: i < schema.length - 1 ? "1px solid #F0E4D4" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px" }}>
              <button onClick={() => toggle(item.id)} style={{ width: "24px", height: "24px", borderRadius: "8px", border: "2px solid", borderColor: data[item.id] ? "#FF6B35" : "#E5D5C5", background: data[item.id] ? "#FF6B35" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: "14px", fontWeight: "800", cursor: "pointer" }}>
                {data[item.id] ? "✓" : ""}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", color: "#FF8C5A", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.leeftijd}</div>
                <div style={{ fontSize: "13px", color: "#1A1A2E", fontWeight: "700" }}>{item.naam}</div>
              </div>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" title="Meer informatie (RIVM)"
                  style={{ flexShrink: 0, color: "#FF6B35", display: "flex", alignItems: "center" }}>
                  <IconExternal />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#FFF0E8", borderRadius: "14px", padding: "12px", marginBottom: "16px", fontSize: "12px", color: "#FF6B35", textAlign: "center", fontWeight: "700" }}>
        {t.vaccinations_disclaimer}
      </div>

      <button onClick={() => onChat(chatVraag)} style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <IconChat /> {t.tracker_chat_btn}
      </button>
    </div>
  );
};

// ── MINI CARD (Dashboard overzicht kaartjes) ──────────────────────────────
const MiniCard = ({ icon, label, value, sub, onClick, wide }) => (
  <button onClick={onClick} style={{ background: "#fff", borderRadius: "14px", padding: "14px", border: "1.5px solid #F0E4D4", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: "6px", gridColumn: wide ? "1 / -1" : "auto", fontFamily: "'Nunito', sans-serif" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#FFF0E8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
      <span style={{ fontSize: "12px", fontWeight: "800", color: "#888" }}>{label}</span>
    </div>
    <div style={{ fontSize: "18px", fontWeight: "800", color: "#1A1A2E", fontFamily: "'Fredoka', sans-serif" }}>{value}</div>
    {sub && <div style={{ fontSize: "11px", color: "#aaa" }}>{sub}</div>}
  </button>
);

// ── VOORTGANG - hub met 5 trackers ─────────────────────────────────────────
const VoortgangPage = ({ t, isPremium, setShowUpgrade, onOpenTracker, zindelijkheidDays, tandjes, lengteData, gewichtData, mijlpalenData, vaccinatiesChecked }) => {
  const droogDagen = Object.values(zindelijkheidDays).filter(v => v === "droog").length;
  const tandjesCount = Object.values(tandjes).filter(Boolean).length;
  const latestLengte = lengteData.length > 0 ? lengteData[lengteData.length - 1] : null;
  const latestGewicht = gewichtData.length > 0 ? gewichtData[gewichtData.length - 1] : null;
  const mijlpalenCount = Object.values(mijlpalenData).filter(m => m && m.datum).length;
  const vaccinatiesCount = Object.values(vaccinatiesChecked).filter(Boolean).length;

  const items = [
    { id: "zindelijkheid", icon: <IconPotty />, label: t.tracker_tab, stat: `${droogDagen} ${t.tracker_days}` },
    { id: "tandjes", icon: <IconTooth />, label: t.teeth_tab, stat: `${tandjesCount} / 20` },
    { id: "lengte", icon: <IconGrowth />, label: t.lengte_title, stat: latestLengte ? `${latestLengte.waarde} cm` : t.dashboard_no_data },
    { id: "gewicht", icon: <IconGrowth />, label: t.gewicht_title, stat: latestGewicht ? `${latestGewicht.waarde} kg` : t.dashboard_no_data },
    { id: "mijlpalen", icon: <IconMilestone />, label: t.milestones_title, stat: `${mijlpalenCount} / 4` },
    { id: "vaccinaties", icon: <IconVaccine />, label: t.vaccinations_title, stat: `${vaccinatiesCount} / ${VACCINATIE_SCHEMA.nl.length}` },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#FF5A10", fontSize: "22px", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}><IconProgress />{t.voortgang_title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {items.map(item => (
          <button key={item.id} onClick={() => isPremium ? onOpenTracker(item.id) : setShowUpgrade(true)}
            style={{ position: "relative", background: "#fff", borderRadius: "16px", padding: "16px", border: "1.5px solid #F0E4D4", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: "8px", fontFamily: "'Nunito', sans-serif", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            {!isPremium && <div style={{ position: "absolute", top: "10px", right: "10px", color: "#FF8C5A" }}><IconLock /></div>}
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#FFF0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
            <span style={{ fontWeight: "800", fontSize: "14px", color: "#1A1A2E" }}>{item.label}</span>
            <span style={{ fontSize: "12px", color: "#aaa" }}>{isPremium ? item.stat : ""}</span>
          </button>
        ))}
      </div>

      <a href="https://www.groeigids.nl/" target="_blank" rel="noopener noreferrer"
        style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "16px", padding: "16px", border: "1.5px solid #F0E4D4", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#FFF0E8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconExternal /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "800", fontSize: "14px", color: "#1A1A2E" }}>{t.growth_curve_title}</div>
          <div style={{ fontSize: "12px", color: "#aaa" }}>{t.growth_curve_sub}</div>
        </div>
      </a>
    </div>
  );
};

// ── DASHBOARD - startscherm ────────────────────────────────────────────────
const OUDER_QUOTES = {
  nl: [
    "Jij doet het goed. Echt.",
    "Er bestaat geen perfecte ouder. Maar een liefdevolle ouder maakt het verschil.",
    "Je hoeft niet alles te weten. Je bent er gewoon, en dat telt.",
    "Soms is overleven ook een succes.",
    "Jij bent precies de ouder die jouw kind nodig heeft.",
    "Fouten maken hoort erbij. Morgen is een nieuwe kans.",
    "Je geeft meer dan je denkt.",
    "Het is oké om moe te zijn. Rust is ook goed ouderschap.",
    "Jij bent niet alleen in dit avontuur.",
    "Kleine momenten samen zijn de grote herinneringen van morgen.",
    "Je doet het al, elke dag opnieuw. Dat is moedig.",
    "Twijfelen aan jezelf betekent dat je het serieus neemt.",
    "Goed genoeg is echt goed genoeg.",
    "Jouw kind heeft jou niet nodig om perfect te zijn, alleen aanwezig.",
  ],
  en: [
    "You're doing great. Really.",
    "There's no perfect parent. But a loving one makes all the difference.",
    "You don't need to know everything. You just show up, and that matters.",
    "Sometimes surviving the day is a win.",
    "You are exactly the parent your child needs.",
    "Making mistakes is part of it. Tomorrow is a fresh start.",
    "You give more than you realize.",
    "It's okay to be tired. Rest is good parenting too.",
    "You're not alone in this adventure.",
    "Small moments together become the big memories of tomorrow.",
    "You keep going, every single day. That takes courage.",
    "Doubting yourself means you care deeply.",
    "Good enough is truly good enough.",
    "Your child doesn't need you to be perfect, just present.",
  ],
};

const Dashboard = ({ childName, childAge, lang, t, isPremium, zindelijkheidDays, tandjes, lengteData, gewichtData, mijlpalenData, vaccinatiesChecked, onNavigateVoortgang, onChat, setShowUpgrade }) => {
  const tipsData = AGE_TIPS[lang] || AGE_TIPS.nl;
  const ageTips = tipsData[childAge] || tipsData["2–4"];
  const tipIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % ageTips.length;
  const dailyTip = ageTips[tipIndex];
  const quotes = OUDER_QUOTES[lang] || OUDER_QUOTES.nl;
  const quoteIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length;
  const dailyQuote = quotes[quoteIndex];

  const droogDagen = Object.values(zindelijkheidDays).filter(v => v === "droog").length;
  const tandjesCount = Object.values(tandjes).filter(Boolean).length;
  const latestLengte = lengteData.length > 0 ? lengteData[lengteData.length - 1] : null;
  const latestGewicht = gewichtData.length > 0 ? gewichtData[gewichtData.length - 1] : null;
  const mijlpalenCount = Object.values(mijlpalenData).filter(m => m && m.datum).length;
  const vaccinatiesCount = Object.values(vaccinatiesChecked).filter(Boolean).length;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", fontFamily: "'Nunito', sans-serif" }}>
      <h2 style={{ fontFamily: "'Fredoka', sans-serif", color: "#1A1A2E", fontSize: "24px", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <IconHome />{t.dashboard_greeting}{childName ? `, ${childName.split(" ")[0]}` : ""}!
      </h2>

      <div style={{ background: "#FFF0E8", borderRadius: "16px", padding: "16px", marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", fontWeight: "800", color: "#FF6B35", letterSpacing: "0.1em", marginBottom: "10px" }}>{t.dashboard_tip_label}</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
          <div style={{ flexShrink: 0, width: "36px", height: "36px", borderRadius: "10px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{dailyTip.icon}</div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "14px", color: "#1A1A2E", marginBottom: "4px" }}>{dailyTip.tip}</div>
            <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.4 }}>{dailyTip.tips[0]}</div>
          </div>
        </div>
        <button onClick={() => onChat(dailyTip.vraag)} style={{ width: "100%", padding: "10px", borderRadius: "12px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <IconChat /> {t.tips_chat_btn}
        </button>
      </div>

      {/* Ouder check-in quote */}
      <div style={{ background: "linear-gradient(135deg, #1A1A2E, #2D2D4E)", borderRadius: "16px", padding: "18px 20px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ fontSize: "28px", flexShrink: 0 }}>🧡</span>
        <p style={{ margin: 0, fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: "700", color: "#fff", lineHeight: 1.5, fontStyle: "italic" }}>"{dailyQuote}"</p>
      </div>

      {isPremium ? (
        <>
          <div style={{ fontSize: "12px", fontWeight: "800", color: "#FF8C5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>{t.dashboard_overview}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <MiniCard icon={<IconPotty />} label={t.tracker_tab} value={`${droogDagen}`} sub={t.tracker_days} onClick={() => onNavigateVoortgang("zindelijkheid")} />
            <MiniCard icon={<IconTooth />} label={t.teeth_tab} value={`${tandjesCount} / 20`} onClick={() => onNavigateVoortgang("tandjes")} />
            <MiniCard icon={<IconGrowth />} label={t.lengte_title} value={latestLengte ? `${latestLengte.waarde} cm` : t.dashboard_no_data} onClick={() => onNavigateVoortgang("lengte")} />
            <MiniCard icon={<IconGrowth />} label={t.gewicht_title} value={latestGewicht ? `${latestGewicht.waarde} kg` : t.dashboard_no_data} onClick={() => onNavigateVoortgang("gewicht")} />
            <MiniCard icon={<IconMilestone />} label={t.milestones_title} value={`${mijlpalenCount} / 9`} onClick={() => onNavigateVoortgang("mijlpalen")} />
            <MiniCard icon={<IconVaccine />} label={t.vaccinations_title} value={`${vaccinatiesCount} / ${VACCINATIE_SCHEMA.nl.length}`} sub={t.vaccinations_progress} onClick={() => onNavigateVoortgang("vaccinaties")} />
          </div>
        </>
      ) : (
        <button onClick={() => setShowUpgrade(true)} style={{ width: "100%", background: "linear-gradient(135deg, #FF6B35, #FF8C5A)", borderRadius: "16px", padding: "20px", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "14px", fontFamily: "'Nunito', sans-serif" }}>
          <IconStar />
          <div>
            <div style={{ fontWeight: "800", fontSize: "15px", color: "#fff", marginBottom: "4px" }}>{t.dashboard_premium_teaser_title}</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", lineHeight: 1.4 }}>{t.dashboard_premium_teaser_text}</div>
          </div>
        </button>
      )}

      <a href="https://www.instagram.com/papparatzi.app/" target="_blank" rel="noopener noreferrer"
        style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "16px", padding: "14px 16px", border: "1.5px solid #F0E4D4", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconInstagram size={22} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "800", fontSize: "14px", color: "#1A1A2E" }}>{t.instagram_label}</div>
          <div style={{ fontSize: "12px", color: "#aaa" }}>@papparatzi.app</div>
        </div>
        <IconExternal />
      </a>
    </div>
  );
};

// ── SIDE MENU - schuift vanaf links open ──────────────────────────────────
const SideMenu = ({ open, onClose, t, activeTab, setActiveTab, setVoortgangView, childName, setChildName, childAge, setChildAge, user, handleLogout, setShowLogin, isPremium, setShowUpgrade }) => {
  const navigate = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "voortgang") setVoortgangView(null);
    onClose();
  };

  const tabs = [
    { id: "dashboard", label: t.dashboard_tab },
    { id: "chat", label: t.chat_tab },
    { id: "tips", label: t.tips_tab },
    { id: "voortgang", label: t.voortgang_tab },
  ];

  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(26,26,46,0.45)", zIndex: 200 }} />}
      <div style={{ position: "fixed", top: 0, left: 0, height: "100vh", width: "min(290px, 82vw)", background: "#fff", zIndex: 201, transform: open ? "translateX(0)" : "translateX(-105%)", transition: "transform 0.28s ease", boxShadow: "4px 0 28px rgba(0,0,0,0.12)", overflowY: "auto", display: "flex", flexDirection: "column", fontFamily: "'Nunito', sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #F0E4D4" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <LogoSVG size={32} />
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "17px", color: "#FF5A10" }}>Papparatzi</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", color: "#aaa", cursor: "pointer", padding: "0 4px", lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: "12px" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => navigate(tab.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 14px", borderRadius: "12px", border: "none", background: activeTab === tab.id ? "#FFF0E8" : "none", color: activeTab === tab.id ? "#FF6B35" : "#444", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer", marginBottom: "4px" }}>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "16px", borderTop: "1px solid #F0E4D4" }}>
          <div style={{ fontSize: "11px", fontWeight: "800", color: "#FF8C5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>{t.menu_profile}</div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#777", marginBottom: "4px" }}>{t.child_name_label}</label>
          <input value={childName} onChange={e => setChildName(e.target.value)} placeholder={t.child_name_placeholder} style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "#333", boxSizing: "border-box", marginBottom: "12px" }} />
          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#777", marginBottom: "6px" }}>{t.age_label}</label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["0–1", "1–2", "2–4", "4–6", "6–10", "10+"].map(age => (
              <button key={age} onClick={() => setChildAge(childAge === age ? "" : age)} style={{ padding: "6px 12px", borderRadius: "50px", border: `2px solid ${childAge === age ? "#FF6B35" : "#E5D5C5"}`, background: childAge === age ? "#FF6B35" : "transparent", color: childAge === age ? "#fff" : "#777", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>{age}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: "16px", borderTop: "1px solid #F0E4D4", display: "flex", flexDirection: "column", gap: "10px" }}>
          {user
            ? <button onClick={() => { handleLogout(); onClose(); }} style={{ background: "#FFF0E8", color: "#FF6B35", border: "1.5px solid rgba(255,107,53,0.2)", padding: "10px 14px", borderRadius: "12px", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}><IconLogin />{t.logout_btn}</button>
            : <button onClick={() => { setShowLogin(true); onClose(); }} style={{ background: "#FFF0E8", color: "#FF6B35", border: "1.5px solid rgba(255,107,53,0.2)", padding: "10px 14px", borderRadius: "12px", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}><IconLogin />{t.login_btn}</button>
          }
          {!isPremium
            ? <button onClick={() => { setShowUpgrade(true); onClose(); }} style={{ background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", padding: "10px 14px", borderRadius: "12px", fontFamily: "'Nunito', sans-serif", fontWeight: "800", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}><IconStar />{t.premium_btn}</button>
            : <div style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#fff", padding: "10px 14px", borderRadius: "12px", fontSize: "13px", fontWeight: "900", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}><IconStar />{t.premium_badge}</div>
          }
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ padding: "12px 16px", borderTop: "1px solid #F0E4D4" }}>
          <a href="https://www.instagram.com/papparatzi.app/" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", padding: "10px 14px", borderRadius: "12px", background: "#FFF0E8" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconInstagram size={16} color="#fff" />
            </div>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#1A1A2E" }}>{t.instagram_label}</span>
          </a>
        </div>
        <div style={{ padding: "16px", textAlign: "center", fontSize: "10px", color: "#CCC", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <FeedbackButton t={t} compact />
          {t.disclaimer}
        </div>
      </div>
    </>
  );
};

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [lang] = useState(getBrowserLang);
  const t = T[lang];

  const [screen, setScreen] = useState("onboarding");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPremium, setIsPremium] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [coachName] = useState(() => getRandomCoach());
  const [voortgangView, setVoortgangView] = useState(null);
  const [zindelijkheidDays, setZindelijkheidDays] = useState(() => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const d = {};
    for (let i = 1; i <= daysInMonth; i++) d[i] = null;
    return d;
  });
  const [tandjes, setTandjes] = useState({});
  const [lengteData, setLengteData] = useState([]);
  const [gewichtData, setGewichtData] = useState([]);
  const [mijlpalenData, setMijlpalenData] = useState({ woord: {}, stapjes: {}, tandje: {}, hapje: {} });
  const [vaccinatiesChecked, setVaccinatiesChecked] = useState({});
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

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading, isTyping]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    if (!isPremium && questionsUsed >= FREE_LIMIT) { setShowUpgrade(true); return; }

    // Bij allereerste bericht: voeg coach-intro toe als welkomstbericht
    const isFirstMessage = messages.length === 0;
    const introMsg = isFirstMessage
      ? { role: "assistant", content: lang === "nl"
          ? `Hoi! Ik ben ${coachName}, jouw opvoedcoach van Papparatzi. Leuk dat je er bent! Wat kan ik voor je doen?`
          : `Hi there! I'm ${coachName}, your parenting coach from Papparatzi. Great to have you here! What can I help you with?` }
      : null;

    const baseMessages = introMsg ? [introMsg] : messages;
    const userMsg = { role: "user", content: userText };
    const newMsgs = [...baseMessages, userMsg];

    setMessages(newMsgs);
    setInput("");
    if (!isPremium) setQuestionsUsed(q => q + 1);

    // Typing indicator: schaal op vraaglengte, max 5 seconden
    const typingMs = Math.min(1000 + userText.length * 20, 5000);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, typingMs));
    setIsTyping(false);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system: buildSystemPrompt(childName, childAge, lang), messages: newMsgs }) });
      if (!response.ok) throw new Error();
      const data = await response.json();
      const reply = data.content?.[0]?.text || "...";
      // Kleine extra vertraging voor menselijker gevoel
      await new Promise(r => setTimeout(r, 280));
      const updatedMsgs = [...newMsgs, { role: "assistant", content: reply }];
      setMessages(updatedMsgs);
      if (user) saveConversation(updatedMsgs, user.id);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: lang === "nl" ? "Oeps, er ging iets mis. Probeer het nog eens!" : "Oops, something went wrong. Please try again!" }]);
    }
    setLoading(false);
  };

  const handleChatFromTips = (vraag) => { setActiveTab("chat"); setTimeout(() => sendMessage(vraag), 100); };
  const remaining = Math.max(0, FREE_LIMIT - questionsUsed);
  const onNavigateVoortgang = (view) => { setActiveTab("voortgang"); setVoortgangView(view); };
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
      <div style={{ display: "flex", alignItems: "center", padding: "10px 16px", background: "#fff", borderBottom: "1px solid #F0E4D4", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        {activeTab !== "dashboard" && <button onClick={() => { if (activeTab === "voortgang" && voortgangView) { setVoortgangView(null); return; } setActiveTab("dashboard"); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#FF6B35", padding: "0 4px", marginRight: "6px" }}>←</button>}
        <button onClick={() => setShowMenu(true)} style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
          <IconMenu />
          <LogoSVG size={36} />
          <div>
            <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "18px", color: "#FF5A10" }}>Papparatzi</div>
            <div style={{ fontSize: "9px", color: "#FF8C5A", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.tagline}</div>
          </div>
        </button>
      </div>

      <SideMenu open={showMenu} onClose={() => setShowMenu(false)} t={t} activeTab={activeTab} setActiveTab={setActiveTab} setVoortgangView={setVoortgangView}
        childName={childName} setChildName={setChildName} childAge={childAge} setChildAge={setChildAge}
        user={user} handleLogout={handleLogout} setShowLogin={setShowLogin} isPremium={isPremium} setShowUpgrade={setShowUpgrade} />

      {/* Tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #F0E4D4", padding: "0 16px", overflowX: "auto" }}>
        {[
          { id: "dashboard", label: t.dashboard_tab },
          { id: "chat", label: t.chat_tab },
          { id: "tips", label: t.tips_tab },
          { id: "voortgang", label: t.voortgang_tab },
        ].map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); if (tab.id === "voortgang") setVoortgangView(null); }}
            style={{ padding: "12px 10px", border: "none", background: "none", borderBottom: `2px solid ${activeTab === tab.id ? "#FF6B35" : "transparent"}`, color: activeTab === tab.id ? "#FF6B35" : "#aaa", fontFamily: "'Nunito', sans-serif", fontWeight: "700", fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, display: "flex", alignItems: "center", gap: "5px" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === "dashboard" && (
        <Dashboard childName={childName} childAge={childAge} lang={lang} t={t} isPremium={isPremium}
          zindelijkheidDays={zindelijkheidDays} tandjes={tandjes} lengteData={lengteData} gewichtData={gewichtData} mijlpalenData={mijlpalenData} vaccinatiesChecked={vaccinatiesChecked}
          onNavigateVoortgang={onNavigateVoortgang} onChat={handleChatFromTips} setShowUpgrade={setShowUpgrade} />
      )}

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
                <p style={{ color: "#aaa", fontSize: "13px", margin: "0 0 4px" }}>{t.help_sub}</p>
                <p style={{ color: "#FF8C5A", fontSize: "12px", fontWeight: "700", margin: "0 0 20px", fontFamily: "'Nunito', sans-serif" }}>
                  {lang === "nl" ? `Je spreekt vandaag met ${coachName}` : `Today you're speaking with ${coachName}`}
                </p>
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
            {/* Typing indicator + loading bubble */}
            {(isTyping || loading) && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LogoSVG size={32} />
                <div style={{ background: "#fff", padding: "12px 18px", borderRadius: "20px", borderTopLeftRadius: "4px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "10px" }}>
                  {isTyping ? (
                    <>
                      <span style={{ fontSize: "12px", color: "#999", fontFamily: "'Nunito', sans-serif", fontWeight: "600" }}>{coachName} {t.coach_typing}</span>
                      <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        {[0, 0.2, 0.4].map((delay, i) => (
                          <span key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF6B35", display: "inline-block", animation: `typingBounce 1s ease-in-out ${delay}s infinite` }} />
                        ))}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "#FF6B35", fontSize: "18px", letterSpacing: "4px" }}>. . .</span>
                  )}
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
              <button style={{ width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg, #FF6B35, #FF5A10)", color: "#fff", border: "none", fontSize: "18px", cursor: "pointer", opacity: input.trim() && !loading && !isTyping ? 1 : 0.4, flexShrink: 0 }} onClick={() => sendMessage()} disabled={!input.trim() || loading || isTyping}>↑</button>
            </div>
          )}
        </>
      )}

      {activeTab === "tips" && <TipsPage childAge={childAge} lang={lang} t={t} onChat={handleChatFromTips} />}

      {/* VOORTGANG TAB */}
      {activeTab === "voortgang" && (
        voortgangView === "zindelijkheid" ? <ZindelijkheidTracker t={t} days={zindelijkheidDays} setDays={setZindelijkheidDays} /> :
        voortgangView === "tandjes" ? <TandjesKaart t={t} lang={lang} tandjes={tandjes} setTandjes={setTandjes} onChat={handleChatFromTips} /> :
        voortgangView === "lengte" ? <MetingTracker t={t} lang={lang} title={t.lengte_title} sub={t.lengte_sub} unit="cm" gradient="linear-gradient(135deg, #FF6B35, #FF8C5A)" lineColor="#FF6B35" data={lengteData} setData={setLengteData} /> :
        voortgangView === "gewicht" ? <MetingTracker t={t} lang={lang} title={t.gewicht_title} sub={t.gewicht_sub} unit="kg" gradient="linear-gradient(135deg, #4A90D9, #6BA8E8)" lineColor="#4A90D9" data={gewichtData} setData={setGewichtData} /> :
        voortgangView === "mijlpalen" ? <Mijlpalen t={t} lang={lang} data={mijlpalenData} setData={setMijlpalenData} onChat={handleChatFromTips} /> :
        voortgangView === "vaccinaties" ? <Vaccinatieschema t={t} lang={lang} data={vaccinatiesChecked} setData={setVaccinatiesChecked} onChat={handleChatFromTips} /> :
        <VoortgangPage t={t} isPremium={isPremium} setShowUpgrade={setShowUpgrade} onOpenTracker={setVoortgangView}
          zindelijkheidDays={zindelijkheidDays} tandjes={tandjes} lengteData={lengteData} gewichtData={gewichtData} mijlpalenData={mijlpalenData} vaccinatiesChecked={vaccinatiesChecked} />
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px 8px", background: "#fff", borderTop: "1px solid #F0E4D4" }}>
        <span style={{ fontSize: "10px", color: "#CCC" }}>{t.disclaimer}</span>
        <FeedbackButton t={t} compact />
      </div>
    </div>
  );
}
