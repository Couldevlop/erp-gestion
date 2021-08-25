import { IArticle } from 'app/entities/article/article.model';

export interface IFournisseur {
  id?: number;
  idFournisseur?: number | null;
  nomFournisseur?: string | null;
  raisonSociale?: string | null;
  telephone?: string | null;
  adresse?: string | null;
  fourArticles?: IArticle[] | null;
}

export class Fournisseur implements IFournisseur {
  constructor(
    public id?: number,
    public idFournisseur?: number | null,
    public nomFournisseur?: string | null,
    public raisonSociale?: string | null,
    public telephone?: string | null,
    public adresse?: string | null,
    public fourArticles?: IArticle[] | null
  ) {}
}

export function getFournisseurIdentifier(fournisseur: IFournisseur): number | undefined {
  return fournisseur.id;
}
