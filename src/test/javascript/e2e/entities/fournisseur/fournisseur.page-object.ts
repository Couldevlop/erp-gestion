import { element, by, ElementFinder } from 'protractor';

export class FournisseurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fournisseur div table .btn-danger'));
  title = element.all(by.css('jhi-fournisseur div h2#page-heading span')).first();
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

export class FournisseurUpdatePage {
  pageTitle = element(by.id('jhi-fournisseur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idFournisseurInput = element(by.id('field_idFournisseur'));
  nomFournisseurInput = element(by.id('field_nomFournisseur'));
  raisonSocialeInput = element(by.id('field_raisonSociale'));
  telephoneInput = element(by.id('field_telephone'));
  adresseInput = element(by.id('field_adresse'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdFournisseurInput(idFournisseur: string): Promise<void> {
    await this.idFournisseurInput.sendKeys(idFournisseur);
  }

  async getIdFournisseurInput(): Promise<string> {
    return await this.idFournisseurInput.getAttribute('value');
  }

  async setNomFournisseurInput(nomFournisseur: string): Promise<void> {
    await this.nomFournisseurInput.sendKeys(nomFournisseur);
  }

  async getNomFournisseurInput(): Promise<string> {
    return await this.nomFournisseurInput.getAttribute('value');
  }

  async setRaisonSocialeInput(raisonSociale: string): Promise<void> {
    await this.raisonSocialeInput.sendKeys(raisonSociale);
  }

  async getRaisonSocialeInput(): Promise<string> {
    return await this.raisonSocialeInput.getAttribute('value');
  }

  async setTelephoneInput(telephone: string): Promise<void> {
    await this.telephoneInput.sendKeys(telephone);
  }

  async getTelephoneInput(): Promise<string> {
    return await this.telephoneInput.getAttribute('value');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
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

export class FournisseurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-fournisseur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-fournisseur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
