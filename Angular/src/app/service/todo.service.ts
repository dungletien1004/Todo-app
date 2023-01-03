import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../models/filter.model';
import { ITodo } from '../models/todo.model';
import { TodoApiService } from './todo-api.service';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todos$ = new BehaviorSubject<ITodo[]>([]);
  public length$ = new BehaviorSubject<number>(0);
  public loading$ = new BehaviorSubject<boolean>(true);
  public currentFilter$ = new BehaviorSubject<Filter>(Filter.All);
  public taskNow$ = new BehaviorSubject<ITodo>({
    id: 0,
    content: '',
    timeDeadline: '',
    isCompleted: false
  });
  public isEdit$ = new BehaviorSubject<boolean>(false);
  constructor(private todoService: TodoApiService) {}

  setLoading(loading: boolean) {
    this.loading$.next(loading);
  }

  getLength(todos: ITodo[]) {
    this.length$.next(todos.length);
  }

  setTasks(todos: ITodo[]) {
    this.todos$.next(todos);
  }
  setFilter(filter: Filter) {
    this.currentFilter$.next(filter);
  }
  setTaskNow(task?: ITodo) {
    task ? this.taskNow$.next(task) : this.taskNow$.next({
      id: 0,
      content: '',
      timeDeadline: '',
      isCompleted: false
    });
  }
  setIsEdit(_value: boolean) {
    this.isEdit$.next(_value);
  }
}
