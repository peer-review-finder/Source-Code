import { Selector } from 'testcafe';

class ListPapersAdminPage {
  constructor() {
    this.pageId = '#list-papers-admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Go to the view paper page for the first */
  async hasListing(testController) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('.ui .card').count).gte(1);
  }

  /** Go to the view paper page for the first paper */
  async gotoViewPaperPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('.view-paper-button');
  }
}

export const listPapersAdminPage = new ListPapersAdminPage();
