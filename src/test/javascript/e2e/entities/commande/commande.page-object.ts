import { element, by, ElementFinder } from 'protractor';

export class CommandeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-commande div table .btn-danger'));
  title = element.all(by.css('jhi-commande div h2#page-heading span')).first();
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

export class CommandeUpdatePage {
  pageTitle = element(by.id('jhi-commande-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idCommandeInput = element(by.id('field_idCommande'));
  qteInput = element(by.id('field_qte'));
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

  async setIdCommandeInput(idCommande: string): Promise<void> {
    await this.idCommandeInput.sendKeys(idCommande);
  }

  async getIdCommandeInput(): Promise<string> {
    return await this.idCommandeInput.getAttribute('value');
  }

  async setQteInput(qte: string): Promise<void> {
    await this.qteInput.sendKeys(qte);
  }

  async getQteInput(): Promise<string> {
    return await this.qteInput.getAttribute('value');
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

export class CommandeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-commande-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-commande'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
