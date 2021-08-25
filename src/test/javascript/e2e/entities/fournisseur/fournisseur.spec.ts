import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FournisseurComponentsPage, FournisseurDeleteDialog, FournisseurUpdatePage } from './fournisseur.page-object';

const expect = chai.expect;

describe('Fournisseur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fournisseurComponentsPage: FournisseurComponentsPage;
  let fournisseurUpdatePage: FournisseurUpdatePage;
  let fournisseurDeleteDialog: FournisseurDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Fournisseurs', async () => {
    await navBarPage.goToEntity('fournisseur');
    fournisseurComponentsPage = new FournisseurComponentsPage();
    await browser.wait(ec.visibilityOf(fournisseurComponentsPage.title), 5000);
    expect(await fournisseurComponentsPage.getTitle()).to.eq('erpgestionApp.fournisseur.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(fournisseurComponentsPage.entities), ec.visibilityOf(fournisseurComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Fournisseur page', async () => {
    await fournisseurComponentsPage.clickOnCreateButton();
    fournisseurUpdatePage = new FournisseurUpdatePage();
    expect(await fournisseurUpdatePage.getPageTitle()).to.eq('erpgestionApp.fournisseur.home.createOrEditLabel');
    await fournisseurUpdatePage.cancel();
  });

  it('should create and save Fournisseurs', async () => {
    const nbButtonsBeforeCreate = await fournisseurComponentsPage.countDeleteButtons();

    await fournisseurComponentsPage.clickOnCreateButton();

    await promise.all([
      fournisseurUpdatePage.setIdFournisseurInput('5'),
      fournisseurUpdatePage.setNomFournisseurInput('nomFournisseur'),
      fournisseurUpdatePage.setRaisonSocialeInput('raisonSociale'),
      fournisseurUpdatePage.setTelephoneInput('telephone'),
      fournisseurUpdatePage.setAdresseInput('adresse'),
    ]);

    await fournisseurUpdatePage.save();
    expect(await fournisseurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fournisseurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Fournisseur', async () => {
    const nbButtonsBeforeDelete = await fournisseurComponentsPage.countDeleteButtons();
    await fournisseurComponentsPage.clickOnLastDeleteButton();

    fournisseurDeleteDialog = new FournisseurDeleteDialog();
    expect(await fournisseurDeleteDialog.getDialogTitle()).to.eq('erpgestionApp.fournisseur.delete.question');
    await fournisseurDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(fournisseurComponentsPage.title), 5000);

    expect(await fournisseurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
