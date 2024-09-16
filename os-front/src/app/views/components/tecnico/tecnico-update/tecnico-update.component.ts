import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from '../../../../models/tecnico';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css'
})
export class TecnicoUpdateComponent implements OnInit{

  id_tec = ''

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  update(): void {
    this.service.update(this.tecnico).subscribe((response) => {
      this.router.navigate(['tecnicos'])
      this.service.message('tecnico atualizado')
    })
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe(response => {
      this.tecnico = response
    })
  }

  cancelar(): void {
    this.router.navigate(['tecnicos'])
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
