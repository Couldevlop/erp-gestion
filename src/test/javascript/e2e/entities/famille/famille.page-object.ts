import { element, by, ElementFinder } from 'protractor';

export class FamilleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-famille div table .btn-danger'));
  title = element.all(by.css('jhi-famille div h2#page-heading span')).first();
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

export class FamilleUpdatePage {
  pageTitle = element(by.id('jhi-famille-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idFamilleInput = element(by.id('field_idFamille'));
  nomFamilleInput = element(by.id('field_nomFamille'));
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

  async setIdFamilleInput(idFamille: string): Promise<void> {
    await this.idFamilleInput.sendKeys(idFamille);
  }

  async getIdFamilleInput(): Promise<string> {
    return await this.idFamilleInput.getAttribute('value');
  }

  async setNomFamilleInput(nomFamille: string): Promise<void> {
    await this.nomFamilleInput.sendKeys(nomFamille);
  }

  async getNomFamilleInput(): Promise<string> {
    return await this.nomFamilleInput.getAttribute('value');
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

export class FamilleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-famille-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-famille'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
