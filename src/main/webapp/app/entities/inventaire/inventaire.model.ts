import * as dayjs from 'dayjs';
import { IArticle } from 'app/entities/article/article.model';

export interface IInventaire {
  id?: number;
  idInventaire?: number | null;
  dateInv?: dayjs.Dayjs | null;
  description?: string | null;
  artInventes?: IArticle[] | null;
}

export class Inventaire implements IInventaire {
  constructor(
    public id?: number,
    public idInventaire?: number | null,
    public dateInv?: dayjs.Dayjs | null,
    public description?: string | null,
    public artInventes?: IArticle[] | null
  ) {}
}

export function getInventaireIdentifier(inventaire: IInventaire): number | undefined {
  return inventaire.id;
}
