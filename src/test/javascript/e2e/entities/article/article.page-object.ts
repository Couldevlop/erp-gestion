import { element, by, ElementFinder } from 'protractor';

export class ArticleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-article div table .btn-danger'));
  title = element.all(by.css('jhi-article div h2#page-heading span')).first();
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

export class ArticleUpdatePage {
  pageTitle = element(by.id('jhi-article-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idArticleInput = element(by.id('field_idArticle'));
  nomArticleInput = element(by.id('field_nomArticle'));
  rayonInput = element(by.id('field_rayon'));
  rayonnierInput = element(by.id('field_rayonnier'));
  descriptionInput = element(by.id('field_description'));
  quantiteInput = element(by.id('field_quantite'));
  puInput = element(by.id('field_pu'));

  familleSelect = element(by.id('field_famille'));
  inventaireSelect = element(by.id('field_inventaire'));
  fournisseurSelect = element(by.id('field_fournisseur'));
  commandeSelect = element(by.id('field_commande'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdArticleInput(idArticle: string): Promise<void> {
    await this.idArticleInput.sendKeys(idArticle);
  }

  async getIdArticleInput(): Promise<string> {
    return await this.idArticleInput.getAttribute('value');
  }

  async setNomArticleInput(nomArticle: string): Promise<void> {
    await this.nomArticleInput.sendKeys(nomArticle);
  }

  async getNomArticleInput(): Promise<string> {
    return await this.nomArticleInput.getAttribute('value');
  }

  async setRayonInput(rayon: string): Promise<void> {
    await this.rayonInput.sendKeys(rayon);
  }

  async getRayonInput(): Promise<string> {
    return await this.rayonInput.getAttribute('value');
  }

  async setRayonnierInput(rayonnier: string): Promise<void> {
    await this.rayonnierInput.sendKeys(rayonnier);
  }

  async getRayonnierInput(): Promise<string> {
    return await this.rayonnierInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setQuantiteInput(quantite: string): Promise<void> {
    await this.quantiteInput.sendKeys(quantite);
  }

  async getQuantiteInput(): Promise<string> {
    return await this.quantiteInput.getAttribute('value');
  }

  async setPuInput(pu: string): Promise<void> {
    await this.puInput.sendKeys(pu);
  }

  async getPuInput(): Promise<string> {
    return await this.puInput.getAttribute('value');
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

  async inventaireSelectLastOption(): Promise<void> {
    await this.inventaireSelect.all(by.tagName('option')).last().click();
  }

  async inventaireSelectOption(option: string): Promise<void> {
    await this.inventaireSelect.sendKeys(option);
  }

  getInventaireSelect(): ElementFinder {
    return this.inventaireSelect;
  }

  async getInventaireSelectedOption(): Promise<string> {
    return await this.inventaireSelect.element(by.css('option:checked')).getText();
  }

  async fournisseurSelectLastOption(): Promise<void> {
    await this.fournisseurSelect.all(by.tagName('option')).last().click();
  }

  async fournisseurSelectOption(option: string): Promise<void> {
    await this.fournisseurSelect.sendKeys(option);
  }

  getFournisseurSelect(): ElementFinder {
    return this.fournisseurSelect;
  }

  async getFournisseurSelectedOption(): Promise<string> {
    return await this.fournisseurSelect.element(by.css('option:checked')).getText();
  }

  async commandeSelectLastOption(): Promise<void> {
    await this.commandeSelect.all(by.tagName('option')).last().click();
  }

  async commandeSelectOption(option: string): Promise<void> {
    await this.commandeSelect.sendKeys(option);
  }

  getCommandeSelect(): ElementFinder {
    return this.commandeSelect;
  }

  async getCommandeSelectedOption(): Promise<string> {
    return await this.commandeSelect.element(by.css('option:checked')).getText();
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

export class ArticleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-article-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-article'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
