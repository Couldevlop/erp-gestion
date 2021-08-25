import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'categorie',
        data: { pageTitle: 'erpgestionApp.categorie.home.title' },
        loadChildren: () => import('./categorie/categorie.module').then(m => m.CategorieModule),
      },
      {
        path: 'fournisseur',
        data: { pageTitle: 'erpgestionApp.fournisseur.home.title' },
        loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.FournisseurModule),
      },
      {
        path: 'article',
        data: { pageTitle: 'erpgestionApp.article.home.title' },
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
      },
      {
        path: 'famille',
        data: { pageTitle: 'erpgestionApp.famille.home.title' },
        loadChildren: () => import('./famille/famille.module').then(m => m.FamilleModule),
      },
      {
        path: 'sous-famille',
        data: { pageTitle: 'erpgestionApp.sousFamille.home.title' },
        loadChildren: () => import('./sous-famille/sous-famille.module').then(m => m.SousFamilleModule),
      },
      {
        path: 'commande',
        data: { pageTitle: 'erpgestionApp.commande.home.title' },
        loadChildren: () => import('./commande/commande.module').then(m => m.CommandeModule),
      },
      {
        path: 'inventaire',
        data: { pageTitle: 'erpgestionApp.inventaire.home.title' },
        loadChildren: () => import('./inventaire/inventaire.module').then(m => m.InventaireModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
