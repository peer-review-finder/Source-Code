import React from 'react';
import { Container, Segment, Form, Loader, Button, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  ErrorsField,
  LongTextField,
  SubmitField,
  AutoField,
  TextField, HiddenField,
} from 'uniforms-semantic';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Papers } from '../../api/paper/Paper';

const bridge = new SimpleSchema2Bridge(Papers.schema);

/** A simple static component to render some text for the landing page. */
class AddPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit(data) {
    const { owner, title, author, abstract, area, link } = data;
    Papers.collection.insert({ owner, title, author, abstract, area, link },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Paper Uploaded successfully', 'success');
          this.setState({ redirectToReferer: true });
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginTop: '100px' };
    if (this.state.redirectToReferer) {
      return <Redirect to='/listPaper'/>;
    }
    return (
      <Container style={menuStyle} textAlign='center'>
        <Header as='h1'>Uploading Paper</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <Form.Group widths={'equal'}>
              <TextField name='title' placeholder='AI' label='Paper Title'/>
              <TextField name='author' placeholder='John' label='Author'/>
            </Form.Group>
            <Form.Group widths={'equal'}>
              <LongTextField name='abstract' placeholder='Papers is about' label='Abstract'/>
              <AutoField name='area' label='Area of Study'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <TextField name='link' placeholder='Link to the paper' label='Link of Paper'/>
            </Form.Group>
            <SubmitField color='green' value='Upload'/>
            <Button color='red' as={NavLink} exact to="/listPaper">Cancel</Button>
            <ErrorsField/>
            <HiddenField name='owner' value={Meteor.user().username}/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

AddPaper.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  const ready = subscription.ready();
  return {
    ready,
  };
})(AddPaper);
