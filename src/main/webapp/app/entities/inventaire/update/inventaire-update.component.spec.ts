jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { InventaireService } from '../service/inventaire.service';
import { IInventaire, Inventaire } from '../inventaire.model';

import { InventaireUpdateComponent } from './inventaire-update.component';

describe('Component Tests', () => {
  describe('Inventaire Management Update Component', () => {
    let comp: InventaireUpdateComponent;
    let fixture: ComponentFixture<InventaireUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let inventaireService: InventaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [InventaireUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(InventaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InventaireUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      inventaireService = TestBed.inject(InventaireService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const inventaire: IInventaire = { id: 456 };

        activatedRoute.data = of({ inventaire });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(inventaire));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Inventaire>>();
        const inventaire = { id: 123 };
        jest.spyOn(inventaireService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ inventaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: inventaire }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(inventaireService.update).toHaveBeenCalledWith(inventaire);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Inventaire>>();
        const inventaire = new Inventaire();
        jest.spyOn(inventaireService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ inventaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: inventaire }));
        saveSubject.complete();

        // THEN
        expect(inventaireService.create).toHaveBeenCalledWith(inventaire);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Inventaire>>();
        const inventaire = { id: 123 };
        jest.spyOn(inventaireService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ inventaire });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(inventaireService.update).toHaveBeenCalledWith(inventaire);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
