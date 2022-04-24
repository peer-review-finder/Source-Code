import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#editprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController, name, image, interest) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit_name', name);
    await testController.typeText('#edit_image', image);
    await testController.click('.ui .add.icon');
    await testController.typeText('#edit_interests', interest);
    await testController.click('#edit_submit');
    await testController.click('.swal-button--confirm');
    await testController.expect(Selector('#viewprofile-page').exists).ok();
  }
}

export const editprofilePage = new EditProfilePage();
