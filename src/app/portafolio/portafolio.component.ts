import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  repositorios: any[] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.obtenerRepositorios();
  }

  obtenerRepositorios() {
    this.httpClient.get<any[]>('https://api.github.com/users/gOlivera26/repos')
      .subscribe(repos => {
        this.repositorios = repos;
        console.log(repos); 
      });
  }
  openInNewTab(url: string, event: MouseEvent) {
    event.preventDefault();
    window.open(url, '_blank');
  }

}
