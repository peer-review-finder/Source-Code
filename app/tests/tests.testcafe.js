import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { viewprofilePage } from './viewprofile.page';
import { editprofilePage } from './editprofile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
/** Credentials for a new user. */
const date = Date.now();
const new_cred = { username: `${date}@foo.com`, password: 'changeme' };
/** Credentials for a new user's profile. */
const new_user = { name: 'No name provided', image: '/images/default_user.png', interest: '' };
/** Credentials for editing a user's profile. */
const edit_user = { name: 'John Foo', image: 'https://avatars.githubusercontent.com/u/46693824?v=4',
  interest: 'HCI' };

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
  // add test to click on view profile page and check what is displayed
  await navBar.viewProfile(testController);
  await viewprofilePage.isDisplayed(testController);
  await viewprofilePage.checkProfile(testController, new_user.name, new_user.image, new_user.interest);
});

// add test for view and edit profile
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