import React, { useEffect, useRef, useState } from "react";
import { Divider } from "../utils/svgs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Gallery({ t, onOpenLightbox }) {
  const [photos, setPhotos] = useState([]);
  const galleryRef = useRef(null);

  useEffect(() => {
    fetch("/img/gallery/gallery.json")
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error("Failed to load gallery:", err));
  }, []);

  const [colCount, setColCount] = useState(() => {
    if (typeof window === "undefined") return 3;
    return window.innerWidth < 700 ? 2 : window.innerWidth < 1100 ? 3 : 4;
  });

  useEffect(() => {
    const handleResize = () => {
      const count = window.innerWidth < 700 ? 2 : window.innerWidth < 1100 ? 3 : 4;
      setColCount(count);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cols = React.useMemo(() => {
    if (!photos.length) return [];
    const columns = Array.from({ length: colCount }, () => []);
    const heights = Array(colCount).fill(0);

    photos.forEach((photo, idx) => {
      const minColIdx = heights.indexOf(Math.min(...heights));
      heights[minColIdx] += photo.h / photo.w;
      columns[minColIdx].push({ ...photo, index: idx });
    });
    return columns;
  }, [photos, colCount]);

  useEffect(() => {
    if (!photos.length) return;

    const ctx = gsap.context(() => {
      const colEls = document.querySelectorAll(".gallery__col");
      const speeds = [0.06, -0.04, 0.09, -0.02];

      if (colCount > 2) {
        colEls.forEach((colEl, idx) => {
          const speed = speeds[idx % speeds.length];
          gsap.fromTo(
            colEl,
            { yPercent: speed * 100 },
            {
              yPercent: -speed * 100,
              ease: "none",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });
      }

      // Curtain reveals for gallery photos
      const items = document.querySelectorAll(".gallery__item");
      gsap.set(items, { clipPath: "inset(100% 0% 0% 0%)" });

      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              ease: "power3.inOut",
              stagger: 0.08
            }
          );
        }
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [photos, colCount]);

  if (!photos.length) return null;

  return (
    <section ref={galleryRef} className="chapter gallery" id="gallery">
      <div className="chapter__head">
        <span className="kicker">{t.galleryKicker}</span>
        <h2 className="display">{t.galleryTitle}</h2>
        <Divider />
      </div>

      <div className="gallery__grid" id="gallery-grid">
        {cols.map((col, cIdx) => (
          <div
            key={cIdx}
            className="gallery__col"
            data-speed={[0.06, -0.04, 0.09, -0.02][cIdx % 4]}
          >
            {col.map((item) => (
              <button
                key={item.id}
                type="button"
                className="gallery__item"
                style={{ aspectRatio: `${item.w} / ${item.h}` }}
                onClick={() => onOpenLightbox(item.index, photos)}
                aria-label={`Photo ${item.index + 1}`}
              >
                <img
                  src={`/img/gallery/${item.id}-640.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
