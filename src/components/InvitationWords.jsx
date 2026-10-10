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
    <section ref={wordsRef} className="chapter words bg-olive-800 overflow-hidden relative" id="words">
      <svg className="words__florals emboss opacity-100 pointer-events-none w-[520px] h-[520px] absolute top-[22%] -right-[140px]" id="words-florals" viewBox="0 0 260 260" aria-hidden="true"></svg>
      <div className="words__grid grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-8 md:gap-16 max-w-[1240px] mx-auto">
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
          <span className="kicker text-foil block">{t.wordsKicker}</span>
          <h2 className="title font-moul text-2xl md:text-3xl my-2 mb-5">{t.wordsTitle}</h2>
          <p className="words__body serif-kh text-cream max-w-[36em]">{t.wordsBody}</p>

          <div className="parents grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 py-6 border-y border-foil/30">
            <div>
              <h4 className="text-foil font-normal font-moul m-0 mb-1.5 text-sm">{t.groomParents}</h4>
              <p className="m-0 leading-loose">
                {gp.father[lang]}
                <br />
                {lang === "km" ? "" : "&"}
                {gp.mother[lang]}
              </p>
            </div>
            <div>
              <h4 className="text-foil font-normal font-moul m-0 mb-1.5 text-sm">{t.brideParents}</h4>
              <p className="m-0 leading-loose">
                {bp.father[lang]}
                <br />
                {lang === "km" ? "" : "&"}
                {bp.mother[lang]}
              </p>
            </div>
          </div>

          <p className="words__thanks text-cream-dim text-sm">{t.wordsThanks}</p>
        </div>
      </div>
    </section>
  );
}
