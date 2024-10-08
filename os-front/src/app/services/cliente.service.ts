import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../models/cliente';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }

  findAll():Observable<Cliente[]> {
    const url = this.baseUrl + "/clientes"
    return this.http.get<Cliente[]>(url)
  }

  findById(id: any): Observable<Cliente> {
    const url = this.baseUrl + "/clientes/" + id
    return this.http.get<Cliente>(url)
  }

   create(cliente: Cliente): Observable<Cliente> {
    const url = this.baseUrl + "/clientes"
    return this.http.post<Cliente>(url, cliente)
   }

  update(cliente: Cliente): Observable<Cliente> {
    const url = this.baseUrl + "/clientes/" + cliente.id
    return this.http.put<Cliente>(url, cliente)
  }

  delete(id: any): Observable<void> {
    const url = this.baseUrl + "/clientes/" + id
    return this.http.delete<void>(url)
  }

   message(msg: string): void {
    this.snack.open(`${msg}`, 'ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
