import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodolistService } from './todolist.service';

@Component({
  selector: 'app-todolist',
  imports: [ReactiveFormsModule],
  templateUrl: './todolist.html',
})
export class TodolistPage {
  inputControl = new FormControl('', [Validators.required, Validators.min(3)]);
  todoService = inject(TodolistService);
  formSubmit = this.todoService.formSubmit;
}
