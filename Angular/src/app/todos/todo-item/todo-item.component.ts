import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TOAST_TIME } from 'src/app/models/filter.model';
import { ITodo } from 'src/app/models/todo.model';
import { TodoApiService } from 'src/app/service/todo-api.service';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() todo!: ITodo;
  isHover = false;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  deadline: string = '';
  mesAlert: string ='';
  today = new Date();
  constructor(
    private toastr: ToastrService,
    private todoApiService: TodoApiService,
    private todoService: TodoService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.deadline = moment(this.todo.timeDeadline).format('HH:mm:DD/MM/YYYY');
    const countMinutes = moment(this.todo.timeDeadline).diff(moment(this.today), 'minutes');
    this.mesAlert = (this.todo.isCompleted || countMinutes >= 60) ? '' : (countMinutes < 0) ? 'Time out' : 'Almost expired';
  }
  handleClick() {
    this.todoService.setLoading(true);
    const newTask = {
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    };
    this.todoApiService.editTask(newTask).subscribe({
      next: (data) => {
        this.todoService.setTasks(data);
      },
      error: (error) => {
        this.toastr.error(`${error.statusText}!`, 'Error');
      },
      complete: () => {
        this.todoService.setLoading(false);
        this.toastr.success('Change status task succeedly!', 'Done', {timeOut: TOAST_TIME});
      },
    });

  }
  handleDeleteTask() {
    this.todoService.setLoading(true);
    this.todoApiService.deleteTask(this.todo.id).subscribe({
      next: (data) => {
        this.todoService.setTasks(data);
      },
      error: (error) => {
        this.toastr.error(`${error.statusText}!`, 'Error');
      },
      complete: () => {
        this.todoService.setLoading(false);
        this.todoService.setTaskNow();
        this.todoService.setIsEdit(false);
        this.toastr.success('Delete task succeedly!', 'Done', {timeOut: TOAST_TIME});
      },
    });
  }
  handelClickEdit() {
    this.todoService.setIsEdit(true);
    this.todoService.setTaskNow(this.todo);
  }
}
