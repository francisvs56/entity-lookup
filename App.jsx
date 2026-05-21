import { useState, useRef, useEffect } from "react";
import DB from "./entity-database.json";

// ── SEARCH ────────────────────────────────────────────────────────────────────

function searchDatabase(query) {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  if (DB.banks[q]) return { kind: "bank", data: DB.banks[q] };
  if (DB.addresses[q]) return { kind: "address", data: DB.addresses[q] };

  for (const [key, val] of Object.entries(DB.banks)) {
    if (key.includes(q) || q.includes(key) || val.name.toLowerCase().includes(q)) {
      return { kind: "bank", data: val };
    }
  }
  for (const [key, val] of Object.entries(DB.addresses)) {
    if (key.includes(q) || q.includes(key) ||
        val.description.toLowerCase().includes(q) ||
        val.label.toLowerCase().includes(q) ||
        val.address.toLowerCase().includes(q)) {
      return { kind: "address", data: val };
    }
  }

  return { kind: "not_found" };
}

// ── UI COMPONENTS ─────────────────────────────────────────────────────────────

function Pill({ active, children }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      background: active ? "#00e5a0" : "#1e2a3a",
      color: active ? "#051520" : "#6a8fab",
      border: `1px solid ${active ? "#00e5a0" : "#1e2a3a"}`,
    }}>{children}</span>
  );
}

function MetaRow({ label, value, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #0d1f2f" }}>
      <span style={{ color: "#4a7a9b", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
      <span style={{ color: "#cde8ff", fontSize: 14, fontFamily: mono ? "monospace" : "inherit", fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

function BankCard({ data }) {
  const age = 2025 - data.founded;
  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0057ff22,#00e5a033)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "1px solid #00e5a022", flexShrink: 0 }}>🏦</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#cde8ff", fontSize: 17, fontWeight: 800, fontFamily: "'Sora', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.name}</div>
          <div style={{ color: "#4a7a9b", fontSize: 12 }}>{data.hq}</div>
        </div>
        <span style={{ background: "#00e5a022", color: "#00e5a0", border: "1px solid #00e5a044", borderRadius: 8, padding: "4px 12px", fontSize: 15, fontWeight: 800, flexShrink: 0 }}>{data.rating}</span>
      </div>
      <MetaRow label="Founded" value={`${data.founded} (${age} yrs)`} />
      <MetaRow label="Virtual Bank" value={data.virtualBank ? "Yes" : "No"} />
      <MetaRow label="Physical Branches" value={data.virtualBank ? "None" : data.branches.toLocaleString()} />
      <MetaRow label="Assets (last year)" value={`$${data.assetsLastYear}`} mono />
      <MetaRow label="Virtual Cards" value={data.offersVirtualCards ? "✓ Available" : "✗ Not offered"} />
      <MetaRow label="Digital Onboarding" value={data.digitalOnboarding ? "✓ Full digital" : "✗ In-branch required"} />
      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {data.virtualBank && <Pill active>Virtual-first</Pill>}
        {data.offersVirtualCards && <Pill active>Virtual Cards</Pill>}
        {data.digitalOnboarding && <Pill active>Digital Onboarding</Pill>}
        {data.branches > 1000 && <Pill active>Large Branch Network</Pill>}
        {!data.virtualBank && <Pill>Brick & Mortar</Pill>}
      </div>
    </div>
  );
}

function AddressCard({ data }) {
  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0057ff22,#00e5a033)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "1px solid #00e5a022", flexShrink: 0 }}>{data.icon}</div>
        <div>
          <div style={{ color: "#cde8ff", fontSize: 17, fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>{data.label}</div>
          <div style={{ color: "#4a7a9b", fontSize: 12, marginTop: 2 }}>{data.address}</div>
        </div>
      </div>
      <div style={{ background: "#0d1f2f", borderRadius: 8, padding: "12px 14px", marginBottom: 16, borderLeft: "3px solid #00e5a0" }}>
        <p style={{ color: "#8ab8d0", fontSize: 13, margin: 0, lineHeight: 1.6 }}>{data.description}</p>
      </div>
      {Object.entries(data.details).map(([k, v]) => (
        <MetaRow key={k} label={k.replace(/_/g, " ")} value={String(v)} />
      ))}
      <div style={{ marginTop: 16 }}>
        <Pill active>{data.label}</Pill>
      </div>
    </div>
  );
}

function NotFound({ query, onSuggest }) {
  const suggestions = [
    { label: "🏦 Nubank", q: "Nubank" },
    { label: "🏦 Revolut", q: "Revolut" },
    { label: "🏦 HSBC", q: "HSBC" },
    { label: "🗼 Eiffel Tower", q: "Eiffel Tower" },
    { label: "🏥 Johns Hopkins", q: "Johns Hopkins Hospital" },
    { label: "🛒 Dubai Mall", q: "Dubai Mall" },
    { label: "✈️ Schiphol Airport", q: "Schiphol Airport" },
    { label: "🍽️ El Celler de Can Roca", q: "Restaurant El Celler de Can Roca" },
  ];
  return (
    <div style={{ textAlign: "center", padding: "24px 0", animation: "slideUp 0.3s ease" }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
      <p style={{ color: "#4a7a9b", fontSize: 14, marginBottom: 16 }}>
        No record found for <strong style={{ color: "#8ab8d0" }}>"{query}"</strong>
      </p>
      <p style={{ color: "#2a4a5f", fontSize: 12, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Try one of these</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {suggestions.map(s => (
          <button key={s.q} onClick={() => onSuggest(s.q)} style={{
            background: "#0d1f2f", border: "1px solid #1e3a50", borderRadius: 6,
            color: "#6a9ab0", fontSize: 12, padding: "5px 10px", cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}>{s.label}</button>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

const EXAMPLES = [
  { label: "🏦 Santander", q: "Santander" },
  { label: "💻 Revolut", q: "Revolut" },
  { label: "🏥 Narayana Health", q: "Narayana Health" },
  { label: "🗼 Eiffel Tower", q: "Eiffel Tower" },
  { label: "🛒 Dubai Mall", q: "Dubai Mall" },
  { label: "✈️ Schiphol", q: "Schiphol Airport" },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [lastQuery, setLastQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const runSearch = (q) => {
    if (!q.trim()) return;
    setLoading(true);
    setQuery(q);
    setTimeout(() => {
      setResult(searchDatabase(q));
      setLastQuery(q);
      setLoading(false);
    }, 380);
  };

  const handleKey = (e) => { if (e.key === "Enter") runSearch(query); };

  const bankCount = Object.keys(DB.banks).length;
  const addrCount = Object.keys(DB.addresses).length;

  return (
    <div style={{ minHeight: "100vh", background: "#020d18", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Inter', sans-serif", padding: "40px 16px 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input::placeholder { color:#2a4a5f; }
        input:focus { outline:none; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#0a1a28} ::-webkit-scrollbar-thumb{background:#1a3a50;border-radius:4px}
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 36, maxWidth: 560 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0d1f2f", border: "1px solid #1a3a50", borderRadius: 999, padding: "4px 14px", marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e5a0", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#4a7a9b", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Global Database</span>
        </div>
        <h1 style={{ margin: "0 0 10px", fontSize: 38, fontFamily: "'Sora', sans-serif", fontWeight: 900, color: "#cde8ff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Entity<span style={{ color: "#00e5a0" }}>Lookup</span>
        </h1>
        <p style={{ color: "#4a7a9b", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
          Search any bank or address to retrieve structured metadata — branch count, assets, property type, and more.
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 560, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", background: "#0a1825", border: "1.5px solid #1a3a55", borderRadius: 14, overflow: "hidden" }}>
          <span style={{ padding: "0 14px", color: "#2a4a5f", fontSize: 18, flexShrink: 0 }}>🔎</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder='Try "Nubank", "Eiffel Tower", "Dubai Mall"…'
            style={{ flex: 1, background: "transparent", border: "none", padding: "16px 0", color: "#cde8ff", fontSize: 15, fontFamily: "'Inter', sans-serif", minWidth: 0 }}
          />
          <button onClick={() => runSearch(query)}
            style={{ background: "#00e5a0", border: "none", padding: "0 22px", height: "100%", minHeight: 54, cursor: "pointer", color: "#021510", fontWeight: 800, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Sora', sans-serif", flexShrink: 0 }}
            onMouseEnter={e => e.target.style.background = "#00ffb2"}
            onMouseLeave={e => e.target.style.background = "#00e5a0"}
          >Search</button>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 560, marginBottom: 32 }}>
        {EXAMPLES.map(ex => (
          <button key={ex.q} onClick={() => runSearch(ex.q)}
            style={{ background: "#0a1825", border: "1px solid #1a3a50", borderRadius: 999, color: "#5a8aaa", fontSize: 12, padding: "6px 14px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => { e.target.style.borderColor = "#00e5a055"; e.target.style.color = "#00e5a0"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#1a3a50"; e.target.style.color = "#5a8aaa"; }}
          >{ex.label}</button>
        ))}
      </div>

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#4a7a9b", fontSize: 14 }}>
          <div style={{ width: 18, height: 18, border: "2px solid #1a3a50", borderTop: "2px solid #00e5a0", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
          Querying database…
        </div>
      )}

      {!loading && result && (
        <div style={{ width: "100%", maxWidth: 560, background: "#0a1825", border: "1.5px solid #1a3a55", borderRadius: 16, padding: "24px 22px", boxShadow: "0 0 40px #00e5a008" }}>
          {result.kind === "bank" && <BankCard data={result.data} />}
          {result.kind === "address" && <AddressCard data={result.data} />}
          {result.kind === "not_found" && <NotFound query={lastQuery} onSuggest={runSearch} />}
        </div>
      )}

      {!result && !loading && (
        <p style={{ color: "#1a3a50", fontSize: 12, marginTop: 8 }}>
          Database · {bankCount} banks · {addrCount} addresses · global coverage
        </p>
      )}
    </div>
  );
}
