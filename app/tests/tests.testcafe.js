import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { viewprofilePage } from './viewprofile.page';
import { editprofilePage } from './editprofile.page';
import { listPapersPage } from './listPapers.page';
import { viewPaperPage } from './viewPaper.page';
import { listReviewPage } from './listReview.page';
import { viewReviewPage } from './viewReview.page';
import { listPapersAdminPage } from './listPapersAdmin.page';
import { listMyPaperPage } from './listMyPaper.page';
import { addpaperPage } from './addPaper.page';
import { editpaperPage } from './editPaper.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
/** Credentials for a new user. */
const date = Date.now();
const new_cred = { username: `${date}@foo.com`, password: 'changeme' };
/** Credentials for a admin. */

const admin_Credentials = { username: 'admin@foo.com', password: 'changeme' };

/** Credentials for a new user's profile. */
const new_user = { name: 'No name provided', image: '/images/default_user.png', interest: '' };
/** Credentials for editing a user's profile. */
const edit_user = { name: 'John Foo', image: 'https://avatars.githubusercontent.com/u/46693824?v=4',
  interest: 'HCI' };

/** Credentials for a new paper */
const new_paper = { title: 'Investigating Parallel Computing', author: 'John Foo', abstract: 'This is a paper about parallel computing.', aos: 'Parallel Computing', link: 'https://en.wikipedia.org/wiki/Parallel_computing' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup and view profile work', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, new_cred.username, new_cred.password);
  await navBar.isLoggedIn(testController, new_cred.username);
  await navBar.viewProfile(testController);
  await viewprofilePage.isDisplayed(testController);
  await viewprofilePage.checkProfile(testController, new_user.name, new_user.image, new_user.interest);
});

test('Test that view and edit profile work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, new_cred.username, new_cred.password);
  await navBar.isLoggedIn(testController, new_cred.username);
  await navBar.viewProfile(testController);
  await viewprofilePage.isDisplayed(testController);
  await viewprofilePage.clickEditProfile(testController);
  await editprofilePage.isDisplayed(testController);
  await editprofilePage.editProfile(testController, edit_user.name, edit_user.image, edit_user.interest);
  await navBar.viewProfile(testController);
  await viewprofilePage.checkProfile(testController, edit_user.name, edit_user.image, edit_user.interest);
});

test('Test that list papers page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await landingPage.gotoListPapersPage(testController);
  await listPapersPage.hasListing(testController);
});

test('Test that add paper page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, new_cred.username, new_cred.password);
  await navBar.isLoggedIn(testController, new_cred.username);
  await navBar.gotoAddPaperPage(testController);
  await addpaperPage.uploadPaper(testController, new_paper.title, new_paper.author, new_paper.abstract, new_paper.aos, new_paper.link);
  await listMyPaperPage.isDisplayed(testController);
  await listMyPaperPage.hasListing(testController);
});

test('Test that edit paper page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, new_cred.username, new_cred.password);
  await navBar.isLoggedIn(testController, new_cred.username);
  await landingPage.gotoMyPapersPage(testController);
  await listMyPaperPage.gotoEditPaper(testController);
  await editpaperPage.editPaper(testController);
});

test('Test that admin delete paper works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin_Credentials.username, admin_Credentials.password);
  await navBar.isLoggedIn(testController, admin_Credentials.username);
  await navBar.gotoListPapersAdminPage(testController);
  await listPapersAdminPage.deletePaper(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, new_cred.username, new_cred.password);
  await navBar.isLoggedIn(testController, new_cred.username);
  await landingPage.gotoMyPapersPage(testController);
  await listMyPaperPage.hasNoListing(testController);
});

test('Test that list papers admin page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin_Credentials.username, admin_Credentials.password);
  await navBar.isLoggedIn(testController, admin_Credentials.username);
  await navBar.gotoListPapersAdminPage(testController);
  await listPapersAdminPage.hasListing(testController);
});

test('Test that view paper page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await landingPage.gotoListPapersPage(testController);
  await listPapersPage.gotoViewPaperPage(testController);
  await viewPaperPage.isDisplayed(testController);
});

test('Test that add review and edit review works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, new_cred.username, new_cred.password);
  await navBar.isLoggedIn(testController, new_cred.username);
  await landingPage.gotoListPapersPage(testController);
  await listPapersPage.gotoViewPaperPage(testController);
  await viewPaperPage.addReview(testController);
  await viewPaperPage.editReview(testController);
});

test('Test that view review and add rating works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await landingPage.gotoMyPapersPage(testController);
  await listMyPaperPage.gotoViewPaperPage(testController);
  await viewPaperPage.gotoViewPapersPage(testController);
  await viewReviewPage.isDisplayed(testController);
  await viewReviewPage.rateReview(testController);
});

test('Test that list user\'s reviews works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await landingPage.gotoListReviewPage(testController);
  await listReviewPage.isDisplayed(testController);
});
