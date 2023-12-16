import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: Array<Produit> = [];

categories:Array<Categorie> =[];
  categorieCourant = new Categorie();
  produitCourant = new Produit();
  afficherFormulaire = false;


  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    console.log("Initialisation du composant:.....");
    this.consulterProduits();
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

  afficherFormulaire1() {
    this.afficherFormulaire = true;
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits().subscribe({
      next: data => {
        console.log("Succès GET");
        this.produits = data;
      },
      error: err => {
        console.log("Erreur GET");
      }
    });
  }

  editerProduit(nouveau: Produit, ancien: Produit) {
    ancien.id = nouveau.id;
    ancien.code = nouveau.code;
    ancien.designation = nouveau.designation;
    ancien.prix = nouveau.prix;

    let reponse: boolean = confirm("Produit existant. Confirmez-vous la mise à jour de :" + ancien.designation + " ?");

    if (reponse === true) {
      this.afficherFormulaire1();
      this.produitsService.updateProduit(nouveau.id, ancien).subscribe({
        next: updatedProduit => {
          console.log("Succès PUT");
          console.log('Mise à jour du produit : ' + ancien.designation);
          this.produitsService.getProduits().subscribe(data => (this.produits = data));
        },
        error: err => {
          console.log("Erreur PUT");
        }
      });
    } else {
      console.log("Mise à jour annulée");
    }
  }
  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    this.produitsService.updateProduit(nouveau.id, nouveau).subscribe({
      next: updatedProduit => {
        console.log("Succès PUT");
        Object.assign(ancien, nouveau);
        console.log('Mise à jour du produit : ' + ancien.designation);
      },
      error: err => {
        console.error("Erreur PUT:", err);
      }
    });
  }

    
  validerFormulaire(produitForm: any) {
    if (produitForm.value.id !== undefined) {
      console.log("ID non vide...");
      const existingProduct = this.produits.find(p => p.id === produitForm.value.id);

      if (existingProduct) {
        const confirmation = confirm("Produit existant. Confirmez-vous la mise à jour de : " + existingProduct.designation + "?");

        if (confirmation) {
          this.mettreAJourProduit(produitForm.value, existingProduct);
        } else {
          console.log("Mise à jour annulée");
        }
        return;
      }
    }
  }

    supprimerProduit(produit: Produit) {
      const confirmation = confirm("Voulez-vous supprimer le produit : " + produit.designation + " ?");
      if (confirmation) {
        this.produitsService.deleteProduit(produit.id).subscribe({
          next: deletedProduit => {
            console.log("Succès DELETE", deletedProduit);
    
            // Filtrer la liste des produits pour exclure le produit supprimé
            this.produits = this.produits.filter(p => p.id !== produit.id);
    
            // Vérifier que la liste des produits a été correctement mise à jour
            console.log("Liste des produits après suppression :", this.produits);
          },
          error: err => {
            console.error("Erreur DELETE:", err);
          }
        });
      }
    }
  }