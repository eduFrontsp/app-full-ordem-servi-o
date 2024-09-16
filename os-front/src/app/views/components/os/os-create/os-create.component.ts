import { Component, OnInit } from '@angular/core';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../models/tecnico';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../models/cliente';
import { OS } from '../../../../models/os';
import { OsService } from '../../../../services/os.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrl: './os-create.component.css'
})
export class OsCreateComponent implements OnInit {

  selected = ''
  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private routter: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos()
    this.listarClientes()
  }

  create(): void {
    this.service.create(this.os).subscribe(response => {
      this.service.message('ordem de serviço criado')
      this.routter.navigate(['os'])
    })
  }

  cancel(): void {
    this.routter.navigate(['os'])
  }

  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(response => {
      this.tecnicos = response
    })
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe(response => {
      this.clientes = response
    })
  }

}
