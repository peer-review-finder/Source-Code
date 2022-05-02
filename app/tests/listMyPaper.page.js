import { Selector } from 'testcafe';

class ListMyPaperPage {
  constructor() {
    this.pageId = '#list-user-papers-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** check if there more than one card */
  async hasListing(testController) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('.ui .card').count).gte(1);
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

  // async deletePaper(testController) {
  //   await this.isDisplayed(testController);
  //   await testController.click('.delete-paper-button');
  //   await testController.expect(Selector('.ui .card').count).lte(1);
  // }
}

export const listMyPaperPage = new ListMyPaperPage();
