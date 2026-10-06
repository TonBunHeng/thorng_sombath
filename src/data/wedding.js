/**
 * Wedding configuration data
 * All wedding details (couple, families, date, venue, programme, gifts)
 */

export const weddingData = {
  couple: {
    groom: {
      km: "ហ៊ាន សម្បត្តិ",
      en: "Hean SamBath",
      initialKm: "ស",
      initialEn: "S"
    },
    bride: {
      km: "តុន ចាន់ថង",
      en: "Ton ChanThorng",
      initialKm: "ច",
      initialEn: "C"
    }
  },
  families: {
    groom: {
      father: { km: "លោក ហ៊ាន សុខន", en: "Mr. Hean Sokhon" },
      mother: { km: "លោកស្រី យ៉ាន់ ចាន់ណារ៉ា", en: "Mrs. Yann Chanara" }
    },
    bride: {
      father: { km: "លោក ហែម សាវឿន", en: "Mr. Hem Savoeun" },
      mother: { km: "លោកស្រី សៅ ណឺង", en: "Mrs. Sao Neung" }
    }
  },
  date: "2026-11-15T07:00:00+07:00",
  timeIsPlaceholder: true,
  dateIsPlaceholder: false,
  lunar: {
    km: "ត្រូវនឹងថ្ងៃអាទិត្យ ៦កើត ខែកត្ដិក ឆ្នាំមមី អដ្ឋស័ក ព.ស.២៥៧០",
    en: "6th waxing day of Kadeuk, Year of the Horse, B.E. 2570"
  },
  venue: {
    name: {
      km: "ភូមិព្រែកហូរ (ខាងលិច)",
      en: "Prek Ho Village (West)"
    },
    address: {
      km: "សង្កាត់ព្រែកហូរ ក្រុងតាខ្មៅ ខេត្តកណ្តាល",
      en: "Prek Ho, Ta Khmau, Kandal Province"
    },
    lat: 11.45128,
    lng: 104.93335,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=11.45128,104.93335",
    note: {
      km: "",
      en: ""
    }
  },
  programme: [
    {
      time: "06:30",
      icon: "procession",
      km: "ហែជំនូន",
      en: "Hae Chamnoun",
      dkm: "ក្បួនហែជំនូនរបស់កូនកំលោះ",
      den: "The groom’s procession of gifts"
    },
    {
      time: "07:30",
      icon: "monk",
      km: "ពិធីសូត្រមន្ត",
      en: "Soth Mon",
      dkm: "ព្រះសង្ឃចម្រើនព្រះបរិត្ត ប្រសិទ្ធពរ",
      den: "Blessing chanted by the monks"
    },
    {
      time: "08:30",
      icon: "scissors",
      km: "ពិធីកាត់សក់",
      en: "Kat Sak",
      dkm: "ពិធីកាត់សក់បង្កក់សិរី",
      den: "Hair-cutting & cleansing ceremony"
    },
    {
      time: "09:30",
      icon: "tray",
      km: "សំពះផ្ទឹម",
      en: "Sampeah Ptem",
      dkm: "គោរពវិញ្ញាណក្ខន្ធដូនតា",
      den: "Paying respect to the ancestors"
    },
    {
      time: "10:30",
      icon: "candle",
      km: "បង្វិលពពិល",
      en: "Bongvil Popil",
      dkm: "ពិធីបង្វិលពពិលជូនពរ",
      den: "Candle-circling blessing"
    },
    {
      time: "11:00",
      icon: "flower",
      km: "បាចផ្កាស្លា",
      en: "Bach Phka Sla",
      dkm: "បាចផ្កាស្លាជូនពរកូនកំលោះ កូនក្រមុំ",
      den: "Scattering of betel flowers"
    },
    {
      time: "11:30",
      icon: "thread",
      km: "ពិធីចងដៃ",
      en: "Chong Dai",
      dkm: "ចងដៃកូនកំលោះ កូនក្រមុំ ដោយអំបោះក្រហម",
      den: "Tying of the wrists with red thread"
    },
    {
      time: "17:00",
      icon: "dinner",
      km: "ពិសាភោជនាហារ",
      en: "Reception dinner",
      dkm: "ទទួលភ្ញៀវកិត្តិយស និងពិសាភោជនាហារ",
      den: "Welcoming guests & dinner"
    }
  ],
  story: [
    { k: "s2", ar: "3/2", km: "ប្រាសាទអង្គរវត្ត", en: "Angkor Wat", v: "up" },
    { k: "s3", ar: "2/3", km: "វាលស្មៅលានជល់ដំរី", en: "The Elephant Terrace lawn", v: "down" },
    { k: "s4", ar: "3/2", km: "ស្នាមញញឹម", en: "Shared laughter", v: "" },
    { k: "s1", ar: "3/2", km: "ដើមឈើចំណាស់", en: "Beneath the old rain tree", v: "up" },
    { k: "s5", ar: "3/2", km: "ស្ពានឈើបុរាណ", en: "The old wooden bridge", v: "down" },
    { k: "s6", ar: "2/3", km: "ជណ្ដើរឈើបុរាណ", en: "The old wooden stairs", v: "up" },
    { k: "s7", ar: "3/2", km: "ផ្ទះឈើបុរាណ", en: "The traditional wooden house", v: "" },
    { k: "s8", ar: "3/2", km: "សួនផ្កា", en: "In the garden", v: "down" },
    { k: "s9", ar: "3/2", km: "ប្រទីបផ្កាឈូក", en: "Lotus lanterns", v: "up" },
    { k: "s10", ar: "3/2", km: "នាពេលសាយ័ណ្ហ", en: "At dusk", v: "" },
    { k: "s12", ar: "2/3", km: "ពន្លឺភ្លើងទៀន", en: "By candlelight", v: "down" }
  ],
  gift: {
    enabled: true,
    accounts: [
      {
        side: { km: "តុន ចាន់ថង", en: "Ton ChanThorng" },
        bank: "KHQR",
        name: "តុន ចាន់ថង",
        qr: "/img/gift/khqr.webp"
      },
      {
        side: { km: "តុន ចាន់ថង", en: "Ton ChanThorng" },
        bank: "ABA PAY",
        name: "CHANTHORNG TON",
        qr: "/img/gift/aba.webp"
      }
    ]
  },
  music: "/audio/ភ្ជាប់និស្ស័យ.m4a",
  siteUrl: "https://thorng-sombath.vercel.app"
};
