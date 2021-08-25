import { IFamille } from 'app/entities/famille/famille.model';

export interface ISousFamille {
  id?: number;
  idSousFamille?: number | null;
  nomSousFamille?: string | null;
  description?: string | null;
  stateProvince?: string | null;
  famille?: IFamille | null;
}

export class SousFamille implements ISousFamille {
  constructor(
    public id?: number,
    public idSousFamille?: number | null,
    public nomSousFamille?: string | null,
    public description?: string | null,
    public stateProvince?: string | null,
    public famille?: IFamille | null
  ) {}
}

export function getSousFamilleIdentifier(sousFamille: ISousFamille): number | undefined {
  return sousFamille.id;
}
