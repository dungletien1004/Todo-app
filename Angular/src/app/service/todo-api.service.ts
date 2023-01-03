import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  URL: string = 'https://631afc62dc236c0b1ee91590.mockapi.io/ltdung/todos';
  constructor(private http: HttpClient) { }
  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.URL);
  }
  createTask(task: ITodo) {
    return this.http.post<ITodo>(this.URL, task).pipe(
      switchMap(() => this.getTodos())
    );
  }
  deleteTask(id: number) {
    return this.http.delete<ITodo>(`${this.URL}/${id}`).pipe(
      switchMap(() => this.getTodos())
    );
  }
  editTask(data: ITodo) {
    const url = `${this.URL}/${data.id}`;
    return this.http.put<ITodo>(url, data).pipe(
      switchMap(() => this.getTodos())
    );
  }
}
