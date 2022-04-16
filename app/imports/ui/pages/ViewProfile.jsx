import React from 'react';
import { Grid, Header, Card, Image, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';

/** Renders the Page for adding a document. */
class ViewProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Profile</Header>
          <Card centered>
            <Card.Content>
              <Image
                floated='left'
                size='big'
                src={this.props.user.profileImage}
              />
              <Card.Header>{this.props.user.name}</Card.Header>
              <Card.Description><strong>Interests:</strong> {this.props.user.interests}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

ViewProfile.propTypes = {
  user: PropTypes.shape({
    profileImage: PropTypes.string,
    name: PropTypes.string,
    interests: PropTypes.string,
  }).isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  const username = Meteor.user().username;
  const user = Profiles.collection.findOne({ email: username });
  return {
    user,
    ready,
  };
})(ViewProfile);
