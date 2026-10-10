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
          <path d="M 0.0000 0.0000 C 0.0416 0.0427, 0.0784 0.1099, 0.0920 0.1680 C 0.1348 0.2125, 0.1732 0.2821, 0.1880 0.3420 C 0.2331 0.3887, 0.2747 0.4615, 0.2920 0.5240 C 0.3387 0.5710, 0.3827 0.6446, 0.4020 0.7080 C 0.4240 0.7500, 0.4520 0.8050, 0.4700 0.8700 C 0.4840 0.9200, 0.4920 0.9650, 0.5000 0.9650 C 0.5080 0.9650, 0.5160 0.9200, 0.5300 0.8700 C 0.5480 0.8050, 0.5760 0.7500, 0.5980 0.7080 C 0.6447 0.6610, 0.6887 0.5874, 0.7080 0.5240 C 0.7531 0.4773, 0.7947 0.4045, 0.8120 0.3420 C 0.8548 0.2975, 0.8932 0.2279, 0.9080 0.1680 C 0.9496 0.1253, 0.9864 0.0581, 1.0000 0.0000 Z" />
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
      <defs>
        <linearGradient id={`corner-foil-${position}`} x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#9c7124" />
          <stop offset="25%" stopColor="#d9b15a" />
          <stop offset="45%" stopColor="#fbefc0" />
          <stop offset="62%" stopColor="#d9b15a" />
          <stop offset="85%" stopColor="#9c7124" />
          <stop offset="100%" stopColor="#d9b15a" />
        </linearGradient>
      </defs>
      <g transform={transformMap[position]}>
        <g className="kb-sway">
          <path className="kb-line" d="M6 6 H150 M6 6 V150" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path className="kb-line" d="M14 14 H110 M14 14 V110" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <g transform="translate(22 22) rotate(135) scale(.9)">
            <path className="kb-fill" fill="currentColor" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M0 -6 C-3 -20 -2 -36 4 -50" />
          </g>
          <g transform="translate(40 16) rotate(100) scale(.55)">
            <path className="kb-fill" fill="currentColor" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M0 -6 C-3 -20 -2 -36 4 -50" />
          </g>
          <g transform="translate(16 40) rotate(170) scale(.55) scale(-1 1)">
            <path className="kb-fill" fill="currentColor" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M0 -6 C-3 -20 -2 -36 4 -50" />
          </g>
          <path className="kb-line kb-curl" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M0 0 C8 -2 14 -9 13 -17 C12 -24 4 -27 -1 -23 C-5 -19 -3 -13 2 -13 C5 -13 6 -17 4 -18" transform="translate(62 24) scale(1.1)" />
          <path className="kb-line kb-curl" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M0 0 C8 -2 14 -9 13 -17 C12 -24 4 -27 -1 -23 C-5 -19 -3 -13 2 -13 C5 -13 6 -17 4 -18" transform="translate(24 62) rotate(90) scale(1.1 -1.1)" />
          <g transform="translate(92 22) rotate(90) scale(.42)">
            <path className="kb-fill" fill="currentColor" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M0 -6 C-3 -20 -2 -36 4 -50" />
          </g>
          <g transform="translate(22 92) rotate(180) scale(.42) scale(-1 1)">
            <path className="kb-fill" fill="currentColor" d="M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z" />
            <path className="kb-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M0 -6 C-3 -20 -2 -36 4 -50" />
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
    <svg className={className} viewBox="-160 -15 320 30" aria-hidden="true">
      <defs>
        <linearGradient id="div-foil" x1="0" y1="0" x2="1" y2=".35">
          <stop offset="0%" stopColor="#9c7124" />
          <stop offset="25%" stopColor="#d9b15a" />
          <stop offset="45%" stopColor="#fbefc0" />
          <stop offset="62%" stopColor="#d9b15a" />
          <stop offset="85%" stopColor="#9c7124" />
          <stop offset="100%" stopColor="#d9b15a" />
        </linearGradient>
      </defs>
      <path className="draw" d="M-150 0 C-90 -12 -30 12 0 0 C30 -12 90 12 150 0" fill="none" stroke="url(#div-foil)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="0" cy="0" r="3.2" fill="url(#div-foil)" />
      <circle cx="-150" cy="0" r="2" fill="url(#div-foil)" />
      <circle cx="150" cy="0" r="2" fill="url(#div-foil)" />
    </svg>
  );
}

export function Butterfly({ className = "butterfly" }) {
  return (
    <svg className={className} viewBox="0 0 100 80" aria-hidden="true">
      <defs>
        <linearGradient id="bf-foil" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#9c7124" />
          <stop offset="25%" stopColor="#d9b15a" />
          <stop offset="45%" stopColor="#fbefc0" />
          <stop offset="62%" stopColor="#d9b15a" />
          <stop offset="85%" stopColor="#9c7124" />
          <stop offset="100%" stopColor="#d9b15a" />
        </linearGradient>
        <filter id="bf-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#bf-glow)">
        <g className="wing-l">
          <g transform="translate(100 0) scale(-1 1)">
            <path d="M51 38 C58 14 82 1 94 10 C103 18 92 33 75 39 C66 42 57 41 51 40 Z" fill="url(#bf-foil)" fillOpacity=".9" />
            <path d="M51 42 C62 44 80 50 81 62 C82 74 66 76 59 66 C54 59 51 51 51 42 Z" fill="url(#bf-foil)" fillOpacity=".75" />
            <path d="M53 39 C64 30 76 20 90 13 M56 39 C68 36 80 33 92 24 M54 44 C62 52 70 58 78 64 M53 46 C57 56 61 64 66 70" fill="none" stroke="#5a4113" strokeWidth=".8" strokeOpacity=".55" />
            <circle cx="86" cy="15" r="1.6" fill="#fff6d8" opacity=".8" />
            <circle cx="90" cy="22" r="1.1" fill="#fff6d8" opacity=".7" />
          </g>
        </g>
        <g className="wing-r">
          <path d="M51 38 C58 14 82 1 94 10 C103 18 92 33 75 39 C66 42 57 41 51 40 Z" fill="url(#bf-foil)" fillOpacity=".9" />
          <path d="M51 42 C62 44 80 50 81 62 C82 74 66 76 59 66 C54 59 51 51 51 42 Z" fill="url(#bf-foil)" fillOpacity=".75" />
          <path d="M53 39 C64 30 76 20 90 13 M56 39 C68 36 80 33 92 24 M54 44 C62 52 70 58 78 64 M53 46 C57 56 61 64 66 70" fill="none" stroke="#5a4113" strokeWidth=".8" strokeOpacity=".55" />
          <circle cx="86" cy="15" r="1.6" fill="#fff6d8" opacity=".8" />
          <circle cx="90" cy="22" r="1.1" fill="#fff6d8" opacity=".7" />
        </g>
        <ellipse cx="50" cy="44" rx="2.4" ry="13" fill="url(#bf-foil)" />
        <path d="M49 32 C46 22 42 16 37 12 M51 32 C54 22 58 16 63 12" fill="none" stroke="url(#bf-foil)" strokeWidth="1" />
        <circle cx="37" cy="12" r="1.4" fill="url(#bf-foil)" />
        <circle cx="63" cy="12" r="1.4" fill="url(#bf-foil)" />
      </g>
    </svg>
  );
}

export function WaxSeal({ className = "e2__seal-svg" }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="wax-r" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#e7c97a" />
          <stop offset="45%" stopColor="#b98c35" />
          <stop offset="100%" stopColor="#6e4c14" />
        </radialGradient>
        <linearGradient id="seal-foil" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#9c7124" />
          <stop offset="25%" stopColor="#d9b15a" />
          <stop offset="45%" stopColor="#fbefc0" />
          <stop offset="62%" stopColor="#d9b15a" />
          <stop offset="85%" stopColor="#9c7124" />
          <stop offset="100%" stopColor="#d9b15a" />
        </linearGradient>
        <filter id="wax-lit-seal" x="-20%" y="-20%" width="140%" height="140%">
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
      <path
        d="M127.5106 72 L127.8549 77.6982 L130.0486 83.9444 L131.3372 90.6065 L129.2111 96.526 L124.46 101.1095 L119.7242 105.2247 L115.9648 109.7223 L111.9183 113.9183 L106.7365 116.7635 L101.421 119.0249 L97.0863 122.6748 L93.1304 127.8416 L88.176 131.9184 L82.072 132.69 L75.8364 131.2582 L70 130.4861 L64.1746 131.1462 L58.2043 131.3012 L52.5384 129.5633 L47.1558 127.1509 L41.2849 125.7221 L34.9251 124.4933 L29.674 121.1373 L26.884 115.116 L25.5235 108.5009 L23.2246 103.2543 L19.3818 99.056 L15.7758 94.4604 L13.7215 89.0719 L12.1078 83.5155 L9.4518 77.9635 L6.8298 72 L6.9303 65.7882 L10.2861 60.1222 L14.2204 55.0795 L16.2193 49.7233 L16.984 43.6624 L18.9951 37.9196 L23.0089 33.4354 L27.5469 29.5469 L31.567 25.1693 L35.9241 21.0019 L41.6438 18.9492 L48.0891 19.1023 L53.8835 18.8709 L58.8847 16.1197 L64.099 12.0865 L70 9.8053 L76.0846 10.2216 L82.0265 11.5387 L88.0654 12.4464 L93.9585 14.1591 L98.732 18.2462 L102.2302 23.7641 L105.9609 28.1815 L111.2554 30.7446 L117.1178 33.3315 L121.2476 37.7575 L123.1074 43.6135 L124.5151 49.4191 L126.769 54.7793 L128.6781 60.3282 L128.6235 66.2261 L127.5106 72 Z"
        fill="#000"
        opacity=".35"
        transform="translate(2 5)"
        style={{ filter: "blur(3px)" }}
      />
      <g filter="url(#wax-lit-seal)">
        <path
          d="M127.5106 70 L127.8549 75.6982 L130.0486 81.9444 L131.3372 88.6065 L129.2111 94.526 L124.46 99.1095 L119.7242 103.2247 L115.9648 107.7223 L111.9183 111.9183 L106.7365 114.7635 L101.421 117.0249 L97.0863 120.6748 L93.1304 125.8416 L88.176 129.9184 L82.072 130.69 L75.8364 129.2582 L70 128.4861 L64.1746 129.1462 L58.2043 129.3012 L52.5384 127.5633 L47.1558 125.1509 L41.2849 123.7221 L34.9251 122.4933 L29.674 119.1373 L26.884 113.116 L25.5235 106.5009 L23.2246 101.2543 L19.3818 97.056 L15.7758 92.4604 L13.7215 87.0719 L12.1078 81.5155 L9.4518 75.9635 L6.8298 70 L6.9303 63.7882 L10.2861 58.1222 L14.2204 53.0795 L16.2193 47.7233 L16.984 41.6624 L18.9951 35.9196 L23.0089 31.4354 L27.5469 27.5469 L31.567 23.1693 L35.9241 19.0019 L41.6438 16.9492 L48.0891 17.1023 L53.8835 16.8709 L58.8847 14.1197 L64.099 10.0865 L70 7.8053 L76.0846 8.2216 L82.0265 9.5387 L88.0654 10.4464 L93.9585 12.1591 L98.732 16.2462 L102.2302 21.7641 L105.9609 26.1815 L111.2554 28.7446 L117.1178 31.3315 L121.2476 35.7575 L123.1074 41.6135 L124.5151 47.4191 L126.769 52.7793 L128.6781 58.3282 L128.6235 64.2261 L127.5106 70 Z"
          fill="url(#wax-r)"
        />
        <circle cx="70" cy="70" r="44" fill="#a97d2c" />
      </g>
      <circle cx="70" cy="70" r="44" fill="none" stroke="#5e400f" strokeOpacity=".55" strokeWidth="1.4" />
      <circle cx="70" cy="70" r="39" fill="none" stroke="#f3dc9c" strokeOpacity=".35" strokeWidth=".8" strokeDasharray="1.6 3" />
      <g filter="url(#wax-press)" transform="translate(70 92) scale(.36)" className="wax-crest">
        <KbachCrestSvg foilId="seal-foil" />
      </g>
    </svg>
  );
}

export function Lockup({ groom = "សម្បត្តិ", bride = "ថង", crest = true, className = "" }) {
  const groomName = groom || "សម្បត្តិ";
  const brideName = bride || "ថង";

  return (
    <div className={`lockup relative w-full aspect-[600/470] [container-type:inline-size] ${className}`} role="img" aria-label={`${groomName} & ${brideName}`}>
      <svg className="lk-orn absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 600 470" aria-hidden="true">
        <defs>
          <linearGradient id="lk-foil" x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0%" stopColor="#9c7124" />
            <stop offset="25%" stopColor="#d9b15a" />
            <stop offset="45%" stopColor="#fbefc0" />
            <stop offset="62%" stopColor="#d9b15a" />
            <stop offset="85%" stopColor="#9c7124" />
            <stop offset="100%" stopColor="#d9b15a" />
          </linearGradient>
          <filter id="lk-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>
        {crest && (
          <g className="lk-crest" transform="translate(300 60) scale(.5)">
            <KbachCrestSvg foilId="g-foil" />
          </g>
        )}
        <path
          className="lk-swash fill-none stroke-[url(#g-foil)] [stroke-width:3px] [stroke-linecap:round]"
          d="M40 292 C110 318 170 314 206 296 C236 280 238 254 220 250 C202 246 196 272 214 284 C240 302 262 294 272 284"
        />
        <path
          className="lk-swash lk-swash2 fill-none stroke-[url(#g-foil)] [stroke-width:2.2px] [stroke-linecap:round]"
          d="M318 446 C392 460 476 456 566 438"
        />
        <path
          className="lk-heart fill-[url(#g-foil)]"
          d="M266 316 C259 304 244 308 246 321 C248 332 266 341 266 348 C266 341 284 332 286 321 C288 308 273 304 266 316 Z"
        />
      </svg>
      <span className="lk-name lk-groom font-moulpali whitespace-nowrap tracking-normal text-transparent bg-[position:30%] bg-[size:220%_100%] bg-clip-text text-center absolute top-[9%] left-[-2%] [font-size:23cqw] font-normal leading-none pt-[0.3em] pb-[0.45em] px-[0.1em]" aria-hidden="true">{groomName}</span>
      <span className="lk-name lk-bride font-moulpali whitespace-nowrap tracking-normal text-transparent bg-[position:30%] bg-[size:220%_100%] bg-clip-text text-center absolute top-[45.5%] right-[1%] [font-size:23cqw] font-normal leading-none pt-[0.3em] pb-[0.45em] px-[0.1em]" aria-hidden="true">{brideName}</span>
      <div className="lk-butterfly absolute top-[18%] right-[6%] w-[14%] rotate-[16deg]" aria-hidden="true">
        <Butterfly className="is-resting w-full h-auto block overflow-visible" />
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
