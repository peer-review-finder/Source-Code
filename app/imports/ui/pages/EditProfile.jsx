import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  username: String,
  // profile: {
  //   profileImage: String,
  //   name: String,
  //   interests: String,
  // },
  profile: Object,
  'profile.profileImage': String,
  'profile.name': String,
  'profile.interests': String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { profileImage, name, interests } = data;
    // Meteor.users.update(Meteor.userId(), { $set: {
    //   'profile.profileImage': profileImage, 'profile.name': name, 'profile.interests': interests } }, (error) => (error ?
    //   swal('Error', error.message, 'error') :
    //   swal('Success', 'Item updated successfully', 'success')));
    Meteor.users.update(Meteor.userId(), { $set: { profile: { profileImage: profileImage, name: name, interests: interests } } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='username' disabled/>
              <TextField name='profile.profileImage'/>
              <TextField name='profile.name'/>
              <TextField name='profile.interests'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('viewProfile');
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Meteor.user();
  return {
    doc,
    ready,
  };
})(EditProfile);
