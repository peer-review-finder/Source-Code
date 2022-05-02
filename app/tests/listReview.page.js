import { Selector } from 'testcafe';

class ListReviewPage {
  constructor() {
    this.pageId = '#list-user-reviews-page';
    this.pageSelector = Selector(this.pageId);
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

export const listReviewPage = new ListReviewPage();
