import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(60000).expect(this.pageSelector.exists).ok();
  }

  /** Check that someone is logged in, then go to list review/paper page */
  async gotoListReviewPage(testController) {
    await testController.click('#my-reviews-landing');
  }

  /** Check that someone is logged in, then go to list review/paper page */
  async gotoMyPapersPage(testController) {
    await testController.click('#my-papers-landing');
  }

  /** Check that someone is logged in, then go to list papers page */
  async gotoListPapersPage(testController) {
    await testController.click('#list-papers-landing');
  }
}

export const landingPage = new LandingPage();
