import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OS } from '../../../../models/os';
import { OsService } from '../../../../services/os.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrl: './os-read.component.css'
})
export class OsReadComponent implements AfterViewInit {

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
        if (x.status != "ENCERRADO") {
          this.listaOs.push(x)
        }
      })
      this.listarTecnico()
      this.listarCliente()
      this.dataSource = new MatTableDataSource<OS>(this.listaOs);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['os/create'])
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


