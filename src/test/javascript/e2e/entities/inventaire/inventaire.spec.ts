import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InventaireComponentsPage, InventaireDeleteDialog, InventaireUpdatePage } from './inventaire.page-object';

const expect = chai.expect;

describe('Inventaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inventaireComponentsPage: InventaireComponentsPage;
  let inventaireUpdatePage: InventaireUpdatePage;
  let inventaireDeleteDialog: InventaireDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Inventaires', async () => {
    await navBarPage.goToEntity('inventaire');
    inventaireComponentsPage = new InventaireComponentsPage();
    await browser.wait(ec.visibilityOf(inventaireComponentsPage.title), 5000);
    expect(await inventaireComponentsPage.getTitle()).to.eq('erpgestionApp.inventaire.home.title');
    await browser.wait(ec.or(ec.visibilityOf(inventaireComponentsPage.entities), ec.visibilityOf(inventaireComponentsPage.noResult)), 1000);
  });

  it('should load create Inventaire page', async () => {
    await inventaireComponentsPage.clickOnCreateButton();
    inventaireUpdatePage = new InventaireUpdatePage();
    expect(await inventaireUpdatePage.getPageTitle()).to.eq('erpgestionApp.inventaire.home.createOrEditLabel');
    await inventaireUpdatePage.cancel();
  });

  it('should create and save Inventaires', async () => {
    const nbButtonsBeforeCreate = await inventaireComponentsPage.countDeleteButtons();

    await inventaireComponentsPage.clickOnCreateButton();

    await promise.all([
      inventaireUpdatePage.setIdInventaireInput('5'),
      inventaireUpdatePage.setDateInvInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      inventaireUpdatePage.setDescriptionInput('description'),
    ]);

    await inventaireUpdatePage.save();
    expect(await inventaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await inventaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Inventaire', async () => {
    const nbButtonsBeforeDelete = await inventaireComponentsPage.countDeleteButtons();
    await inventaireComponentsPage.clickOnLastDeleteButton();

    inventaireDeleteDialog = new InventaireDeleteDialog();
    expect(await inventaireDeleteDialog.getDialogTitle()).to.eq('erpgestionApp.inventaire.delete.question');
    await inventaireDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(inventaireComponentsPage.title), 5000);

    expect(await inventaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
