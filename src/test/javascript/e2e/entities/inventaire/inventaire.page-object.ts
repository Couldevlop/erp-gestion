import { element, by, ElementFinder } from 'protractor';

export class InventaireComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-inventaire div table .btn-danger'));
  title = element.all(by.css('jhi-inventaire div h2#page-heading span')).first();
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

export class InventaireUpdatePage {
  pageTitle = element(by.id('jhi-inventaire-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idInventaireInput = element(by.id('field_idInventaire'));
  dateInvInput = element(by.id('field_dateInv'));
  descriptionInput = element(by.id('field_description'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdInventaireInput(idInventaire: string): Promise<void> {
    await this.idInventaireInput.sendKeys(idInventaire);
  }

  async getIdInventaireInput(): Promise<string> {
    return await this.idInventaireInput.getAttribute('value');
  }

  async setDateInvInput(dateInv: string): Promise<void> {
    await this.dateInvInput.sendKeys(dateInv);
  }

  async getDateInvInput(): Promise<string> {
    return await this.dateInvInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
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

export class InventaireDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-inventaire-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-inventaire'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
