import React, { useEffect, useRef } from "react";
import { pictures } from "../data/pictures";
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

      // Words text & parents cards reveal
      gsap.from(".words__text > *", {
        y: 32,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".words__text",
          start: "top 80%",
          once: true
        }
      });

      gsap.from(".parents > div", {
        y: 28,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".parents",
          start: "top 85%",
          once: true
        }
      });
    }, wordsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wordsRef} className="chapter words" id="words">
      <svg className="words__florals emboss" id="words-florals" viewBox="0 0 260 260" aria-hidden="true"></svg>
      <div className="words__grid">
        <div className="arch">
          <img
            src={pictures.words.main}
            srcSet={pictures.words.srcSet}
            sizes="(max-width: 860px) 78vw, 40vw"
            alt={pictures.words.alt}
            loading="lazy"
          />
        </div>
        <div className="words__text">
          <span className="kicker">{t.wordsKicker}</span>
          <h2 className="title">{t.wordsTitle}</h2>
          <p className="words__body serif-kh">{t.wordsBody}</p>

          <div className="parents">
            <div>
              <h4>{t.groomParents}</h4>
              <p>
                {gp.father[lang]}
                <br />
                {lang === "km" ? "" : "&"}
                {gp.mother[lang]}
              </p>
            </div>
            <div>
              <h4>{t.brideParents}</h4>
              <p>
                {bp.father[lang]}
                <br />
                {lang === "km" ? "" : "&"}
                {bp.mother[lang]}
              </p>
            </div>
          </div>

          <p className="words__thanks">{t.wordsThanks}</p>
        </div>
      </div>
    </section>
  );
}
