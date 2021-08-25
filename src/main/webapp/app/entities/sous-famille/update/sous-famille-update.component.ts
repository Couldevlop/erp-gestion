import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISousFamille, SousFamille } from '../sous-famille.model';
import { SousFamilleService } from '../service/sous-famille.service';
import { IFamille } from 'app/entities/famille/famille.model';
import { FamilleService } from 'app/entities/famille/service/famille.service';

@Component({
  selector: 'jhi-sous-famille-update',
  templateUrl: './sous-famille-update.component.html',
})
export class SousFamilleUpdateComponent implements OnInit {
  isSaving = false;

  famillesSharedCollection: IFamille[] = [];

  editForm = this.fb.group({
    id: [],
    idSousFamille: [],
    nomSousFamille: [],
    description: [],
    stateProvince: [],
    famille: [],
  });

  constructor(
    protected sousFamilleService: SousFamilleService,
    protected familleService: FamilleService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sousFamille }) => {
      this.updateForm(sousFamille);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sousFamille = this.createFromForm();
    if (sousFamille.id !== undefined) {
      this.subscribeToSaveResponse(this.sousFamilleService.update(sousFamille));
    } else {
      this.subscribeToSaveResponse(this.sousFamilleService.create(sousFamille));
    }
  }

  trackFamilleById(index: number, item: IFamille): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISousFamille>>): void {
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

  protected updateForm(sousFamille: ISousFamille): void {
    this.editForm.patchValue({
      id: sousFamille.id,
      idSousFamille: sousFamille.idSousFamille,
      nomSousFamille: sousFamille.nomSousFamille,
      description: sousFamille.description,
      stateProvince: sousFamille.stateProvince,
      famille: sousFamille.famille,
    });

    this.famillesSharedCollection = this.familleService.addFamilleToCollectionIfMissing(this.famillesSharedCollection, sousFamille.famille);
  }

  protected loadRelationshipsOptions(): void {
    this.familleService
      .query()
      .pipe(map((res: HttpResponse<IFamille[]>) => res.body ?? []))
      .pipe(
        map((familles: IFamille[]) => this.familleService.addFamilleToCollectionIfMissing(familles, this.editForm.get('famille')!.value))
      )
      .subscribe((familles: IFamille[]) => (this.famillesSharedCollection = familles));
  }

  protected createFromForm(): ISousFamille {
    return {
      ...new SousFamille(),
      id: this.editForm.get(['id'])!.value,
      idSousFamille: this.editForm.get(['idSousFamille'])!.value,
      nomSousFamille: this.editForm.get(['nomSousFamille'])!.value,
      description: this.editForm.get(['description'])!.value,
      stateProvince: this.editForm.get(['stateProvince'])!.value,
      famille: this.editForm.get(['famille'])!.value,
    };
  }
}
