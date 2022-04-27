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

  /** edits a review, then checks if that was successful. */
  async editReview(testController) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('#submitted-review').exists).ok();
    await testController.click('#edit_review_btn');
    await testController.expect(Selector('#edit-review-form').exists).ok();
    await testController.typeText('#edit-review-form-message', 'edited test message', { replace: true });
    await testController.click('#edit-review-form-submit');
    await testController.expect(Selector('.swal-modal').exists).ok();
    await testController.click('.swal-button--confirm');
    await testController.expect(Selector('#submitted-review').exists).ok();
    const edited_review = await Selector('#review-text').innerText;
    await testController.expect(edited_review).eql('edited test message');
  }

  /** Checks that the review list is displayed. */
  async hasReviewListing(testController) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('.list-reviews-item').count).gte(1);
  }

  /** Go to the view review page for the first review */
  async gotoViewPapersPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('.view-review-button');
  }
}

export const viewPaperPage = new ViewPaperPage();
