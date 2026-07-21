import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodolistService } from './todolist.service';

@Component({
  selector: 'app-todolist',
  imports: [ReactiveFormsModule],
  templateUrl: './todolist.html',
})
export class TodolistPage implements OnInit {
  todoService = inject(TodolistService);
  formGroup = new FormGroup({
    tugas: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  todos = signal<ReturnType<TodolistService['getTodos']>>([]);

  ngOnInit(): void {
    this.todos.set(this.todoService.getTodos());
  }
  formSubmit = () => {
    if (this.formGroup.invalid && this.formGroup.touched) {
    } else {
      this.todoService.formSubmit({ value: this.formGroup.value.tugas ?? '' });
      this.todos.update(() => this.todoService.getTodos());
    }
  };
}
