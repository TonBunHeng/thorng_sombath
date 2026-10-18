import React, { useEffect, useRef } from "react";
import { toKhmerNumber } from "../data/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Programme({ wedding, t, lang }) {
  const progRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".programme__card", {
        y: 35,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".programme__card",
          start: "top 85%",
          once: true
        }
      });
    }, progRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={progRef} className="chapter programme" id="programme">
      <article className="paper programme__card">
        <h2 className="paper__title">{t.programmeCardTitle}</h2>
        <div id="programme-list">
          {wedding.programme.map((day, dIdx) => (
            <section key={dIdx} className="pday">
              <h3 className="pday__title">{day[lang]}</h3>
              <ol className="pday__rows">
                {day.rows.map((row, rIdx) => {
                  const timeFormatted =
                    lang === "km"
                      ? `${t.timeWord} ${toKhmerNumber(row.t)} ${row.pkm}`
                      : `${row.t.replace(/^0/, "")} ${row.pen}`;

                  return (
                    <li
                      key={rIdx}
                      className={`prow${row.main ? " prow--main" : ""}`}
                    >
                      <span className="prow__time">{timeFormatted}</span>
                      <span className="prow__sep" aria-hidden="true">:</span>
                      <span className="prow__what">{row[lang]}</span>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
