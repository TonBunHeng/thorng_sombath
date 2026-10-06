import React from "react";

export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="g-foil" x1="0" y1="0" x2="1" y2=".35" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#9c7124" />
          <stop offset=".25" stopColor="#d9b15a" />
          <stop offset=".45" stopColor="#fbefc0" />
          <stop offset=".62" stopColor="#d9b15a" />
          <stop offset=".85" stopColor="#9c7124" />
          <stop offset="1" stopColor="#d9b15a" />
        </linearGradient>
        <clipPath id="clip-scallop" clipPathUnits="objectBoundingBox">
          <path id="clip-scallop-path" d="M0 0H1V1H0Z" />
        </clipPath>
        <clipPath id="clip-flap" clipPathUnits="objectBoundingBox">
          <path d="M0 0 L1 0 Q0.96 0.28 0.88 0.44 Q0.76 0.64 0.62 0.82 Q0.54 0.92 0.5 1 Q0.46 0.92 0.38 0.82 Q0.24 0.64 0.12 0.44 Q0.04 0.28 0 0 Z" />
        </clipPath>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#e7c97a" />
          <stop offset=".45" stopColor="#b98c35" />
          <stop offset="1" stopColor="#6e4c14" />
        </radialGradient>
        <filter id="wax-lit" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="b" />
          <feSpecularLighting in="b" surfaceScale="5" specularConstant=".9" specularExponent="22" lightingColor="#fff6dc" result="s">
            <fePointLight x="20" y="-10" z="90" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="s2" />
          <feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".75" k4="0" />
        </filter>
      </defs>
    </svg>
  );
}

export function Crest({ className = "kbach-crest", style = {} }) {
  return (
    <svg className={className} viewBox="-110 -135 220 150" style={style} aria-hidden="true">
      <defs>
        <linearGradient id="crest-g" x1="0" y1="0" x2="1" y2=".35">
          <stop offset="0" stopColor="#9c7124" />
          <stop offset=".45" stopColor="#fbefc0" />
          <stop offset="1" stopColor="#d9b15a" />
        </linearGradient>
      </defs>
      <g fill="url(#crest-g)">
        <path d="M0 -14 C-12 -34 -17 -59 -7 -81 C0 -99 15 -110 26 -120 C34 -126 44 -122 42 -112 C41 -105 33 -105 33 -111 C26 -102 17 -94 19 -81 C20 -66 30 -61 29 -48 C27 -31 15 -21 0 -14 Z" />
        <path transform="translate(-12 -12) rotate(-30) scale(.9)" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
        <path transform="translate(12 -12) rotate(30) scale(-.9 .9)" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
        <path transform="translate(-26 -6) rotate(-62) scale(.7)" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
        <path transform="translate(26 -6) rotate(62) scale(-.7 .7)" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
      </g>
      <path d="M-92 6 C-60 10 -30 -2 0 -2 C30 -2 60 10 92 6" fill="none" stroke="url(#crest-g)" strokeWidth="2" />
    </svg>
  );
}

export function Corner({ position = "tl", className = "" }) {
  const transformMap = {
    tl: "",
    tr: "translate(100 0) scale(-1 1)",
    bl: "translate(0 100) scale(1 -1)",
    br: "translate(100 100) scale(-1 -1)"
  };

  return (
    <svg className={`kbach-corner kb-${position} ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <g transform={transformMap[position]}>
        <path className="kb-line draw" d="M10 90 C10 40 40 10 90 10" stroke="url(#g-foil)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path className="kb-line" d="M14 85 C14 44 44 14 85 14" stroke="url(#g-foil)" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round" />
        <path className="kb-fill kb-sway" d="M16 28 C18 16 28 14 36 20 C42 26 38 34 28 32 C22 30 18 36 16 28 Z" fill="url(#g-foil)" />
        <path className="kb-fill kb-sway" d="M28 16 C38 18 42 26 36 34 C30 40 24 36 26 28 C28 22 20 18 28 16 Z" fill="url(#g-foil)" />
        <circle cx="10" cy="90" r="2.5" fill="url(#g-foil)" />
        <circle cx="90" cy="10" r="2.5" fill="url(#g-foil)" />
      </g>
    </svg>
  );
}

export function CornerGroup({ className = "cover__corners" }) {
  return (
    <div data-orn="corner4" className={className}>
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />
    </div>
  );
}

export function Divider({ className = "divider" }) {
  return (
    <svg className={className} viewBox="-160 -15 320 30" aria-hidden="true">
      <path className="draw" d="M-150 0 C-90 -12 -30 12 0 0 C30 -12 90 12 150 0" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="0" cy="0" r="3.2" fill="url(#g-foil)" />
      <circle cx="-150" cy="0" r="2" fill="url(#g-foil)" />
      <circle cx="150" cy="0" r="2" fill="url(#g-foil)" />
    </svg>
  );
}

export function Butterfly({ className = "butterfly" }) {
  return (
    <svg className={className} viewBox="0 0 100 80" aria-hidden="true">
      <g fill="url(#g-foil)">
        <path className="wing-l" d="M50 40 C35 15 10 10 12 32 C14 50 38 52 50 44 Z" />
        <path className="wing-r" d="M50 40 C65 15 90 10 88 32 C86 50 62 52 50 44 Z" />
        <path d="M49 28 C49 24 51 24 51 28 L51 54 C51 56 49 56 49 54 Z" />
      </g>
    </svg>
  );
}

export function WaxSeal({ className = "e2__seal-svg" }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#e7c97a" />
          <stop offset=".45" stopColor="#b98c35" />
          <stop offset="1" stopColor="#6e4c14" />
        </radialGradient>
        <filter id="wax-lit" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="b" />
          <feSpecularLighting in="b" surfaceScale="5" specularConstant=".9" specularExponent="22" lightingColor="#fff6dc" result="s">
            <fePointLight x="20" y="-10" z="90" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="s2" />
          <feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".75" k4="0" />
        </filter>
      </defs>
      <g filter="url(#wax-lit)">
        <path
          d="M70 12 C98 11 126 36 128 68 C129 98 106 127 72 128 C38 129 11 104 12 70 C13 38 40 13 70 12 Z"
          fill="url(#wax)"
        />
        <circle cx="70" cy="70" r="46" fill="none" stroke="#7a5518" strokeWidth="2.2" opacity="0.6" />
        <g transform="translate(70 78) scale(0.38)">
          <Crest />
        </g>
      </g>
    </svg>
  );
}

export function Lockup({ groom, bride, className = "" }) {
  return (
    <div className={`lockup ${className}`} role="img" aria-label={`${groom} & ${bride}`}>
      <svg className="lk-orn" viewBox="0 0 600 470" aria-hidden="true">
        <path className="lk-swash" d="M40 292 C110 318 170 314 206 296 C236 280 238 254 220 250 C202 246 196 272 214 284 C240 302 262 294 272 284" />
        <path className="lk-swash lk-swash2" d="M318 446 C392 460 476 456 566 438" />
        <path className="lk-heart" d="M266 316 C259 304 244 308 246 321 C248 332 266 341 266 348 C266 341 284 332 286 321 C288 308 273 304 266 316 Z" />
      </svg>
      <span className="lk-name lk-groom" aria-hidden="true">{groom}</span>
      <span className="lk-name lk-bride" aria-hidden="true">{bride}</span>
      <div className="lk-butterfly">
        <Butterfly />
      </div>
    </div>
  );
}

export function LotusSvg({ className = "lotus-svg" }) {
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden="true">
      <path className="draw" d="M0 25 C-15 10 -25 -10 0 -45 C25 -10 15 10 0 25 Z" fill="none" stroke="url(#g-foil)" strokeWidth="1.8" />
      <path className="draw" d="M-5 24 C-28 16 -45 -2 -32 -26 C-18 -12 -8 10 -5 24 Z" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" />
      <path className="draw" d="M5 24 C28 16 45 -2 32 -26 C18 -12 8 10 5 24 Z" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" />
      <path className="draw" d="M-10 20 C-36 8 -52 -8 -46 -18 C-36 -8 -20 6 -10 20 Z" fill="none" stroke="url(#g-foil)" strokeWidth="1.2" opacity="0.8" />
      <path className="draw" d="M10 20 C36 8 52 -8 46 -18 C36 -8 20 6 10 20 Z" fill="none" stroke="url(#g-foil)" strokeWidth="1.2" opacity="0.8" />
    </svg>
  );
}

export function FloatingLotus() {
  return `
    <svg viewBox="-24 -24 48 48" width="48" height="48" style="overflow:visible">
      <defs>
        <radialGradient id="fl-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#ffb65c" stop-opacity=".9"/>
          <stop offset="60%" stop-color="#ff7828" stop-opacity=".35"/>
          <stop offset="100%" stop-color="#ff7828" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="22" fill="url(#fl-glow)" />
      <g fill="#c72c6a" stroke="#fbefc0" stroke-width=".6">
        <path d="M0 10 C-6 4 -10 -4 0 -18 C10 -4 6 4 0 10 Z" />
        <path d="M-2 10 C-12 6 -18 -2 -13 -12 C-7 -6 -3 4 -2 10 Z" />
        <path d="M2 10 C12 6 18 -2 13 -12 C7 -6 3 4 2 10 Z" />
      </g>
      <circle cx="0" cy="-2" r="3" fill="#ffe299" />
    </svg>
  `;
}
