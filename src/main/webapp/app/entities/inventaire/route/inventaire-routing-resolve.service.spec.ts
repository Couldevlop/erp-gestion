jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IInventaire, Inventaire } from '../inventaire.model';
import { InventaireService } from '../service/inventaire.service';

import { InventaireRoutingResolveService } from './inventaire-routing-resolve.service';

describe('Service Tests', () => {
  describe('Inventaire routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: InventaireRoutingResolveService;
    let service: InventaireService;
    let resultInventaire: IInventaire | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(InventaireRoutingResolveService);
      service = TestBed.inject(InventaireService);
      resultInventaire = undefined;
    });

    describe('resolve', () => {
      it('should return IInventaire returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultInventaire = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultInventaire).toEqual({ id: 123 });
      });

      it('should return new IInventaire if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultInventaire = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultInventaire).toEqual(new Inventaire());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Inventaire })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultInventaire = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultInventaire).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
