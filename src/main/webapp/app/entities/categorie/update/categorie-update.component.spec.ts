jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CategorieService } from '../service/categorie.service';
import { ICategorie, Categorie } from '../categorie.model';
import { IArticle } from 'app/entities/article/article.model';
import { ArticleService } from 'app/entities/article/service/article.service';

import { CategorieUpdateComponent } from './categorie-update.component';

describe('Component Tests', () => {
  describe('Categorie Management Update Component', () => {
    let comp: CategorieUpdateComponent;
    let fixture: ComponentFixture<CategorieUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let categorieService: CategorieService;
    let articleService: ArticleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CategorieUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CategorieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategorieUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      categorieService = TestBed.inject(CategorieService);
      articleService = TestBed.inject(ArticleService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Article query and add missing value', () => {
        const categorie: ICategorie = { id: 456 };
        const article: IArticle = { id: 96867 };
        categorie.article = article;

        const articleCollection: IArticle[] = [{ id: 86260 }];
        jest.spyOn(articleService, 'query').mockReturnValue(of(new HttpResponse({ body: articleCollection })));
        const additionalArticles = [article];
        const expectedCollection: IArticle[] = [...additionalArticles, ...articleCollection];
        jest.spyOn(articleService, 'addArticleToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ categorie });
        comp.ngOnInit();

        expect(articleService.query).toHaveBeenCalled();
        expect(articleService.addArticleToCollectionIfMissing).toHaveBeenCalledWith(articleCollection, ...additionalArticles);
        expect(comp.articlesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const categorie: ICategorie = { id: 456 };
        const article: IArticle = { id: 49442 };
        categorie.article = article;

        activatedRoute.data = of({ categorie });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(categorie));
        expect(comp.articlesSharedCollection).toContain(article);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Categorie>>();
        const categorie = { id: 123 };
        jest.spyOn(categorieService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ categorie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: categorie }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(categorieService.update).toHaveBeenCalledWith(categorie);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Categorie>>();
        const categorie = new Categorie();
        jest.spyOn(categorieService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ categorie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: categorie }));
        saveSubject.complete();

        // THEN
        expect(categorieService.create).toHaveBeenCalledWith(categorie);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Categorie>>();
        const categorie = { id: 123 };
        jest.spyOn(categorieService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ categorie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(categorieService.update).toHaveBeenCalledWith(categorie);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackArticleById', () => {
        it('Should return tracked Article primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackArticleById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
