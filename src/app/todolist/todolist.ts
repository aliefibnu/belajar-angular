import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo, TodolistService } from './todolist.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheckCircle,
  lucideCircle,
  lucideCircleDotDashed,
  lucidePencil,
  lucideTrash2,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-todolist',
  imports: [ReactiveFormsModule, NgIcon],
  templateUrl: './todolist.html',
  providers: provideIcons({
    lucideTrash2,
    lucidePencil,
    lucideCheckCircle,
    lucideCircle,
    lucideCircleDotDashed,
  }),
})
export class TodolistPage {
  todoService = inject(TodolistService);
  todos = this.todoService.todos;

  formGroup = new FormGroup({
    tugas: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get tugasControl() {
    return this.formGroup.get('tugas');
  }

  formSubmit = () => {
    if (this.formGroup.invalid) {
      const err = Object.keys(this.tugasControl?.errors as {}).toString();
      switch (err) {
        case 'required':
          Notify.failure('Tugas wajib di isi !');
          break;
        case 'minlength':
          Notify.failure(
            `Tugas minimal ${this.tugasControl?.errors?.['minlength']['requiredLength']} karakter !`,
          );
          break;
      }
    } else {
      this.todoService.create({ value: this.formGroup.value.tugas ?? '' });
      this.tugasControl?.reset();
    }
  };

  updateStatus = (intodo: Todo) =>
    this.todoService.save((val) =>
      val.map((todo) => (todo.id === intodo.id ? { ...todo, done: !todo.done } : todo)),
    );

  get doneTodos() {
    return this.todoService.doneTodos;
  }
}
