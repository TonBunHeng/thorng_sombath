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
    <div className="preloader" id="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <div id="pre-lotus">
          <LotusSvg />
        </div>
        <div className="preloader__count" id="pre-count">
          {toKhmerNumber(count)}
        </div>
      </div>
      <div className="preloader__curtain"></div>
    </div>
  );
}
