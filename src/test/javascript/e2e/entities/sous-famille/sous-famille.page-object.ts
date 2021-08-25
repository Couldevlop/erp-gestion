import { element, by, ElementFinder } from 'protractor';

export class SousFamilleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sous-famille div table .btn-danger'));
  title = element.all(by.css('jhi-sous-famille div h2#page-heading span')).first();
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

export class SousFamilleUpdatePage {
  pageTitle = element(by.id('jhi-sous-famille-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idSousFamilleInput = element(by.id('field_idSousFamille'));
  nomSousFamilleInput = element(by.id('field_nomSousFamille'));
  descriptionInput = element(by.id('field_description'));
  stateProvinceInput = element(by.id('field_stateProvince'));

  familleSelect = element(by.id('field_famille'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdSousFamilleInput(idSousFamille: string): Promise<void> {
    await this.idSousFamilleInput.sendKeys(idSousFamille);
  }

  async getIdSousFamilleInput(): Promise<string> {
    return await this.idSousFamilleInput.getAttribute('value');
  }

  async setNomSousFamilleInput(nomSousFamille: string): Promise<void> {
    await this.nomSousFamilleInput.sendKeys(nomSousFamille);
  }

  async getNomSousFamilleInput(): Promise<string> {
    return await this.nomSousFamilleInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setStateProvinceInput(stateProvince: string): Promise<void> {
    await this.stateProvinceInput.sendKeys(stateProvince);
  }

  async getStateProvinceInput(): Promise<string> {
    return await this.stateProvinceInput.getAttribute('value');
  }

  async familleSelectLastOption(): Promise<void> {
    await this.familleSelect.all(by.tagName('option')).last().click();
  }

  async familleSelectOption(option: string): Promise<void> {
    await this.familleSelect.sendKeys(option);
  }

  getFamilleSelect(): ElementFinder {
    return this.familleSelect;
  }

  async getFamilleSelectedOption(): Promise<string> {
    return await this.familleSelect.element(by.css('option:checked')).getText();
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

export class SousFamilleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sousFamille-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sousFamille'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
