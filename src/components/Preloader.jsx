import React, { useEffect, useState } from "react";
import { LotusSvg } from "../utils/svgs";
import { toKhmerNumber } from "../data/i18n";
import gsap from "gsap";

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const val = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to("#preloader", {
          yPercent: -100,
          duration: 1.1,
          ease: "power3.inOut",
          onComplete
        });
      }
    });

    tl.to(val, {
      n: 100,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.round(val.n));
      }
    });

    gsap.fromTo(
      "#pre-lotus .draw",
      { strokeDasharray: 200, strokeDashoffset: 200 },
      { strokeDashoffset: 0, duration: 1.8, ease: "power2.out", stagger: 0.1 }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-[200] grid place-items-center bg-olive-900" id="preloader" aria-hidden="true">
      <div className="preloader__inner grid justify-items-center gap-5">
        <div id="pre-lotus" className="w-[120px] h-[120px]">
          <LotusSvg />
        </div>
        <div className="preloader__count font-moul text-foil text-center min-w-[4ch] text-lg" id="pre-count">
          {toKhmerNumber(count)}
        </div>
      </div>
      <div className="preloader__curtain absolute inset-0 bg-olive-950 translate-y-full"></div>
    </div>
  );
}
