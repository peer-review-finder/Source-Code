import { Selector } from 'testcafe';

class ViewProfilePage {
  constructor() {
    this.pageId = '#viewprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async clickEditProfile(testController) {
    await this.isDisplayed(testController);
    await testController.click('#goto_edit');
  }

  async checkProfile(testController, name, image, interests) {
    await this.isDisplayed(testController);
    const profile_name = Selector('#profile_name').innerText;
    await testController.expect(profile_name).eql(name);
    const img = Selector('img').withAttribute('src', image);
    await testController.expect(img.exists).ok();
    const profile_interests = Selector('#profile_interests').innerText;
    await testController.expect(profile_interests).eql(interests);
  }
}

export const viewprofilePage = new ViewProfilePage();
