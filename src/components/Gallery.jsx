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

  if (!photos.length) return null;

  const colCount = typeof window !== "undefined" && window.innerWidth < 700 ? 2 : 3;
  const cols = Array.from({ length: colCount }, () => []);
  const heights = Array(colCount).fill(0);

  photos.forEach((photo, idx) => {
    const minColIdx = heights.indexOf(Math.min(...heights));
    heights[minColIdx] += photo.h / photo.w;
    cols[minColIdx].push({ ...photo, index: idx });
  });

  return (
    <section ref={galleryRef} className="chapter gallery" id="gallery">
      <div className="chapter__head">
        <span className="kicker">{t.galleryKicker}</span>
        <h2 className="display">{t.galleryTitle}</h2>
        <Divider />
      </div>

      <div className="gallery__grid" id="gallery-grid">
        {cols.map((col, cIdx) => (
          <div key={cIdx} className="gallery__col">
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
