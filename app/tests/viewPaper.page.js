import { Selector } from 'testcafe';

class ViewPaperPage {
  constructor() {
    this.pageId = '#view-paper-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to add a review, then checks if that was successful. */
  async addReview(testController) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('#add-review-form').exists).ok();
    await testController.typeText('#add-review-form-message', 'test message');
    await testController.click('#add-review-form-submit');
    await testController.expect(Selector('.swal-modal').exists).ok();
    await testController.click('.swal-button--confirm');
    await testController.expect(Selector('#submitted-review').exists).ok();
  }
}

export const viewPaperPage = new ViewPaperPage();
