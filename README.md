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

## 🚀 របៀប Run លើកុំព្យូទ័រ (Commands)

```bash
# ចាប់ផ្តើម Local Dev Server
npm run dev

# Build សម្រាប់ Production
npm run build
```
