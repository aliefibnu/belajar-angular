# 🗺️ Roadmap 3 Hari Angular untuk Full Stack Developer

## Basis: Vue 3 + Next.js Expert

---

## 📋 **Hari 1 — Fondasi: "Ini Vue tapi Bedanya..."**

### 🎯 Target

Menguasai syntax dasar Angular dengan mental model Vue & Next.js.

---

### **Pagi (3 jam) — Component & Template Syntax**

| Konsep   | Vue 3                      | Angular      | Catatan                           |
| -------- | -------------------------- | ------------ | --------------------------------- |
| State    | `ref()`, `reactive()`      | `signal()`   | Mirip! Hanya beda `()` untuk baca |
| Props    | `defineProps()`            | `input()`    | Angular lebih eksplisit           |
| Events   | `defineEmits()`            | `output()`   | Sama-sama emit pattern            |
| Computed | `computed()`               | `computed()` | **Identik!**                      |
| Watcher  | `watch()`, `watchEffect()` | `effect()`   | Mirip, tapi jarang dipakai        |

#### ✍️ **Latihan Pagi**

```typescript
// VUE 3 (Anda biasa nulis ini)
<script setup>
import { ref, computed } from 'vue';
const count = ref(0);
const double = computed(() => count.value * 2);
function increment() { count.value++; }
</script>

// ANGULAR (tulis ulang dalam syntax ini)
@Component({
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button (click)="increment()">+1</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);
  increment() { this.count.update(v => v + 1); }
}
```

---

### **Siang (3 jam) — Template Control Flow**

| Yang Anda Tahu    | Angular          |
| ----------------- | ---------------- |
| `v-if`            | `@if`            |
| `v-for`           | `@for`           |
| `v-show` (jarang) | `[hidden]`       |
| `:class` binding  | `[class.active]` |
| `:style` binding  | `[style.color]`  |

#### ✍️ **Latihan Siang**

Buat komponen "ProductCard" dari Vue ke Angular:

- Loop `@for` dengan `track` (mirip `:key`)
- Conditional render `@if` / `@else`
- Class binding conditional

---

### **Malam (2 jam) — Mini Project: Shopping Cart**

Buat cart sederhana dengan:

- `signal()` untuk items
- `computed()` untuk total harga
- `@for` untuk list
- Event binding untuk add/remove

---

## 📋 **Hari 2 — Navigasi & Data: "Ini Next.js tapi..."**

### 🎯 Target

Routing, HTTP Client, Services (mental model dari `getServerSideProps` + API routes).

---

### **Pagi (3 jam) — Routing**

| Next.js (App Router)     | Angular                                   |
| ------------------------ | ----------------------------------------- |
| Folder `/app/users/[id]` | Route config `{ path: 'users/:id' }`      |
| `page.tsx`               | Component standalone                      |
| `layout.tsx`             | Belum perlu, skip dulu                    |
| `useParams()`            | `input()` + `withComponentInputBinding()` |
| `useSearchParams()`      | `inject(ActivatedRoute).queryParams`      |
| `<Link href="">`         | `routerLink` directive                    |

#### ✍️ **Latihan Pagi**

```typescript
// NEXT.JS (Anda biasa begini)
// app/users/[id]/page.tsx
export default function UserPage({ params }: { params: { id: string } }) {
  return <div>User {params.id}</div>;
}

// ANGULAR — Route config (app.routes.ts)
export const routes: Routes = [
  {
    path: 'users/:id',
    loadComponent: () => import('./user/user.component'),
  }
];

// ANGULAR — Component (user.component.ts)
@Component({...})
export class UserComponent {
  private route = inject(ActivatedRoute);
  id = toSignal(this.route.params.pipe(map(p => p['id'])));
  // Atau pakai @Input() binding dengan withComponentInputBinding()
}
```

---

### **Siang (3 jam) — Services & HTTP**

| Next.js                       | Angular                          |
| ----------------------------- | -------------------------------- |
| `fetch()` di server component | `HttpClient` service             |
| API Routes `/api/...`         | Services `@Injectable()`         |
| TanStack Query / SWR          | `HttpClient` + `signal()` manual |

#### ✍️ **Latihan Siang**

Buat service API dengan JWT interceptor:

```typescript
// Service — injectable, providedIn: 'root'
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
    // Return Observable, bisa di-convert ke signal
  }
}

// DI COMPONENT — pakai inject()
@Component({...})
export class UserListComponent {
  private api = inject(ApiService);
  users = signal<User[]>([]);

  constructor() {
    this.api.getUsers().subscribe(data => this.users.set(data));
  }
}
```

---

### **Malam (2 jam) — Reactive Forms**

Karena Anda fullstack, pasti sering validasi form:

```typescript
// Form sederhana — Angular Reactive Forms
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)]),
});

// Template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="email" />
  @if (form.controls.email.invalid) {
    <small>Email tidak valid</small>
  }
</form>
```

---

## 📋 **Hari 3 — Integrasi Full Stack: Build & Deploy**

### 🎯 Target

Membangun aplikasi nyata: Auth + CRUD + Responsive.

---

### **Pagi (3 jam) — Project Scaffolding**

Buat struktur project yang Anda familiar dari Next.js:

```
nextjs-app/               →    angular-app/src/app/
├── app/                  →    ├── pages/           (routes)
│   ├── page.tsx          →    │   └── home/
│   └── api/              →    ├── services/        (API calls)
├── components/           →    ├── shared/          (reusable)
├── lib/                  →    ├── core/            (guards, interceptors)
└── types/                →    └── models/          (interfaces)
```

---

### **Siang (3 jam) — Feature Lengkap: Auth + CRUD**

**Yang harus berhasil dibangun:**

✅ **Auth Service** — Login/Register dengan JWT  
✅ **HTTP Interceptor** — Attach token otomatis (seperti middleware Anda)  
✅ **Auth Guard** — Protect route `/dashboard` (seperti middleware Next.js)  
✅ **User CRUD** — List, Create, Edit, Delete  
✅ **Reactive Forms** — Validasi dengan error messages  
✅ **Responsive** — Tailwind CSS (bisa langsung pakai!)

---

### **Malam (2 jam) — Deployment & Final Polish**

```bash
# Build production (mirip next build)
ng build --configuration production

# Output di dist/ → deploy ke Vercel/Netlify/nginx
# Sama seperti deploy Next.js static export!
```

**Checklist Final:**

- [ ] Lazy loading routes (mirip dynamic import Next.js)
- [ ] Meta tags (Title service)
- [ ] Error handling global
- [ ] Loading state di setiap async operation

---

## 🎓 **Kesimpulan: Mental Model Anda ke Angular**

| Next.js / Vue Concept | Angular Equivalent    | Confidence         |
| --------------------- | --------------------- | ------------------ |
| File-based routing    | Route config object   | 🔄 Adaptasi        |
| `getServerSideProps`  | Resolver (optional)   | 🟡 Jarang dipakai  |
| Vue SFC               | 3 files terpisah      | 🟢 Terbiasa        |
| Vue `ref()`           | `signal()`            | 🟢 Identik         |
| Vue `computed()`      | `computed()`          | 🟢 Identik         |
| Next.js API Routes    | Services + HttpClient | 🟢 Mirip           |
| Next.js Middleware    | Guards/Interceptors   | 🟢 Konsep sama     |
| Tailwind              | Tailwind tetap pakai  | 🟢 100% kompatibel |

---

## 🚀 **Proyek Final: Hari Ke-3+**

Bikin aplikasi yang menggabungkan skill fullstack Anda:

**"Dashboard Blog dengan Auth"**

- Angular Frontend (Deploy ke Vercel)
- NestJS / Hono Backend (yang sudah Anda kuasai)
- JWT Authentication
- CRUD Posts
- Comments real-time (opsional)

---
