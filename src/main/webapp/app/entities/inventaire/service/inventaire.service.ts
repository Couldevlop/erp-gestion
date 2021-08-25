import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInventaire, getInventaireIdentifier } from '../inventaire.model';

export type EntityResponseType = HttpResponse<IInventaire>;
export type EntityArrayResponseType = HttpResponse<IInventaire[]>;

@Injectable({ providedIn: 'root' })
export class InventaireService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/inventaires');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(inventaire: IInventaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inventaire);
    return this.http
      .post<IInventaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inventaire: IInventaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inventaire);
    return this.http
      .put<IInventaire>(`${this.resourceUrl}/${getInventaireIdentifier(inventaire) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(inventaire: IInventaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inventaire);
    return this.http
      .patch<IInventaire>(`${this.resourceUrl}/${getInventaireIdentifier(inventaire) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInventaire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInventaire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInventaireToCollectionIfMissing(
    inventaireCollection: IInventaire[],
    ...inventairesToCheck: (IInventaire | null | undefined)[]
  ): IInventaire[] {
    const inventaires: IInventaire[] = inventairesToCheck.filter(isPresent);
    if (inventaires.length > 0) {
      const inventaireCollectionIdentifiers = inventaireCollection.map(inventaireItem => getInventaireIdentifier(inventaireItem)!);
      const inventairesToAdd = inventaires.filter(inventaireItem => {
        const inventaireIdentifier = getInventaireIdentifier(inventaireItem);
        if (inventaireIdentifier == null || inventaireCollectionIdentifiers.includes(inventaireIdentifier)) {
          return false;
        }
        inventaireCollectionIdentifiers.push(inventaireIdentifier);
        return true;
      });
      return [...inventairesToAdd, ...inventaireCollection];
    }
    return inventaireCollection;
  }

  protected convertDateFromClient(inventaire: IInventaire): IInventaire {
    return Object.assign({}, inventaire, {
      dateInv: inventaire.dateInv?.isValid() ? inventaire.dateInv.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateInv = res.body.dateInv ? dayjs(res.body.dateInv) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((inventaire: IInventaire) => {
        inventaire.dateInv = inventaire.dateInv ? dayjs(inventaire.dateInv) : undefined;
      });
    }
    return res;
  }
}
