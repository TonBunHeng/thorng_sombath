import React, { useEffect, useRef, useState } from "react";
import { Divider } from "../utils/svgs";
import { toKhmerNumber, formatDate } from "../data/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Countdown({ wedding, t, lang }) {
  const [timeLeft, setTimeLeft] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const dateObj = formatDate(wedding.date, lang);
  const countRef = useRef(null);
  const prevTimeRef = useRef({});

  useEffect(() => {
    const target = new Date(wedding.date).getTime();

    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      const format = (n) => String(n).padStart(2, "0");

      const next = {
        d: lang === "km" ? toKhmerNumber(format(d)) : format(d),
        h: lang === "km" ? toKhmerNumber(format(h)) : format(h),
        m: lang === "km" ? toKhmerNumber(format(m)) : format(m),
        s: lang === "km" ? toKhmerNumber(format(s)) : format(s)
      };

      // 3D flip effect on changed numbers
      ["d", "h", "m", "s"].forEach((u) => {
        if (prevTimeRef.current[u] && prevTimeRef.current[u] !== next[u]) {
          const el = document.querySelector(`[data-u="${u}"]`);
          if (el) {
            gsap.fromTo(
              el,
              { yPercent: -18, opacity: 0.3, rotateX: 60 },
              { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.6, ease: "power2.out" }
            );
          }
        }
      });

      prevTimeRef.current = next;
      setTimeLeft(next);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [wedding.date, lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Units entrance
      gsap.from(".count__unit", {
        y: 60,
        opacity: 0,
        duration: 1.3,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#count",
          start: "top 85%",
          once: true
        }
      });

      // Marquee track infinite movement with scroll velocity multiplier
      const marqueeEl = document.querySelector("#marquee");
      if (marqueeEl) {
        const tween = gsap.to(marqueeEl, {
          xPercent: -50,
          duration: 45,
          ease: "none",
          repeat: -1
        });

        let isBoosting = false;
        ScrollTrigger.create({
          trigger: countRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const vel = Math.abs(self.getVelocity()) / 300;
            if (vel > 0.2 && !isBoosting) {
              isBoosting = true;
              gsap.to(tween, {
                timeScale: 1 + Math.min(4, vel),
                duration: 0.2,
                overwrite: true,
                onComplete: () => {
                  gsap.to(tween, {
                    timeScale: 1,
                    duration: 1.0,
                    ease: "power2.out",
                    onComplete: () => {
                      isBoosting = false;
                    }
                  });
                }
              });
            }
          }
        });
      }
    }, countRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={countRef} className="chapter countdown bg-olive-800 text-center overflow-hidden relative" id="countdown">
      <div className="marquee absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap pointer-events-none opacity-[0.12]" aria-hidden="true">
        <div className="marquee__track inline-flex gap-16 font-moul" id="marquee">
          <span>{t.blessing} ✦</span>
          <span>{t.blessing} ✦</span>
          <span>{t.blessing} ✦</span>
          <span>{t.blessing} ✦</span>
        </div>
      </div>

      <div className="chapter__head text-center max-w-[900px] mx-auto mb-6">
        <span className="kicker text-foil">{t.countdownKicker}</span>
      </div>

      <div className="count grid grid-cols-2 sm:grid-cols-4 justify-center gap-4 sm:gap-8 md:gap-16 relative" id="count" aria-live="polite">
        <div className="count__unit grid justify-items-center">
          <span className="count__num foil font-moul text-4xl sm:text-6xl md:text-7xl min-w-[1.4ch] leading-snug block" data-u="d">{timeLeft.d}</span>
          <span className="count__label caps text-cream-dim">{t.days}</span>
        </div>
        <div className="count__unit grid justify-items-center">
          <span className="count__num foil font-moul text-4xl sm:text-6xl md:text-7xl min-w-[1.4ch] leading-snug block" data-u="h">{timeLeft.h}</span>
          <span className="count__label caps text-cream-dim">{t.hours}</span>
        </div>
        <div className="count__unit grid justify-items-center">
          <span className="count__num foil font-moul text-4xl sm:text-6xl md:text-7xl min-w-[1.4ch] leading-snug block" data-u="m">{timeLeft.m}</span>
          <span className="count__label caps text-cream-dim">{t.minutes}</span>
        </div>
        <div className="count__unit grid justify-items-center">
          <span className="count__num foil font-moul text-4xl sm:text-6xl md:text-7xl min-w-[1.4ch] leading-snug block" data-u="s">{timeLeft.s}</span>
          <span className="count__label caps text-cream-dim">{t.seconds}</span>
        </div>
      </div>

      <div className="count__date">
        <Divider />
        <div className="caps" style={{ color: "var(--foil-hi)" }}>{dateObj.weekday}</div>
        <div>{dateObj.date}</div>
        <div>{dateObj.time}</div>
      </div>
    </section>
  );
}
