import React, { useEffect, useRef } from "react";
import { Divider } from "../utils/svgs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Gift({ wedding, t, lang }) {
  const giftRef = useRef(null);

  useEffect(() => {
    if (!wedding.gift.enabled) return;

    const ctx = gsap.context(() => {
      gsap.from(".gift .kicker, .gift .divider, .gift__note", {
        y: 28,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: giftRef.current,
          start: "top 82%",
          once: true
        }
      });

      gsap.from(".gift__card", {
        y: 50,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".gift__cards",
          start: "top 85%",
          once: true
        }
      });
    }, giftRef);

    return () => ctx.revert();
  }, [wedding.gift.enabled]);

  if (!wedding.gift.enabled) return null;

  return (
    <section ref={giftRef} className="chapter gift" id="gift">
      <span className="kicker" style={{ color: "var(--foil)", display: "block" }}>
        {t.giftKicker}
      </span>
      <Divider />
      <p className="gift__note">{t.giftNote}</p>

      <div className="gift__cards" id="gift-cards">
        {wedding.gift.accounts.map((acc, idx) => (
          <figure key={idx} className="gift__card">
            <div className="caps" style={{ color: "var(--foil)" }}>
              {acc.bank}
            </div>
            <img
              className="gift__img"
              src={acc.qr}
              alt={`${acc.bank} QR · ${acc.name}`}
              loading="lazy"
            />
            <figcaption>{acc.side[lang]}</figcaption>
            <a
              className="btn"
              href={acc.qr}
              download={`${acc.bank}-QR.webp`}
              style={{ marginTop: ".8rem" }}
            >
              {lang === "km" ? "រក្សាទុករូប QR" : "Save QR"}
            </a>
          </figure>
        ))}
      </div>
    </section>
  );
}
