import React, { useEffect, useRef } from "react";
import { toKhmerNumber } from "../data/i18n";

export function Lightbox({ isOpen, activeIndex, photos, onClose, onPrev, onNext, lang }) {
  const touchStartRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("has-lightbox");

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("has-lightbox");
    };
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
      <button
        className="lb-btn lb-close"
        type="button"
        onClick={onClose}
        aria-label={lang === "km" ? "បិទ" : "Close"}
        title={lang === "km" ? "បិទ" : "Close"}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <button
        className="lb-btn lb-prev"
        type="button"
        onClick={onPrev}
        aria-label={lang === "km" ? "មុន" : "Previous"}
        title={lang === "km" ? "មុន" : "Previous"}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="lb-btn lb-next"
        type="button"
        onClick={onNext}
        aria-label={lang === "km" ? "បន្ទាប់" : "Next"}
        title={lang === "km" ? "បន្ទាប់" : "Next"}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <div className="lb-count caps">
        {lang === "km"
          ? `${toKhmerNumber(activeIndex + 1)} / ${toKhmerNumber(photos.length)}`
          : `${activeIndex + 1} / ${photos.length}`}
      </div>
    </dialog>
  );
}
