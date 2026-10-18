/**
 * Wedding configuration data
 * Reference: https://raksmey-pheakdey.vercel.app/
 */

export const weddingData = {
  couple: {
    groom: {
      km: "ផៃ រស្មី",
      en: "Phay Raksmey",
      shortKm: "រស្មី",
      shortEn: "Raksmey",
      initialKm: "រ",
      initialEn: "R"
    },
    bride: {
      km: "មាស ភក្ដី",
      en: "Meas Pheakdey",
      shortKm: "ភក្ដី",
      shortEn: "Pheakdey",
      initialKm: "ភ",
      initialEn: "P"
    }
  },
  families: {
    groom: {
      father: { km: "លោក ផៃ សុខន", en: "Mr. Phay Sokhan" },
      mother: { km: "អ្នកស្រី យ៉ាន់ ចាន់ណារ៉ា", en: "Mrs. Yann Chanara" }
    },
    bride: {
      father: { km: "លោក ហែម សាវឿន", en: "Mr. Hem Saveourn" },
      mother: { km: "អ្នកស្រី សៅ ណឺង", en: "Mrs. Sao Neung" }
    }
  },
  date: "2026-11-15T16:00:00+07:00",
  timeIsPlaceholder: false,
  dateIsPlaceholder: false,
  lunar: {
    km: "ត្រូវនឹងថ្ងៃអាទិត្យ ៦កើត ខែកត្ដិក ឆ្នាំមមី អដ្ឋស័ក ព.ស.២៥៧០",
    en: "6th waxing day of Kadeuk, Year of the Horse, B.E. 2570"
  },
  venue: {
    name: {
      km: "គេហដ្ឋានខាងស្រី",
      en: "The Bride’s House"
    },
    address: {
      km: "ភូមិព្រែកហូរលិច១ សង្កាត់ព្រែកហូរ ក្រុងតាខ្មៅ ខេត្តកណ្តាល",
      en: "Preakho Lich 1 Village, Preakho Commune, Takhmao District, Kandal Province"
    },
    lat: 11.45128,
    lng: 104.93335,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=11.45128,104.93335",
    note: {
      km: "",
      en: ""
    }
  },
  contacts: [
    { label: "096 7 717 278", tel: "+855967717278" },
    { label: "070 895 623", tel: "+85570895623" }
  ],
  programme: [
    {
      km: "កម្មវិធីទី១ ថ្ងៃសៅរ៍ ទី១៤ ខែវិច្ឆិកា ឆ្នាំ២០២៦",
      en: "Day 1 · Saturday 14 November 2026",
      rows: [
        { t: "03:00", pkm: "រសៀល", pen: "PM", km: "ពិធីសែនក្រុងពាលី", en: "Sen Krong Peali — offering to the guardian spirits" },
        { t: "04:00", pkm: "រសៀល", pen: "PM", km: "ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត", en: "Monks chant the blessing (Soth Mon)" },
        { t: "05:00", pkm: "ល្ងាច", pen: "PM", km: "ពិធីជុំពេលា និងជាវខាន់ស្លា", en: "Chum Pelea and Chav Khan Sla ceremonies" },
        { t: "06:30", pkm: "ល្ងាច", pen: "PM", km: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលល្ងាច", en: "Dinner for honoured guests" }
      ]
    },
    {
      km: "កម្មវិធីទី២ ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦",
      en: "Day 2 · Sunday 15 November 2026",
      rows: [
        { t: "06:30", pkm: "ព្រឹក", pen: "AM", km: "ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែជំនូន", en: "Guests gather for the Hae Chamnoun procession" },
        { t: "07:00", pkm: "ព្រឹក", pen: "AM", km: "ពិធីហែជំនូនកំណត់ចូលរោងជ័យ", en: "Hae Chamnoun — the gift procession enters the wedding pavilion" },
        { t: "07:30", pkm: "ព្រឹក", pen: "AM", km: "ពិធីចៅមហានិយាយជើងការ សែនព្រេន រៀបរាប់ផ្លែឈើនិងពិសាភោជនាហារពេលព្រឹក", en: "The master of ceremonies presents the proposal, Sen Pren offering, presentation of fruits, and breakfast" },
        { t: "08:00", pkm: "ព្រឹក", pen: "AM", km: "ពិធីបំពាក់ចិញ្ចៀន", en: "Exchange of rings" },
        { t: "09:00", pkm: "ព្រឹក", pen: "AM", km: "ពិធីកាត់សក់បង្កក់សិរី កូនប្រុស-កូនស្រី", en: "Kat Sak — hair-cutting blessing for the bride and groom" },
        { t: "11:00", pkm: "ព្រឹក", pen: "AM", km: "ពិធីសំពះផ្ទឹមចងដៃ បង្វិលពពិល និងព្រះថោងតោងស្បៃ", en: "Sampeah Ptem, wrist-tying, Bongvil Popil and Preah Thong holding the scarf" },
        { t: "12:00", pkm: "ថ្ងៃត្រង់", pen: "PM", km: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់ បញ្ចប់កិច្ចអាពាហ៍ពិពាហ៍", en: "Lunch for honoured guests; the wedding rites conclude" },
        { t: "04:00", pkm: "ល្ងាច", pen: "PM", km: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាហារ នៅគេហដ្ឋានខាងស្រី ដោយមេត្រីភាព ។ សូមអរគុណ !", en: "Dinner reception at the bride’s house. Thank you!", main: true }
      ]
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
        side: { km: "មាស ភក្ដី", en: "Meas Pheakdey" },
        bank: "KHQR",
        name: "មាស ភក្ដី",
        qr: "/img/gift/khqr.webp"
      },
      {
        side: { km: "មាស ភក្ដី", en: "Meas Pheakdey" },
        bank: "ABA PAY",
        name: "PHEKEDEY MEAS",
        qr: "/img/gift/aba.webp"
      }
    ]
  },
  music: "/audio/ភ្ជាប់និស្ស័យ.m4a",
  siteUrl: "https://raksmey-pheakdey.vercel.app"
};
