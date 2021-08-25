import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInventaire } from '../inventaire.model';
import { InventaireService } from '../service/inventaire.service';
import { InventaireDeleteDialogComponent } from '../delete/inventaire-delete-dialog.component';

@Component({
  selector: 'jhi-inventaire',
  templateUrl: './inventaire.component.html',
})
export class InventaireComponent implements OnInit {
  inventaires?: IInventaire[];
  isLoading = false;

  constructor(protected inventaireService: InventaireService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.inventaireService.query().subscribe(
      (res: HttpResponse<IInventaire[]>) => {
        this.isLoading = false;
        this.inventaires = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IInventaire): number {
    return item.id!;
  }

  delete(inventaire: IInventaire): void {
    const modalRef = this.modalService.open(InventaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inventaire = inventaire;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
