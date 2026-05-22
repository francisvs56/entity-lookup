import { useState, useRef, useEffect } from "react";

// ── EMBEDDED DATABASE ─────────────────────────────────────────────────────────
const DB = {
  banks: {
    "jpmorgan chase": { name: "JPMorgan Chase", founded: 1799, virtualBank: false, branches: 4700, assetsLastYear: "3.9T", offersVirtualCards: true, digitalOnboarding: true, hq: "New York, USA", rating: "A+" },
    "bank of america": { name: "Bank of America", founded: 1904, virtualBank: false, branches: 3900, assetsLastYear: "3.3T", offersVirtualCards: true, digitalOnboarding: true, hq: "Charlotte, USA", rating: "A" },
    "hsbc": { name: "HSBC", founded: 1865, virtualBank: false, branches: 3900, assetsLastYear: "3.0T", offersVirtualCards: true, digitalOnboarding: true, hq: "London, UK", rating: "A" },
    "barclays": { name: "Barclays", founded: 1690, virtualBank: false, branches: 1200, assetsLastYear: "1.8T", offersVirtualCards: true, digitalOnboarding: true, hq: "London, UK", rating: "A-" },
    "deutsche bank": { name: "Deutsche Bank", founded: 1870, virtualBank: false, branches: 1400, assetsLastYear: "1.5T", offersVirtualCards: false, digitalOnboarding: true, hq: "Frankfurt, Germany", rating: "BBB+" },
    "bnp paribas": { name: "BNP Paribas", founded: 1848, virtualBank: false, branches: 6800, assetsLastYear: "2.9T", offersVirtualCards: true, digitalOnboarding: true, hq: "Paris, France", rating: "A+" },
    "santander": { name: "Banco Santander", founded: 1857, virtualBank: false, branches: 9900, assetsLastYear: "1.8T", offersVirtualCards: true, digitalOnboarding: true, hq: "Madrid, Spain", rating: "A-" },
    "itau unibanco": { name: "Itaú Unibanco", founded: 1945, virtualBank: false, branches: 4300, assetsLastYear: "570B", offersVirtualCards: true, digitalOnboarding: true, hq: "São Paulo, Brazil", rating: "BB+" },
    "bradesco": { name: "Banco Bradesco", founded: 1943, virtualBank: false, branches: 3600, assetsLastYear: "390B", offersVirtualCards: true, digitalOnboarding: true, hq: "Osasco, Brazil", rating: "BB+" },
    "nubank": { name: "Nubank", founded: 2013, virtualBank: true, branches: 0, assetsLastYear: "28B", offersVirtualCards: true, digitalOnboarding: true, hq: "São Paulo, Brazil", rating: "BB-" },
    "icbc": { name: "Industrial and Commercial Bank of China (ICBC)", founded: 1984, virtualBank: false, branches: 16000, assetsLastYear: "6.3T", offersVirtualCards: false, digitalOnboarding: true, hq: "Beijing, China", rating: "A" },
    "mitsubishi ufj": { name: "Mitsubishi UFJ Financial Group", founded: 1880, virtualBank: false, branches: 3600, assetsLastYear: "3.6T", offersVirtualCards: false, digitalOnboarding: true, hq: "Tokyo, Japan", rating: "A-" },
    "standard chartered": { name: "Standard Chartered", founded: 1853, virtualBank: false, branches: 1100, assetsLastYear: "850B", offersVirtualCards: true, digitalOnboarding: true, hq: "London, UK", rating: "A-" },
    "ing bank": { name: "ING Bank", founded: 1991, virtualBank: false, branches: 900, assetsLastYear: "1.1T", offersVirtualCards: true, digitalOnboarding: true, hq: "Amsterdam, Netherlands", rating: "A+" },
    "revolut": { name: "Revolut", founded: 2015, virtualBank: true, branches: 0, assetsLastYear: "30B", offersVirtualCards: true, digitalOnboarding: true, hq: "London, UK", rating: "B+" },
    "n26": { name: "N26", founded: 2013, virtualBank: true, branches: 0, assetsLastYear: "6B", offersVirtualCards: true, digitalOnboarding: true, hq: "Berlin, Germany", rating: "B" },
    "monzo": { name: "Monzo", founded: 2015, virtualBank: true, branches: 0, assetsLastYear: "9B", offersVirtualCards: true, digitalOnboarding: true, hq: "London, UK", rating: "B" },
    "chime": { name: "Chime", founded: 2013, virtualBank: true, branches: 0, assetsLastYear: "14B", offersVirtualCards: true, digitalOnboarding: true, hq: "San Francisco, USA", rating: "B" },
    "ally bank": { name: "Ally Bank", founded: 2009, virtualBank: true, branches: 0, assetsLastYear: "196B", offersVirtualCards: true, digitalOnboarding: true, hq: "Sandy, USA", rating: "B+" },
    "wells fargo": { name: "Wells Fargo", founded: 1852, virtualBank: false, branches: 4300, assetsLastYear: "1.9T", offersVirtualCards: false, digitalOnboarding: true, hq: "San Francisco, USA", rating: "A-" },
    "citibank": { name: "Citibank", founded: 1812, virtualBank: false, branches: 650, assetsLastYear: "2.4T", offersVirtualCards: true, digitalOnboarding: true, hq: "New York, USA", rating: "A" },
    "credit suisse": { name: "Credit Suisse", founded: 1856, virtualBank: false, branches: 740, assetsLastYear: "580B", offersVirtualCards: false, digitalOnboarding: false, hq: "Zurich, Switzerland", rating: "BBB" },
    "ubs": { name: "UBS", founded: 1862, virtualBank: false, branches: 850, assetsLastYear: "1.7T", offersVirtualCards: true, digitalOnboarding: true, hq: "Zurich, Switzerland", rating: "A+" },
    "bbva": { name: "BBVA", founded: 1857, virtualBank: false, branches: 7000, assetsLastYear: "850B", offersVirtualCards: true, digitalOnboarding: true, hq: "Bilbao, Spain", rating: "A-" },
    "societe generale": { name: "Société Générale", founded: 1864, virtualBank: false, branches: 3700, assetsLastYear: "1.7T", offersVirtualCards: true, digitalOnboarding: true, hq: "Paris, France", rating: "A" },
    "absa": { name: "Absa Group", founded: 1991, virtualBank: false, branches: 1200, assetsLastYear: "105B", offersVirtualCards: true, digitalOnboarding: true, hq: "Johannesburg, South Africa", rating: "BB+" },
    "axis bank": { name: "Axis Bank", founded: 1993, virtualBank: false, branches: 4900, assetsLastYear: "210B", offersVirtualCards: true, digitalOnboarding: true, hq: "Mumbai, India", rating: "BBB-" },
    "hdfc bank": { name: "HDFC Bank", founded: 1994, virtualBank: false, branches: 7800, assetsLastYear: "370B", offersVirtualCards: true, digitalOnboarding: true, hq: "Mumbai, India", rating: "BBB-" },
    "mercado pago": { name: "Mercado Pago", founded: 2003, virtualBank: true, branches: 0, assetsLastYear: "18B", offersVirtualCards: true, digitalOnboarding: true, hq: "Buenos Aires, Argentina", rating: "B-" },
    "kakaobank": { name: "KakaoBank", founded: 2017, virtualBank: true, branches: 0, assetsLastYear: "35B", offersVirtualCards: true, digitalOnboarding: true, hq: "Seongnam, South Korea", rating: "BBB+" },
  },
  addresses: {
    "eiffel tower": { address: "Champ de Mars, 5 Av. Anatole France, Paris, France", type: "tourist_attraction", label: "Tourist Attraction", icon: "🗼", description: "Iconic wrought-iron lattice tower and global landmark", details: { height_meters: 330, year_built: 1889, visitors_per_year: "7M", floors: 3 } },
    "burj khalifa": { address: "1 Sheikh Mohammed bin Rashid Blvd, Dubai, UAE", type: "skyscraper", label: "Skyscraper / Mixed-Use", icon: "🏙️", description: "World's tallest building with offices, residences, and hotel", details: { floors: 163, height_meters: 828, year_built: 2010, use: "Mixed: office, residential, hotel" } },
    "tokyo disneyland": { address: "1-1 Maihama, Urayasu, Chiba, Japan", type: "theme_park", label: "Theme Park", icon: "🎡", description: "Major theme park operated by Oriental Land Company", details: { opened: 1983, annual_visitors: "17M", area_hectares: 46 } },
    "johns hopkins hospital": { address: "1800 Orleans St, Baltimore, USA", type: "hospital", label: "Hospital", icon: "🏥", description: "Johns Hopkins Hospital — world-renowned academic medical center", details: { beds: 1162, founded: 1889, staff: 6000, specialties: "Oncology, Neurology, Cardiology" } },
    "la sagrada familia": { address: "Carrer de Mallorca, 401, Barcelona, Spain", type: "church", label: "Church / Cathedral", icon: "⛪", description: "Gaudí's famous basilica, under construction since 1882", details: { started: 1882, expected_completion: 2026, height_meters: 172, visitors_per_year: "4.5M" } },
    "amazon headquarters": { address: "410 Terry Ave N, Seattle, USA", type: "corporate_campus", label: "Corporate Campus", icon: "🏢", description: "Amazon.com global headquarters — Day 1 building", details: { employees_on_site: 55000, buildings: 40, year: 2010 } },
    "oxford university": { address: "Wellington Square, Oxford, UK", type: "university", label: "University", icon: "🎓", description: "University of Oxford — oldest English-speaking university", details: { founded: 1096, students: 24000, colleges: 39, endowment: "$8.5B" } },
    "harrods": { address: "87-135 Brompton Rd, London, UK", type: "store", label: "Department Store", icon: "🛍️", description: "Harrods — iconic luxury department store", details: { founded: 1849, floors: 7, area_sqm: 90000, departments: 330 } },
    "dubai mall": { address: "Financial Centre Rd, Downtown Dubai, UAE", type: "shopping_mall", label: "Shopping Mall", icon: "🛒", description: "Dubai Mall — one of the world's largest shopping centres", details: { stores: 1200, opened: 2008, area_sqm: 502000, annual_visitors: "80M" } },
    "favela do rocinha": { address: "Rocinha, Rio de Janeiro, Brazil", type: "residential_neighborhood", label: "Residential Neighborhood", icon: "🏘️", description: "Rocinha — largest favela in Brazil, dense urban community", details: { population: 70000, area_hectares: 86, established: 1930 } },
    "marina bay sands": { address: "10 Bayfront Ave, Singapore", type: "hotel", label: "Hotel / Resort", icon: "🏨", description: "Marina Bay Sands — iconic integrated resort with infinity pool", details: { rooms: 2561, stars: 5, opened: 2010, amenities: "Casino, Skypark, Convention Centre, Theatres" } },
    "schiphol airport": { address: "Evert van de Beekstraat 202, Amsterdam, Netherlands", type: "airport", label: "International Airport", icon: "✈️", description: "Amsterdam Airport Schiphol — major European hub", details: { terminals: 1, runways: 6, passengers_yearly: "71M", opened: 1916 } },
    "tokyo fish market": { address: "6 Chome-6-4 Toyosu, Koto City, Tokyo, Japan", type: "market", label: "Wholesale Market", icon: "🐟", description: "Toyosu Market — world's largest wholesale fish market", details: { opened: 2018, daily_transactions: "1700T_yen", vendors: 500 } },
    "el alto freight terminal": { address: "Av. Juan Pablo II, El Alto, Bolivia", type: "freight_forwarder", label: "Freight / Logistics Terminal", icon: "🚢", description: "Major freight forwarding and customs clearance terminal", details: { founded: 2001, employees: 280, services: "Air, Road, Customs Brokerage", warehousing_sqm: 12000 } },
    "shinjuku station": { address: "Shinjuku, Tokyo, Japan", type: "transit_hub", label: "Train Station / Transit Hub", icon: "🚉", description: "Shinjuku Station — world's busiest railway station", details: { daily_passengers: "3.5M", platforms: 50, opened: 1885, exits: 200 } },
    "villa 31": { address: "Villa 31, Retiro, Buenos Aires, Argentina", type: "apartment_building", label: "Informal Settlement / Housing Complex", icon: "🏢", description: "Villa 31 — large urban informal housing complex near city centre", details: { population: 40000, blocks: 18, established: 1932 } },
    "escola estadual sao paulo": { address: "Rua da Escola 200, São Paulo, Brazil", type: "school", label: "Public School", icon: "🏫", description: "State public school serving primary and secondary education", details: { students: 620, founded: 1968, grades: "1st–12th", staff: 45 } },
    "cape town waterfront parking": { address: "V&A Waterfront, Cape Town, South Africa", type: "parking_lot", label: "Parking Garage", icon: "🅿️", description: "Multi-storey parking facility at V&A Waterfront complex", details: { spaces: 4000, floors: 6, covered: true, ev_charging: true } },
    "narayana health": { address: "258/A, Bommasandra Industrial Area, Bangalore, India", type: "hospital", label: "Hospital", icon: "🏥", description: "Narayana Health City — multi-speciality hospital campus", details: { beds: 2000, founded: 2000, staff: 7000, specialties: "Cardiac, Oncology, Orthopaedics" } },
    "les halles paris": { address: "101 Porte Berger, Paris, France", type: "shopping_mall", label: "Shopping Mall", icon: "🛒", description: "Forum des Halles — underground shopping centre in central Paris", details: { stores: 180, floors: 4, opened: 1979, renovated: 2016 } },
    "kim il sung university": { address: "Ryongnam-dong, Daesong District, Pyongyang, North Korea", type: "university", label: "University", icon: "🎓", description: "Kim Il-sung University — leading higher education institution", details: { founded: 1946, students: 16000, faculties: 16 } },
    "restaurant el celler de can roca": { address: "Can Sunyer 48, Girona, Spain", type: "restaurant", label: "Restaurant", icon: "🍽️", description: "El Celler de Can Roca — three Michelin star restaurant", details: { michelin_stars: 3, capacity: 55, cuisine: "Contemporary Catalan", opened: 1986 } },
    "singtel corporate office": { address: "31 Exeter Road, Comcentre, Singapore", type: "corporate_campus", label: "Corporate Office", icon: "🏢", description: "Singtel headquarters — leading Asian telecom group", details: { employees: 23000, founded: 1879, floors: 30 } },
    "casa cor buenos aires": { address: "Av. del Libertador 1400, Buenos Aires, Argentina", type: "house", label: "Luxury Residence", icon: "🏠", description: "Exclusive private residential property in Palermo district", details: { bedrooms: 6, floors: 3, area_sqm: 850, parking: "4-car underground" } },
    "port of rotterdam": { address: "Wilhelminakade 909, Rotterdam, Netherlands", type: "freight_forwarder", label: "Port / Freight Terminal", icon: "🚢", description: "Port of Rotterdam — Europe's largest seaport", details: { annual_cargo_mt: 470, area_sqkm: 105, founded: 1872, employees: 180000 } },
    "lycee louis le grand": { address: "123 Rue Saint-Jacques, Paris, France", type: "school", label: "Secondary School (Lycée)", icon: "🏫", description: "Lycée Louis-le-Grand — elite French secondary school", details: { students: 2400, founded: 1563, notable_alumni: "Voltaire, Molière, Victor Hugo" } },
    "four seasons george v": { address: "31 Avenue George V, Paris, France", type: "hotel", label: "Hotel", icon: "🏨", description: "Four Seasons Hotel George V — palace hotel near Champs-Élysées", details: { rooms: 244, stars: 5, opened: 1928, michelin_stars_restaurant: 3 } },
    "estadio azteca": { address: "Calz. de Tlalpan 3465, Ciudad de México, Mexico", type: "stadium", label: "Sports Stadium", icon: "🏟️", description: "Estadio Azteca — largest stadium in Latin America", details: { capacity: 87000, opened: 1966, home_team: "Club América & Mexico National Team" } },
    "kfc nairobi westgate": { address: "Westgate Shopping Mall, Nairobi, Kenya", type: "restaurant", label: "Fast Food Restaurant", icon: "🍽️", description: "KFC branch inside Westgate Shopping Mall", details: { capacity: 120, cuisine: "Fast Food", drive_through: false, opened: 2011 } },
    "bandra kurla complex": { address: "Bandra Kurla Complex, Mumbai, India", type: "corporate_campus", label: "Business District / Corporate Hub", icon: "🏢", description: "BKC — Mumbai's premier business and financial district", details: { area_hectares: 370, established: 1977, major_tenants: "SEBI, Reliance, HDFC, Citibank" } },
  }
};

// ── SEARCH ────────────────────────────────────────────────────────────────────
function searchDatabase(query) {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  if (DB.banks[q]) return { kind: "bank", data: DB.banks[q] };
  if (DB.addresses[q]) return { kind: "address", data: DB.addresses[q] };
  for (const [key, val] of Object.entries(DB.banks)) {
    if (key.includes(q) || q.includes(key) || val.name.toLowerCase().includes(q))
      return { kind: "bank", data: val };
  }
  for (const [key, val] of Object.entries(DB.addresses)) {
    if (key.includes(q) || q.includes(key) || val.description.toLowerCase().includes(q) || val.label.toLowerCase().includes(q) || val.address.toLowerCase().includes(q))
      return { kind: "address", data: val };
  }
  return { kind: "not_found" };
}

// ── RATING COLOR ──────────────────────────────────────────────────────────────
function ratingColor(r) {
  if (!r) return "#888";
  if (r.startsWith("A")) return "#d4a843";
  if (r.startsWith("BBB")) return "#8fb8d4";
  return "#a08070";
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Tag({ children, accent }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 10px", borderRadius: 3,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
      fontFamily: "'IBM Plex Mono', monospace",
      background: accent ? "#d4a84318" : "#1c1c1c",
      color: accent ? "#d4a843" : "#555",
      border: `1px solid ${accent ? "#d4a84340" : "#2a2a2a"}`,
    }}>{children}</span>
  );
}

function DataRow({ label, value, accent, mono }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "140px 1fr",
      alignItems: "center", padding: "11px 0",
      borderBottom: "1px solid #1a1a1a",
    }}>
      <span style={{
        color: "#3a3a3a", fontSize: 10, letterSpacing: "0.14em",
        textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600
      }}>{label}</span>
      <span style={{
        color: accent ? "#d4a843" : "#c8c0b0",
        fontSize: 13, fontFamily: mono ? "'IBM Plex Mono', monospace" : "'Libre Baskerville', serif",
        fontWeight: mono ? 400 : 400, letterSpacing: mono ? "0.02em" : "0"
      }}>{value}</span>
    </div>
  );
}

function BankCard({ data }) {
  const age = 2025 - data.founded;
  const tags = [
    data.virtualBank && { label: "Virtual-first", accent: true },
    data.offersVirtualCards && { label: "Virtual Cards", accent: true },
    data.digitalOnboarding && { label: "Digital Onboarding", accent: true },
    data.branches > 5000 && { label: "Mega Branch Network", accent: false },
    !data.virtualBank && data.branches <= 5000 && { label: "Brick & Mortar", accent: false },
  ].filter(Boolean);

  return (
    <div style={{ animation: "fadeSlide 0.35s ease" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "#3a3a3a", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase" }}>BANK</span>
            <span style={{ width: 20, height: 1, background: "#2a2a2a", display: "inline-block" }} />
          </div>
          <h2 style={{ margin: 0, fontSize: 22, fontFamily: "'Libre Baskerville', serif", fontWeight: 700, color: "#e8dcc8", lineHeight: 1.2, letterSpacing: "-0.01em" }}>{data.name}</h2>
          <p style={{ margin: "6px 0 0", color: "#3d3d3d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}>{data.hq}</p>
        </div>
        <div style={{
          textAlign: "center", flexShrink: 0,
          background: "#111", border: `2px solid ${ratingColor(data.rating)}33`,
          borderRadius: 4, padding: "10px 16px", minWidth: 64
        }}>
          <div style={{ fontSize: 20, fontFamily: "'Libre Baskerville', serif", fontWeight: 700, color: ratingColor(data.rating), lineHeight: 1 }}>{data.rating}</div>
          <div style={{ fontSize: 9, color: "#333", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginTop: 4 }}>RATING</div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 4 }}>
        <DataRow label="Founded" value={`${data.founded}  ·  ${age} yrs`} mono />
        <DataRow label="HQ" value={data.hq} />
        <DataRow label="Type" value={data.virtualBank ? "Virtual Bank" : "Traditional Bank"} accent={data.virtualBank} />
        <DataRow label="Branches" value={data.virtualBank ? "None (100% digital)" : data.branches.toLocaleString()} mono />
        <DataRow label="Assets" value={`$${data.assetsLastYear}`} mono accent />
        <DataRow label="Virtual Cards" value={data.offersVirtualCards ? "Available" : "Not offered"} accent={data.offersVirtualCards} />
        <DataRow label="Digital Onboarding" value={data.digitalOnboarding ? "Full digital" : "Branch required"} accent={data.digitalOnboarding} />
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 20 }}>
        {tags.map((t, i) => <Tag key={i} accent={t.accent}>{t.label}</Tag>)}
      </div>
    </div>
  );
}

function AddressCard({ data }) {
  return (
    <div style={{ animation: "fadeSlide 0.35s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: "#3a3a3a", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase" }}>{data.label}</span>
          <span style={{ width: 20, height: 1, background: "#2a2a2a", display: "inline-block" }} />
          <span style={{ fontSize: 18 }}>{data.icon}</span>
        </div>
        <h2 style={{ margin: 0, fontSize: 22, fontFamily: "'Libre Baskerville', serif", fontWeight: 700, color: "#e8dcc8", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
          {data.label === "Tourist Attraction" || data.label === "Skyscraper / Mixed-Use" || data.type === "church" || data.type === "stadium"
            ? Object.keys(DB.addresses).find(k => DB.addresses[k] === data)?.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ") || data.label
            : data.label}
        </h2>
        <p style={{ margin: "6px 0 0", color: "#3d3d3d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.6 }}>{data.address}</p>
      </div>

      <div style={{
        background: "#0d0d0d", borderLeft: "2px solid #d4a84360", borderRadius: "0 3px 3px 0",
        padding: "12px 16px", marginBottom: 20
      }}>
        <p style={{ margin: 0, color: "#6a6050", fontSize: 13, fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", lineHeight: 1.7 }}>{data.description}</p>
      </div>

      <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 4 }}>
        {Object.entries(data.details).map(([k, v]) => (
          <DataRow key={k} label={k.replace(/_/g, " ")} value={String(v)} mono={typeof v === "number"} />
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Tag accent>{data.label}</Tag>
      </div>
    </div>
  );
}

function NotFound({ query, onSuggest }) {
  const suggestions = [
    { label: "Nubank", q: "Nubank" }, { label: "Revolut", q: "Revolut" },
    { label: "HSBC", q: "HSBC" }, { label: "Eiffel Tower", q: "Eiffel Tower" },
    { label: "Johns Hopkins Hospital", q: "Johns Hopkins Hospital" },
    { label: "Dubai Mall", q: "Dubai Mall" }, { label: "Schiphol Airport", q: "Schiphol Airport" },
    { label: "El Celler de Can Roca", q: "Restaurant El Celler de Can Roca" },
  ];
  return (
    <div style={{ textAlign: "center", padding: "20px 0", animation: "fadeSlide 0.3s ease" }}>
      <div style={{ fontSize: 11, color: "#333", letterSpacing: "0.16em", fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", marginBottom: 10 }}>NO RECORD FOUND</div>
      <p style={{ color: "#4a4a4a", fontSize: 14, fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", marginBottom: 24 }}>
        "{query}" matched nothing in the database
      </p>
      <div style={{ fontSize: 10, color: "#2a2a2a", letterSpacing: "0.14em", fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", marginBottom: 12 }}>Suggested queries</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {suggestions.map(s => (
          <button key={s.q} onClick={() => onSuggest(s.q)} style={{
            background: "#0d0d0d", border: "1px solid #222", borderRadius: 3,
            color: "#555", fontSize: 11, padding: "5px 12px", cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.04em",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.target.style.color = "#d4a843"; e.target.style.borderColor = "#d4a84350"; }}
            onMouseLeave={e => { e.target.style.color = "#555"; e.target.style.borderColor = "#222"; }}
          >{s.label}</button>
        ))}
      </div>
    </div>
  );
}

// ── EXAMPLES ──────────────────────────────────────────────────────────────────
const EXAMPLES = [
  { label: "Santander", q: "Santander" },
  { label: "Revolut", q: "Revolut" },
  { label: "Narayana Health", q: "Narayana Health" },
  { label: "Eiffel Tower", q: "Eiffel Tower" },
  { label: "Dubai Mall", q: "Dubai Mall" },
  { label: "Schiphol", q: "Schiphol Airport" },
];

// ── APP ───────────────────────────────────────────────────────────────────────
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
    }, 320);
  };

  const bankCount = Object.keys(DB.banks).length;
  const addrCount = Object.keys(DB.addresses).length;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Inter', sans-serif", padding: "48px 16px 100px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        input::placeholder { color: #2a2a2a; font-family: 'IBM Plex Mono', monospace; font-size: 13px; }
        input:focus { outline: none; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #222; }
        
        /* Subtle grid background */
        body { background: #0a0a0a; }
      `}</style>

      {/* Decorative grid lines */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)", backgroundSize: "60px 60px", opacity: 0.25, pointerEvents: "none" }} />

      {/* Top accent line */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #d4a843, transparent)", opacity: 0.6 }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44, maxWidth: 580, position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ width: 24, height: 1, background: "#d4a84360" }} />
          <span style={{ color: "#3a3a3a", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.22em", textTransform: "uppercase" }}>Global Intelligence Database</span>
          <span style={{ width: 24, height: 1, background: "#d4a84360" }} />
        </div>

        <h1 style={{ fontSize: 42, fontFamily: "'Libre Baskerville', serif", fontWeight: 700, color: "#e8dcc8", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 14 }}>
          Entity<span style={{ color: "#d4a843" }}>Lookup</span>
        </h1>
        <p style={{ color: "#333", fontSize: 14, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.7, letterSpacing: "0.02em" }}>
          Retrieve structured metadata on banks, landmarks,<br />hospitals, airports, and more.
        </p>
      </div>

      {/* Search input */}
      <div style={{ width: "100%", maxWidth: 580, marginBottom: 12, position: "relative", zIndex: 1 }}>
        <div style={{
          display: "flex", alignItems: "center",
          background: "#0d0d0d", border: "1px solid #222",
          borderRadius: 4, overflow: "hidden",
          boxShadow: "0 0 0 0 transparent",
          transition: "border-color 0.2s",
        }}>
          <div style={{ padding: "0 14px", color: "#2a2a2a", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, flexShrink: 0, borderRight: "1px solid #1a1a1a", height: 54, display: "flex", alignItems: "center" }}>
            <span style={{ color: "#d4a84380" }}>›_</span>
          </div>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && runSearch(query)}
            placeholder='Search entity — "Nubank", "Eiffel Tower", "HSBC"…'
            style={{
              flex: 1, background: "transparent", border: "none", padding: "0 16px",
              color: "#c8c0b0", fontSize: 14, fontFamily: "'IBM Plex Mono', monospace",
              height: 54, minWidth: 0, letterSpacing: "0.02em"
            }}
          />
          <button
            onClick={() => runSearch(query)}
            style={{
              background: "#d4a843", border: "none", padding: "0 22px", height: 54,
              cursor: "pointer", color: "#0a0a0a", fontWeight: 600, fontSize: 11,
              letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace",
              flexShrink: 0, transition: "background 0.15s"
            }}
            onMouseEnter={e => e.target.style.background = "#e8bc55"}
            onMouseLeave={e => e.target.style.background = "#d4a843"}
          >Query</button>
        </div>
      </div>

      {/* Quick examples */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 580, marginBottom: 36, position: "relative", zIndex: 1 }}>
        {EXAMPLES.map(ex => (
          <button key={ex.q} onClick={() => runSearch(ex.q)}
            style={{
              background: "transparent", border: "1px solid #1e1e1e", borderRadius: 3,
              color: "#333", fontSize: 10, padding: "5px 12px", cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "all 0.15s"
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#d4a84350"; e.target.style.color = "#d4a843"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#1e1e1e"; e.target.style.color = "#333"; }}
          >{ex.label}</button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#333", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", position: "relative", zIndex: 1 }}>
          <div style={{ width: 14, height: 14, border: "1.5px solid #222", borderTop: "1.5px solid #d4a843", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
          QUERYING DATABASE...
        </div>
      )}

      {/* Result card */}
      {!loading && result && (
        <div style={{
          width: "100%", maxWidth: 580, position: "relative", zIndex: 1,
          background: "#0d0d0d", border: "1px solid #1e1e1e",
          borderRadius: 4, padding: "28px 28px 24px",
        }}>
          {/* Corner decoration */}
          <div style={{ position: "absolute", top: 0, right: 0, width: 30, height: 30, borderTop: "1px solid #d4a84330", borderRight: "1px solid #d4a84330", borderRadius: "0 4px 0 0" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 30, borderBottom: "1px solid #d4a84330", borderLeft: "1px solid #d4a84330", borderRadius: "0 0 0 4px" }} />

          {result.kind === "bank" && <BankCard data={result.data} />}
          {result.kind === "address" && <AddressCard data={result.data} />}
          {result.kind === "not_found" && <NotFound query={lastQuery} onSuggest={runSearch} />}
        </div>
      )}

      {/* Footer */}
      {!result && !loading && (
        <p style={{ color: "#1e1e1e", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", position: "relative", zIndex: 1 }}>
          {bankCount} banks · {addrCount} addresses · global coverage
        </p>
      )}
    </div>
  );
}
