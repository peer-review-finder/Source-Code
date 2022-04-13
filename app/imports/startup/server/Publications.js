import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Papers } from '../../api/paper/Paper';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Papers.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Papers.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Papers.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Papers.collection.find();
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

Meteor.publish('viewProfile', function() {
  return this.ready();
});