import React from 'react';
import { Grid, Header, Card, Image, Loader, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

/** Renders the Page for adding a document. */
class ViewProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const image = (Meteor.user().profile.image.length > 0 ? Meteor.user().profile.image : '/images/default_user.png');
    const name = (Meteor.user().profile.name.length > 0 ? Meteor.user().profile.name : 'No name provided');
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Profile</Header>
          <Card centered>
            <Image src={image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Description>
                {Meteor.user().profile.interests.map((interest, index) => <Label basic key={index}>{interest}</Label>)}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to='/edit_profile'>
                <Button color='green' fluid>Edit Profile</Button>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

ViewProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const ready = Meteor.user() !== undefined;
  return {
    ready,
  };
})(ViewProfile);
