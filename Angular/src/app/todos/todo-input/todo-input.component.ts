import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodoApiService } from 'src/app/service/todo-api.service';
import { TodoService } from 'src/app/service/todo.service';
import * as moment from 'moment';
import { ITodo } from 'src/app/models/todo.model';
import { TOAST_TIME } from 'src/app/models/filter.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {
  currentDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');
  isEdit = false;
  taskNowForm!: FormGroup;
  constructor(
    private toastr: ToastrService,
    private todoApiService: TodoApiService,
    private todoServices: TodoService
  ) {
  }

  ngOnInit(): void {
    this.taskNowForm = new FormGroup({
      id: new FormControl(0),
      content: new FormControl('', Validators.required),
      timeDeadline: new FormControl('', Validators.required),
      isCompleted: new FormControl(false)
    });
    this.todoServices.isEdit$.subscribe(data => this.isEdit = data);
    this.todoServices.taskNow$.subscribe(data => {
      this.taskNowForm.setValue(data);
    });
  }

  handleSubmit() {
    this.isEdit ? this.editTask() : this.createTask();
  }
  createTask() {
    this.todoServices.setLoading(true);
    this.handleCRUDTask(this.todoApiService.createTask(this.taskNowForm.value), 'Create task succeedly!');
  }
  editTask() {
    this.todoServices.setLoading(true);
    this.handleCRUDTask(this.todoApiService.editTask(this.taskNowForm.value), 'Edit task succeedly!');
  }

  resetForm() {
    const newTaskNow: ITodo = {
      id: 0,
      content: '',
      timeDeadline: '',
      isCompleted: false
    };
    this.todoServices.setIsEdit(false);
    this.todoServices.setTaskNow(newTaskNow);
  }
  handleKeyDown(e: KeyboardEvent) {
    if (e.key  === 'Enter' && this.taskNowForm.value.content && this.taskNowForm.value.timeDeadline) {
      this.handleSubmit();
    }

  }
  handleCRUDTask(_func: Observable<ITodo[]>, title: string) {
    _func.subscribe({
      next: (data) => {
        this.todoServices.setTasks(data);
      },
      error: (error) => {
        this.toastr.error(`${error.statusText}!`, 'Error');
      },
      complete: () => {
        this.todoServices.setLoading(false);
        this.resetForm();
        this.toastr.success(title, 'Success', {timeOut: TOAST_TIME});
      },
    });
  }

}
