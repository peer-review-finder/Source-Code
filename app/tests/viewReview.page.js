import { Selector } from 'testcafe';

class ViewReviewPage {
  constructor() {
    this.pageId = '#view-review-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Adds a rating for a review, then checks if that was successful. */
  async rateReview(testController) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('#add-rating').exists).ok();
    // using the default rating of 1; was unable to create a test that selects the rating
    await testController.click('#add-rating-button');
    await testController.expect(Selector('.swal-modal').exists).ok();
    await testController.click('.swal-button--confirm');
    await testController.expect(Selector('#view-rating').exists).ok();
  }
}

export const viewReviewPage = new ViewReviewPage();
