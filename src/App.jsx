import { useState, useRef, useEffect } from "react";

const FREE_LIMIT = 5;

const SYSTEM_PROMPT = `Je bent Papparatzi, een warme en begripvolle opvoedcoach voor ouders. Je geeft praktisch, direct en persoonlijk advies over alles wat met kinderen en opvoeding te maken heeft.

Je toon is warm, begrijpend, praktisch en zonder oordeel.

Je spreekt Nederlands tenzij de gebruiker Engels schrijft. Houd antwoorden beknopt maar compleet — max 200 woorden.`;

const SUGGESTIONS = [
  "Mijn kind wil niet naar bed 😴",
  "Tips voor zindelijk worden 🚽",
  "Hoe ga ik om met driftbuien? 😤",
  "Mijn kind eet bijna niets 🥦",
  "Hoe stimuleer ik de taalontwikkeling? 💬",
  "Mijn kind bijt andere kinderen 😬",
];

export default function App() {
  const [screen, setScreen] = useState("onboarding");
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

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    if (!isPremium && questionsUsed >= FREE_LIMIT) {
      setShowUpgrade(true);
      return;
    }
    const userMsg = { role: "user", content: userText };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    if (!isPremium) setQuestionsUsed((q) => q + 1);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: newMsgs }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, er ging iets mis.";
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role: "assistant", content: "Oeps, er ging iets mis. Probeer het nog eens! 🙏" }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (screen === "onboarding") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #FFF8F0 0%, #FFE8D6 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "28px", padding: "40px 36px", maxWidth: "420px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <div style={{ fontSize: "64px" }}>📸</div>
          <h1 style={{ color: "#FF5A10", fontWeight: "900", fontSize: "32px", margin: "8px 0 4px" }}>Papparatzi</h1>
          <p style={{ color: "#FF6B35", fontWeight: "800", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 16px" }}>Jouw Opvoedcoach</p>
          <p style={{ color: "#666", lineHeight: "1.6", fontSize: "14px", margin: "0 0 28px" }}>Stel al je opvoedvragen — dag en nacht, zonder oordeel.</p>
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "700", fontSize: "13px", color: "#333", marginBottom: "6px" }}>Naam van je kind (optioneel)</label>
            <input style={{ width: "100%", padding: "10px 14px", borderRadius: "12px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "sans-serif", fontSize: "14px", color: "#333", boxSizing: "border-box" }} placeholder="bijv. Thiago" value={childName} onChange={(e) => setChildName(e.target.value)} />
            <label style={{ display: "block", fontWeight: "700", fontSize: "13px", color: "#333", margin: "16px 0 8px" }}>Leeftijd</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["0–1", "1–2", "2–4", "4–6", "6–10", "10+"].map((age) => (
                <button key={age} style={{ padding: "7px 14px", borderRadius: "50px", border: `2px solid ${childAge === age ? "#FF6B35" : "#E5D5C5"}`, background: childAge === age ? "#FF6B35" : "transparent", color: childAge === age ? "#fff" : "#666", fontFamily: "sans-serif", fontWeight: "700", fontSize: "13px", cursor: "pointer" }} onClick={() => setChildAge(childAge === age ? "" : age)}>{age}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "#FFF0E8", border: "1.5px solid rgba(255,90,16,0.15)", borderRadius: "10px", padding: "10px 16px", fontSize: "13px", color: "#FF6B35", fontWeight: "700", margin: "16px 0" }}>🎉 5 vragen gratis — geen account nodig</div>
          <button style={{ width: "100%", padding: "15px", borderRadius: "14px", background: "#FF6B35", color: "#fff", border: "none", fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", cursor: "pointer" }} onClick={() => setScreen("app")}>Begin nu →</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "680px", margin: "0 auto", background: "#FFF8F0", fontFamily: "sans-serif" }}>
      {showUpgrade && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 999 }}>
          <div style={{ background: "#fff", borderRadius: "28px", padding: "36px 32px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "48px" }}>📸</div>
            <h2 style={{ fontWeight: "900", fontSize: "22px", color: "#1A1A2E", margin: "8px 0" }}>Je gratis vragen zijn op!</h2>
            <p style={{ color: "#666", fontSize: "14px", margin: "0 0 24px" }}>Ga Premium voor <strong>onbeperkt vragen</strong></p>
            <button style={{ width: "100%", padding: "15px", borderRadius: "14px", background: "#FF6B35", color: "#fff", border: "none", fontWeight: "800", fontSize: "15px", cursor: "pointer", marginBottom: "10px" }} onClick={() => { setIsPremium(true); setShowUpgrade(false); alert("Welkom bij Premium! In de echte app ga je naar een betaalscherm."); }}>Start voor €3,99/maand →</button>
            <button style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "13px" }} onClick={() => setShowUpgrade(false)}>Sluiten</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#fff", borderBottom: "1px solid #F0E4D4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "24px" }}>📸</span>
          <div>
            <div style={{ fontWeight: "900", fontSize: "16px", color: "#FF5A10" }}>Papparatzi</div>
            <div style={{ fontSize: "10px", color: "#FF6B35", fontWeight: "700", letterSpacing: "0.1em" }}>JOUW OPVOEDCOACH</div>
          </div>
        </div>
        {!isPremium ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#888" }}>{remaining} vragen over</span>
            <button style={{ background: "#FF6B35", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "50px", fontWeight: "800", fontSize: "12px", cursor: "pointer" }} onClick={() => setShowUpgrade(true)}>⭐ Premium</button>
          </div>
        ) : (
          <div style={{ background: "#FFF0E8", color: "#FF6B35", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "800" }}>⭐ Premium</div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {messages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>👶</div>
            <p style={{ fontWeight: "900", fontSize: "20px", color: "#1A1A2E", margin: "0 0 8px" }}>Waar kan ik je mee helpen{childName ? `, ${childName}` : ""}?</p>
            <p style={{ color: "#888", fontSize: "14px", margin: "0 0 24px" }}>Kies een onderwerp of typ je eigen vraag</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%", maxWidth: "480px" }}>
              {SUGGESTIONS.map((sg) => (
                <button key={sg} style={{ padding: "12px 16px", borderRadius: "14px", border: "2px solid #F0E4D4", background: "#fff", color: "#333", fontFamily: "sans-serif", fontWeight: "600", fontSize: "13px", textAlign: "left", cursor: "pointer" }} onClick={() => sendMessage(sg)}>{sg}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
            {msg.role === "assistant" && <span style={{ fontSize: "24px", flexShrink: 0 }}>📸</span>}
            <div style={{ padding: "14px 18px", borderRadius: "20px", fontSize: "14px", lineHeight: "1.6", maxWidth: "75%", background: msg.role === "user" ? "#FF6B35" : "#fff", color: msg.role === "user" ? "#fff" : "#333", fontWeight: msg.role === "user" ? "600" : "normal", borderTopRightRadius: msg.role === "user" ? "4px" : "20px", borderTopLeftRadius: msg.role === "assistant" ? "4px" : "20px", boxShadow: msg.role === "assistant" ? "0 2px 12px rgba(0,0,0,0.06)" : "none" }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>📸</span>
            <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "20px", borderTopLeftRadius: "4px" }}>...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!isPremium && remaining === 0 ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#FFF0E8", borderTop: "1.5px solid rgba(255,90,16,0.2)", fontSize: "14px", fontWeight: "700", color: "#FF6B35" }}>
          <span>Je gratis vragen zijn op 🎉</span>
          <button style={{ background: "#FF6B35", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "50px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }} onClick={() => setShowUpgrade(true)}>Ga Premium →</button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", padding: "12px 16px", background: "#fff", borderTop: "1px solid #F0E4D4" }}>
          <textarea style={{ flex: 1, padding: "12px 16px", borderRadius: "16px", border: "2px solid #F0E4D4", background: "#FFF8F0", fontFamily: "sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.5", maxHeight: "120px", overflowY: "auto", resize: "none" }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Stel je opvoedvraag hier..." rows={1} />
          <button style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#FF6B35", color: "#fff", border: "none", fontSize: "20px", cursor: "pointer", opacity: input.trim() && !loading ? 1 : 0.4 }} onClick={() => sendMessage()} disabled={!input.trim() || loading}>↑</button>
        </div>
      )}
      <div style={{ textAlign: "center", fontSize: "11px", color: "#CCC", padding: "6px 20px 10px", background: "#fff" }}>Papparatzi geeft geen medisch advies. Raadpleeg bij twijfel een professional.</div>
    </div>
  );
}
