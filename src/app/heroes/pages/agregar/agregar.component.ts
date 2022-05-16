import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `img {
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'Dc comics',
      desc: 'Dc - comics'
    },
    {
      id: 'Marvel comics',
      desc: 'Marel - comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroesService: HeroesService,
                private activateRoute: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) { }

  ngOnInit(): void {

    if( !this.router.url.includes( 'editar' ) ){
      return;
    }
    
    this.activateRoute.params
        .pipe(
          switchMap( ({ id }) => this.heroesService.getHeroeId( id ))
        )
        .subscribe( heroe => this.heroe = heroe );
  }

  guardar() {

    if ( this.heroe.superhero.trim().length === 0) {
      return
    }

    if ( this.heroe.id ) {
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => {
          this.mostrarSnakbar('Registro actualizado');
          this.router.navigate(['/heroes', heroe.id]);
        })
    } else {
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( heroe => {
          this.mostrarSnakbar('Registro Creado');
          this.router.navigate(['/heroes', heroe.id]);
        })
    }
  }

  borrar(){

    const diaglo = this.dialog.open( ConfirmarComponent, 
                      { width: '250px',
                        data: this.heroe 
                      });

    diaglo.afterClosed().subscribe(
      (result) => {
        if( result ){
          this.heroesService.borrarHeroe( this.heroe.id! )
          .subscribe( resp => {
            this.router.navigate(['/heroes'])
          })
        }
      }
    )
  }

  mostrarSnakbar( mensaje: string) {

    this.snackBar.open( mensaje, 'Cerrar', {
      duration: 2500
    })
  }

}
