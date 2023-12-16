import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';
import { NgForm } from '@angular/forms';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  //nouveauProduit: Produit = new Produit();
  produits: Array<Produit> = [];
  categories: Array<Categorie> = [];
  produitsExistant: Produit[] = [];
  produitCourant = new Produit();
  nouveauProduit: Produit = new Produit();
  categorieCourant = new Categorie();



  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    this.recupererProduitsExistant();
   this.consulterCategories();
  }
  consulterCategories() {
    console.log("Récupérer la liste des categories");
    this.produitsService.getCategorie().subscribe({
      next: data => {
        console.log("Succès GET");
        this.categories = data;
      },
      error: err => {
        console.log("Erreur GET");
      }
    });
  }

  recupererProduitsExistant() {
    this.produitsService.getProduits().subscribe({
      next: produits => {
        this.produitsExistant = produits;
        console.log('Liste des produits existants :', this.produitsExistant);
      },
      error: err => {
        console.error('Erreur lors de la récupération des produits existants :', err);
      }
    });
  }
  validerFormulaire() {
    if (this.nouveauProduit.id) {
      alert(" produit déjà existant");
    } else {
      this.ajouterProduit(this.nouveauProduit);
    }
  }
  

  produitExiste(id: number): boolean {
    return this.produitsExistant.some(produit => produit.id === id);
  }

  ajouterProduit(produit: Produit) {
    this.produitsService.addProduit(produit).subscribe({
      next: addedProduit => {
        console.log("Succès de l'ajout du produit :", addedProduit);
        this.nouveauProduit = new Produit();
        this.recupererProduitsExistant(); // Mettre à jour la liste des produits existants
      },
      error: err => {
        console.error("Erreur lors de l'ajout du produit :", err);
      }
    });
  }
  
}
