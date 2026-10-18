import React, { useEffect, useRef } from "react";
import { pictures } from "../data/pictures";
import { VineInner, Medallion } from "../utils/svgs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function InvitationWords({ wedding, t, lang }) {
  const gp = wedding.families.groom;
  const bp = wedding.families.bride;
  const wordsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on arch image
      gsap.fromTo(
        ".arch img",
        { yPercent: -9 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".arch",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Arch curtain clipPath reveal
      gsap.from(".arch", {
        clipPath: "inset(100% 0% 0% 0% round 999px 999px 18px 18px)",
        duration: 1.6,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".arch",
          start: "top 80%",
          once: true
        }
      });

      // Words card reveal
      gsap.from(".words__card", {
        y: 32,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".words__card",
          start: "top 80%",
          once: true
        }
      });
    }, wordsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wordsRef} className="chapter words" id="words">
      <svg className="words__florals emboss" id="words-florals" viewBox="0 0 260 260" aria-hidden="true">
        <g transform="translate(260 0) scale(-1 1)">
          <VineInner />
        </g>
      </svg>
      <div className="words__grid">
        <div className="arch" data-parallax-wrap>
          <img
            src={pictures.words.main}
            srcSet={pictures.words.srcSet}
            sizes="(max-width: 860px) 78vw, 40vw"
            alt={pictures.words.alt}
            loading="lazy"
          />
        </div>
        <article className="paper words__card" id="words-card">
          <div className="paper__parents">
            <p>
              {lang === "km" ? (
                <>
                  {gp.father.km}
                  <br />
                  {gp.mother.km}
                </>
              ) : (
                <>
                  {gp.father.en.toUpperCase().replace("MR.", "Mr.").replace("MRS.", "Mrs.")}
                  <br />
                  {gp.mother.en.toUpperCase().replace("MRS.", "Mrs.")}
                </>
              )}
            </p>
            <p>
              {lang === "km" ? (
                <>
                  {bp.father.km}
                  <br />
                  {bp.mother.km}
                </>
              ) : (
                <>
                  {bp.father.en.toUpperCase().replace("MR.", "Mr.").replace("MRS.", "Mrs.")}
                  <br />
                  {bp.mother.en.toUpperCase().replace("MRS.", "Mrs.")}
                </>
              )}
            </p>
          </div>
          <h2 className="paper__honor">{t.cardHonor}</h2>
          <p className="paper__body">{t.cardBody}</p>
          <div className="paper__couple">
            <div className="paper__person">
              <small>{t.cardSon}</small>
              <b className="foil">{wedding.couple.groom[lang]}</b>
            </div>
            <div className="paper__mono" id="paper-mono" aria-hidden="true">
              <Medallion />
            </div>
            <div className="paper__person">
              <small>{t.cardDaughter}</small>
              <b className="foil">{wedding.couple.bride[lang]}</b>
            </div>
          </div>
          <p className="paper__when">{t.cardWhen}</p>
        </article>
      </div>
    </section>
  );
}
