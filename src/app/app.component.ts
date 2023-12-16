import { Component } from '@angular/core';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ng-gestion-produits';
  actions :Array<any> =[
    {title:"Acceuil",icone :"bi bi-house",route :"/acceuil" },
    {title :"list Produit",icone:"bi bi-card-checklist",route :"/produits" },
    {title :"Add Produit",icone:"bi bi-file-plus",route :"/ajouterProduit" },
  ]
  actionCourante:any ;
  setActionCourante(a :any){
    this.actionCourante=a;
  }
}
