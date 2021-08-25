import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CategorieComponentsPage, CategorieDeleteDialog, CategorieUpdatePage } from './categorie.page-object';

const expect = chai.expect;

describe('Categorie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let categorieComponentsPage: CategorieComponentsPage;
  let categorieUpdatePage: CategorieUpdatePage;
  let categorieDeleteDialog: CategorieDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Categories', async () => {
    await navBarPage.goToEntity('categorie');
    categorieComponentsPage = new CategorieComponentsPage();
    await browser.wait(ec.visibilityOf(categorieComponentsPage.title), 5000);
    expect(await categorieComponentsPage.getTitle()).to.eq('erpgestionApp.categorie.home.title');
    await browser.wait(ec.or(ec.visibilityOf(categorieComponentsPage.entities), ec.visibilityOf(categorieComponentsPage.noResult)), 1000);
  });

  it('should load create Categorie page', async () => {
    await categorieComponentsPage.clickOnCreateButton();
    categorieUpdatePage = new CategorieUpdatePage();
    expect(await categorieUpdatePage.getPageTitle()).to.eq('erpgestionApp.categorie.home.createOrEditLabel');
    await categorieUpdatePage.cancel();
  });

  it('should create and save Categories', async () => {
    const nbButtonsBeforeCreate = await categorieComponentsPage.countDeleteButtons();

    await categorieComponentsPage.clickOnCreateButton();

    await promise.all([
      categorieUpdatePage.setIdCategorieInput('5'),
      categorieUpdatePage.setNomCategorieInput('nomCategorie'),
      categorieUpdatePage.articleSelectLastOption(),
    ]);

    await categorieUpdatePage.save();
    expect(await categorieUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await categorieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Categorie', async () => {
    const nbButtonsBeforeDelete = await categorieComponentsPage.countDeleteButtons();
    await categorieComponentsPage.clickOnLastDeleteButton();

    categorieDeleteDialog = new CategorieDeleteDialog();
    expect(await categorieDeleteDialog.getDialogTitle()).to.eq('erpgestionApp.categorie.delete.question');
    await categorieDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(categorieComponentsPage.title), 5000);

    expect(await categorieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
