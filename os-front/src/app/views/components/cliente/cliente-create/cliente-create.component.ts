import { Component } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.css'
})
export class ClienteCreateComponent {

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
    private service: ClienteService
  )
    { }

  cancelar(): void {
    this.router.navigate(['clientes'])
  }

  create(): void {
    this.service.create(this.cliente).subscribe((response) => {
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

