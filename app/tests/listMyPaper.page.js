import { Selector } from 'testcafe';

class ListMyPaperPage {
  constructor() {
    this.pageId = '#list-user-papers-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** check if there is at least one card */
  async hasListing(testController) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('.ui .card').count).gte(1);
  }

  /** check if there are no cards */
  async hasNoListing(testController) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('.ui .card').count).eql(0);
  }

  /** Go to the view paper page for the first paper */
  async gotoViewPaperPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('.view-paper-button');
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Go to the view paper page for the first paper */
  async gotoEditPaper(testController) {
    await this.isDisplayed(testController);
    await testController.click('.edit-paper-button');
  }
}

export const listMyPaperPage = new ListMyPaperPage();
