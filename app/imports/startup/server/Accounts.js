import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profileImage:
      'https://www.google.com/imgres?imgurl=https%3A' +
      '%2F%2Fwww.personality-insights.com%2Fwp-content%2F' +
      'uploads%2F2017%2F12%2Fdefault-profile-pic-e1513291410505.jpg' +
      '&imgrefurl=https%3A%2F%2Fwww.personality-insights.com%2' +
      'Fdefault-profile-pic%2F&tbnid=tb7N7_uys1AxsM&' +
      'vet=12ahUKEwjUy6aDmoj3AhWCKn0KHfibDBoQMygBegUIARDzAQ.' +
      '.i&docid=noScQk1sIgxspM&w=250&h=250&q=default%20profile%20' +
      'image&ved=2ahUKEwjUy6aDmoj3AhWCKn0KHfibDBoQMygBegUIARDzAQ',
    interests: 'None',
    name: 'PRF User',
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
