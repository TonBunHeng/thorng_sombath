import React from "react";

export function Toast({ message, isVisible }) {
  return (
    <div className={`toast ${isVisible ? "show" : ""}`} id="toast" role="status">
      {message}
    </div>
  );
}

export function VineProgress({ progress = 0 }) {
  return (
    <div className="vine-progress" aria-hidden="true">
      <span style={{ transform: `scaleY(${progress})` }}></span>
      <b style={{ top: `${progress * 100}%` }}></b>
    </div>
  );
}

export function RsvpPill({ label, isVisible }) {
  return (
    <a className={`btn rsvp-pill ${isVisible ? "show" : ""}`} href="#venue">
      {label}
    </a>
  );
}
