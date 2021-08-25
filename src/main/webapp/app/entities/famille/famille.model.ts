import { ISousFamille } from 'app/entities/sous-famille/sous-famille.model';
import { IArticle } from 'app/entities/article/article.model';

export interface IFamille {
  id?: number;
  idFamille?: number | null;
  nomFamille?: string | null;
  description?: string | null;
  familleDeSousFamilles?: ISousFamille[] | null;
  article?: IArticle | null;
}

export class Famille implements IFamille {
  constructor(
    public id?: number,
    public idFamille?: number | null,
    public nomFamille?: string | null,
    public description?: string | null,
    public familleDeSousFamilles?: ISousFamille[] | null,
    public article?: IArticle | null
  ) {}
}

export function getFamilleIdentifier(famille: IFamille): number | undefined {
  return famille.id;
}
