import React, { useEffect, useRef } from "react";
import { Crest } from "../utils/svgs";
import { formatDate } from "../data/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROADS = [
  "M190 30 V470",
  "M190 468 L757 612 L848 642",
  "M352 520 L190 682 V1540",
  "M190 241 H1160",
  "M757 150 V1000",
  "M575 585 V1540",
  "M190 1005 H575",
  "M40 1298 H800",
  "M30 797 L190 768",
  "M985 612 L1200 532",
  "M965 735 V985",
  "M880 716 L757 798"
];

const ARROWS = [
  [190, 395, 90],
  [322, 586, 135],
  [190, 752, 90],
  [575, 660, 90],
  [785, 632, 180],
  [515, 1005, 180],
  [190, 985, -90]
];

const LABELS = [
  { km: "ផ្លូវ៦០ម៉ែត្រ", en: "60 m Road", x: 345, y: 241, s: 30, band: 1 },
  { km: "ផ្លូវ៦០ម៉ែត្រ", en: "60 m Road", x: 960, y: 241, s: 30, band: 1 },
  { km: "ផ្លូវជាតិលេខ២", en: "National Road 2", x: 190, y: 190, r: -90, s: 28, band: 1 },
  { km: "មកពីភ្នំពេញ", en: "From Phnom Penh", x: 1100, y: 572, r: -20.4, s: 28, band: 1 },
  { km: "ផ្លូវមាត់ទន្លេ", en: "Riverside Rd", x: 965, y: 870, r: -90, s: 28, band: 1 },
  { km: "ផ្លូវ១០៥", en: "Road 105", x: 757, y: 880, r: -90, s: 28, band: 1 },
  { km: "ច្រកទី៥", en: "Lane 5", x: 470, y: 1052, s: 30 },
  { km: "វត្តព្រះពុទ្ធអណ្តែត", en: "Wat Preah Puth Andaet", x: 585, y: 366, s: 32, es: 25, ex: 555 },
  { km: "Coffee Nobicah", en: "Coffee Nobicah", x: 404, y: 426, r: 14, s: 27, latin: 1 },
  { km: "កាក់សសាំង", en: "Kak Sa Sang", x: 411, y: 668, s: 28 },
  { km: "ស្ពាន៦០ម៉ែត្រ", en: "60 m Bridge", x: 806, y: 382, s: 30, a: "start" },
  { km: "ស្ពានព្រែកហូរ", en: "Prek Ho Bridge", x: 652, y: 668, s: 24, es: 19, ex: 668 },
  { km: "រង្វង់មូល", en: "Ta Khmau", x: 930, y: 658, s: 26, es: 21 },
  { km: "តាខ្មៅ", en: "Circle", x: 930, y: 692, s: 26, es: 21 },
  { km: "ស្នាក់ការគណបក្ស", en: "Party Office", x: 606, y: 1398, s: 28, a: "start" }
];

export function Venue({ wedding, t, lang }) {
  const dateObj = formatDate(wedding.date, lang);
  const venueRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".venue__crest", {
        scale: 0.4,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".venue__crest",
          start: "top 85%",
          once: true
        }
      });

      gsap.from(".venue__name, .venue__meta, .venue__when, .venue__card, .venue__contacts, .venue__map, .venue__actions", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".venue__name",
          start: "top 88%",
          once: true
        }
      });
    }, venueRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCalendar = () => {
    const start = new Date(wedding.date);
    const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);

    const formatCalDate = (d) =>
      d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

    const title = `${wedding.couple.groom.en} & ${wedding.couple.bride.en} — Wedding`;
    const location = `${wedding.venue.name.en}, ${wedding.venue.address.en}`;

    const isMobile = /android|iphone|ipad/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatCalDate(start)}/${formatCalDate(end)}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(wedding.venue.mapsUrl)}`,
        "_blank"
      );
      return;
    }

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Raksmey Pheakdey Wedding//EN",
      "BEGIN:VEVENT",
      `UID:${formatCalDate(start)}-rp-wedding`,
      `DTSTAMP:${formatCalDate(new Date())}`,
      `DTSTART:${formatCalDate(start)}`,
      `DTEND:${formatCalDate(end)}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${wedding.venue.mapsUrl}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-invitation.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section ref={venueRef} className="chapter venue" id="venue">
      <span className="kicker" style={{ color: "var(--foil)", display: "block" }}>
        {t.venueKicker}
      </span>

      <div id="angkor">
        <Crest className="venue__crest" />
        <svg className="venue__pin" viewBox="0 0 40 52" fill="none" aria-hidden="true">
          <path d="M20 50 C20 50 4 31 4 19 A16 16 0 0 1 36 19 C36 31 20 50 20 50 Z" stroke="url(#g-foil)" strokeWidth="1.4" />
          <path d="M20 9 C24 14 24 22 20 27 C16 22 16 14 20 9 Z" fill="url(#g-foil)" />
        </svg>
      </div>

      <div className="venue__name foil">{wedding.venue.name[lang]}</div>
      <div className="venue__meta">{wedding.venue.address[lang]}</div>

      <div className="venue__when">
        <div className="caps" style={{ color: "var(--foil-hi)" }}>{dateObj.weekday}</div>
        <div>{dateObj.date}</div>
        <div>{dateObj.time}</div>
        {wedding.dateIsPlaceholder && <div className="tbc">{t.dateTbc}</div>}
      </div>

      {/* Stylized vector map card */}
      <figure className="paper venue__card" id="venue-card">
        <figcaption className="caps">{t.mapKicker}</figcaption>
        <div id="line-map">
          <svg className="linemap" viewBox="20 40 1200 1420" role="img" aria-label="Map to the wedding house">
            <g className="lm-roads" fill="none" strokeLinejoin="round">
              <g stroke="var(--paper-ink)" strokeWidth="54">
                {ROADS.map((d, i) => (
                  <path key={i} d={d} />
                ))}
                <circle cx="930" cy="668" r="76" />
              </g>
              <g stroke="var(--paper)" strokeWidth="40">
                {ROADS.map((d, i) => (
                  <path key={i} d={d} />
                ))}
                <circle cx="930" cy="668" r="76" />
              </g>
            </g>
            <g className="lm-marks" fill="var(--paper-ink)" stroke="none">
              <rect x="378" y="448" width="74" height="36" transform="rotate(14 415 466)" />
              <rect x="374" y="592" width="74" height="36" />
              <rect x="606" y="1330" width="66" height="30" />
              {/* pagoda */}
              <g transform="translate(585 462)">
                <path d="M-78 18H78V30H-78Z" />
                <path d="M-62 18V-6H62V18Z" opacity=".9" />
                <path d="M-84 -4L-46 -30H46L84 -4Z" />
                <path d="M-54 -30L-24 -54H24L54 -30Z" />
                <path d="M-4 -54L0 -84L4 -54Z" />
                <path d="M-84 -4l-10 -16M84 -4l10 -16M-54 -30l-8 -14M54 -30l8 -14" stroke="var(--paper-ink)" strokeWidth="5" fill="none" />
              </g>
              {/* bridges */}
              <path d="M630 588 Q668 560 712 590 L700 622 Q666 602 640 618Z" />
              <path d="M728 336 Q700 380 728 424 L786 424 Q758 380 786 336Z" />
            </g>
            <g className="lm-arrows" fill="none" stroke="var(--paper-ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              {ARROWS.map(([x, y, r], i) => (
                <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
                  <path d="M-18 0H14M6 -8L16 0L6 8" />
                </g>
              ))}
            </g>
            <g className="lm-labels" fill="var(--paper-ink)">
              {LABELS.map((item, i) => {
                const text = lang === "km" ? item.km : item.en;
                const fontSize = lang === "en" && item.es ? item.es : item.s;
                const x = lang === "en" && item.ex ? item.ex : item.x;
                const y = item.y;
                const rot = item.r ? ` rotate(${item.r})` : "";
                const isLatinClass = lang === "km" && !item.latin ? "lm-t" : "lm-t lm-t--latin";
                const bandClass = item.band ? " lm-t--road" : "";
                return (
                  <text
                    key={i}
                    className={`${isLatinClass}${bandClass}`}
                    x="0"
                    y="0"
                    fontSize={fontSize}
                    textAnchor={item.a || "middle"}
                    dominantBaseline="central"
                    transform={`translate(${x} ${y})${rot}`}
                  >
                    {text}
                  </text>
                );
              })}
            </g>
            <g className="lm-house" transform="translate(345 850)">
              <circle className="lm-pulse" r="70" fill="none" stroke="var(--paper-line)" strokeWidth="5" />
              <path d="M-44 -2L0 -44L44 -2V40H-44Z" fill="var(--paper-ink)" />
              <path d="M-12 40V14H12V40Z" fill="var(--paper)" />
              <path d="M-54 -2L0 -54L54 -2" fill="none" stroke="var(--paper-ink)" strokeWidth="8" />
              <text x="-60" y="104" textAnchor="start" fill="var(--paper-ink)" className="lm-label">
                {t.houseLabel}
              </text>
            </g>
          </svg>
        </div>
      </figure>

      {/* Host contact numbers */}
      <div className="venue__contacts">
        <div className="caps">{t.contactTitle}</div>
        <div className="venue__tels" id="venue-tels">
          {wedding.contacts.map((c, i) => (
            <a key={i} className="btn tel" href={`tel:${c.tel}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
              </svg>
              <span>{c.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="venue__map">
        <iframe
          id="venue-map"
          title="Google Map"
          src={`https://maps.google.com/maps?q=${wedding.venue.lat},${wedding.venue.lng}&z=15&hl=${lang}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </div>

      <div className="venue__actions">
        <a
          className="btn"
          id="map-link"
          href={wedding.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{t.openMap}</span>
        </a>
        <button className="btn" id="ics-btn" type="button" onClick={handleAddToCalendar}>
          <span>{t.addCalendar}</span>
        </button>
      </div>

      {wedding.venue.note[lang] && (
        <p className="venue__meta" style={{ marginTop: "1.4rem", fontSize: ".9rem" }}>
          {wedding.venue.note[lang]}
        </p>
      )}
    </section>
  );
}
