import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField, ListField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
  interests: {
    type: Array,
    optional: true,
  },
  'interests.$': {
    type: String,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, image, interests } = data;
    Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: {
          name: name,
          image: image,
          interests: interests,
        },
      },
    }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success').then(function () {
          // reload page after user clicks OK
          window.location.href = '/#/profile'; // eslint-disable-line
        });
      }
    });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const menuStyle = { marginTop: '25px' };
    return (
      <Grid style={menuStyle} container centered id="editprofile-page">
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={Meteor.user().profile}>
            <Segment>
              <TextField name='name' id='edit_name'/>
              <TextField name='image' id='edit_image'/>
              <ListField name='interests' id='edit_interests'/>
              <SubmitField value='Submit' id='edit_submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Meteor.user document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const ready = Meteor.user() !== undefined;
  return {
    ready,
  };
})(EditProfile);
