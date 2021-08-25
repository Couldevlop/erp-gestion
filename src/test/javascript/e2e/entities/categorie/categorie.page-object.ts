import { element, by, ElementFinder } from 'protractor';

export class CategorieComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-categorie div table .btn-danger'));
  title = element.all(by.css('jhi-categorie div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CategorieUpdatePage {
  pageTitle = element(by.id('jhi-categorie-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idCategorieInput = element(by.id('field_idCategorie'));
  nomCategorieInput = element(by.id('field_nomCategorie'));

  articleSelect = element(by.id('field_article'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdCategorieInput(idCategorie: string): Promise<void> {
    await this.idCategorieInput.sendKeys(idCategorie);
  }

  async getIdCategorieInput(): Promise<string> {
    return await this.idCategorieInput.getAttribute('value');
  }

  async setNomCategorieInput(nomCategorie: string): Promise<void> {
    await this.nomCategorieInput.sendKeys(nomCategorie);
  }

  async getNomCategorieInput(): Promise<string> {
    return await this.nomCategorieInput.getAttribute('value');
  }

  async articleSelectLastOption(): Promise<void> {
    await this.articleSelect.all(by.tagName('option')).last().click();
  }

  async articleSelectOption(option: string): Promise<void> {
    await this.articleSelect.sendKeys(option);
  }

  getArticleSelect(): ElementFinder {
    return this.articleSelect;
  }

  async getArticleSelectedOption(): Promise<string> {
    return await this.articleSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CategorieDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-categorie-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-categorie'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
