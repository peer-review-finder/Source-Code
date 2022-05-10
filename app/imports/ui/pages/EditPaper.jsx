import React from 'react';
import { Loader, Header, Segment, Button, Container } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoField, AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { NavLink } from 'react-router-dom';
import { Papers } from '../../api/paper/Paper';

const bridge = new SimpleSchema2Bridge(Papers.schema);

/** Renders the Page for editing a single document. */
class EditPaper extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { title, authors, abstract, area, link, _id } = data;
    Papers.collection.update(_id, { $set: { title, authors, abstract, area, link } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Paper Updated Successfully', 'success').then(function () {
          window.location.href = '/#/listUserPapers'; // eslint-disable-line
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
      <Container style={menuStyle} textAlign='center'>
        <Header as='h1'>Edit Paper</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
          <Segment>
            <TextField name='title' />
            <AutoField name='authors' />
            <LongTextField name='abstract' />
            <AutoField name='area' />
            <TextField name='link' />
            <SubmitField id='edit-paper-submit' value='Update' />
            <Button color='red' as={NavLink} exact to="/listPaper">Cancel</Button>
            <ErrorsField/>
            <HiddenField name='owner' />
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditPaper.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Papers.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditPaper);
