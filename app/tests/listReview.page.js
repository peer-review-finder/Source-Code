import { Selector } from 'testcafe';

class ListReviewPage {
  constructor() {
    this.pageId = '#list-reviews-page';
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
  async gotoViewPapersPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('.view-paper-button');
  }

  async deletePaper(testController) {
    await this.isDisplayed(testController);
    await testController.click('#delete-paper-button');
    await testController.click('.swal-button.swal-button--confirm');
  }
}

export const listReviewPage = new ListReviewPage();
