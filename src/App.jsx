import React, { useEffect, useMemo, useState } from "react";

const timeline = [
  {
    time: "09:00 – 10:00 AM",
    title: "Arrival & Welcome",
    text: "Welcoming our guests and the groom's respected family into the homestead.",
  },
  {
    time: "10:00 – 11:00 AM",
    title: "Call to Order & Breakfast",
    text: "Introduction & welcome remarks. Groom is warmly invited to take breakfast.",
  },
  {
    time: "11:00 – 11:30 AM",
    title: "General Lunch is Served",
    text: "Sharing our meal in celebration and community with all attendees.",
  },
  {
    time: "11:30 – 12:30 PM",
    title: "Grand Bridal Entrance",
    text: "Bridal team entrance starting with the groom, groomsmen, bridesmaids, and finally the beautiful Bride.",
  },
  {
    time: "12:30 – 1:00 PM",
    title: "Word of Blessing",
    text: "Dignified words of counsel, official blessings, and prayer over Lynnette & Kelvin.",
  },
  {
    time: "1:00 – 2:30 PM",
    title: "Speeches, Gifting & Photos",
    text: "Representations and warm wishes from both sides, followed by gifting and photo sessions.",
  },
  {
    time: "2:30 – 4:00 PM",
    title: "Cake Cutting & Celebration",
    text: "Cutting of the ceremonial cake and joyous celebration.",
  },
  {
    time: "4:00 – 4:30 PM",
    title: "Vote of Thanks & Departure",
    text: "Final appreciation remarks, closing blessings, and guest departure.",
  },
];

const speeches = [
  { name: "Lynn's Uncles and Aunties from Sakwa" },
  { name: "Lynn's cousins from Sakwa" },
  { name: "Kelvin's Parents" },
  { name: "Kelvin's Uncles" },
  { name: "Kelvin's Aunties" },
  { name: "Kelvin's Cousins" },
  { name: "Lynn's Brothers & Mercy", note: "Together with the kids" },
  { name: "Kelvin's Brothers" },
  { name: "Min Odhis", note: "Mama Lynn's Close Friend" },
  { name: "Lynn's Friends" },
  { name: "Kelvin's Friends" },
  {
    name: "Lynn's colleagues from M-PESA",
    note: "M-PESA colleagues' presentation",
    
  },
  { name: "Kelvin's colleagues from Airtel" },
  { name: "Lynn's Aunties from Kamagambo" },
  { name: "Lynn's Uncles from Kamagambo" },
  { name: "Lynn's cousins from Kamagambo" },
];

function Icon({ type }) {
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 3v5M16 3v5M4 10h16" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </svg>
    );
  }

  if (type === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s6-5.8 6-11a6 6 0 1 0-12 0c0 5.2 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    );
  }

  if (type === "info") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 10v6M12 7.5h.01" />
      </svg>
    );
  }

  if (type === "copy") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="8" y="8" width="10" height="10" rx="2" />
        <path d="M6 15H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1" />
      </svg>
    );
  }

  return null;
}

function Flourish() {
  return (
    <div className="flourish" aria-hidden="true">
      <span />
      <b>✣</b>
      <span />
    </div>
  );
}

function Hero({ speechesPage = false }) {
  return (
    <header className={`hero ${speechesPage ? "hero--speeches" : ""}`}>
      <div className="botanical botanical--left" aria-hidden="true" />
      <div className="botanical botanical--right" aria-hidden="true" />

      {speechesPage ? (
        <>
          <p className="event-kicker">LYNNETTE & KELVIN NYOMBO</p>
          <Flourish />
          <h1 className="speeches-title">ORDER OF SPEECHES</h1>
          <p className="hero-subtitle">CELEBRATION ADDRESSES</p>
        </>
      ) : (
        <>
          <div className="hero-top-flourish" aria-hidden="true">
            <span />
            <b>✣</b>
            <span />
          </div>
          <h1>
            LYNNETTE &amp; KELVIN
            <span>NYOMBO</span>
          </h1>
          <p className="hero-subtitle">CEREMONY PROGRAMME</p>
          <p className="hero-date-small">Saturday, October 10, 2026</p>
          <div className="ceremony-pill">TRADITIONAL DOWRY CEREMONY</div>
        </>
      )}
    </header>
  );
}

function EventInfo() {
  const rows = [
    ["calendar", "DATE", "Saturday, 10th October 2026"],
    ["clock", "TIME", "9:00 AM – 5:00 PM"],
    ["pin", "VENUE", "Nyasoti Village, Rongo"],
  ];

  return (
    <div className="event-card">
      {rows.map(([icon, label, value]) => (
        <div className="event-row" key={label}>
          <div className="icon-disc">
            <Icon type={icon} />
          </div>
          <div>
            <p className="mini-label">{label}</p>
            <p className="event-value">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PageButton({ href, children, secondary = false }) {
  return (
    <a className={`page-button ${secondary ? "page-button--secondary" : ""}`} href={href}>
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function Timeline() {
  return (
    <section className="section timeline-section">
      <div className="eyebrow">
        <span />
        <em>THE JOURNEY</em>
        <span />
      </div>
      <h2>The Ceremony Timeline</h2>

      <div className="timeline">
        {timeline.map((item) => (
          <article className="timeline-item" key={item.time}>
            <span className="timeline-dot" aria-hidden="true" />
            <p className="timeline-time">{item.time}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <PageButton href="#/speeches">View Order of Speeches</PageButton>
    </section>
  );
}

function GiftCard() {
  const [copied, setCopied] = useState(false);
  const mpesaNumber = "4384466";

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(mpesaNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      window.prompt("Copy this M-PESA / Till number:", mpesaNumber);
    }
  }

  return (
    <section className="gift-section">
      <div className="eyebrow eyebrow--gift">
        <span />
        <em>GIFTING</em>
        <span />
      </div>
      <h2>Send a Gift via M-Pesa</h2>
      <p className="gift-intro">For guests who would like to send a gift or contribution.</p>

      <div className="gift-card">
        <div className="gift-number-row">
          <div>
            <p className="mini-label">M-PESA / TILL NUMBER</p>
            <strong>{mpesaNumber}</strong>
          </div>
          <button type="button" className="copy-button" onClick={copyNumber}>
            <Icon type="copy" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="gift-account">
          <p className="mini-label">ACCOUNT NAME</p>
          <strong>Lynnette Akinyi Omollo</strong>
        </div>
      </div>

      <div className={`copied-feedback ${copied ? "is-visible" : ""}`}>
        ✓ Copied!
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mark">✣</div>
      <h2>Two Hearts, One Journey</h2>
      <p>
        Thank you for joining and celebrating this beautiful milestone of love,
        culture and union with Lynnette &amp; Kelvin. Your presence and blessings
        are our greatest gifts.
      </p>
      <span>#LYNNETTEANDKELVIN2026</span>
    </footer>
  );
}

function CeremonyPage() {
  return (
    <main className="mobile-site">
      <section className="top-section">
        <Hero />
        <EventInfo />
      </section>

      <Timeline />
      <GiftCard />
      <Footer />
    </main>
  );
}

function SpeechCard({ item, index }) {
  return (
    <article className={`speech-card ${item.highlighted ? "speech-card--highlighted" : ""}`}>
      <span className="speech-number">{index + 1}</span>
      <div className="speech-copy">
        <h3>{item.name}</h3>
        {item.note && <p>{item.note}</p>}
      </div>
      <span className="speech-duration">10 mins</span>
    </article>
  );
}

function SpeechesPage() {
  return (
    <main className="mobile-site speeches-page">
      <section className="speeches-top">
        <Hero speechesPage />

        <div className="notice-card">
          <div className="icon-disc icon-disc--notice">
            <Icon type="info" />
          </div>
          <p>
            <strong>Notice:</strong> Groups will take photos with the couple while their
            representatives speak to save time. Gifts are given after speeches from the
            respective groups.
          </p>
        </div>

        <div className="speech-list">
          {speeches.map((item, index) => (
            <SpeechCard key={`${item.name}-${index}`} item={item} index={index} />
          ))}
        </div>

        <PageButton href="#/" secondary>
          Back to Ceremony Programme
        </PageButton>
      </section>

      <Footer />
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    function onHashChange() {
      setRoute(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const page = useMemo(
    () => (route === "#/speeches" ? <SpeechesPage /> : <CeremonyPage />),
    [route]
  );

  return <div className="app-shell">{page}</div>;
}
