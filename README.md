# ធៀបការឌីជីថល · Khmer Wedding E-Invitation (React + Vite)

គម្រោងវេបសាយធៀបការឌីជីថល ស្ទីលខ្មែរ (Khmer Digital Wedding Invitation) ដែលបានរៀបចំជារចនាសម្ព័ន្ធ **React 19 + Vite** ស្អាត ងាយស្រួលកែប្រែ និងបានក្លូនចេញពី **[raksmey-pheakdey.vercel.app](https://raksmey-pheakdey.vercel.app/)** ១០០% ពេញលេញ រួមទាំង Template Starter Kit ពី **[khmer-invite-prompt.vercel.app](https://khmer-invite-prompt.vercel.app/)**។

---

## 📁 រចនាសម្ព័ន្ធ Folders & Files ក្នុង `src/` (Project Structure)

```
src/
├── components/                 # React UI Components ទាំងអស់
│   ├── Preloader.jsx           # ផ្កាឈូក & រាប់លេខខ្មែរ ០-១០០%
│   ├── EnvelopeGate.jsx        # ស្រោមសំបុត្រ 3D, ត្រាក្រមួន, ចលនាបើក
│   ├── Hud.jsx                 # Top bar: Monogram, ប្តូរភាសា, ប៊ូតុងភ្លេង
│   ├── HeroCover.jsx           # Cover ពេញអេក្រង់, Embers Canvas, Lockup មាស
│   ├── InvitationWords.jsx     # លិខិតគោរពអញ្ជើញ, រូប arch, ឪពុកម្តាយទាំងសងខាង
│   ├── Couple.jsx              # កូនកំលោះ & កូនក្រមុំ, ស៊ុម scallop, មេអំបៅ
│   ├── Countdown.jsx           # នាឡិការាប់ថយក្រោយជាលេខខ្មែរ + Marquee
│   ├── Programme.jsx           # កម្មវិធីមង្គលការ (Timeline ជាមួយ Icon ភ្លឺ)
│   ├── Story.jsx               # រឿងរ៉ាវស្នេហា (Horizontal pinned photo strip)
│   ├── Pond.jsx                # ស្រះទឹក interactive ប៉ះដើម្បីបណ្ដែតប្រទីប
│   ├── Gallery.jsx             # វិចិត្រសាលរូបថត Masonry Grid
│   ├── Venue.jsx               # ទីតាំង, ផែនទី Google Maps, Save to Calendar (.ics)
│   ├── Gift.jsx                # ចំណងដៃ KHQR & ABA PAY
│   ├── Finale.jsx              # ទៀនភ្លឺ, ពាក្យអរគុណ, ចែករំលែក Telegram/FB/Messenger
│   ├── Lightbox.jsx            # Viewer មើលរូបថតធំពេញអេក្រង់ (Swipe & Keyboard)
│   ├── CustomCursor.jsx        # Mouse cursor មានពន្លឺ និង label ("ចុចបើក", "ប៉ះទឹក")
│   └── FloatingControls.jsx    # Toast, VineProgress bar, RsvpPill
│
├── data/                       # ឯកសារទិន្នន័យ (ងាយស្រួលកែប្រែ)
│   ├── wedding.js              # ព័ត៌មានគូស្នេហ៍, ឪពុកម្តាយ, ថ្ងៃខែ, ទីតាំង, កម្មវិធី, កុងធនាគារ
│   └── i18n.js                 # វចនានុក្រមភាសាខ្មែរ & អង់គ្លេស, លេខខ្មែរ, Format កាលបរិច្ឆេទ
│
├── utils/                      # Utilities & Assets
│   ├── audio.js                # Web Audio API (សំឡេងក្រដាស, ជួង, តំណក់ទឹក, Synthesizer)
│   ├── canvasEffects.js        # ភាគល្អិត Ember particles & រលកទឹក Pond ripples
│   ├── svgs.jsx                # បណ្តុំរូប SVG (Crest, Corner, WaxSeal, Butterfly, Divider)
│   └── icons.jsx               # Icons បណ្តាញសង្គម (Telegram, Messenger, Facebook, Link)
│
├── App.jsx                     # Root Component សម្របសម្រួល State និង Sections
├── main.jsx                    # Entry point ភ្ជាប់ទៅកាន់ #root
└── index.css                   # Stylesheet រួមបញ្ចូល Fonts, Foil, Shadows, Animations
```

---

## 🛠️ របៀបកែប្រែទិន្នន័យ (How to Customize Details)

### ១. កែប្រែឈ្មោះ កាលបរិច្ឆេទ ទីតាំង និងកម្មវិធី
ចូលទៅកាន់ឯកសារ:  
👉 [`src/data/wedding.js`](file:///Users/bunheng/Desktop/thorng_sombatt/src/data/wedding.js)

អ្នកអាចផ្លាស់ប្តូរ:
- **`couple`**: ឈ្មោះកូនកំលោះ និងកូនក្រមុំ (`km` និង `en`)
- **`families`**: ឈ្មោះមាតាបិតាទាំងសងខាង
- **`date`**: កាលបរិច្ឆេទមង្គលការ (ទម្រង់ ISO: `"2026-11-15T07:00:00+07:00"`)
- **`lunar`**: កាលបរិច្ឆេទតាមចន្ទគតិខ្មែរ
- **`venue`**: ឈ្មោះទីតាំង, អាសយដ្ឋាន, កូអរដោនេ Google Maps
- **`programme`**: កាលវិភាគម៉ោង និងឈ្មោះពិធីនីមួយៗ
- **`gift`**: គណនី KHQR និង ABA PAY

### ២. ផ្លាស់ប្តូររូបភាព (Replacing Images)
- រូបថតធំៗ: ដាក់ក្នុង [`public/img/`](file:///Users/bunheng/Desktop/thorng_sombatt/public/img/)
- រូបថត Gallery: ដាក់ក្នុង [`public/img/gallery/`](file:///Users/bunheng/Desktop/thorng_sombatt/public/img/gallery/) និងកែសម្រួលបញ្ជីក្នុង `public/img/gallery/gallery.json`
- រូប QR កូដចំណងដៃ: ដាក់ក្នុង [`public/gift/`](file:///Users/bunheng/Desktop/thorng_sombatt/public/gift/) (`khqr.webp`, `aba.webp`)

### ៣. ដាក់ភ្លេងផ្ទាល់ខ្លួន (Background Music)
- ដាក់ឯកសារ mp3 របស់អ្នកឈ្មោះ `music.mp3` ចូលទៅក្នុង [`public/audio/music.mp3`](file:///Users/bunheng/Desktop/thorng_sombatt/public/audio/)

### ៤. Starter Kit (SVGs & Textures)
- ឯកសារ Starter Kit ដើមទាំងអស់ស្ថិតនៅក្នុង [`public/starter-kit/`](file:///Users/bunheng/Desktop/thorng_sombatt/public/starter-kit/) និង [`public/kit/`](file:///Users/bunheng/Desktop/thorng_sombatt/public/kit/) រួមទាំងឯកសារទាញយក `khmer-invite-starter-kit.zip`។

---

## 🚀 របៀប Run លើកុំព្យូទ័រ (Commands)

```bash
# ចាប់ផ្តើម Local Dev Server
npm run dev

# Build សម្រាប់ Production
npm run build
```

---

© Design inspired by Someth Phay ([somethphay.me](https://somethphay.me/))
# thorng_sombath
