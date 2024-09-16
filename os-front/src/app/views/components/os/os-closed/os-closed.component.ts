import { OS } from './../../../../models/os';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { OsService } from '../../../../services/os.service';
import { Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { ClienteService } from '../../../../services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrl: './os-closed.component.css'
})
export class OsClosedComponent implements AfterViewInit {

  listaOs: OS[] = []

  displayedColumns: string[] = ['abertura', 'fechamento', 'prioridade', 'status', 'tecnico', 'cliente', 'action'];
  dataSource = new MatTableDataSource<OS>(this.listaOs);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
  ) {

  }

  ngAfterViewInit() {
    this.findAll
  }

  findAll():void {
    this.service.findAll().subscribe((response) => {
      response.forEach(x => {
        if (x.status == "ENCERRADO") {
          this.listaOs.push(x)
        }
      })
      this.listarTecnico()
      this.listarCliente()
      this.dataSource = new MatTableDataSource<OS>(this.listaOs);
      this.dataSource.paginator = this.paginator;
    })
  }

  listarTecnico(): void  {
    this.listaOs.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(response => {
        x.tecnico = response.nome
      })
    });
  }

  listarCliente(): void  {
    this.listaOs.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(response => {
        x.cliente = response.nome
      })
    });
  }

  prioridade(x: any) {
    if (x == 'BAIXA') {
      return 'baixa'
    } else if (x == 'MEDIA') {
      return 'media'
    } else {
      return 'alta'
    }
  }
}

