export class Categorie {
  id: number | undefined; // The unique identifier for the category
  code: string | undefined; // The name of the category
  libelle: string | undefined; // Optional description of the category

  // You can include other properties as needed

  constructor(id?: number, code?: string, libelle?: string) {
    this.id = id;
    this.code = code;
    this.libelle = libelle;
  }
}

  