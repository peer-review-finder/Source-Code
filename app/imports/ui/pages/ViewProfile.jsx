import React from 'react';
import { Grid, Header, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class ViewProfile extends React.Component {
  render() {
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
  user: PropTypes.object.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const user = Meteor.user();
  return {
    user,
  };
})(ViewProfile);
