import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IArticle, Article } from '../article.model';
import { ArticleService } from '../service/article.service';
import { IFamille } from 'app/entities/famille/famille.model';
import { FamilleService } from 'app/entities/famille/service/famille.service';
import { IInventaire } from 'app/entities/inventaire/inventaire.model';
import { InventaireService } from 'app/entities/inventaire/service/inventaire.service';
import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur/service/fournisseur.service';
import { ICommande } from 'app/entities/commande/commande.model';
import { CommandeService } from 'app/entities/commande/service/commande.service';

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html',
})
export class ArticleUpdateComponent implements OnInit {
  isSaving = false;

  famillesCollection: IFamille[] = [];
  inventairesSharedCollection: IInventaire[] = [];
  fournisseursSharedCollection: IFournisseur[] = [];
  commandesSharedCollection: ICommande[] = [];

  editForm = this.fb.group({
    id: [],
    idArticle: [],
    nomArticle: [],
    rayon: [],
    rayonnier: [],
    description: [],
    quantite: [],
    pu: [],
    famille: [],
    inventaire: [],
    fournisseur: [],
    commande: [],
  });

  constructor(
    protected articleService: ArticleService,
    protected familleService: FamilleService,
    protected inventaireService: InventaireService,
    protected fournisseurService: FournisseurService,
    protected commandeService: CommandeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  trackFamilleById(index: number, item: IFamille): number {
    return item.id!;
  }

  trackInventaireById(index: number, item: IInventaire): number {
    return item.id!;
  }

  trackFournisseurById(index: number, item: IFournisseur): number {
    return item.id!;
  }

  trackCommandeById(index: number, item: ICommande): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>): void {
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

  protected updateForm(article: IArticle): void {
    this.editForm.patchValue({
      id: article.id,
      idArticle: article.idArticle,
      nomArticle: article.nomArticle,
      rayon: article.rayon,
      rayonnier: article.rayonnier,
      description: article.description,
      quantite: article.quantite,
      pu: article.pu,
      famille: article.famille,
      inventaire: article.inventaire,
      fournisseur: article.fournisseur,
      commande: article.commande,
    });

    this.famillesCollection = this.familleService.addFamilleToCollectionIfMissing(this.famillesCollection, article.famille);
    this.inventairesSharedCollection = this.inventaireService.addInventaireToCollectionIfMissing(
      this.inventairesSharedCollection,
      article.inventaire
    );
    this.fournisseursSharedCollection = this.fournisseurService.addFournisseurToCollectionIfMissing(
      this.fournisseursSharedCollection,
      article.fournisseur
    );
    this.commandesSharedCollection = this.commandeService.addCommandeToCollectionIfMissing(
      this.commandesSharedCollection,
      article.commande
    );
  }

  protected loadRelationshipsOptions(): void {
    this.familleService
      .query({ filter: 'article-is-null' })
      .pipe(map((res: HttpResponse<IFamille[]>) => res.body ?? []))
      .pipe(
        map((familles: IFamille[]) => this.familleService.addFamilleToCollectionIfMissing(familles, this.editForm.get('famille')!.value))
      )
      .subscribe((familles: IFamille[]) => (this.famillesCollection = familles));

    this.inventaireService
      .query()
      .pipe(map((res: HttpResponse<IInventaire[]>) => res.body ?? []))
      .pipe(
        map((inventaires: IInventaire[]) =>
          this.inventaireService.addInventaireToCollectionIfMissing(inventaires, this.editForm.get('inventaire')!.value)
        )
      )
      .subscribe((inventaires: IInventaire[]) => (this.inventairesSharedCollection = inventaires));

    this.fournisseurService
      .query()
      .pipe(map((res: HttpResponse<IFournisseur[]>) => res.body ?? []))
      .pipe(
        map((fournisseurs: IFournisseur[]) =>
          this.fournisseurService.addFournisseurToCollectionIfMissing(fournisseurs, this.editForm.get('fournisseur')!.value)
        )
      )
      .subscribe((fournisseurs: IFournisseur[]) => (this.fournisseursSharedCollection = fournisseurs));

    this.commandeService
      .query()
      .pipe(map((res: HttpResponse<ICommande[]>) => res.body ?? []))
      .pipe(
        map((commandes: ICommande[]) =>
          this.commandeService.addCommandeToCollectionIfMissing(commandes, this.editForm.get('commande')!.value)
        )
      )
      .subscribe((commandes: ICommande[]) => (this.commandesSharedCollection = commandes));
  }

  protected createFromForm(): IArticle {
    return {
      ...new Article(),
      id: this.editForm.get(['id'])!.value,
      idArticle: this.editForm.get(['idArticle'])!.value,
      nomArticle: this.editForm.get(['nomArticle'])!.value,
      rayon: this.editForm.get(['rayon'])!.value,
      rayonnier: this.editForm.get(['rayonnier'])!.value,
      description: this.editForm.get(['description'])!.value,
      quantite: this.editForm.get(['quantite'])!.value,
      pu: this.editForm.get(['pu'])!.value,
      famille: this.editForm.get(['famille'])!.value,
      inventaire: this.editForm.get(['inventaire'])!.value,
      fournisseur: this.editForm.get(['fournisseur'])!.value,
      commande: this.editForm.get(['commande'])!.value,
    };
  }
}
