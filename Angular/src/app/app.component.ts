import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodoApiService } from './service/todo-api.service';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo';
  constructor(private todoApiService: TodoApiService,
    private todoService: TodoService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.todoApiService.getTodos().subscribe({
      next: (res) => {
        this.todoService.setTasks(res);
      },
      error: (erorr) => {
        this.todoService.setLoading(false);
        this.toastr.error(erorr);
      },
      complete: () => {
        this.todoService.setLoading(false);
      },
    });
  }
}
