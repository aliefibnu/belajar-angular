import { Injectable, signal } from '@angular/core';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  STORAGE_KEY = 'todolist';
  todos = signal<Todo[]>([]);

  constructor() {
    this.todos.set(this.getTodos());
  }

  getTodos(): Todo[] | [] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]');
  }

  get doneTodos() {
    return this.todos().filter((t) => t.done);
  }

  save(fun: (v: Todo[]) => any) {
    const resultCallback = fun(this.getTodos());
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(resultCallback));
    this.todos.set(resultCallback);
  }

  create({ value }: Omit<Todo, 'id'>) {
    this.save((v) => v.concat({ value, id: v.length }));
  }

  update(reqTodo: Todo) {
    Confirm.prompt(
      'Update Tugas !',
      '',
      reqTodo.value,
      'Simpan !',
      'Batal.',
      (newVal: string) => {
        if (newVal.trim() && newVal.length > 3) {
          this.save((todos) =>
            todos.map((todo) => (todo.id === reqTodo.id ? { ...todo, value: newVal } : todo)),
          );
        } else {
          Notify.failure('Tugas minimal 3 karakter !');
        }
      },
      () => {},
      {
        okButtonBackground: 'oklch(76.9% 0.188 70.08)',
        okButtonColor: 'white',
        titleColor: 'oklch(76.9% 0.188 70.08)',
      },
    );
  }

  updateAllStatus() {
    const statusNanti =
      this.todos().length === this.doneTodos.length ? 'Belum Selesai' : 'Sudah Selesai';
    Confirm.show(
      'Update Semua Todos ?',
      `Yakin ingin menandai semua Todos sebagai ${statusNanti} ?`,
      'Ya, Perbarui !',
      'Batal.',
      () =>
        this.save((v) =>
          v.map((t) => ({ ...t, done: statusNanti === 'Belum Selesai' ? false : true })),
        ),
      () => {},
      {
        okButtonBackground: 'oklch(76.9% 0.188 70.08)',
        okButtonColor: 'white',
        titleColor: 'oklch(76.9% 0.188 70.08)',
      },
    );
  }

  delete(id: Todo['id'] | 'all') {
    Confirm.show(
      'Konfirmasi Hapus ?',
      `Apakah Anda Yakin Akan Menghapus ${id == 'all' ? 'Semua Todo' : 'Todo Ini'} ?`,
      'Ya, Hapus !',
      'Batal.',
      () => this.save((v) => v.filter((f) => f.id != id && id !== 'all')),
      () => {},
      {
        okButtonBackground: '#fb2c36',
        okButtonColor: 'white',
        titleColor: '#fb2c36',
      },
    );
  }
}

export type Todo = {
  id: number;
  value: string;
  done?: boolean;
};
