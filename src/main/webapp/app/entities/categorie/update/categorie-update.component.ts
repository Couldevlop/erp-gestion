import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICategorie, Categorie } from '../categorie.model';
import { CategorieService } from '../service/categorie.service';
import { IArticle } from 'app/entities/article/article.model';
import { ArticleService } from 'app/entities/article/service/article.service';

@Component({
  selector: 'jhi-categorie-update',
  templateUrl: './categorie-update.component.html',
})
export class CategorieUpdateComponent implements OnInit {
  isSaving = false;

  articlesSharedCollection: IArticle[] = [];

  editForm = this.fb.group({
    id: [],
    idCategorie: [],
    nomCategorie: [],
    article: [],
  });

  constructor(
    protected categorieService: CategorieService,
    protected articleService: ArticleService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorie }) => {
      this.updateForm(categorie);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categorie = this.createFromForm();
    if (categorie.id !== undefined) {
      this.subscribeToSaveResponse(this.categorieService.update(categorie));
    } else {
      this.subscribeToSaveResponse(this.categorieService.create(categorie));
    }
  }

  trackArticleById(index: number, item: IArticle): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategorie>>): void {
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

  protected updateForm(categorie: ICategorie): void {
    this.editForm.patchValue({
      id: categorie.id,
      idCategorie: categorie.idCategorie,
      nomCategorie: categorie.nomCategorie,
      article: categorie.article,
    });

    this.articlesSharedCollection = this.articleService.addArticleToCollectionIfMissing(this.articlesSharedCollection, categorie.article);
  }

  protected loadRelationshipsOptions(): void {
    this.articleService
      .query()
      .pipe(map((res: HttpResponse<IArticle[]>) => res.body ?? []))
      .pipe(
        map((articles: IArticle[]) => this.articleService.addArticleToCollectionIfMissing(articles, this.editForm.get('article')!.value))
      )
      .subscribe((articles: IArticle[]) => (this.articlesSharedCollection = articles));
  }

  protected createFromForm(): ICategorie {
    return {
      ...new Categorie(),
      id: this.editForm.get(['id'])!.value,
      idCategorie: this.editForm.get(['idCategorie'])!.value,
      nomCategorie: this.editForm.get(['nomCategorie'])!.value,
      article: this.editForm.get(['article'])!.value,
    };
  }
}
