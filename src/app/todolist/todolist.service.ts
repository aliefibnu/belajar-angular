import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  STORAGE_KEY = 'todolist';

  getTodos(): Todo[] | [] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]');
  }

  save(fun: (v: Todo[]) => any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fun(this.getTodos())));
  }

  create({ value }: Omit<Todo, 'id'>) {
    this.save((v) => v.concat({ value, id: v.length }));
  }

  delete(id: Todo['id']) {
    this.save((v) => v.filter((f) => f.id != id));
  }

  formSubmit({ value }: Omit<Todo, 'id'>) {
    this.create({ value });
  }
}

type Todo = {
  id: number;
  value: string;
  done?: boolean;
};
