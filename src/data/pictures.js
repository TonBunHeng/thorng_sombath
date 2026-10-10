/**
 * Centralized Pictures & Session Asset Manager
 * Manages all image assets organized by frontend section / photo session.
 * 
 * Directory Structure:
 * - /public/img/hero/     -> Hero cover photos (desktop + mobile sizes)
 * - /public/img/words/    -> Arch portrait & invitation message photos
 * - /public/img/couple/   -> Couple photo in scalloped frame & gate background
 * - /public/img/story/    -> Love Story / pre-wedding photo session timeline
 * - /public/img/pond/     -> Interactive wishing pond water & reflection textures
 * - /public/img/gallery/  -> Full photo album gallery with gallery.json
 * - /public/gift/         -> Digital gift bank QR cards
 */

export const pictures = {
  // 1. Hero Cover Section
  hero: {
    desktop: "/img/hero/hero-2000.webp",
    desktop1280: "/img/hero/hero-1280.webp",
    mobile: "/img/hero/hero-m-2000.webp",
    mobile1280: "/img/hero/hero-m-1280.webp",
    mobile640: "/img/hero/hero-m-640.webp",
    srcSetDesktop: "/img/hero/hero-1280.webp 1280w, /img/hero/hero-2000.webp 2000w",
    srcSetMobile: "/img/hero/hero-m-640.webp 640w, /img/hero/hero-m-1280.webp 1280w, /img/hero/hero-m-2000.webp 2000w",
    alt: "Wedding couple cover"
  },

  // 2. 3D Envelope Gate Background
  gate: {
    bgDesktop: "/img/couple/cozy-1280.webp",
    bgDesktop2000: "/img/couple/cozy-2000.webp",
    srcSetDesktop: "/img/couple/cozy-1280.webp 1280w, /img/couple/cozy-2000.webp 2000w",
    srcSetMobile: "/img/words/words-640.webp 640w, /img/words/words-1280.webp 1280w"
  },

  // 3. Invitation Words / Message Section (Arch Portrait)
  words: {
    main: "/img/words/words-1280.webp",
    small: "/img/words/words-640.webp",
    srcSet: "/img/words/words-640.webp 640w, /img/words/words-1280.webp 1280w",
    alt: "The wedding couple"
  },

  // 4. Couple Section (Scalloped Frame)
  couple: {
    main: "/img/couple/cozy-1280.webp",
    srcSet: "/img/couple/cozy-640.webp 640w, /img/couple/cozy-1280.webp 1280w, /img/couple/cozy-2000.webp 2000w",
    alt: "The couple"
  },

  // 5. Love Story / Photo Session Timeline
  story: {
    folder: "/img/story",
    shots: [
      { k: "s2", ar: "3/2", v: "up", km: "ប្រាសាទអង្គរវត្ត", en: "Angkor Wat", img640: "/img/story/s2-640.webp", img1280: "/img/story/s2-1280.webp" },
      { k: "s3", ar: "2/3", v: "down", km: "វាលស្មៅលានជល់ដំរី", en: "The Elephant Terrace lawn", img640: "/img/story/s3-640.webp", img1280: "/img/story/s3-1280.webp" },
      { k: "s4", ar: "3/2", v: "", km: "ស្នាមញញឹម", en: "Shared laughter", img640: "/img/story/s4-640.webp", img1280: "/img/story/s4-1280.webp" },
      { k: "s1", ar: "3/2", v: "up", km: "ដើមឈើចំណាស់", en: "Beneath the old rain tree", img640: "/img/story/s1-640.webp", img1280: "/img/story/s1-1280.webp" },
      { k: "s5", ar: "3/2", v: "down", km: "ស្ពានឈើបុរាណ", en: "The old wooden bridge", img640: "/img/story/s5-640.webp", img1280: "/img/story/s5-1280.webp" },
      { k: "s6", ar: "2/3", v: "up", km: "ជណ្ដើរឈើបុរាណ", en: "The old wooden stairs", img640: "/img/story/s6-640.webp", img1280: "/img/story/s6-1280.webp" },
      { k: "s7", ar: "3/2", v: "", km: "ផ្ទះឈើបុរាណ", en: "The traditional wooden house", img640: "/img/story/s7-640.webp", img1280: "/img/story/s7-1280.webp" },
      { k: "s8", ar: "3/2", v: "down", km: "សួនផ្កា", en: "In the garden", img640: "/img/story/s8-640.webp", img1280: "/img/story/s8-1280.webp" },
      { k: "s9", ar: "3/2", v: "up", km: "ប្រទីបផ្កាឈូក", en: "Lotus lanterns", img640: "/img/story/s9-640.webp", img1280: "/img/story/s9-1280.webp" },
      { k: "s10", ar: "3/2", v: "", km: "នាពេលសាយ័ណ្ហ", en: "At dusk", img640: "/img/story/s10-640.webp", img1280: "/img/story/s10-1280.webp" },
      { k: "s12", ar: "2/3", v: "down", km: "ពន្លឺភ្លើងទៀន", en: "By candlelight", img640: "/img/story/s12-640.webp", img1280: "/img/story/s12-1280.webp" }
    ]
  },

  // 6. Interactive Wishing Pond Section
  pond: {
    water2000: "/img/pond/pond-w-2000.webp",
    water1280: "/img/pond/pond-w-1280.webp",
    fallback2000: "/img/pond/pond-2000.webp",
    fallback1280: "/img/pond/pond-1280.webp",
    fallback640: "/img/pond/pond-640.webp",
    srcSetWater: "/img/pond/pond-w-1280.webp 1280w, /img/pond/pond-w-2000.webp 2000w",
    alt: "Lotus reflection on water"
  },

  // 7. Photo Album Gallery Section
  gallery: {
    folder: "/img/gallery",
    configUrl: "/img/gallery/gallery.json"
  },

  // 8. Gift / QR Payment Section
  gift: {
    khqr: "/img/gift/khqr.jpg",
    aba: "/img/gift/aba.webp"
  }
};
