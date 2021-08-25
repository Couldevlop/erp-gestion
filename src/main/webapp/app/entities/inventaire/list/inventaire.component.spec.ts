import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { InventaireService } from '../service/inventaire.service';

import { InventaireComponent } from './inventaire.component';

describe('Component Tests', () => {
  describe('Inventaire Management Component', () => {
    let comp: InventaireComponent;
    let fixture: ComponentFixture<InventaireComponent>;
    let service: InventaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [InventaireComponent],
      })
        .overrideTemplate(InventaireComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InventaireComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(InventaireService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.inventaires?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
