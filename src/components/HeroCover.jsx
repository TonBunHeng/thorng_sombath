import React, { useEffect, useRef } from "react";
import { CornerGroup, Crest, Lockup } from "../utils/svgs";
import { initEmbers } from "../utils/canvasEffects";
import { formatDate } from "../data/i18n";
import { pictures } from "../data/pictures";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroCover({ wedding, t, lang, isGateOpen }) {
  const embersRef = useRef(null);
  const heroRef = useRef(null);

  const dateObj = formatDate(wedding.date, lang);
  const groomShort = wedding.couple.groom.shortKm || wedding.couple.groom.km.split(" ").pop();
  const brideShort = wedding.couple.bride.shortKm || wedding.couple.bride.km.split(" ").pop();

  // 0. Pre-initialize hidden states so there is zero pop/flash while covered
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("#hero-media img", { scale: 1.22 });
      gsap.set(".cover__corners .kbach-corner", { opacity: 0, scale: 0.6 });
      gsap.set(".cover__crest", { opacity: 0, y: 20 });
      gsap.set(".cover__kicker, .cover__sub", { opacity: 0, y: 16 });
      gsap.set(".cover__lockup .lk-crest > *", { opacity: 0, scale: 0.4, transformOrigin: "50% 100%" });
      gsap.set(".cover__lockup .lk-groom", { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(".cover__lockup .lk-bride", { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(".cover__lockup .lk-swash", { strokeDasharray: 300, strokeDashoffset: 300 });
      gsap.set(".cover__lockup .lk-heart", { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(".cover__lockup .lk-butterfly", { opacity: 0, x: 60, y: -50, rotate: 40 });
      gsap.set(".hero__en", { opacity: 0, y: 10 });
      gsap.set(".cover__invite", { opacity: 0, y: 12 });
      gsap.set(".cover__chips .chip-d", { opacity: 0, y: 24 });
      gsap.set(".cover__lunar, .cover__venue, .cover__cue", { opacity: 0, y: 10 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isGateOpen) return;

    let embersInstance = null;
    if (embersRef.current) {
      embersInstance = initEmbers(embersRef.current, { count: 32 });
    }

    const ctx = gsap.context(() => {
      // 1. Reveal Timeline
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to("#hero-media img", { scale: 1.06, duration: 3.2 }, 0)
        .to(".cover__corners .kbach-corner", { opacity: 1, scale: 1, duration: 1.4, stagger: 0.08 }, 0)
        .to(".cover__crest", { opacity: 1, y: 0, duration: 1.2 }, 0.15)
        .to(".cover__kicker, .cover__sub", { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.3);

      // Lockup signature reveal
      tl.to(
        ".cover__lockup .lk-crest > *",
        { opacity: 1, scale: 1, duration: 1.0, stagger: 0.04, ease: "power2.out" },
        0.2
      )
      .to(
        ".cover__lockup .lk-groom",
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power2.inOut" },
        0.5
      )
      .to(
        ".cover__lockup .lk-bride",
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power2.inOut" },
        1.0
      )
      .to(
        ".cover__lockup .lk-swash",
        { strokeDashoffset: 0, duration: 1.3, stagger: 0.25, ease: "power2.out" },
        0.9
      )
      .to(
        ".cover__lockup .lk-heart",
        { scale: 1, duration: 0.8, ease: "back.out(2.2)" },
        1.6
      )
      .to(
        ".cover__lockup .lk-butterfly",
        { opacity: 1, x: 0, y: 0, rotate: 16, duration: 1.5, ease: "power2.out" },
        1.4
      );

      tl.to(".hero__en", { opacity: 1, y: 0, duration: 1 }, 1.8)
        .to(".cover__invite", { opacity: 1, y: 0, duration: 1 }, 2.0)
        .to(".cover__chips .chip-d", { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 2.2)
        .to(".cover__lunar, .cover__venue, .cover__cue", { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 2.5);

      // Continuous subtle idle floats
      gsap.to(".cover__corners .kb-sway", {
        rotate: 2.2,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "center center"
      });

      gsap.to(".cover .lk-butterfly", {
        y: -8,
        x: 4,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 3.0
      });

      // 2. ScrollTrigger Scrub Pinning
      gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "+=90%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      })
      .to("#hero-media", { clipPath: "inset(7% 6% 7% 6% round 26px)", ease: "none" }, 0)
      .to(".cover__inner", { yPercent: -8, opacity: 0, ease: "none" }, 0)
      .to(".cover__corners", { opacity: 0, ease: "none" }, 0);

      ScrollTrigger.refresh();
    }, heroRef);

    return () => {
      if (embersInstance) embersInstance.destroy();
      ctx.revert();
    };
  }, [isGateOpen]);

  return (
    <section ref={heroRef} className="hero cover" id="hero" aria-label="Wedding invitation cover">
      <div className="hero__media" id="hero-media">
        <picture>
          <source media="(max-aspect-ratio: 1/1)" srcSet={pictures.hero.srcSetMobile} sizes="100vw" />
          <img src={pictures.hero.desktop} srcSet={pictures.hero.srcSetDesktop} sizes="100vw" alt={pictures.hero.alt} fetchPriority="high" />
        </picture>
        <div className="hero__shade"></div>
        <canvas ref={embersRef} className="hero__embers" id="hero-embers"></canvas>
      </div>

      <CornerGroup className="cover__corners" />

      <div className="cover__inner">
        <div className="cover__crest">
          <Crest />
        </div>
        <div className="cover__kicker foil">{t.kicker}</div>
        <div className="cover__sub">{t.weddingInvitation}</div>
        <div className="cover__lockup">
          <Lockup groom={groomShort} bride={brideShort} className="lk-cover" />
        </div>
        <div className="hero__en" id="names-en">
          {wedding.couple.groom.en} &amp; {wedding.couple.bride.en}
        </div>
        <div className="cover__invite">{t.inviteTo}</div>
        <div className="cover__chips">
          <div className="chip-d">
            <small>{t.dayLabel}</small>
            <b>{dateObj.weekdayShort}</b>
          </div>
          <div className="chip-d">
            <small>{t.dateLabel}</small>
            <b>{dateObj.day}</b>
          </div>
          <div className="chip-d">
            <small>{t.monthLabel}</small>
            <b>{dateObj.month}</b>
          </div>
          <div className="chip-d">
            <small>{t.yearLabel}</small>
            <b>{dateObj.year}</b>
          </div>
        </div>
        <div className="cover__lunar">{wedding.lunar[lang]}</div>
        <div className="cover__venue">
          <span>{wedding.venue.name[lang]}</span> · <span>{wedding.venue.address[lang]}</span>
        </div>
        <a className="cover__cue" href="#words">
          <span>{t.scrollOpen}</span>
          <i></i>
        </a>
      </div>
    </section>
  );
}
