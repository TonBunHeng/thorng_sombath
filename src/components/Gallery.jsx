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

  useEffect(() => {
    if (!photos.length) return;

    const ctx = gsap.context(() => {
      // Curtain reveals for gallery photos
      const items = document.querySelectorAll(".gallery__item");
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
  }, [photos]);

  const cols = React.useMemo(() => {
    if (!photos.length) return [];
    const colCount = typeof window !== "undefined" && window.innerWidth < 700 ? 2 : 3;
    const columns = Array.from({ length: colCount }, () => []);
    const heights = Array(colCount).fill(0);

    photos.forEach((photo, idx) => {
      const minColIdx = heights.indexOf(Math.min(...heights));
      heights[minColIdx] += photo.h / photo.w;
      columns[minColIdx].push({ ...photo, index: idx });
    });
    return columns;
  }, [photos]);

  if (!photos.length) return null;

  return (
    <section ref={galleryRef} className="chapter gallery bg-night" id="gallery">
      <div className="chapter__head text-center max-w-[900px] mx-auto mb-10">
        <span className="kicker text-foil block">{t.galleryKicker}</span>
        <h2 className="display font-moul text-3xl sm:text-4xl md:text-5xl">{t.galleryTitle}</h2>
        <Divider />
      </div>

      <div className="gallery__grid flex items-start gap-2.5 sm:gap-4 max-w-[1400px] mx-auto" id="gallery-grid">
        {cols.map((col, cIdx) => (
          <div key={cIdx} className="gallery__col flex-1 grid gap-2.5 sm:gap-4">
            {col.map((item) => (
              <button
                key={item.id}
                type="button"
                className="gallery__item w-full block relative overflow-hidden rounded bg-olive-900 cursor-zoom-in border-0 p-0"
                style={{ aspectRatio: `${item.w} / ${item.h}` }}
                onClick={() => onOpenLightbox(item.index, photos)}
                aria-label={`Photo ${item.index + 1}`}
              >
                <img
                  src={`/img/gallery/${item.id}-640.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
