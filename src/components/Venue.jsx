import React, { useEffect, useRef } from "react";
import { Crest } from "../utils/svgs";
import { formatDate } from "../data/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

      gsap.from(".venue__name, .venue__meta, .venue__when, .venue__actions", {
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
      "PRODID:-//Hean SamBath Ton ChanThorng Wedding//EN",
      "BEGIN:VEVENT",
      `UID:${formatCalDate(start)}-wedding`,
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

      <div className="venue__crest" style={{ width: 80, margin: "1rem auto 0" }}>
        <Crest />
      </div>

      <div className="venue__name foil">{wedding.venue.name[lang]}</div>
      <div className="venue__meta">{wedding.venue.address[lang]}</div>

      <div className="venue__when">
        <div className="caps" style={{ color: "var(--foil-hi)" }}>{dateObj.weekday}</div>
        <div>{dateObj.date}</div>
        <div>{dateObj.time}</div>
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
