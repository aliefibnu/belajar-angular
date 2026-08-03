# Dokumentasi Frontend Styling - PemulaV22

Dokumen ini berisi analisis lengkap dan panduan arsitektur penataan gaya (_styling_) pada proyek **PemulaV22** (Angular v22).

---

## 📋 Ringkasan Pendekatan Styling

Proyek ini mengadopsi **Pendekatan Styling Hibrida (_Hybrid Styling Approach_)**, yang mengombinasikan kemudahan utilitas modern dengan kebebasan kustomisasi murni:

1. **Utility-First CSS (Tailwind CSS v4)**: Dipakai sebagai metode styling utama untuk tata letak (_layout_), tipografi, _responsive design_, warna, dan _spacing_.
2. **Component-Scoped CSS**: Digunakan pada komponen khusus yang memerlukan animasi kompleks, _keyframe_ khusus, serta efek visual 3D/clip-path (seperti pada komponen `loader`).
3. **Global Custom Styles & Third-Party Overrides (`src/styles.css`)**: Berisi impor modul global, konfigurasi tema Tailwind CSS (`@theme`), kustomisasi pustaka pihak ketiga (misal: Leaflet Maps), serta penataan _scrollbar_.
4. **State-Driven Class Binding (Angular Signals)**: Mengintegrasikan status komponen (Signal) secara langsung dengan kelas CSS melalui properti terhitung (_computed signal_).

---

## 🛠️ Stack & Pustaka Styling

| Teknologi / Pustaka      | Versi     | Peran & Penggunaan                                                                      |
| :----------------------- | :-------- | :-------------------------------------------------------------------------------------- |
| **Angular**              | `^22.0.0` | Framework utama dengan _Standalone Components_ dan _Signals_.                           |
| **Tailwind CSS**         | `^4.1.12` | Engine CSS berbasis kelas utilitas.                                                     |
| **@tailwindcss/postcss** | `^4.1.12` | Plugin PostCSS resmi untuk Tailwind CSS v4.                                             |
| **PostCSS**              | `^8.5.3`  | Transpiler CSS global.                                                                  |
| **Leaflet CSS**          | `^1.9.4`  | Styling peta interaktif.                                                                |
| **@ng-icons/lucide**     | `^34.0.0` | Pustaka ikon Lucide berbasis SVG yang terintegrasi dengan ukuran & warna tipografi CSS. |

---

## 🎨 Arsitektur & Kategori Styling

### 1. Tailwind CSS v4 (Utilitas Utama)

Proyek ini menggunakan versi **Tailwind CSS v4** yang diintegrasikan melalui PostCSS dalam file [`.postcssrc.json`](file:///home/alief/codingan/pkl/angular/pemula/.postcssrc.json).

#### Karakteristik Utama Penggunaan Tailwind v4:

- **Import Modern**: Diimpor langsung pada file [`src/styles.css`](file:///home/alief/codingan/pkl/angular/pemula/src/styles.css) menggunakan `@import 'tailwindcss';` dan `@tailwind utilities;`.
- **Ekstensi Tema (`@theme`)**:
  Pengaturan tema Tailwind disesuaikan secara langsung pada file CSS global:
  ```css
  @theme {
    --animate-loader: spin 1s linear infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  ```
- **Fitur Utility Modern v4 yang Digunakan**:
  - **Gradient & Color Stops Modern**: `bg-linear-to-br`, `bg-linear-to-r`, `from-amber-400 to-amber-600`, `from-blue-600 to-indigo-600`.
  - **Opasitas & Transparansi Arbitrer**: `bg-white/80`, `border-gray-200/60`, `shadow-blue-100/50`.
  - **Efek Visual Glassmorphism**: `backdrop-blur-lg`, `shadow-xl`, `border-l border-t`.
  - **Ukuran Nilai Arbitrer/Fraksional**: `min-w-37.5`, `max-w-5xl`, `rounded-2xl`.
  - **Relasi Interaksi Group**: Menggunakan `group` dan `group-hover/item` untuk _dropdown_ dan menu navigasi.

---

### 2. Component-Scoped Custom CSS (Styling Komponen Terisolasi)

Untuk animasi dan efek visual tingkat lanjut yang sulit atau terlalu panjang jika ditulis dengan kelas utilitas Tailwind, proyek ini memanfaatkan file stylesheet khusus komponen (_View Encapsulation_ Angular).

- **Studi Kasus**: [`src/app/components/loader/loader.css`](file:///home/alief/codingan/pkl/angular/pemula/src/app/components/loader/loader.css)
- **Teknik yang Digunakan**:
  - **CSS Custom Variables**: `--dur: 1s;` untuk sinkronisasi durasi animasi.
  - **CSS Keyframes**: @keyframes kustom seperti `hamster`, `hamsterHead`, `hamsterEye`, `hamsterEar`, `hamsterBody`, `hamsterFRLimb`, `hamsterBRLimb`, `spoke`.
  - **Clip Path & Shapes**: `clip-path: polygon(...)` untuk pembentukan elemen fisik limb hamster.
  - **Gradien Gradien Kompleks**: `radial-gradient(100% 100% at center, ...)` dan `linear-gradient(...)`.
  - **Transformasi 3D**: `transform-style: preserve-3d` dan `translateZ(-1px)` untuk efek kedalaman animasi.

---

### 3. Dynamic Styling via Angular Signals

Penataan gaya dinamis yang bergantung pada _state_ aplikasi dikelola menggunakan **Angular Signals** dan `computed()`.

- **Prinsip Utama**: Mematuhi aturan proyek Angular v22 tanpa mengandalkan `ngClass` atau `ngStyle` jika memungkinkan, melainkan menggunakan binding `[className]` atau `[class]`.
- **Studi Kasus**: [`src/app/components/custom-button/custom-button.ts`](file:///home/alief/codingan/pkl/angular/pemula/src/app/components/custom-button/custom-button.ts)
  ```typescript
  // Evaluasi warna tombol berdasarkan input signal 'type'
  buttonClass = computed(() => {
    switch (this.type()) {
      case 'warning':
        return 'bg-amber-200';
      case 'failure':
        return 'bg-red-200';
      case 'success':
        return 'bg-blue-200';
      case 'info':
        return 'bg-green-200';
      default:
        return 'bg-cyan-200';
    }
  });
  ```
  Di-binding pada template [`custom-button.html`](file:///home/alief/codingan/pkl/angular/pemula/src/app/components/custom-button/custom-button.html):
  ```html
  <button
    [className]="'border rounded-md px-3 cursor-pointer ' + buttonClass()"
    (click)="onClickEmit()"
  >
    {{ text() }}
  </button>
  ```

---

### 4. Global Styles & Third-Party Library Overrides

Seluruh aturan gaya global tersentralisasi pada [`src/styles.css`](file:///home/alief/codingan/pkl/angular/pemula/src/styles.css):

1. **Leaflet Map Overrides**:
   Penyesuaian pustaka peta Leaflet agar selaras dengan desain aplikasi:
   ```css
   .leaflet-container {
     font-family:
       'Inter',
       system-ui,
       -apple-system,
       sans-serif;
   }
   .leaflet-popup-content-wrapper {
     border-radius: 12px !important;
     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
   }
   .leaflet-popup-content {
     margin: 12px !important;
     font-size: 14px !important;
   }
   ```
2. **Kustomisasi Scrollbar**:
   Styling scrollbar modern untuk kontainer `.marked-locations` menggunakan pseudo-element `::-webkit-scrollbar`.
3. **Global Keyframes**:
   Animasi sederhana seperti `@keyframes bounce` untuk interaksi umum.

---

## 💎 Design System & Aesthetic Standards

Aplikasi ini menerapkan standar estetika UI modern:

- **Palet Warna Utama**:
  - **Primary**: Indigo (`indigo-600`, `indigo-500`, `indigo-700`) & Blue (`blue-600`, `blue-50`).
  - **Accent / Highlight**: Amber (`amber-400`, `amber-500`, `amber-600`) & Sky (`sky-200`).
  - **Neutral**: Gray scale dari `gray-50` (background dasar) hingga `gray-900` (teks utama).
- **Tipografi**:
  - Menggunakan sistem font sans-serif modern (`Inter`, `system-ui`, `-apple-system`).
  - _Hierarchy_ font yang tegas: `text-3xl font-bold`, `text-sm font-medium text-gray-500 tracking-wide uppercase`.
- **Elevasi & Bayangan (_Shadows_)**:
  - Mengabaikan bayangan kaku dengan menggantinya menggunakan bayangan lembut berwarna (_colored shadows_) seperti `shadow-xl shadow-blue-100/50` dan `shadow-sm hover:shadow-md`.
- **Sudut Kelengkungan (_Border Radius_)**:
  - Sudut membulat modern: `rounded-xl` (12px) untuk kartu/popover dan `rounded-2xl` (16px) untuk wadah utama/dialog.

---

## Prinsip Utama Penulisan (Copywriting Principles)

1. **Anti-AI Slop & Jargon Kosong**
   - Dilarang menggunakan frasa klise buatan AI seperti: _solusi inovatif, mendefinisikan ulang, masa depan digital, mentransformasi, ekosistem canggih._
   - Gunakan bahasa manusia sehari-hari yang jujur. Jika produk bisa "membantu mencatat keuangan", katakan itu. Jangan katakan "merevolusi manajemen finansial Anda".

2. **Penyembunyian Teks Teknis (Zero Technical Noise)**
   - Jangan pernah menampilkan _stack trace_, properti objek JSON, ID database, atau kode error internal (seperti `500 Internal Error` atau `NullPointerException`) langsung ke pengguna.
   - Ubah menjadi pesan ramah pengguna dengan pola: [Apa yang terjadi] + [Apa yang harus dilakukan pengguna].
   - _Contoh Buruk:_ `Failed to fetch data from API route /users`
   - _Contoh Baik:_ `Gagal memuat profil. Silakan muat ulang halaman.`

3. **Prinsip Ringkas & Berjarak (Microcopy Brevity)**
   - **Judul Utama (Hero Section):** Maksimal 8 kata. Fokus pada fungsi utama aplikasi.
   - **Tombol (CTA):** Maksimal 3 kata. Harus menggunakan kata kerja aktif (e.g., "Mulai Sekarang", "Unduh", "Masuk").
   - **Deskripsi/Kartu:** Terapkan batasan karakter (_character limit_). Jika teks melebihi 2 baris, gunakan pendekatan _progressive disclosure_ (sembunyikan di balik tombol "Selengkapnya" atau tooltip).

## Prompt Otomatisasi untuk Pembuatan Komponen Baru

Gunakan prompt berikut ke AI setiap kali ingin membuat teks komponen baru untuk UI proyek ini:

"""
Tulis teks untuk komponen UI [Nama Komponen, misal: Modal Konfirmasi Hapus]. Patuhi dokumen pedoman 'STYLING.md': teks harus bebas dari AI slop, tidak boleh mengandung istilah teknis backend, sangat ringkas (to the point), dan menggunakan bahasa manusia yang ramah bagi pengguna awam.
"""
---

## 📌 Panduan Praktik Terbaik Styling di Proyek Ini

Jika Anda ingin menambahkan halaman atau komponen baru, ikuti panduan berikut:

1. **Utamakan Utility Classes Tailwind**:
   Gunakan kelas Tailwind CSS v4 langsung pada HTML template untuk _layouting_, warna, dan responsivitas.
2. **Gunakan Computed Signals untuk Kelas Dinamis**:
   Jika komponen memiliki beberapa _state_ atau _variant_, hitung nama kelas pada TypeScript menggunakan `computed()` lalu bind dengan `[class]` atau `[className]`.
3. **Gunakan Stylesheet Komponen (`.css`) Hanya Jika Diperlukan**:
   Gunakan file `.css` lokal komponen hanya untuk animasi `@keyframes` rumit, SVG clip-path, atau aturan CSS yang terlalu panjang.
4. **Jaga Konsistensi Desain**:
   Gunakan skala warna Indigo/Blue untuk aksi utama, Amber untuk highlight/user profile, serta `backdrop-blur-lg` untuk komponen melayang (_overlay/dropdown_).
5. **Jangan Pakai Badge**:
   Badge menandakan ai slop sekali, silahkan hapus saja badge itu. kamu boleh menggunakan badge apabila saya meminta kamu memberikan badge.
6. **Jangan Pakai Emoji**:
   Emoji menandakan ai slop sekali, silahkan hapus saja emoji itu, lalu gantikan dengan icon. kamu boleh menggunakan emoji apabila saya meminta kamu memberikan emoji.
7. **Jangan Pakai BG Gradient Neon Style**:
   BG Gradient Neon Style menandakan ai slop sekali, silahkan hapus saja BG Gradient Neon Style itu, lalu gantikan dengan bg standar industri / saas style. kamu boleh menggunakan BG Gradient Neon Style apabila saya meminta kamu memberikan BG Gradient Neon Style.
8. **Gunakan Light Mode**:
   Web ini menggunakan light mode dengan beberapa palet warna semi putih, web ini tidak menggunakan dark mode ataupun palet warna semi gelap.
