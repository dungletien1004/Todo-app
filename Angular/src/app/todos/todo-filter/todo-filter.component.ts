import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Filter, IFilterButton } from 'src/app/models/filter.model';
import { ITodo } from 'src/app/models/todo.model';
import { TodoApiService } from 'src/app/service/todo-api.service';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit {
  filterBtn: IFilterButton[] = [
    {type: Filter.All, label: 'All', isActive: true},
    {type: Filter.Active, label: 'Active', isActive: false},
    {type: Filter.Completed, label: 'Completed', isActive: false}
  ];
  length = 0;
  todos: ITodo[] = [];
  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.todoService.todos$.subscribe((data) => {
      this.todos = data;
    });
  }

  handleClickFilter = (type: Filter) => {
    this.filterBtn = this.filterBtn.map((btn) => ({...btn, isActive: btn.type === type}));
    this.todoService.setFilter(type);
  };
}
