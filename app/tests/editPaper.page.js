import { Selector } from 'testcafe';

class EditPaperPage {
  constructor() {
    this.pageId = '#edit-paper-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editPaper(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit-paper-abstract', 'edited abstract', { replace: true });
    await testController.click('#edit-paper-submit');
    await testController.expect(Selector('.swal-modal').exists).ok();
    await testController.click('.swal-button--confirm');
    await testController.expect(Selector('#list-user-papers-page').exists).ok();
    const edited_review = await Selector('.abstract').innerText;
    await testController.expect(edited_review).eql('edited abstract');
  }
}

export const editpaperPage = new EditPaperPage();
