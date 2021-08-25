import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IInventaire, Inventaire } from '../inventaire.model';
import { InventaireService } from '../service/inventaire.service';

@Component({
  selector: 'jhi-inventaire-update',
  templateUrl: './inventaire-update.component.html',
})
export class InventaireUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idInventaire: [],
    dateInv: [],
    description: [],
  });

  constructor(protected inventaireService: InventaireService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inventaire }) => {
      if (inventaire.id === undefined) {
        const today = dayjs().startOf('day');
        inventaire.dateInv = today;
      }

      this.updateForm(inventaire);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inventaire = this.createFromForm();
    if (inventaire.id !== undefined) {
      this.subscribeToSaveResponse(this.inventaireService.update(inventaire));
    } else {
      this.subscribeToSaveResponse(this.inventaireService.create(inventaire));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInventaire>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(inventaire: IInventaire): void {
    this.editForm.patchValue({
      id: inventaire.id,
      idInventaire: inventaire.idInventaire,
      dateInv: inventaire.dateInv ? inventaire.dateInv.format(DATE_TIME_FORMAT) : null,
      description: inventaire.description,
    });
  }

  protected createFromForm(): IInventaire {
    return {
      ...new Inventaire(),
      id: this.editForm.get(['id'])!.value,
      idInventaire: this.editForm.get(['idInventaire'])!.value,
      dateInv: this.editForm.get(['dateInv'])!.value ? dayjs(this.editForm.get(['dateInv'])!.value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
