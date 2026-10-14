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
          <path id="clip-scallop-path" d={getScallopPath(8, 10, 0.02)} />
        </clipPath>
        <clipPath id="clip-flap" clipPathUnits="objectBoundingBox">
          <path d={getFlapClipPath(9, 0.028)} />
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
        <filter id="wax-press" x="-30%" y="-30%" width="160%" height="160%">
          <feOffset dx="-1.2" dy="-1.2" in="SourceAlpha" result="hi" />
          <feFlood floodColor="#3b2706" floodOpacity=".75" />
          <feComposite in2="hi" operator="in" result="dark" />
          <feOffset dx="1.2" dy="1.4" in="SourceAlpha" result="lo" />
          <feFlood floodColor="#fff3cf" floodOpacity=".7" />
          <feComposite in2="lo" operator="in" result="light" />
          <feMerge>
            <feMergeNode in="light" />
            <feMergeNode in="dark" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

const Ju = "M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z";
const Yu = "M0 -6 C-3 -20 -2 -36 4 -50";
const Xu = "M0 0 C8 -2 14 -9 13 -17 C12 -24 4 -27 -1 -23 C-5 -19 -3 -13 2 -13 C5 -13 6 -17 4 -18";

export function KbachCrestSvg({ foilId = "g-foil" }) {
  const fill = `url(#${foilId})`;
  return (
    <>
      <g transform="translate(0 -14) scale(1.25)">
        <path className="kb-fill" fill={fill} d={Ju} />
        <path className="kb-line" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Yu} />
      </g>
      <g transform="translate(-10 -12) rotate(-24) scale(1.0)">
        <path className="kb-fill" fill={fill} d={Ju} />
        <path className="kb-line" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Yu} />
      </g>
      <g transform="translate(10 -12) rotate(24) scale(1.0)">
        <path className="kb-fill" fill={fill} d={Ju} transform="scale(-1 1)" />
        <path className="kb-line" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Yu} transform="scale(-1 1)" />
      </g>
      <g transform="translate(-22 -8) rotate(-52) scale(.82)">
        <path className="kb-fill" fill={fill} d={Ju} />
        <path className="kb-line" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Yu} />
      </g>
      <g transform="translate(22 -8) rotate(52) scale(.82)">
        <path className="kb-fill" fill={fill} d={Ju} transform="scale(-1 1)" />
        <path className="kb-line" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Yu} transform="scale(-1 1)" />
      </g>
      <g transform="translate(-34 -2) rotate(-78) scale(.62)">
        <path className="kb-fill" fill={fill} d={Ju} />
        <path className="kb-line" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Yu} />
      </g>
      <g transform="translate(34 -2) rotate(78) scale(.62)">
        <path className="kb-fill" fill={fill} d={Ju} transform="scale(-1 1)" />
        <path className="kb-line" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Yu} transform="scale(-1 1)" />
      </g>
      <path className="kb-line kb-curl" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Xu} transform="translate(-58 4) scale(1.3)" />
      <path className="kb-line kb-curl" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d={Xu} transform="translate(58 4) scale(-1.3 1.3)" />
      <path className="kb-line" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" d="M-92 6 C-60 10 -30 -2 0 -2 C30 -2 60 10 92 6" />
      <path className="kb-fill" fill={fill} d="M-14 -2 C-10 -12 10 -12 14 -2 C8 0 -8 0 -14 -2 Z" />
      <circle className="kb-fill" fill={fill} cx="0" cy="-118" r="3" />
    </>
  );
}

export function Crest({ className = "kbach-crest", style = {} }) {
  return (
    <svg className={className} viewBox="-110 -135 220 150" style={style} aria-hidden="true">
      <defs>
        <linearGradient id="crest-g" x1="0" y1="0" x2="1" y2=".35">
          <stop offset="0%" stopColor="#9c7124" />
          <stop offset="25%" stopColor="#d9b15a" />
          <stop offset="45%" stopColor="#fbefc0" />
          <stop offset="62%" stopColor="#d9b15a" />
          <stop offset="85%" stopColor="#9c7124" />
          <stop offset="100%" stopColor="#d9b15a" />
        </linearGradient>
      </defs>
      <KbachCrestSvg foilId="crest-g" />
    </svg>
  );
}

export function Corner({ position = "tl", className = "" }) {
  const transformMap = {
    tl: "",
    tr: "translate(160 0) scale(-1 1)",
    bl: "translate(0 160) scale(1 -1)",
    br: "translate(160 160) scale(-1 -1)"
  };

  return (
    <svg className={`kbach-corner kb-${position} ${className}`} viewBox="0 0 160 160" aria-hidden="true">
      <g transform={transformMap[position]}>
        <g className="kb-sway">
          <path className="kb-line" d="M6 6 H150 M6 6 V150" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path className="kb-line" d="M14 14 H110 M14 14 V110" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <g transform="translate(22 22) rotate(135) scale(.9)">
            <path className="kb-fill" fill="currentColor" d={Ju} />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d={Yu} />
          </g>
          <g transform="translate(40 16) rotate(100) scale(.55)">
            <path className="kb-fill" fill="currentColor" d={Ju} />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d={Yu} />
          </g>
          <g transform="translate(16 40) rotate(170) scale(.55) scale(-1 1)">
            <path className="kb-fill" fill="currentColor" d={Ju} />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d={Yu} />
          </g>
          <path className="kb-line kb-curl" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d={Xu} transform="translate(62 24) scale(1.1)" />
          <path className="kb-line kb-curl" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d={Xu} transform="translate(24 62) rotate(90) scale(1.1 -1.1)" />
          <g transform="translate(92 22) rotate(90) scale(.42)">
            <path className="kb-fill" fill="currentColor" d={Ju} />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d={Yu} />
          </g>
          <g transform="translate(22 92) rotate(180) scale(.42) scale(-1 1)">
            <path className="kb-fill" fill="currentColor" d={Ju} />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d={Yu} />
          </g>
          <circle className="kb-fill" fill="currentColor" cx="122" cy="14" r="2.4" />
          <circle className="kb-fill" fill="currentColor" cx="14" cy="122" r="2.4" />
        </g>
      </g>
    </svg>
  );
}

export function CornerGroup({ className = "cover__corners" }) {
  return (
    <div data-orn="corner4" className={`cover__corners absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />
    </div>
  );
}

export function Divider({ className = "divider" }) {
  return (
    <svg className={`kbach-divider ${className}`} viewBox="-160 -40 320 50" aria-hidden="true">
      <path className="kb-line" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" strokeLinecap="round" d="M-150 0 H-40 M40 0 H150" />
      <path className="kb-line kb-curl" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" strokeLinecap="round" d={Xu} transform="translate(-40 0) scale(-.9 .9)" />
      <path className="kb-line kb-curl" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" strokeLinecap="round" d={Xu} transform="translate(40 0) scale(.9)" />
      <g transform="translate(0 2) scale(.5)">
        <path className="kb-fill" fill="url(#g-foil)" d={Ju} />
        <path className="kb-line" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" strokeLinecap="round" d={Yu} />
      </g>
      <g transform="translate(-6 2) rotate(-40) scale(.36)">
        <path className="kb-fill" fill="url(#g-foil)" d={Ju} />
        <path className="kb-line" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" strokeLinecap="round" d={Yu} />
      </g>
      <g transform="translate(6 2) rotate(40) scale(.36)">
        <path className="kb-fill" fill="url(#g-foil)" d={Ju} transform="scale(-1 1)" />
        <path className="kb-line" fill="none" stroke="url(#g-foil)" strokeWidth="1.6" strokeLinecap="round" d={Yu} transform="scale(-1 1)" />
      </g>
      <circle className="kb-fill" fill="url(#g-foil)" cx="-154" cy="0" r="2.2" />
      <circle className="kb-fill" fill="url(#g-foil)" cx="154" cy="0" r="2.2" />
    </svg>
  );
}

const Lu = `
  <path d="M51 38 C58 14 82 1 94 10 C103 18 92 33 75 39 C66 42 57 41 51 40 Z" fill="url(#g-foil)" fill-opacity=".9"/>
  <path d="M51 42 C62 44 80 50 81 62 C82 74 66 76 59 66 C54 59 51 51 51 42 Z" fill="url(#g-foil)" fill-opacity=".75"/>
  <path d="M53 39 C64 30 76 20 90 13 M56 39 C68 36 80 33 92 24 M54 44 C62 52 70 58 78 64 M53 46 C57 56 61 64 66 70" fill="none" stroke="#5a4113" stroke-width=".8" stroke-opacity=".55"/>
  <circle cx="86" cy="15" r="1.6" fill="#fff6d8" opacity=".8"/><circle cx="90" cy="22" r="1.1" fill="#fff6d8" opacity=".7"/>`;

export function Butterfly({ className = "butterfly" }) {
  return (
    <svg className={`butterfly ${className}`} viewBox="0 0 100 80" aria-hidden="true">
      <g className="wing-l">
        <g transform="translate(100 0) scale(-1 1)" dangerouslySetInnerHTML={{ __html: Lu }} />
      </g>
      <g className="wing-r" dangerouslySetInnerHTML={{ __html: Lu }} />
      <ellipse cx="50" cy="44" rx="2.4" ry="13" fill="url(#g-foil)" />
      <path d="M49 32 C46 22 42 16 37 12 M51 32 C54 22 58 16 63 12" fill="none" stroke="url(#g-foil)" strokeWidth="1" />
      <circle cx="37" cy="12" r="1.4" fill="url(#g-foil)" />
      <circle cx="63" cy="12" r="1.4" fill="url(#g-foil)" />
    </svg>
  );
}

const cd = e => Math.round(e * 1e4) / 1e4;
function dd(e, t, n, r = 3) {
  let i = "";
  for (let a = 0; a <= 64; a++) {
    let o = (a / 64) * Math.PI * 2,
      s = n * (1 + 0.035 * Math.sin(o * 7 + r) + 0.025 * Math.sin(o * 13 + r * 2) + 0.02 * Math.cos(o * 4 + r));
    i += `${a ? "L" : "M"}${cd(e + Math.cos(o) * s)} ${cd(t + Math.sin(o) * s)} `;
  }
  return i + "Z";
}

export function WaxSeal({ className = "e2__seal-svg" }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <path
        d={dd(70, 72, 60, 5)}
        fill="#000"
        opacity=".35"
        transform="translate(2 5)"
        style={{ filter: "blur(3px)" }}
      />
      <g filter="url(#wax-lit)">
        <path d={dd(70, 70, 60, 5)} fill="url(#wax)" />
        <circle cx="70" cy="70" r="44" fill="#a97d2c" />
      </g>
      <circle cx="70" cy="70" r="44" fill="none" stroke="#5e400f" strokeOpacity=".55" strokeWidth="1.4" />
      <circle cx="70" cy="70" r="39" fill="none" stroke="#f3dc9c" strokeOpacity=".35" strokeWidth=".8" strokeDasharray="1.6 3" />
      <g filter="url(#wax-press)" transform="translate(70 92) scale(.36)" className="wax-crest">
        <KbachCrestSvg foilId="g-foil" />
      </g>
    </svg>
  );
}

export function Lockup({ groom = "រស្មី", bride = "ភក្ដី", crest = true, className = "" }) {
  const groomName = groom || "រស្មី";
  const brideName = bride || "ភក្ដី";

  return (
    <div className={`lockup ${className}`} role="img" aria-label={`${groomName} & ${brideName}`}>
      <svg className="lk-orn" viewBox="0 0 600 470" aria-hidden="true">
        {crest && (
          <g className="lk-crest" transform="translate(300 60) scale(.5)">
            <KbachCrestSvg foilId="g-foil" />
          </g>
        )}
        <path
          className="lk-swash"
          d="M40 292 C110 318 170 314 206 296 C236 280 238 254 220 250 C202 246 196 272 214 284 C240 302 262 294 272 284"
        />
        <path
          className="lk-swash lk-swash2"
          d="M318 446 C392 460 476 456 566 438"
        />
        <path
          className="lk-heart"
          d="M266 316 C259 304 244 308 246 321 C248 332 266 341 266 348 C266 341 284 332 286 321 C288 308 273 304 266 316 Z"
        />
      </svg>
      <span className="lk-name lk-groom" aria-hidden="true">{groomName}</span>
      <span className="lk-name lk-bride" aria-hidden="true">{brideName}</span>
      <div className="lk-butterfly" aria-hidden="true">
        <Butterfly className="is-resting" />
      </div>
    </div>
  );
}

export function LotusSvg({ className = "lotus-svg" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g stroke="url(#g-foil)" strokeWidth="1.4" strokeLinejoin="round">
        <path className="draw" d="M60 18 C73 38 73 70 60 90 C47 70 47 38 60 18 Z" />
        <path className="draw" d="M60 90 C40 82 26 62 28 38 C42 46 54 62 60 90 Z" />
        <path className="draw" d="M60 90 C80 82 94 62 92 38 C78 46 66 62 60 90 Z" />
        <path className="draw" d="M60 92 C34 94 14 80 8 62 C26 61 46 71 60 92 Z" />
        <path className="draw" d="M60 92 C86 94 106 80 112 62 C94 61 74 71 60 92 Z" />
        <path className="draw" d="M18 104 Q60 94 102 104" />
        <path className="draw" d="M34 112 Q60 106 86 112" />
      </g>
    </svg>
  );
}

const Bu = [[40, 9, -8], [78, 8, 14], [118, 12, -20], [160, 24, 18], [205, 26, -10], [236, 20, 22], [9, 40, 98], [8, 78, 76], [12, 118, 110], [24, 160, 72], [26, 205, 100], [150, 40, 50], [170, 44, -30], [40, 150, 40], [44, 170, 120]];
const zu = "M0 0 C6 -7 16 -7 23 0 C16 7 6 7 0 0 Z";

export function VineInner() {
  return (
    <>
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none">
        <path className="draw" d="M4 4 C60 10 110 6 150 22 S220 30 252 18" />
        <path className="draw" d="M4 4 C10 60 6 110 22 150 S30 220 18 252" />
        <path className="draw" d="M68 10 C78 30 100 34 108 22 C112 14 102 8 96 16" />
        <path className="draw" d="M10 68 C30 78 34 100 22 108 C14 112 8 102 16 96" />
        <path className="draw" d="M128 15 C138 40 158 46 176 40" />
        <path className="draw" d="M15 128 C40 138 46 158 40 176" />
        <path className="draw" d="M196 28 C204 46 222 50 230 40 C234 34 228 28 222 32" />
      </g>
      <g className="leaves" fill="currentColor" fillOpacity=".85">
        {Bu.map(([x, y, r], idx) => (
          <path key={idx} className="leaf" d={zu} transform={`translate(${x} ${y}) rotate(${r})`} />
        ))}
      </g>
      <g className="blooms" fill="currentColor">
        {[[108, 22], [22, 108], [176, 40], [40, 176], [252, 18]].map(([x, y], idx) => (
          <g key={idx} className="bloom" transform={`translate(${x} ${y})`}>
            {[0, 72, 144, 216, 288].map((angle, aidx) => (
              <ellipse key={aidx} rx="2.2" ry="4.4" transform={`rotate(${angle}) translate(0 -4.5)`} fillOpacity=".9" />
            ))}
            <circle r="1.6" fill="#fff6d8" />
          </g>
        ))}
      </g>
    </>
  );
}

export function Vine({ className = "" }) {
  return (
    <svg className={`vine ${className}`} viewBox="0 0 260 260" aria-hidden="true" fill="none">
      <VineInner />
    </svg>
  );
}

export function VenuePin({ className = "venue__pin" }) {
  return (
    <svg className={className} viewBox="0 0 40 52" fill="none" aria-hidden="true">
      <path d="M20 50 C20 50 4 31 4 19 A16 16 0 0 1 36 19 C36 31 20 50 20 50 Z" stroke="url(#g-foil)" strokeWidth="1.4" />
      <path d="M20 9 C24 14 24 22 20 27 C16 22 16 14 20 9 Z" fill="url(#g-foil)" />
    </svg>
  );
}

export function FloatingLotus() {
  return `
    <svg viewBox="0 0 70 70" aria-hidden="true">
      <defs>
        <radialGradient id="kflame" cx=".5" cy=".7" r=".6">
          <stop offset="0" stop-color="#fff6d8"/>
          <stop offset=".5" stop-color="#ffb65c"/>
          <stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="35" cy="22" r="16" fill="url(#kflame)" opacity=".5"/>
      <path d="M8 50 Q35 64 62 50 L58 44 Q35 54 12 44 Z" fill="#4f5a26" stroke="url(#g-foil)" stroke-width=".8"/>
      <path d="M35 46 C28 40 26 32 30 26 C33 32 34 38 35 46 Z M35 46 C42 40 44 32 40 26 C37 32 36 38 35 46 Z M35 46 C24 46 18 40 18 34 C26 36 31 40 35 46 Z M35 46 C46 46 52 40 52 34 C44 36 39 40 35 46 Z" fill="#c72c6a" stroke="#f3a6c3" stroke-width=".5"/>
      <rect x="33.6" y="22" width="2.8" height="14" rx="1" fill="#f5efdd"/>
      <path d="M35 13 C37.5 16 37.5 19 35 21.5 C32.5 19 32.5 16 35 13 Z" fill="url(#kflame)"/>
    </svg>
  `;
}

const Iu = e => Math.round(e * 100) / 100;
export function getScallopPath(e = 8, t = 10, n = 0.02) {
  let r = [];
  const i = (e, t, i, a, o, s, c) => {
    for (let l = 0; l < o; l++) {
      let u = e + (i - e) * l / o,
        d = t + (a - t) * l / o,
        f = e + (i - e) * (l + 1) / o,
        p = t + (a - t) * (l + 1) / o,
        m = (u + f) / 2 + s * n,
        h = (d + p) / 2 + c * n;
      r.push(`Q${Iu(m * 1e3) / 1e3} ${Iu(h * 1e3) / 1e3} ${Iu(f * 1e3) / 1e3} ${Iu(p * 1e3) / 1e3}`);
    }
  };
  let a = n;
  i(a, a, 1 - a, a, e, 0, -1);
  i(1 - a, a, 1 - a, 1 - a, t, 1, 0);
  i(1 - a, 1 - a, a, 1 - a, e, 0, 1);
  i(a, 1 - a, a, a, t, -1, 0);
  return `M${a} ${a} ${r.join(" ")} Z`;
}

export function getFlapClipPath(e = 9, t = 0.028) {
  let n = `M0 0 L1 0 `;
  const r = (r, i, a, o) => {
    let s = Math.hypot(a - r, o - i),
      c = -(o - i) / s,
      l = (a - r) / s;
    for (let s = 0; s < e; s++) {
      let u = r + (a - r) * s / e,
        d = i + (o - i) * s / e,
        f = r + (a - r) * (s + 1) / e,
        p = i + (o - i) * (s + 1) / e;
      n += `Q${cd((u + f) / 2 + c * t)} ${cd((d + p) / 2 + l * t)} ${cd(f)} ${cd(p)} `;
    }
  };
  r(1, 0, 0.5, 1);
  r(0.5, 1, 0, 0);
  return n + `Z`;
}

export function getFlapFoilPath() {
  return getFlapClipPath(9, 0.028).replace(/-?\d*\.?\d+/g, e => cd(parseFloat(e) * 100));
}

export const PROGRAMME_ICONS = {
  procession: '<path d="M3 15h18M5 15l1.5 4h11L19 15M8 15c0-3 1.8-5 4-5s4 2 4 5M12 10V7M10 7.5c1-1.2 3-1.2 4 0"/>',
  monk: '<path d="M12 3c2.5 2.6 4 5.4 4 8.5A4 4 0 0 1 8 11.5C8 8.4 9.5 5.6 12 3ZM12 15.5V21M8.5 21h7"/>',
  scissors: '<circle cx="6.5" cy="17" r="2.7"/><circle cx="17.5" cy="17" r="2.7"/><path d="M8.5 15 18 4M15.5 15 6 4"/>',
  tray: '<path d="M4 14h16M6 14c0 3 2.7 5 6 5s6-2 6-5M9 14c0-2.5 1.3-4 3-4s3 1.5 3 4M12 10V6.5M10.5 5.5 12 4l1.5 1.5"/>',
  candle: '<path d="M9.5 10h5v10h-5zM12 7.5c1.4-1.3 1.4-3 0-4.5-1.4 1.5-1.4 3.2 0 4.5ZM7 20h10"/>',
  flower: '<path d="M12 12c-1-3 0-6 0-8 0 2 1 5 0 8Zm0 0c3-1 6 0 8 0-2 0-5 1-8 0Zm0 0c1 3 0 6 0 8 0-2-1-5 0-8Zm0 0c-3 1-6 0-8 0 2 0 5-1 8 0Z"/><circle cx="12" cy="12" r="1.6"/>',
  thread: '<path d="M4 12c3-4 5 4 8 0s5 4 8 0M7 8.5c2 1.2 3 3.5 3 3.5M17 15.5c-2-1.2-3-3.5-3-3.5"/>',
  dinner: '<path d="M4 12h16a8 7 0 0 1-16 0ZM9 19.5h6M16 4l-4 6M19 5l-5 5"/>'
};

export const SOCIAL_ICONS = {
  telegram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  messenger: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.24 0 0 4.952 0 11.64c0 3.499 1.434 6.521 3.769 8.61a.96.96 0 0 1 .323.683l.065 2.135a.96.96 0 0 0 1.347.85l2.381-1.053a.96.96 0 0 1 .641-.046A13 13 0 0 0 12 23.28c6.76 0 12-4.952 12-11.64S18.76 0 12 0m6.806 7.44c.522-.03.971.567.63 1.094l-4.178 6.457a.707.707 0 0 1-.977.208l-3.87-2.504a.44.44 0 0 0-.49.007l-4.363 3.01c-.637.438-1.415-.317-.995-.966l4.179-6.457a.706.706 0 0 1 .977-.21l3.87 2.505c.15.097.344.094.491-.007l4.362-3.008a.7.7 0 0 1 .364-.13"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/></svg>`
};
