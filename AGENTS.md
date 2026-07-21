# Panduan Praktik Terbaik TypeScript & Angular

Anda adalah seorang ahli dalam **TypeScript**, **Angular**, dan pengembangan aplikasi web yang skalabel. Anda menulis kode yang fungsional, mudah dipelihara, berkinerja tinggi, dan aksesibel dengan mengikuti praktik terbaik TypeScript dan Angular.

## Praktik Terbaik TypeScript

- Gunakan **strict type checking**.
- Utamakan **type inference** jika tipe data sudah jelas.
- Hindari penggunaan tipe `any`; gunakan `unknown` jika tipe data belum dapat dipastikan.

## Praktik Terbaik Angular

- Selalu gunakan **standalone component** daripada **NgModule**.
- **Jangan** menetapkan `standalone: true` di dalam decorator Angular. Pada Angular v20+, komponen bersifat standalone secara default.
- Gunakan **signals** untuk manajemen state.
- Terapkan **lazy loading** untuk feature routes.
- **Jangan** gunakan decorator `@HostBinding` dan `@HostListener`. Sebagai gantinya, letakkan host binding di dalam properti `host` pada decorator `@Component` atau `@Directive`.
- Gunakan **NgOptimizedImage** untuk semua gambar statis.
  - `NgOptimizedImage` tidak mendukung gambar **base64 inline**.

## Persyaratan Aksesibilitas

- Kode **harus** lolos semua pemeriksaan **AXE**.
- Kode **harus** memenuhi minimal standar **WCAG AA**, termasuk:
  - Manajemen fokus (focus management).
  - Kontras warna yang memadai.
  - Penggunaan atribut **ARIA** yang sesuai.

## Komponen

- Buat komponen yang kecil dan memiliki satu tanggung jawab yang jelas.
- Gunakan fungsi `input()` dan `output()` sebagai pengganti decorator.
- Gunakan `computed()` untuk state turunan (_derived state_).
- Tetapkan `changeDetection: ChangeDetectionStrategy.OnPush` pada decorator `@Component`.
- Untuk komponen sederhana, utamakan penggunaan **inline template**.
- Lebih disarankan menggunakan **Reactive Forms** daripada **Template-driven Forms**.
- **Jangan** gunakan `ngClass`; gunakan **class binding** sebagai gantinya.
- **Jangan** gunakan `ngStyle`; gunakan **style binding** sebagai gantinya.
- Jika menggunakan template atau stylesheet eksternal, gunakan path yang relatif terhadap file TypeScript komponen.

## Manajemen State

- Gunakan **signals** untuk state lokal komponen.
- Gunakan `computed()` untuk state turunan.
- Pastikan transformasi state bersifat murni (_pure_) dan mudah diprediksi.
- **Jangan** gunakan `mutate` pada signal; gunakan `update` atau `set`.

## Template

- Buat template tetap sederhana dan hindari logika yang kompleks.
- Gunakan **native control flow** (`@if`, `@for`, `@switch`) daripada `*ngIf`, `*ngFor`, dan `*ngSwitch`.
- Gunakan **async pipe** untuk menangani **Observable**.
- Jangan mengasumsikan objek global seperti `new Date()` tersedia di dalam template.

## Service

- Rancang setiap service agar hanya memiliki satu tanggung jawab.
- Gunakan `providedIn: 'root'` untuk service singleton.
- Gunakan fungsi `inject()` sebagai pengganti constructor injection.
