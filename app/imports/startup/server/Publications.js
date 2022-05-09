import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Papers } from '../../api/paper/Paper';
import { Reviews } from '../../api/review/Review';
import { Tokens } from '../../api/token/Tokens';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Papers.userPublicationName, function () {
  return Papers.collection.find();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    // need to give users read access if they are not the owner of the review
    return Reviews.collection.find();
  }
  return this.ready();
});

Meteor.publish(Tokens.userPublicationName, function () {
  if (this.userId) {
    // need to give users read/write access even if they are not the owner of the token document
    return Tokens.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Papers.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Papers.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reviews.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reviews.collection.find();
  }
  return this.ready();
});

Meteor.publish(Tokens.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Tokens.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('viewProfile', function () {
  return this.ready();
});
