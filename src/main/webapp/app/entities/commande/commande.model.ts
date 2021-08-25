import { IArticle } from 'app/entities/article/article.model';

export interface ICommande {
  id?: number;
  idCommande?: number | null;
  qte?: string | null;
  description?: string | null;
  commandeArticles?: IArticle[] | null;
}

export class Commande implements ICommande {
  constructor(
    public id?: number,
    public idCommande?: number | null,
    public qte?: string | null,
    public description?: string | null,
    public commandeArticles?: IArticle[] | null
  ) {}
}

export function getCommandeIdentifier(commande: ICommande): number | undefined {
  return commande.id;
}
