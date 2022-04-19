import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Papers } from '../../api/paper/Paper';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addPaper(data) {
  console.log(`  Adding: ${data.authors} (${data.owner})`);
  Papers.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Papers.collection.find().count() === 0) {
  if (Meteor.settings.defaultPaper) {
    console.log('Creating default papers.');
    Meteor.settings.defaultPaper.map(data => addPaper(data));
  }
}
