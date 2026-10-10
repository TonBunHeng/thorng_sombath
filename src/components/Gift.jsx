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
    }, giftRef);

    return () => ctx.revert();
  }, [wedding.gift.enabled]);

  if (!wedding.gift.enabled) return null;

  const khqrAccounts = wedding.gift.accounts.filter((acc) =>
    /khqr/i.test(acc.bank) || /khqr/i.test(acc.qr || "")
  );

  return (
    <section ref={giftRef} className="chapter gift bg-olive-900 text-center pt-8" id="gift">
      <span className="kicker text-foil block">
        {t.giftKicker}
      </span>
      <Divider />
      <p className="gift__note max-w-[34em] text-cream-dim mx-auto mb-[1.6rem]">{t.giftNote}</p>

      <div className="gift__cards grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[1.2rem] max-w-[760px] mx-auto mt-8" id="gift-cards">
        {khqrAccounts.map((acc, idx) => (
          <figure key={idx} className="gift__card bg-gradient-to-br from-olive-700 to-olive-800 rounded-md grid justify-items-center gap-2.5 m-0 p-[1.4rem] shadow-[inset_0_0_0_1px_rgba(217,177,90,0.35)]">
            <div className="caps text-foil">
              {acc.bank}
            </div>
            <img
              className="gift__img bg-white rounded-[10px] w-full max-w-[300px]"
              src={acc.qr}
              alt={`${acc.bank} QR`}
              loading="lazy"
            />
            <a
              className="btn mt-3.5"
              href={acc.qr}
              download={`${acc.bank}-QR.jpg`}
            >
              {lang === "km" ? "រក្សាទុករូប QR" : "Save QR"}
            </a>
          </figure>
        ))}
      </div>
    </section>
  );
}
