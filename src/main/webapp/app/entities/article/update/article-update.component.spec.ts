jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ArticleService } from '../service/article.service';
import { IArticle, Article } from '../article.model';
import { IFamille } from 'app/entities/famille/famille.model';
import { FamilleService } from 'app/entities/famille/service/famille.service';
import { IInventaire } from 'app/entities/inventaire/inventaire.model';
import { InventaireService } from 'app/entities/inventaire/service/inventaire.service';
import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur/service/fournisseur.service';
import { ICommande } from 'app/entities/commande/commande.model';
import { CommandeService } from 'app/entities/commande/service/commande.service';

import { ArticleUpdateComponent } from './article-update.component';

describe('Component Tests', () => {
  describe('Article Management Update Component', () => {
    let comp: ArticleUpdateComponent;
    let fixture: ComponentFixture<ArticleUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let articleService: ArticleService;
    let familleService: FamilleService;
    let inventaireService: InventaireService;
    let fournisseurService: FournisseurService;
    let commandeService: CommandeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ArticleUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ArticleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      articleService = TestBed.inject(ArticleService);
      familleService = TestBed.inject(FamilleService);
      inventaireService = TestBed.inject(InventaireService);
      fournisseurService = TestBed.inject(FournisseurService);
      commandeService = TestBed.inject(CommandeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call famille query and add missing value', () => {
        const article: IArticle = { id: 456 };
        const famille: IFamille = { id: 58635 };
        article.famille = famille;

        const familleCollection: IFamille[] = [{ id: 83439 }];
        jest.spyOn(familleService, 'query').mockReturnValue(of(new HttpResponse({ body: familleCollection })));
        const expectedCollection: IFamille[] = [famille, ...familleCollection];
        jest.spyOn(familleService, 'addFamilleToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ article });
        comp.ngOnInit();

        expect(familleService.query).toHaveBeenCalled();
        expect(familleService.addFamilleToCollectionIfMissing).toHaveBeenCalledWith(familleCollection, famille);
        expect(comp.famillesCollection).toEqual(expectedCollection);
      });

      it('Should call Inventaire query and add missing value', () => {
        const article: IArticle = { id: 456 };
        const inventaire: IInventaire = { id: 1362 };
        article.inventaire = inventaire;

        const inventaireCollection: IInventaire[] = [{ id: 23667 }];
        jest.spyOn(inventaireService, 'query').mockReturnValue(of(new HttpResponse({ body: inventaireCollection })));
        const additionalInventaires = [inventaire];
        const expectedCollection: IInventaire[] = [...additionalInventaires, ...inventaireCollection];
        jest.spyOn(inventaireService, 'addInventaireToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ article });
        comp.ngOnInit();

        expect(inventaireService.query).toHaveBeenCalled();
        expect(inventaireService.addInventaireToCollectionIfMissing).toHaveBeenCalledWith(inventaireCollection, ...additionalInventaires);
        expect(comp.inventairesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Fournisseur query and add missing value', () => {
        const article: IArticle = { id: 456 };
        const fournisseur: IFournisseur = { id: 2925 };
        article.fournisseur = fournisseur;

        const fournisseurCollection: IFournisseur[] = [{ id: 39983 }];
        jest.spyOn(fournisseurService, 'query').mockReturnValue(of(new HttpResponse({ body: fournisseurCollection })));
        const additionalFournisseurs = [fournisseur];
        const expectedCollection: IFournisseur[] = [...additionalFournisseurs, ...fournisseurCollection];
        jest.spyOn(fournisseurService, 'addFournisseurToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ article });
        comp.ngOnInit();

        expect(fournisseurService.query).toHaveBeenCalled();
        expect(fournisseurService.addFournisseurToCollectionIfMissing).toHaveBeenCalledWith(
          fournisseurCollection,
          ...additionalFournisseurs
        );
        expect(comp.fournisseursSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Commande query and add missing value', () => {
        const article: IArticle = { id: 456 };
        const commande: ICommande = { id: 87605 };
        article.commande = commande;

        const commandeCollection: ICommande[] = [{ id: 25533 }];
        jest.spyOn(commandeService, 'query').mockReturnValue(of(new HttpResponse({ body: commandeCollection })));
        const additionalCommandes = [commande];
        const expectedCollection: ICommande[] = [...additionalCommandes, ...commandeCollection];
        jest.spyOn(commandeService, 'addCommandeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ article });
        comp.ngOnInit();

        expect(commandeService.query).toHaveBeenCalled();
        expect(commandeService.addCommandeToCollectionIfMissing).toHaveBeenCalledWith(commandeCollection, ...additionalCommandes);
        expect(comp.commandesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const article: IArticle = { id: 456 };
        const famille: IFamille = { id: 96382 };
        article.famille = famille;
        const inventaire: IInventaire = { id: 31539 };
        article.inventaire = inventaire;
        const fournisseur: IFournisseur = { id: 79400 };
        article.fournisseur = fournisseur;
        const commande: ICommande = { id: 38101 };
        article.commande = commande;

        activatedRoute.data = of({ article });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(article));
        expect(comp.famillesCollection).toContain(famille);
        expect(comp.inventairesSharedCollection).toContain(inventaire);
        expect(comp.fournisseursSharedCollection).toContain(fournisseur);
        expect(comp.commandesSharedCollection).toContain(commande);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Article>>();
        const article = { id: 123 };
        jest.spyOn(articleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ article });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: article }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(articleService.update).toHaveBeenCalledWith(article);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Article>>();
        const article = new Article();
        jest.spyOn(articleService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ article });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: article }));
        saveSubject.complete();

        // THEN
        expect(articleService.create).toHaveBeenCalledWith(article);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Article>>();
        const article = { id: 123 };
        jest.spyOn(articleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ article });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(articleService.update).toHaveBeenCalledWith(article);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackFamilleById', () => {
        it('Should return tracked Famille primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackFamilleById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackInventaireById', () => {
        it('Should return tracked Inventaire primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackInventaireById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackFournisseurById', () => {
        it('Should return tracked Fournisseur primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackFournisseurById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackCommandeById', () => {
        it('Should return tracked Commande primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCommandeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
