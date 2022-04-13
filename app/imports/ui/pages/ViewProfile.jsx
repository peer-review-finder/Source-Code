import React from 'react';
import { Grid, Header, Card, Image, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

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
                src={this.props.user.profile.profileImage}
              />
              <Card.Header>{this.props.user.profile.name}</Card.Header>
              <Card.Description>{this.props.user.profile.interests}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

ViewProfile.propTypes = {
  user: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe('viewProfile');
  const ready = subscription.ready();
  const user = Meteor.user();
  return {
    user,
    ready,
  };
})(ViewProfile);
