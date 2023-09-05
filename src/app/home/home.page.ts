import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  films: Observable<any> | undefined;

  constructor(private router: Router, private http: HttpClient, public ToastController: ToastController) { }

  ngOnInit(): void {
      this.films = this.http.get('https://swapi.dev/api/films').pipe(
        catchError(erro => this.exibirErro(erro))
      );
  }

  async exibirErro(erro:any){
    const toast = await this.ToastController.create({
      message: 'erro ao consultar a API: ' + erro.status + ': ' + erro.message,
      duration: 4000,
      color: 'danger',
      position: 'middle'
    });
    console.log(erro);
    toast.present();
    return null;
  }

  openDetails(film:any){
    let split = film.url.split('/');
    let filmId = split[split.length-2];
    this.router.navigateByUrl(`/filme-detalhe/${filmId}`);
  }
}
