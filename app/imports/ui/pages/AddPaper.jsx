import React from 'react';
import { Container, Segment, Form, Loader, Button, Header, Icon } from 'semantic-ui-react';
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
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Papers } from '../../api/paper/Paper';
import { Tokens } from '../../api/token/Tokens';

const bridge = new SimpleSchema2Bridge(Papers.schema);

/** A simple static component to render some text for the landing page. */
class AddPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit(data) {
    const { owner, title, authors, abstract, area, link } = data;
    Papers.collection.insert({ owner, title, authors, abstract, area, link },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Paper Uploaded successfully', 'success').then(function () {
            const token = Tokens.collection.findOne({ owner: Meteor.user().username });
            Tokens.collection.update(
              { _id: token._id },
              { $inc: { quantity: -3 } },
            );
            window.location.href = '/#/listUserPapers'; // eslint-disable-line
          });
        }
      });// .then(function() { <Redirect to='/listPaper'/> });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginTop: '25px' };
    if (this.props.token.quantity < 3) {
      return (
        <Container style={menuStyle} textAlign='center' id='add-paper-page'>
          <Header as='h2' icon color='red'>
            <Icon name='warning circle'/>
            Not Enough Tokens
            <Header.Subheader>
              You need 3 tokens to add a paper, you currently have {this.props.token.quantity}<br/>
              Review papers to earn tokens
            </Header.Subheader>
            <Link to='/listPaper'>
              <Button color='green'>View Papers to Review</Button>
            </Link>
          </Header>
        </Container>
      );
    }
    return (
      <Container style={menuStyle} textAlign='center' id='add-paper-page'>
        <Header as='h1'>Upload Paper</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <TextField name='title' placeholder='Paper Title' label='Paper Title' id='add-paper-title'/>
            <Form.Group widths='equal'>
              <AutoField name='authors' label='Authors' id='add-paper-author'/>
            </Form.Group>
            <LongTextField name='abstract' placeholder='Paper is about' label='Abstract' id='add-paper-abstract'/>
            <Form.Group widths='equal'>
              <AutoField name='area' label='Area of Study' id='add-paper-aos'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <TextField name='link' placeholder='Link to Paper' label='Link of Paper' id='add-paper-link'/>
            </Form.Group>
            <SubmitField id='add-paper-submit' value='Upload'/>
            <Button color='red' as={NavLink} exact to="/listPaper" id='add-paper-cancel'>Cancel</Button>
            <ErrorsField/>
            <HiddenField name='owner' value={Meteor.user().username}/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

AddPaper.propTypes = {
  token: PropTypes.shape({
    quantity: PropTypes.number,
  }),
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  const subscription2 = Meteor.subscribe(Tokens.userPublicationName);
  const ready = subscription.ready() && subscription2.ready();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const token = Tokens.collection.findOne({ owner: currentUser });
  return {
    token,
    ready,
  };
})(AddPaper);
