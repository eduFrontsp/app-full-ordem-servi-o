import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../../../models/cliente';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrl: './cliente-read.component.css'
})
export class ClienteReadComponent implements AfterViewInit {

  clientes: Cliente[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: TecnicoService,
    private router: Router
  ) {

  }

  ngAfterViewInit() {
    this.findAll
  }

  findAll():void {
    this.service.findAll().subscribe((response) => {
      this.clientes = response
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['clientes/create'])
  }


}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

