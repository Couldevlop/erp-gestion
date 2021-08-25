import { IArticle } from 'app/entities/article/article.model';

export interface ICategorie {
  id?: number;
  idCategorie?: number | null;
  nomCategorie?: string | null;
  article?: IArticle | null;
}

export class Categorie implements ICategorie {
  constructor(
    public id?: number,
    public idCategorie?: number | null,
    public nomCategorie?: string | null,
    public article?: IArticle | null
  ) {}
}

export function getCategorieIdentifier(categorie: ICategorie): number | undefined {
  return categorie.id;
}
