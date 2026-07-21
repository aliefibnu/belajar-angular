import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  STORAGE_KEY = 'todolist';

  getStorage() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]');
  }

  save(fun: (v: Todo[]) => void) {
    fun(this.getStorage());
  }

  create(value: string) {
    this.save((v) => v.push({ value, id: v.length }));
  }

  delete(id: Todo['id']) {
    this.save((v) => v.filter((f) => f.id != id));
  }

  formSubmit(e: any) {
    console.log(e);
  }
}

type Todo = {
  id: number;
  value: string;
  done?: boolean;
};
