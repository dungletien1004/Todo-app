import { Component, OnInit } from '@angular/core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Filter } from '../models/filter.model';
import { ITodo } from '../models/todo.model';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  faListCheck = faListCheck;
  public todos: ITodo[] = [];
  public loading = false;
  public todosRender: ITodo[] = [];
  public currentFilter: Filter = Filter.All;
  public length: string = '';
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe((data) => {
      this.todos = data.reverse();
      this.setDataRender();
    });
    this.todoService.currentFilter$.subscribe((data) => {
      this.currentFilter = data;
      this.setDataRender();
    });
    this.todoService.loading$.subscribe((data) => {
      this.loading = data;
    });
  }

  handleClick() {
    window.location.reload();
  }
  setDataRender() {
    this.todosRender = this.currentFilter === Filter.All
      ? this.todos
      : this.todos.filter((task) => this.currentFilter === Filter.Active ? task.isCompleted === false : task.isCompleted === true);
    this.length = this.todosRender.length > 1 ? `${this.todosRender.length} Items` : this.todosRender.length ? `${this.todosRender.length} Item` : '';
  }
}
