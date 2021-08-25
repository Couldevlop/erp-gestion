import { IFamille } from 'app/entities/famille/famille.model';
import { ICategorie } from 'app/entities/categorie/categorie.model';
import { IInventaire } from 'app/entities/inventaire/inventaire.model';
import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { ICommande } from 'app/entities/commande/commande.model';

export interface IArticle {
  id?: number;
  idArticle?: number | null;
  nomArticle?: string | null;
  rayon?: string | null;
  rayonnier?: string | null;
  description?: string | null;
  quantite?: number | null;
  pu?: number | null;
  famille?: IFamille | null;
  categories?: ICategorie[] | null;
  inventaire?: IInventaire | null;
  fournisseur?: IFournisseur | null;
  commande?: ICommande | null;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public idArticle?: number | null,
    public nomArticle?: string | null,
    public rayon?: string | null,
    public rayonnier?: string | null,
    public description?: string | null,
    public quantite?: number | null,
    public pu?: number | null,
    public famille?: IFamille | null,
    public categories?: ICategorie[] | null,
    public inventaire?: IInventaire | null,
    public fournisseur?: IFournisseur | null,
    public commande?: ICommande | null
  ) {}
}

export function getArticleIdentifier(article: IArticle): number | undefined {
  return article.id;
}
