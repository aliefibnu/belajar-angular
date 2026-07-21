# 📘 **DOKUMENTASI LENGKAP ANGULAR 18+**

## Untuk Full Stack Developer Vue & Next.js

---

# DAFTAR ISI

1. [Arsitektur Angular vs Vue/Next.js](#1-arsitektur-angular-vs-vuenextjs)
2. [Signals: State Management Modern](#2-signals-state-management-modern)
3. [Component System Lengkap](#3-component-system-lengkap)
4. [Template Syntax & Control Flow](#4-template-syntax--control-flow)
5. [Routing System](#5-routing-system)
6. [Dependency Injection & Services](#6-dependency-injection--services)
7. [HTTP Client & Interceptors](#7-http-client--interceptors)
8. [Form Handling](#8-form-handling)
9. [Authentication Flow Lengkap](#9-authentication-flow-lengkap)
10. [Project Structure Best Practice](#10-project-structure-best-practice)

---

# 1. ARSITEKTUR ANGULAR VS VUE/NEXT.JS

## 1.1 Perbedaan Fundamental

### Vue 3 Architecture

```
┌─────────────────────────────────────┐
│         Vue Single File Component    │
│  ┌─────────────────────────────────┐ │
│  │ <template>                      │ │
│  │   HTML dengan directives        │ │
│  │ </template>                     │ │
│  │                                 │ │
│  │ <script setup>                  │ │
│  │   Logic & State                 │ │
│  │ </script>                       │ │
│  │                                 │ │
│  │ <style scoped>                  │ │
│  │   CSS                           │ │
│  │ </style>                        │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Angular Architecture

```
┌──────────────────────────────────────────────┐
│          Angular Component (3 Files)          │
│                                               │
│  user.component.ts          ← Logic & Config │
│  ┌─────────────────────────────────────────┐ │
│  │ @Component({                            │ │
│  │     // @ts-ignore: Angular Language Service false positive
changeDetection: ChangeDetectionStrategy.OnPush,
selector: 'app-user',                 │ │
│  │   templateUrl: './user.component.html', │ │
│  │   styleUrl: './user.component.scss'     │ │
│  │ })                                      │ │
│  │ export class UserComponent { ... }      │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  user.component.html        ← Template       │
│  user.component.scss        ← Styles         │
└──────────────────────────────────────────────┘
```

**Penjelasan:**

- **Vue**: Semua dalam 1 file SFC (Single File Component)
- **Angular**: 3 file terpisah, wajib ada dekorator `@Component` yang menghubungkan ketiganya
- **Keuntungan Angular**: Separation of concerns lebih ketat, lebih mudah untuk proyek besar
- **Kerugian**: Lebih verbose untuk komponen kecil (bisa diatasi dengan inline template)

---

## 1.2 Bootstrap Aplikasi

### Vue 3 (main.ts)

```typescript
// Vue: Sederhana, create app lalu mount
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

### Next.js (layout.tsx)

```typescript
// Next.js: File-based, otomatis dari struktur folder
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### Angular (main.ts + app.config.ts)

```typescript
// main.ts — Entry point aplikasi
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

// app.config.ts — Konfigurasi global (router, HTTP, dll)
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Seperti app.use(router) di Vue
    provideHttpClient(), // HttpClient global
  ],
};
```

**Penjelasan:**

- Angular menggunakan fungsi `bootstrapApplication` untuk memulai aplikasi
- `appConfig` adalah tempat mendaftarkan semua provider global (router, HTTP client, dll)
- `providers` array berisi semua service yang tersedia di seluruh aplikasi
- Konsep ini mirip dengan `app.use()` di Vue, tapi lebih terstruktur

---

## 1.3 Module vs Standalone Components

### Sejarah Angular

```
Angular 2-14 (Lama)          Angular 17+ (Modern - Anda pelajari)
┌─────────────────┐          ┌──────────────────────┐
│ @NgModule        │          │ Standalone Components │
│  - declarations  │          │  - imports langsung   │
│  - imports       │          │  - No NgModule        │
│  - providers     │          │  - Lebih sederhana    │
└─────────────────┘          └──────────────────────┘
```

### Contoh Standalone Component (Modern)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-component',
  standalone: true, // ⚠️ Default true di Angular 19+
  imports: [CommonModule], // Import yang dibutuhkan langsung di sini
  template: `<p>Hello</p>`,
})
export class MyComponent {}
```

**Penjelasan:**

- **Standalone Component**: Tidak perlu dideklarasikan di NgModule
- Setiap komponen mendeklarasikan imports-nya sendiri
- Mirip dengan Vue SFC yang langsung import komponen yang dibutuhkan
- **Rule**: Jangan tulis `standalone: true` secara eksplisit karena sudah default

---

# 2. SIGNALS: STATE MANAGEMENT MODERN

## 2.1 Konsep Dasar Signals

### Apa itu Signal?

Signal adalah **reactive primitive** baru di Angular yang menggantikan RxJS untuk state management sederhana. Mirip dengan `ref()` di Vue.

```
Vue ref()                    Angular signal()
┌──────────────┐            ┌──────────────────┐
│ ref(0)       │            │ signal(0)        │
│ .value = 1   │            │ .set(1)          │
│ .value       │            │ ()               │
└──────────────┘            └──────────────────┘
```

### Perbandingan Detail

| Aspek                       | Vue `ref()`            | Angular `signal()`              |
| --------------------------- | ---------------------- | ------------------------------- |
| Membuat state               | `const count = ref(0)` | `count = signal(0)`             |
| Baca nilai                  | `count.value`          | `count()`                       |
| Set nilai baru              | `count.value = 5`      | `count.set(5)`                  |
| Update berdasarkan previous | `count.value++`        | `count.update(v => v + 1)`      |
| Mutate object/array         | `.value.push()`        | `update(arr => [...arr, item])` |
| TypeScript support          | Generics               | Generics                        |

### Kenapa Signal Menggunakan Function Call `()`?

```typescript
// Signal adalah FUNGSI GETTER
const count = signal(0);
console.log(count()); // Memanggil fungsi untuk mendapatkan nilai

// Ini memungkinkan Angular tracking dependensi secara otomatis
// Saat Anda memanggil count() di dalam template atau computed,
// Angular tahu bahwa komponen ini bergantung pada signal 'count'
```

**Penjelasan Teknis:**

- Signal menggunakan **getter function pattern** untuk memungkinkan dependency tracking
- Setiap kali `count()` dipanggil, Angular mencatat bahwa komponen tersebut "tertarik" pada perubahan nilai `count`
- Ketika `count.set()` atau `count.update()` dipanggil, Angular otomatis memperbarui semua tempat yang bergantung padanya
- Ini berbeda dengan Vue yang menggunakan Proxy untuk tracking reaktivitas

---

## 2.2 Computed Signals (Derived State)

### Konsep

`computed()` di Angular **identik** dengan `computed()` di Vue. Keduanya:

- Menghitung nilai berdasarkan signal lain
- Otomatis re-compute saat dependensi berubah
- Bersifat read-only
- Lazy evaluation (hanya dihitung saat dibutuhkan)

### Perbandingan Langsung

```typescript
// ===== VUE 3 =====
const count = ref(0);
const double = computed(() => count.value * 2);
const isEven = computed(() => count.value % 2 === 0);

// ===== ANGULAR =====
count = signal(0);
double = computed(() => this.count() * 2); // ⚠️ Panggil count() bukan count
isEven = computed(() => this.count() % 2 === 0);
```

### Computed dengan Multiple Dependencies

```typescript
// Vue 3
const firstName = ref('Alief');
const lastName = ref('Hamdani');
const fullName = computed(() => `${firstName.value} ${lastName.value}`);

// Angular
firstName = signal('Alief');
lastName = signal('Hamdani');
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

### Computed dengan Object/Array

```typescript
// Filter array secara reaktif
todos = signal<Todo[]>([]);
activeTodos = computed(() => this.todos().filter((t) => !t.done));
completedCount = computed(() => this.todos().filter((t) => t.done).length);
```

**Penjelasan Penting:**

- `computed` selalu mengembalikan nilai baru, tidak memutasi array asli
- Gunakan `filter()`, `map()`, `reduce()` yang menghasilkan array baru
- **Jangan** gunakan metode mutasi seperti `.push()`, `.splice()`, dll di dalam computed

---

## 2.3 Effect (Side Effects)

### Konsep

`effect()` di Angular mirip dengan `watchEffect()` di Vue. Digunakan untuk menjalankan side effect saat signal berubah.

```typescript
// Vue 3
watchEffect(() => {
  console.log(`Count changed to: ${count.value}`);
  localStorage.setItem('count', count.value.toString());
});

// Angular
effect(() => {
  console.log(`Count changed to: ${this.count()}`);
  localStorage.setItem('count', this.count().toString());
});
```

### Kapan Menggunakan Effect?

✅ **Gunakan effect untuk:**

- Sinkronisasi ke localStorage/sessionStorage
- Logging/debugging
- DOM manipulation yang tidak bisa dengan template
- Integrasi dengan library pihak ketiga

❌ **Jangan gunakan effect untuk:**

- Mengubah state lain (gunakan `computed`)
- DOM manipulation yang bisa dengan template
- Data fetching (gunakan service)

### Effect dengan Cleanup

```typescript
effect((onCleanup) => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });
});
```

---

## 2.4 Signal vs RxJS: Kapan Pakai Apa?

```
SIGNAL                          RXJS (Observable)
────────────────────────────────────────────────────
✅ State lokal komponen         ✅ Data streaming (WebSocket)
✅ Derived state (computed)     ✅ Event handling kompleks
✅ Form state                   ✅ Debounce/throttle
✅ UI state                     ✅ CombineLatest/ForkJoin
❌ Async data (pakai toSignal)  ✅ HTTP requests kompleks
```

### Interop: RxJS ke Signal

```typescript
// Convert Observable ke Signal
import { toSignal } from '@angular/core/rxjs-interop';

data = toSignal(this.http.get<User[]>('/api/users'));
// Hasil: Signal<User[] | undefined>
// Otomatis subscribe dan unsubscribe
```

---

# 3. COMPONENT SYSTEM LENGKAP

## 3.1 Component Lifecycle

### Vue Lifecycle vs Angular Lifecycle

```
Vue                    Angular               Keterangan
─────────────────────────────────────────────────────────
setup()               constructor()          Inisialisasi
-                     ngOnInit()             ✅ Paling sering dipakai
onMounted()           ngAfterViewInit()      DOM sudah siap
onUpdated()           ngAfterViewChecked()   Setiap perubahan
onUnmounted()         ngOnDestroy()          Cleanup
```

### Mengapa ngOnInit, Bukan constructor?

```typescript
@Component({...})
export class UserComponent implements OnInit {
  private api = inject(ApiService);
  user = signal<User | null>(null);

  // ❌ JANGAN fetch data di constructor
  constructor() {
    // Di sini, inputs belum tersedia!
    // DOM belum dirender!
    this.loadUser(); // ❌ Bisa menyebabkan error
  }

  // ✅ SELALU fetch data di ngOnInit
  ngOnInit() {
    // Semua inputs sudah terikat
    // DOM sudah siap
    this.loadUser(); // ✅ Aman
  }

  private loadUser() {
    this.api.getUsers().subscribe(data => {
      this.user.set(data);
    });
  }
}
```

**Penjelasan:**

- `constructor`: Untuk dependency injection, jangan untuk logic bisnis
- `ngOnInit`: Tempat yang tepat untuk fetch data, subscribe, setup awal
- Input dari parent component **belum tersedia** di constructor
- Pattern ini mirip dengan `onMounted()` di Vue

---

## 3.2 Input/Output (Props & Events)

### Perbandingan Lengkap

```typescript
// ===== VUE 3 =====
// Parent
<ChildComponent
  :user="currentUser"
  @update="handleUpdate"
/>

// Child
const props = defineProps<{ user: User }>();
const emit = defineEmits<{ update: [id: number] }>();
emit('update', props.user.id);

// ===== ANGULAR =====
// Parent
<app-child
  [user]="currentUser()"           // Property binding
  (onUpdate)="handleUpdate($event)" // Event binding
/>

// Child
@Component({...})
export class ChildComponent {
  user = input.required<User>();      // Required prop
  onUpdate = output<number>();        // Event emitter

  someMethod() {
    this.onUpdate.emit(this.user().id);
  }
}
```

### Input Decorator Pattern Lengkap

```typescript
@Component({...})
export class UserCardComponent {
  // Required input — Akan error jika tidak diberikan
  user = input.required<User>();

  // Optional input dengan default value
  showAvatar = input(true);
  size = input<'small' | 'medium' | 'large'>('medium');

  // Input dengan transform (seperti computed prop)
  age = input(0, {
    transform: (value: number) => Math.max(0, Math.min(150, value))
  });

  // Input dengan alias
  userName = input('', { alias: 'name' });
  // Parent pakai: [name]="'Alief'"
}
```

### Output dengan Event Data

```typescript
@Component({...})
export class TodoItemComponent {
  todo = input.required<Todo>();

  // Output bisa mengirim data
  onToggle = output<number>();
  onDelete = output<number>();
  onEdit = output<{ id: number; text: string }>();

  handleToggle() {
    this.onToggle.emit(this.todo().id);
  }

  handleEdit(newText: string) {
    this.onEdit.emit({
      id: this.todo().id,
      text: newText
    });
  }
}
```

---

## 3.3 Two-Way Binding (Seperti v-model)

### Angular Two-Way Binding

```typescript
// ===== VUE 3 =====
<input v-model="name" />
// Sama dengan:
<input :value="name" @input="name = $event.target.value" />

// ===== ANGULAR =====
// Two-way binding syntax: [()] = "banana in a box"
<input [(ngModel)]="name" />

// Ini sama dengan:
<input [ngModel]="name()" (ngModelChange)="name.set($event)" />
```

### Custom Two-Way Binding

```typescript
// Child component dengan two-way binding
@Component({
    // @ts-ignore: Angular Language Service false positive
changeDetection: ChangeDetectionStrategy.OnPush,
selector: 'app-custom-input',
  template: `
    <input
      [value]="value()"
      (input)="onValueChange($event)"
    />
  `
})
export class CustomInputComponent {
  value = input.required<string>();
  valueChange = output<string>();  // ⚠️ Naming penting!

  onValueChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(newValue);
  }
}

// Parent menggunakan two-way binding
<app-custom-input [(value)]="myName" />
// Sama dengan:
<app-custom-input [value]="myName()" (valueChange)="myName.set($event)" />
```

---

# 4. TEMPLATE SYNTAX & CONTROL FLOW

## 4.1 Binding Types Lengkap

### Text Interpolation (Seperti {{ }} di Vue)

```html
<!-- Vue: {{ expression }} -->
<!-- Angular: {{ expression }} — SAMA! -->
<p>Hello {{ userName() }}</p>
<p>Total: {{ price() * quantity() }}</p>
```

### Property Binding (Seperti :prop di Vue)

```html
<!-- Vue -->
<img :src="imageUrl" />
<div :class="{ active: isActive }" />

<!-- Angular -->
<img [src]="imageUrl()" />
<div [class.active]="isActive()" />
```

### Event Binding (Seperti @event di Vue)

```html
<!-- Vue -->
<button @click="handleClick">Click</button>
<input @input="handleInput" />

<!-- Angular -->
<button (click)="handleClick()">Click</button>
<input (input)="handleInput($event)" />
```

### Attribute Binding

```html
<!-- Untuk HTML attributes (bukan properties) -->
<button [attr.aria-label]="label()">Close</button>
<td [attr.colspan]="colSpan()">Merged Cell</td>
```

---

## 4.2 Control Flow Baru (@if, @for, @switch)

### @if — Conditional Rendering (Seperti v-if)

```html
<!-- ===== VUE 3 ===== -->
<div v-if="isLoading">Loading...</div>
<div v-else-if="error">Error!</div>
<div v-else>Content</div>

<!-- ===== ANGULAR (NEW CONTROL FLOW) ===== -->
@if (isLoading()) {
<div>Loading...</div>
} @else if (error()) {
<div>Error!</div>
} @else {
<div>Content</div>
}
```

**Penjelasan:**

- `@if` adalah block control flow baru (Angular 17+)
- Lebih performant dari `*ngIf` lama
- Syntax lebih natural, mirip dengan JavaScript/PHP
- Mendukung `@else if` dan `@else`

### @for — Loop (Seperti v-for)

```html
<!-- ===== VUE 3 ===== -->
<div v-for="item in items" :key="item.id">{{ item.name }}</div>

<!-- ===== ANGULAR ===== -->
@for (item of items(); track item.id) {
<div>{{ item.name }}</div>
} @empty {
<div>Tidak ada data</div>
}
```

**Penjelasan `track`:**

- Wajib ada untuk performance
- Seperti `:key` di Vue, tapi lebih eksplisit
- Gunakan property unik (id, slug, index jika terpaksa)
- `track $index` untuk track by index (tidak direkomendasikan)

**Perbedaan dengan `*ngFor` (lama):**

```html
<!-- Cara lama — JANGAN digunakan -->
<div *ngFor="let item of items; trackBy: trackById">
  <!-- Cara baru — Gunakan ini -->
  @for (item of items(); track item.id) {
</div>
```

### @switch — Multiple Conditions

```html
<!-- ===== VUE 3 ===== -->
<div v-if="status === 'active'">Active</div>
<div v-else-if="status === 'pending'">Pending</div>
<div v-else>Inactive</div>

<!-- ===== ANGULAR ===== -->
@switch (status()) { @case ('active') {
<div>Active</div>
} @case ('pending') {
<div>Pending</div>
} @default {
<div>Inactive</div>
} }
```

---

## 4.3 Deferred Loading (Lazy Template)

```html
<!-- Load komponen/template secara lazy -->
@defer (on viewport) {
<app-heavy-component />
} @placeholder {
<div>Scroll untuk memuat...</div>
} @loading (minimum 500ms) {
<div>Loading component...</div>
} @error {
<div>Gagal memuat component</div>
}
```

**Trigger options:**

- `on viewport` — Saat elemen masuk viewport
- `on idle` — Saat browser idle
- `on interaction` — Saat user klik/hover
- `on timer(5s)` — Setelah waktu tertentu

---

# 5. ROUTING SYSTEM

## 5.1 Route Configuration

### Next.js (Anda kuasai)

```
app/
├── page.tsx            → /
├── about/page.tsx      → /about
├── users/
│   ├── page.tsx        → /users
│   └── [id]/
│       └── page.tsx    → /users/:id
└── dashboard/
    └── page.tsx        → /dashboard (protected)
```

### Angular Equivalent

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: ':id',
        component: UserDetailComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], // Protected route
  },
  {
    path: '**', // 404 catch-all
    component: NotFoundComponent,
  },
];
```

### Lazy Loading Routes (PENTING untuk performance)

```typescript
// Tanpa lazy loading — Tidak direkomendasikan
{
  path: 'users',
  component: UserListComponent  // Imported di awal
}

// Dengan lazy loading — BEST PRACTICE
{
  path: 'users',
  loadComponent: () => import('./pages/user-list.component')
    .then(m => m.UserListComponent)
}
```

**Penjelasan:**

- Lazy loading = komponen hanya di-load saat route diakses
- Mirip dengan dynamic import di Next.js
- Mengurangi bundle size awal
- **Rule**: Selalu gunakan lazy loading untuk route, kecuali home page

---

## 5.2 Router Service (Navigasi Programmatic)

### Perbandingan

```typescript
// Next.js
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/users/123');

// Vue
import { useRouter } from 'vue-router';
const router = useRouter();
router.push({ name: 'user', params: { id: 123 } });

// Angular
import { Router } from '@angular/router';
private router = inject(Router);
this.router.navigate(['/users', 123]);
```

### Navigasi dengan Query Params

```typescript
// Angular
this.router.navigate(['/users'], {
  queryParams: { page: 2, sort: 'name' }
});
// Hasil URL: /users?page=2&sort=name

// Baca query params
private route = inject(ActivatedRoute);
this.route.queryParams.subscribe(params => {
  console.log(params['page']); // "2"
});
```

### Navigasi dengan State (Data Passing)

```typescript
// Mengirim data ke route berikutnya
this.router.navigate(['/users', id], {
  state: { from: 'dashboard', timestamp: Date.now() },
});

// Membaca data di komponen tujuan
const navigation = this.router.getCurrentNavigation();
const state = navigation?.extras.state;
console.log(state?.['from']); // "dashboard"
```

---

## 5.3 Route Guards (Seperti Middleware)

### Jenis Guards

```
Next.js Middleware              Angular Guards
────────────────────────────────────────────────
middleware.ts (global)          canActivate        — Per route
                                canActivateChild   — Child routes
                                canDeactivate      — Prevent leave
                                Resolve            — Pre-fetch data
```

### Auth Guard Lengkap

```typescript
// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Cek apakah user login
  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect ke login dengan return URL
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

// Penggunaan di routes
{
  path: 'dashboard',
  loadComponent: () => import('./dashboard.component'),
  canActivate: [authGuard]
}
```

### Role-Based Guard

```typescript
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUser();

    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    // User login tapi role tidak sesuai
    router.navigate(['/unauthorized']);
    return false;
  };
};

// Penggunaan
{
  path: 'admin',
  canActivate: [roleGuard(['admin', 'superadmin'])],
  loadComponent: () => import('./admin.component')
}
```

---

## 5.4 Route Resolver (Pre-fetch Data)

### Konsep

Di Next.js, Anda fetch data di `getServerSideProps`. Di Angular, gunakan Resolver.

```typescript
// user.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService, User } from '../services/api.service';

export const userResolver: ResolveFn<User> = (route, state) => {
  const api = inject(ApiService);
  const id = route.params['id'];

  return api.getUserById(id);
};

// Di route config
{
  path: 'users/:id',
  loadComponent: () => import('./user-detail.component'),
  resolve: { user: userResolver }  // Data tersedia sebelum komponen load
}

// Di komponen, akses resolved data
@Component({...})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);

  // Data sudah tersedia saat komponen diinisialisasi
  user = toSignal(
    this.route.data.pipe(map(data => data['user']))
  );
}
```

---

# 6. DEPENDENCY INJECTION & SERVICES

## 6.1 Konsep DI

### Apa itu Dependency Injection?

Pattern di mana komponen tidak membuat dependensinya sendiri, tapi "meminta" dari container.

```
Tanpa DI (❌)                    Dengan DI (✅)
┌────────────────────┐          ┌────────────────────┐
│ UserComponent      │          │ UserComponent      │
│ ┌────────────────┐ │          │ ┌────────────────┐ │
│ │ new ApiService │ │          │ │ inject(ApiSvc) │ │
│ └────────────────┘ │          │ └────────────────┘ │
└────────────────────┘          └─────────┬──────────┘
                                          │
                               ┌──────────▼──────────┐
                               │  DI Container       │
                               │  (Singleton/ApiSvc) │
                               └─────────────────────┘
```

### Kenapa DI Penting?

1. **Testability**: Mudah mock service saat testing
2. **Single Responsibility**: Service fokus pada tugasnya
3. **Reusability**: Service bisa dipakai banyak komponen
4. **Maintainability**: Ubah implementasi tanpa ubah komponen

---

## 6.2 Membuat Service

### Basic Service

```typescript
// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Singleton global
})
export class UserService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}
```

### Service dengan Dependensi Lain

```typescript
// notification.service.ts
@Injectable({ providedIn: 'root' })
export class NotificationService {
  show(message: string): void {
    alert(message); // Nanti bisa ganti dengan toast library
  }
}

// user.service.ts — Membutuhkan NotificationService
@Injectable({ providedIn: 'root' })
export class UserService {
  // inject() function untuk mendapatkan dependensi
  private notification = inject(NotificationService);

  addUser(user: User): void {
    // ... logic tambah user
    this.notification.show('User berhasil ditambahkan!');
  }
}
```

---

## 6.3 Injection Tokens & Provider Scope

### Provider Scope

```
providedIn: 'root'    → Singleton, satu instance untuk seluruh app
providedIn: 'platform' → Satu instance per platform (browser/server)
providedIn: 'any'      → Satu instance per injector (module/component)
```

### Custom Provider

```typescript
// Token untuk konfigurasi
import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');
export const ENABLE_LOGGING = new InjectionToken<boolean>('ENABLE_LOGGING');

// Register di app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' },
    { provide: ENABLE_LOGGING, useValue: true },
  ],
};

// Gunakan di service
@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = inject(API_URL);
  private logging = inject(ENABLE_LOGGING);

  // ...
}
```

---

## 6.4 Service Pattern: Repository Pattern

```typescript
// Base repository service
@Injectable({ providedIn: 'root' })
export class Repository<T extends { id: number }> {
  protected http = inject(HttpClient);

  constructor(private endpoint: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  create(item: Omit<T, 'id'>): Observable<T> {
    return this.http.post<T>(this.endpoint, item);
  }

  update(id: number, item: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}

// Spesifik service
@Injectable({ providedIn: 'root' })
export class PostService extends Repository<Post> {
  constructor() {
    super('/api/posts');
  }

  // Method khusus
  publish(id: number): Observable<Post> {
    return this.http.post<Post>(`/api/posts/${id}/publish`, {});
  }
}
```

---

# 7. HTTP CLIENT & INTERCEPTORS

## 7.1 HttpClient Dasar

### Setup (Otomatis jika pakai Angular CLI)

```typescript
// app.config.ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Aktifkan HttpClient di seluruh app
  ],
};
```

### Basic CRUD Operations

```typescript
@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com/posts';

  // GET — Mendapatkan data
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  // GET with Params
  searchPosts(query: string): Observable<Post[]> {
    const params = new HttpParams().set('q', query).set('limit', '10');

    return this.http.get<Post[]>(this.baseUrl, { params });
  }

  // POST — Membuat data baru
  createPost(post: CreatePostDto): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  // PUT — Update seluruh data
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post);
  }

  // PATCH — Update sebagian data
  patchPost(id: number, changes: Partial<Post>): Observable<Post> {
    return this.http.patch<Post>(`${this.baseUrl}/${id}`, changes);
  }

  // DELETE — Hapus data
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

---

## 7.2 HTTP Headers & Options

```typescript
getProtectedData(): Observable<Data> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`,
    'X-Custom-Header': 'custom-value'
  });

  return this.http.get<Data>(this.url, {
    headers,
    params: new HttpParams().set('page', '1'),
    responseType: 'json',           // json (default), text, blob, arraybuffer
    observe: 'body',                 // body (default), response, events
    reportProgress: false            // Untuk upload/download progress
  });
}
```

---

## 7.3 Interceptors (Middleware HTTP)

### Konsep

Interceptor di Angular seperti middleware di Express/NestJS. Setiap request HTTP akan melewati interceptor chain.

```
Request → [Interceptor 1] → [Interceptor 2] → Server
Response ← [Interceptor 1] ← [Interceptor 2] ← Server
```

### Auth Interceptor (JWT Token)

```typescript
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  // Jangan attach token untuk request login/register
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  if (token) {
    // Clone request dan tambahkan header
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};

// Register interceptor
provideHttpClient(withInterceptors([authInterceptor]));
```

### Error Handling Interceptor

```typescript
// error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Terjadi kesalahan';

      switch (error.status) {
        case 400:
          errorMessage = 'Data yang dikirim tidak valid';
          break;
        case 401:
          errorMessage = 'Session expired, silakan login kembali';
          localStorage.removeItem('access_token');
          router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'Anda tidak memiliki akses';
          router.navigate(['/forbidden']);
          break;
        case 404:
          errorMessage = 'Data tidak ditemukan';
          break;
        case 500:
          errorMessage = 'Kesalahan server, coba lagi nanti';
          break;
      }

      // Tampilkan toast/notifikasi
      console.error(errorMessage);

      return throwError(() => new Error(errorMessage));
    }),
  );
};
```

### Loading Indicator Interceptor

```typescript
// loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(req).pipe(finalize(() => loadingService.hide()));
};
```

### Multiple Interceptors (Urutan Penting!)

```typescript
// Interceptors dieksekusi sesuai urutan array
provideHttpClient(
  withInterceptors([
    loadingInterceptor, // 1. Tampilkan loading
    authInterceptor, // 2. Attach token
    errorInterceptor, // 3. Handle error
  ]),
);
```

---

## 7.4 Observable ke Signal Conversion

```typescript
@Component({...})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);

  // Cara 1: Manual subscribe (untuk kontrol penuh)
  posts = signal<Post[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loading.set(true);
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  // Cara 2: toSignal (untuk simple case)
  posts$ = this.postService.getPosts();
  posts = toSignal(this.posts$, { initialValue: [] });

  // Cara 3: HTTP dengan params reaktif
  private searchTerm = signal('');

  posts = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      switchMap(term => this.postService.searchPosts(term))
    ),
    { initialValue: [] }
  );
}
```

---

# 8. FORM HANDLING

## 8.1 Reactive Forms vs Template-Driven

```
REACTIVE FORMS (✅ Direkomendasikan)    TEMPLATE-DRIVEN FORMS
────────────────────────────────────────────────────────────
Logika di TypeScript                    Logika di template
Lebih testable                          Sulit di-test
Validasi kompleks                       Validasi sederhana
Dynamic forms                           Static forms
Type-safe                               Less type-safe
```

---

## 8.2 Form Controls & Form Groups

### Basic Form Control

```typescript
@Component({...})
export class SearchComponent {
  // Single form control
  searchControl = new FormControl('', {
    validators: [Validators.minLength(3)],
    updateOn: 'change'  // change | blur | submit
  });

  get searchValue(): string {
    return this.searchControl.value ?? '';
  }

  onSearch() {
    console.log('Searching:', this.searchValue);
  }
}
```

```html
<input [formControl]="searchControl" (keyup.enter)="onSearch()" />
@if (searchControl.invalid && searchControl.touched) {
<small>Minimal 3 karakter</small>
}
```

### Form Group (Form Lengkap)

```typescript
@Component({...})
export class RegisterComponent {
  private auth = inject(AuthService);

  registerForm = new FormGroup({
    // Form Control dengan multiple validators
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)/) // Harus ada huruf besar & angka
    ]),

    confirmPassword: new FormControl('', [
      Validators.required
    ]),

    age: new FormControl(null, [
      Validators.required,
      Validators.min(17),
      Validators.max(100)
    ]),

    agreeTerms: new FormControl(false, [
      Validators.requiredTrue  // Harus checked
    ])
  }, {
    // Group-level validators
    validators: [passwordMatchValidator]
  });
}
```

---

## 8.3 Custom Validators

```typescript
// Password match validator (group level)
export const passwordMatchValidator: ValidatorFn = (group: AbstractControl) => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};

// Async validator (panggil API)
export function emailExistsValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return http
      .post<{ exists: boolean }>('/api/check-email', {
        email: control.value,
      })
      .pipe(
        map((response) => (response.exists ? { emailTaken: true } : null)),
        catchError(() => of(null)),
      );
  };
}
```

---

## 8.4 Form Array (Dynamic Forms)

```typescript
@Component({...})
export class DynamicFormComponent {
  skillsForm = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([
      new FormControl('')
    ])
  });

  get skillsArray(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skillsArray.push(new FormControl(''));
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.skillsForm.value);
    // { name: 'Alief', skills: ['TypeScript', 'PHP', 'Dart'] }
  }
}
```

```html
<form [formGroup]="skillsForm" (ngSubmit)="onSubmit()">
  <input formControlName="name" placeholder="Nama" />

  <!-- Form Array -->
  <div formArrayName="skills">
    @for (skill of skillsArray.controls; track i; let i = $index) {
    <div>
      <input [formControlName]="i" [placeholder]="'Skill ' + (i + 1)" />
      <button type="button" (click)="removeSkill(i)">Hapus</button>
    </div>
    }
  </div>

  <button type="button" (click)="addSkill()">+ Tambah Skill</button>
  <button type="submit">Submit</button>
</form>
```

---

## 8.5 Form Best Practices

### Error Message Pattern

```typescript
// Helper method untuk error messages
export function getErrorMessage(control: FormControl): string {
  if (!control.errors || !control.touched) return '';

  const errors: Record<string, string> = {
    required: 'Field ini wajib diisi',
    email: 'Format email tidak valid',
    minlength: `Minimal ${control.errors['minlength']?.requiredLength} karakter`,
    maxlength: `Maksimal ${control.errors['maxlength']?.requiredLength} karakter`,
    min: `Nilai minimal ${control.errors['min']?.min}`,
    max: `Nilai maksimal ${control.errors['max']?.max}`,
    pattern: 'Format tidak sesuai',
    passwordMismatch: 'Password tidak cocok',
    emailTaken: 'Email sudah digunakan',
  };

  const errorKey = Object.keys(control.errors)[0];
  return errors[errorKey] || 'Field tidak valid';
}
```

### Form Submission Pattern

```typescript
@Component({...})
export class LoginFormComponent {
  private auth = inject(AuthService);

  form = new FormGroup({...});
  isSubmitting = signal(false);
  submitError = signal<string | null>(null);

  async onSubmit() {
    // 1. Validate
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // 2. Set loading state
    this.isSubmitting.set(true);
    this.submitError.set(null);

    // 3. Submit
    const rawValue = this.form.getRawValue();

    this.auth.login(rawValue as LoginRequest).subscribe({
      next: () => {
        // Success - Router akan redirect di service
        this.isSubmitting.set(false);
      },
      error: (err) => {
        this.submitError.set(err.message);
        this.isSubmitting.set(false);
      }
    });
  }
}
```

---

# 9. AUTHENTICATION FLOW LENGKAP

## 9.1 Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  APP COMPONENT                  │
│  ┌───────────────────────────────────────────┐  │
│  │         AUTH SERVICE (State)              │  │
│  │  - currentUser: Signal<User | null>       │  │
│  │  - isAuthenticated: Signal<boolean>       │  │
│  │  - login() / register() / logout()        │  │
│  └───────────────┬───────────────────────────┘  │
│                  │                               │
│  ┌───────────────▼───────────────────────────┐  │
│  │         AUTH INTERCEPTOR                  │  │
│  │  - Attach JWT token setiap request        │  │
│  │  - Handle 401 (redirect login)            │  │
│  └───────────────┬───────────────────────────┘  │
│                  │                               │
│  ┌───────────────▼───────────────────────────┐  │
│  │         AUTH GUARD                        │  │
│  │  - Protect routes (/dashboard, /admin)    │  │
│  │  - Redirect ke login jika belum auth      │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 9.2 Complete Auth Service

```typescript
// auth.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // State
  currentUser = signal<User | null>(null);
  accessToken = signal<string | null>(null);

  // Computed state
  isAuthenticated = computed(() => !!this.accessToken());
  isAdmin = computed(() => this.currentUser()?.role === 'admin');
  userName = computed(() => this.currentUser()?.name ?? '');

  constructor() {
    // Restore session dari localStorage saat app dimuat
    this.restoreSession();
  }

  // Login
  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              error.status === 401 ? 'Email atau password salah' : 'Gagal login, coba lagi nanti',
            ),
        );
      }),
    );
  }

  // Register
  register(data: RegisterRequest) {
    return this.http.post<AuthResponse>('/api/auth/register', data).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        const message = error.error?.message || 'Gagal mendaftar';
        return throwError(() => new Error(message));
      }),
    );
  }

  // Logout
  logout(): void {
    // Optional: Panggil API logout
    this.http.post('/api/auth/logout', {}).subscribe();

    // Clear state
    this.accessToken.set(null);
    this.currentUser.set(null);

    // Clear storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    // Redirect ke login
    this.router.navigate(['/login']);
  }

  // Refresh token
  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.logout();
      return;
    }

    return this.http
      .post<AuthResponse>('/api/auth/refresh', {
        refresh_token: refreshToken,
      })
      .pipe(
        tap((response) => this.handleAuthSuccess(response)),
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Session expired'));
        }),
      );
  }

  // Cek apakah token expired
  isTokenExpired(): boolean {
    const token = this.accessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert ke milliseconds
      return Date.now() > expiry;
    } catch {
      return true;
    }
  }

  // Handle setelah auth sukses
  private handleAuthSuccess(response: AuthResponse): void {
    this.accessToken.set(response.access_token);
    this.currentUser.set(response.user);

    // Simpan ke localStorage
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  // Restore session dari localStorage
  private restoreSession(): void {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;

        if (!this.isTokenExpired()) {
          this.accessToken.set(token);
          this.currentUser.set(user);
        } else {
          // Token expired, coba refresh
          this.refreshToken()?.subscribe();
        }
      } catch {
        this.logout();
      }
    }
  }
}
```

---

## 9.3 HTTP Interceptor dengan Token Refresh

```typescript
// auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken();

  // Skip interceptor untuk endpoint auth
  if (req.url.includes('/auth/') && !req.url.includes('/auth/refresh')) {
    return next(req);
  }

  // Clone request dengan token
  if (token) {
    req = addToken(req, token);
  }

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Token expired, coba refresh
        return handle401Error(req, next, authService);
      }
      return throwError(() => error);
    }),
  );
};

function addToken(req: HttpRequest<any>, token: string) {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) {
  // Cegah multiple refresh request bersamaan
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        isRefreshing = false;
        const newToken = response.access_token;
        refreshTokenSubject.next(newToken);

        // Retry original request dengan token baru
        return next(addToken(request, newToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      }),
    );
  } else {
    // Refresh sedang berjalan, tunggu token baru
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(addToken(request, token!))),
    );
  }
}
```

---

## 9.4 Login Component Lengkap

```typescript
// login.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Login</h1>
        <p class="auth-subtitle">Selamat datang kembali!</p>

        <!-- Alert Error -->
        @if (submitError()) {
          <div class="alert alert-error" role="alert">
            <span>{{ submitError() }}</span>
            <button type="button" (click)="submitError.set(null)">×</button>
          </div>
        }

        <!-- Alert Sukses (setelah register) -->
        @if (successMessage()) {
          <div class="alert alert-success" role="alert">
            {{ successMessage() }}
          </div>
        }

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
          <!-- Email -->
          <div class="form-field">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="nama@email.com"
              [class.error]="emailControl.invalid && emailControl.touched"
              autocomplete="email"
            />
            @if (emailControl.invalid && emailControl.touched) {
              <small class="error-text">
                {{ getEmailError() }}
              </small>
            }
          </div>

          <!-- Password -->
          <div class="form-field">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              formControlName="password"
              placeholder="Masukkan password"
              [class.error]="passwordControl.invalid && passwordControl.touched"
              autocomplete="current-password"
            />
            @if (passwordControl.invalid && passwordControl.touched) {
              <small class="error-text">
                {{ getPasswordError() }}
              </small>
            }
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" formControlName="rememberMe" />
              <span>Ingat saya</span>
            </label>
            <a routerLink="/forgot-password" class="forgot-link"> Lupa password? </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary btn-block"
            [disabled]="loginForm.invalid || isSubmitting()"
            [attr.aria-busy]="isSubmitting()"
          >
            @if (isSubmitting()) {
              <span class="spinner"></span>
              Memproses...
            } @else {
              Masuk
            }
          </button>
        </form>

        <!-- Register Link -->
        <p class="auth-footer">
          Belum punya akun?
          <a routerLink="/register">Daftar sekarang</a>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        padding: 20px;
      }

      .auth-card {
        background: white;
        border-radius: 12px;
        padding: 40px;
        width: 100%;
        max-width: 420px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .auth-title {
        margin: 0 0 8px;
        font-size: 24px;
        color: #1a1a1a;
      }

      .auth-subtitle {
        margin: 0 0 24px;
        color: #666;
      }

      .form-field {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        color: #333;
      }

      input[type='email'],
      input[type='password'] {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.2s;
      }

      input:focus {
        outline: none;
        border-color: #4a90d9;
        box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.1);
      }

      input.error {
        border-color: #e53e3e;
      }

      .error-text {
        color: #e53e3e;
        font-size: 12px;
        margin-top: 4px;
        display: block;
      }

      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      .remember-me {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 14px;
      }

      .forgot-link {
        color: #4a90d9;
        text-decoration: none;
        font-size: 14px;
      }

      .btn {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .btn-primary {
        background: #4a90d9;
        color: white;
      }

      .btn-primary:hover:not(:disabled) {
        background: #357abd;
      }

      .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        margin-right: 8px;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .alert {
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }

      .alert-error {
        background: #fff5f5;
        color: #c53030;
        border: 1px solid #feb2b2;
      }

      .alert-success {
        background: #f0fff4;
        color: #276749;
        border: 1px solid #9ae6b4;
      }

      .auth-footer {
        text-align: center;
        margin-top: 24px;
        color: #666;
      }

      .auth-footer a {
        color: #4a90d9;
        text-decoration: none;
      }
    `,
  ],
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  isSubmitting = signal(false);
  submitError = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false),
  });

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  getEmailError(): string {
    const control = this.emailControl;
    if (control.errors?.['required']) return 'Email wajib diisi';
    if (control.errors?.['email']) return 'Format email tidak valid';
    return '';
  }

  getPasswordError(): string {
    const control = this.passwordControl;
    if (control.errors?.['required']) return 'Password wajib diisi';
    if (control.errors?.['minlength']) return 'Password minimal 6 karakter';
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const { email, password } = this.loginForm.value;

    this.auth
      .login({
        email: email!,
        password: password!,
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          // Redirect ke halaman yang dituju atau dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.submitError.set(err.message);
          this.isSubmitting.set(false);
        },
      });
  }
}
```

---

# 10. PROJECT STRUCTURE BEST PRACTICE

## 10.1 Struktur Folder yang Direkomendasikan

```
src/
├── app/
│   ├── core/                    # Singleton services, guards, interceptors
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   └── loading.interceptor.ts
│   │   ├── services/
│   │   │   └── global-error-handler.ts
│   │   └── models/
│   │       └── api-response.ts
│   │
│   ├── features/                # Feature modules (lazy loaded)
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── login.component.ts
│   │   │   │   └── register.component.ts
│   │   │   └── services/
│   │   │       └── auth.service.ts
│   │   │
│   │   ├── posts/
│   │   │   ├── pages/
│   │   │   │   ├── post-list.component.ts
│   │   │   │   ├── post-detail.component.ts
│   │   │   │   └── post-form.component.ts
│   │   │   ├── components/       # Feature-specific components
│   │   │   │   ├── post-card.component.ts
│   │   │   │   └── post-comments.component.ts
│   │   │   ├── services/
│   │   │   │   └── post.service.ts
│   │   │   └── models/
│   │   │       └── post.model.ts
│   │   │
│   │   └── dashboard/
│   │       └── pages/
│   │           └── dashboard.component.ts
│   │
│   ├── shared/                  # Reusable components, pipes, directives
│   │   ├── components/
│   │   │   ├── button/
│   │   │   │   ├── button.component.ts
│   │   │   │   └── button.component.scss
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   └── data-table/
│   │   ├── pipes/
│   │   │   └── date-format.pipe.ts
│   │   └── directives/
│   │       └── click-outside.directive.ts
│   │
│   ├── layouts/                 # Layout components
│   │   ├── main-layout.component.ts
│   │   ├── auth-layout.component.ts
│   │   └── admin-layout.component.ts
│   │
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.routes.ts
│   └── app.config.ts
│
├── environments/
│   ├── environment.ts           # Development
│   └── environment.prod.ts      # Production
│
├── assets/                      # Static files (images, fonts)
│   ├── images/
│   └── icons/
│
└── styles/
    ├── _variables.scss          # CSS variables, colors, spacing
    ├── _typography.scss
    └── styles.scss              # Global styles
```

---

## 10.2 Naming Convention

### Files

```
Format: feature-name.type.extension

Contoh:
user-list.component.ts
user-list.component.html
user-list.component.scss
auth.service.ts
auth.guard.ts
date-format.pipe.ts
click-outside.directive.ts
user.model.ts
```

### Classes & Selectors

```typescript
// Class names: PascalCase
export class UserListComponent {}
export class AuthService {}
export class AuthGuard {}

// Selectors: kebab-case dengan prefix 'app-'
@Component({
    // @ts-ignore: Angular Language Service false positive
changeDetection: ChangeDetectionStrategy.OnPush,
selector: 'app-user-list'    // ✅
  //   // @ts-ignore: Angular Language Service false positive
changeDetection: ChangeDetectionStrategy.OnPush,
selector: 'user-list'     // ❌ No prefix
  //   // @ts-ignore: Angular Language Service false positive
changeDetection: ChangeDetectionStrategy.OnPush,
selector: 'appUserList'   // ❌ camelCase
})

// Di template:
<app-user-list />
```

### Variables & Methods

```typescript
// camelCase
currentUser = signal<User | null>(null);
isLoading = signal(false);

getUserById(id: number): Observable<User> {}
handleSubmit(): void {}
```

---

## 10.3 Barrel Exports (index.ts)

```typescript
// shared/components/index.ts
export { ButtonComponent } from './button/button.component';
export { InputComponent } from './input/input.component';
export { ModalComponent } from './modal/modal.component';
export { DataTableComponent } from './data-table/data-table.component';

// Penggunaan di component lain:
import { ButtonComponent, ModalComponent } from '@shared/components';
```

---

## 10.4 Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@features/*": ["src/app/features/*"],
      "@shared/*": ["src/app/shared/*"],
      "@environments/*": ["src/environments/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

```typescript
// Import dengan alias
import { AuthService } from '@core/services/auth.service';
import { PostService } from '@features/posts/services/post.service';
import { ButtonComponent } from '@shared/components';
```

---

# 📊 QUICK REFERENCE CARD

## Vue/Next.js → Angular Migration Map

```
VUE                    ANGULAR                    CATATAN
────────────────────────────────────────────────────────────
ref()                  signal()                   Sama!
computed()             computed()                 Sama!
watch()                effect()                   Jarang dipakai
defineProps()          input()                    Input lebih ketat
defineEmits()          output()                   Mirip
v-if                   @if                        Control flow baru
v-for :key             @for track                 Wajib track!
v-model                [(ngModel)]                Two-way binding
@click                 (click)                    Event binding
:class                 [class.name]               Property binding
:style                 [style.color.px]           Property binding
inject()               inject()                   SAMA!
provide()              InjectionToken             Lebih verbose
useRouter()            inject(Router)             Sama
useRoute()             inject(ActivatedRoute)     Sama
<Link>                 routerLink                 Directive
middleware.ts          canActivate Guard          Per-route
fetch()                HttpClient.get()           Observable
```

---

## RxJS Essentials untuk Angular

```typescript
// Operator yang paling sering dipakai
import { map, filter, switchMap, debounceTime, catchError } from 'rxjs';

// Map — Transform data
this.http.get<User[]>('/api/users').pipe(
  map(users => users.filter(u => u.active))
);

// SwitchMap — Cancel request sebelumnya, ganti dengan yang baru
search(term: string) {
  return this.http.get(`/api/search?q=${term}`);
}

// DebounceTime — Tunggu user berhenti mengetik
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => this.searchService.search(term))
);

// CatchError — Handle error
this.http.get('/api/data').pipe(
  catchError(err => {
    console.error(err);
    return of([]); // Return default value
  })
);
```
