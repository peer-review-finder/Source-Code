import { Selector } from 'testcafe';

class AddPaperPage {
  constructor() {
    this.pageId = '#add-paper-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async uploadPaper(testController, title, author, abstract, aos, link) {
    await this.isDisplayed(testController);
    await testController.typeText('#add-paper-title', title);
    await testController.click('#uniforms-0000-0003');
    await testController.typeText('#add-paper-author', author);
    await testController.typeText('#add-paper-abstract', abstract);
    await testController.click('#uniforms-0000-0008');
    await testController.typeText('#add-paper-aos', aos);
    await testController.typeText('#add-paper-link', link);
    await testController.click('#add-paper-submit');
    await testController.click('.swal-button--confirm');
    await testController.expect(Selector('#list-user-papers-page').exists).ok();
  }
}

export const addpaperPage = new AddPaperPage();
