import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})
export class ClienteUpdateComponent implements OnInit {

  id_cli = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(5)])

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  )
  { }

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  cancelar(): void {
    this.router.navigate(['clientes'])
  }

  findById(): void {
    this.service.findById(this.id_cli).subscribe(response => {
      this.cliente = response
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe((response) => {
      this.router.navigate(['clientes'])
      this.service.message('Tecnico criado com sucesso')
    }, erro => {
      if (erro.error.error.match('ja esta cadastrado')) {
        this.service.message(erro.error.error)
      } else if(erro.error.errors[0].message ==  "numero de registro de contribuinte"){
        this.service.message('CPF invalido')
      }
    })
  }

  erroValidNome() {
    if (this.nome.invalid) {
      return "o nome deve ter entre 5 e 100 caracteres"
    }
    return false
  }

  erroValidCpf() {
    if (this.cpf.invalid) {
      return "o CPF deve ter entre 11 e 100 caracteres"
    }
    return false
  }

  erroValidTelefone() {
    if (this.telefone.invalid) {
      return "o telefone deve ter entre 11 e 100 caracteres"
    }
    return false
  }

}

