import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../../models/tecnico';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { TecnicoService } from '../../../../services/tecnico.service';
import { OsService } from '../../../../services/os.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from '../../../../models/os';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrl: './os-update.component.css'
})
export class OsUpdateComponent implements OnInit {

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
    private routter: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id')
    this.findById()
    this.listarTecnicos()
    this.listarClientes()
  }

  findById(): void {
    this.service.findById(this.os.id).subscribe(response => {
      this.os = response
      this.convertDados()
    })
  }

  update(): void {
    this.service.update(this.os).subscribe(response => {
      this.service.message('ordem de serviço atualizada')
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

  convertDados(): void {
    if (this.os.status == 'ABERTO') {
      this.os.status = 0
    } else if (this.os.status == 'ANDAMENTO') {
      this.os.status = 1
    } else {
      this.os.status = 2
    }
    if (this.os.prioridade == 'BAIXA') {
      this.os.prioridade = 0
    } else if (this.os.prioridade == 'MEDIA') {
      this.os.prioridade = 1
    } else {
      this.os.prioridade = 2
    }
  }

}
