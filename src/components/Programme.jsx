import React, { useEffect, useRef } from "react";
import { toKhmerNumber } from "../data/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RITE_ICONS = {
  procession: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 15h18M5 15l1.5 4h11L19 15M8 15c0-3 1.8-5 4-5s4 2 4 5M12 10V7M10 7.5c1-1.2 3-1.2 4 0" />
    </svg>
  ),
  monk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c2.5 2.6 4 5.4 4 8.5A4 4 0 0 1 8 11.5C8 8.4 9.5 5.6 12 3ZM12 15.5V21M8.5 21h7" />
    </svg>
  ),
  scissors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6.5" cy="17" r="2.7" />
      <circle cx="17.5" cy="17" r="2.7" />
      <path d="M8.5 15 18 4M15.5 15 6 4" />
    </svg>
  ),
  tray: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h16M6 14c0 3 2.7 5 6 5s6-2 6-5M9 14c0-2.5 1.3-4 3-4s3 1.5 3 4M12 10V6.5M10.5 5.5 12 4l1.5 1.5" />
    </svg>
  ),
  candle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 10h5v10h-5zM12 7.5c1.4-1.3 1.4-3 0-4.5-1.4 1.5-1.4 3.2 0 4.5ZM7 20h10" />
    </svg>
  ),
  flower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12c-1-3 0-6 0-8 0 2 1 5 0 8Zm0 0c3-1 6 0 8 0-2 0-5 1-8 0Zm0 0c1 3 0 6 0 8 0-2-1-5 0-8Zm0 0c-3 1-6 0-8 0 2 0 5-1 8 0Z" />
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  ),
  thread: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12c3-4 5 4 8 0s5 4 8 0M7 8.5c2 1.2 3 3.5 3 3.5M17 15.5c-2-1.2-3-3.5-3-3.5" />
    </svg>
  ),
  dinner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16a8 7 0 0 1-16 0ZM9 19.5h6M16 4l-4 6M19 5l-5 5" />
    </svg>
  )
};

export function Programme({ wedding, t, lang }) {
  const progRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Golden thread scroll scrub
      gsap.fromTo(
        ".programme__thread span",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".programme__list",
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.4
          }
        }
      );

      // Light up each rite as scrolled into view
      document.querySelectorAll(".rite").forEach((riteEl) => {
        ScrollTrigger.create({
          trigger: riteEl,
          start: "top 65%",
          onEnter: () => riteEl.classList.add("is-lit"),
          onLeaveBack: () => riteEl.classList.remove("is-lit")
        });

        gsap.from(riteEl.querySelectorAll(".rite__time, h3, p"), {
          x: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: riteEl,
            start: "top 82%",
            once: true
          }
        });
      });
    }, progRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={progRef} className="chapter programme bg-olive-900" id="programme">
      <div className="programme__grid grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-16 max-w-[1180px] mx-auto">
        <div className="programme__aside md:sticky md:top-[18vh] self-start text-center md:text-left">
          <h2 className="display font-moul text-3xl md:text-5xl">{t.programmeKicker}</h2>
          {wedding.dateIsPlaceholder && <div className="tbc text-cream-dim opacity-80 text-xs mt-2">{t.dateTbc}</div>}
        </div>

        <div className="programme__list pl-16 relative">
          <div className="programme__thread absolute top-2.5 bottom-2.5 left-[21px] w-[1px] bg-foil/15" aria-hidden="true">
            <span className="bg-foil origin-top absolute inset-0"></span>
          </div>

          <ol id="programme-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {wedding.programme.map((rite, idx) => (
              <li key={idx} className="rite pb-10 relative">
                <div className="rite__icon absolute top-0 -left-16 w-11 h-11 rounded-full grid place-items-center bg-olive-900 shadow-[0_0_0_1px_rgba(217,177,90,0.35)]">
                  {RITE_ICONS[rite.icon] || RITE_ICONS.procession}
                </div>
                <div className="rite__time caps text-foil">
                  {lang === "km" ? toKhmerNumber(rite.time) : rite.time}
                </div>
                <h3 className="font-moul my-1 text-lg sm:text-xl font-normal leading-relaxed">{rite[lang]}</h3>
                <p className="text-cream-dim m-0 text-sm">{lang === "km" ? rite.dkm : rite.den}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
