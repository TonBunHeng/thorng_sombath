# 📸 ការគ្រប់គ្រងរូបភាពក្នុង Public / Picture Management Guide

All pictures used across the wedding website are stored cleanly under [`public/img/`](file:///Users/bunheng/Desktop/thorng_sombatt/public/img).

---

## 📁 រចនាសម្ព័ន្ធ Folder / Directory Structure

```text
public/
├── img/
│   ├── hero/        <- រូប Cover ធំខាងលើគេ (Desktop & Mobile)
│   ├── couple/      <- រូបគូដណ្ដឹងក្នុងស៊ុម & ផ្ទៃខាងក្រោយ Gate 3D
│   ├── words/       <- រូប Arch ក្នុងផ្នែកសារសិរីសួស្តី
│   ├── story/       <- រូបរឿងរ៉ាវស្នេហា / Pre-wedding session (s1..s12)
│   ├── pond/        <- រូបផ្ទៃទឹកស្រះបួងសួង (Shader texture & fallback)
│   ├── gallery/     <- កម្រងរូបភាពអាពាហ៍ពិពាហ៍ទាំងមូល + gallery.json
│   ├── gift/        <- កាត QR ធនាគារ (ABA, KHQR)
│   ├── textures/    <- ក្រដាសប្រពៃណី (Olive, Cream, Lining)
│   └── pictures.json<- Catalog បញ្ជីរូបភាព និងទំហំទាំងអស់
├── assets/          <- Web Fonts (Moul, Kantumruy, etc.)
├── audio/           <- ភ្លេងមង្គលការ (music.mp3)
├── starter-kit/     <- Starter Kit ដើម និង zip file
└── og.jpg           <- រូប Social share preview (Facebook, Telegram)
```

---

## 🛠️ ពាក្យបញ្ជាស្វ័យប្រវត្ត / Automated Helper Commands

គម្រោងនេះមាន script សម្រាប់ត្រួតពិនិត្យ និង update កម្រងរូបភាពដោយស្វ័យប្រវត្ត៖

### 1. ពិនិត្យមើលរូបភាពទាំងអស់ក្នុងគម្រោង (Audit & Check)
```bash
npm run pictures
```
*ពិនិត្យមើលចំនួនរូបភាព ទំហំ MB/KB និងផ្ទៀងផ្ទាត់ថាតើមានរូបណាបាត់បង់ដែរឬទេ។*

### 2. Update កម្រងរូបភាព Gallery ដោយស្វ័យប្រវត្ត (Auto-Sync)
```bash
npm run pictures:sync
```
*ពេលលោកអ្នកដាក់រូបថ្មីចូលក្នុង `public/img/gallery/` គ្រាន់តែ run command នេះ វានឹងស្វែងរករូបទាំងអស់ រួចបង្កើត `gallery.json` និង `pictures.json` ថ្មីដោយស្វ័យប្រវត្តភ្លាមៗ!*

---

## 🖼️ របៀបផ្លាស់ប្តូររូបភាពតាមផ្នែកនីមួយៗ / How to Replace Pictures

### 1. រូប Hero Cover (`public/img/hero/`)
* **កុំព្យូទ័រ (Desktop)**:
  * `hero-2000.webp` (2000 × 1333px)
  * `hero-1280.webp` (1280 × 853px)
* **ទូរស័ព្ទ (Mobile)**:
  * `hero-m-2000.webp` (2000 × 3000px)
  * `hero-m-1280.webp` (1280 × 1920px)
  * `hero-m-640.webp` (640 × 960px)

### 2. រូបគូស្នេហ៍ Couple (`public/img/couple/`)
* `cozy-2000.webp` (2000 × 1333px)
* `cozy-1280.webp` (1280 × 853px)
* `cozy-640.webp` (640 × 427px)

### 3. រូបក្នុងស៊ុម Arch / Invitation Words (`public/img/words/`)
* `words-1280.webp` (1280 × 1830px)
* `words-640.webp` (640 × 915px)

### 4. រូបរឿងរ៉ាវស្នេហា Story Timeline (`public/img/story/`)
រាល់ប្លង់រូបថតមាន ២ ទំហំ៖
* `s1-640.webp` និង `s1-1280.webp`
* ... រហូតដល់ `s12-640.webp` និង `s12-1280.webp`
* ចំណងជើង និងរៀបរាប់កំណត់ក្នុង [`src/data/wedding.js`](file:///Users/bunheng/Desktop/thorng_sombatt/src/data/wedding.js) ឬ [`src/data/pictures.js`](file:///Users/bunheng/Desktop/thorng_sombatt/src/data/pictures.js)។

### 5. កម្រងរូបថត Gallery (`public/img/gallery/`)
* ដាក់ឈ្មោះរូបជាគូ៖
  * `{PHOTO_ID}-640.webp` (សម្រាប់បង្ហាញក្នុងក្រឡា Grid)
  * `{PHOTO_ID}-1600.webp` (សម្រាប់ពង្រីកមើលច្បាស់ក្នុង Lightbox)
* ឧទាហរណ៍៖ `photo_01-640.webp` និង `photo_01-1600.webp`
* រួចដំណើរការ៖
  ```bash
  npm run pictures:sync
  ```

### 6. កាតធនាគារ Gift QR (`public/img/gift/`)
* `aba.webp` (កាត ABA QR)
* `khqr.webp` (កាត Bakong KHQR)

---

## 💡 គន្លឹះបម្លែងរូបភាព (WebP Optimization)
ដើម្បីឱ្យវេបសាយដើរលឿនបំផុត និងបើកភ្លាមឃើញភ្លែត សូមប្រើរូបប្រភេទ **WebP**:
* ប្រើឧបករណ៍អនឡាញឥតគិតថ្លៃ៖ [Squoosh.app](https://squoosh.app)
* ឬប្រើ cwebp command-line:
  ```bash
  cwebp -q 82 input.jpg -o output.webp
  ```
