import React, { useEffect, useRef } from "react";
import { toKhmerNumber } from "../data/i18n";

export function Lightbox({ isOpen, activeIndex, photos, onClose, onPrev, onNext, lang }) {
  const touchStartRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !photos || !photos.length) return null;

  const current = photos[activeIndex];
  if (!current) return null;

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onPrev();
      else onNext();
    }
    touchStartRef.current = null;
  };

  return (
    <dialog
      className="lightbox"
      open
      onClick={(e) => {
        if (e.target.tagName === "DIALOG") onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Photo viewer"
    >
      <img
        id="lb-img"
        src={`/img/gallery/${current.id}-1600.webp`}
        alt=""
        loading="eager"
      />
      <button className="lb-btn lb-close" type="button" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <button className="lb-btn lb-prev" type="button" onClick={onPrev} aria-label="Previous">
        ‹
      </button>
      <button className="lb-btn lb-next" type="button" onClick={onNext} aria-label="Next">
        ›
      </button>
      <div className="lb-count caps">
        {lang === "km"
          ? `${toKhmerNumber(activeIndex + 1)} / ${toKhmerNumber(photos.length)}`
          : `${activeIndex + 1} / ${photos.length}`}
      </div>
    </dialog>
  );
}
