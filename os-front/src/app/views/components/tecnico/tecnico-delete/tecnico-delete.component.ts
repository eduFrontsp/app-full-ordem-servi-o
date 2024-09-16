import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from '../../../../services/tecnico.service';
import { Tecnico } from '../../../../models/tecnico';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent implements OnInit{

  id_tec = ''

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }


  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe(response => {
      this.tecnico = response
    })
  }

  cancelar(): void {
    this.router.navigate(['tecnicos'])
  }

  delete(): void {
    this.service.delete(this.id_tec).subscribe(response => {
      this.router.navigate(['tecnicos'])
      this.service.message('tecnico foi deletado')
    })
  }

}
