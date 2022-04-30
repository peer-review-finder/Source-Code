import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, CardGroup, Grid, Icon, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Reviews } from '../../api/review/Review';
import { Papers } from '../../api/paper/Paper';
import DisplayPaper from '../components/DisplayPaper';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListUserPapers extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const menuStyle = { marginTop: '25px' };
    const currentUser = Meteor.user().username;
    const myPapers = this.props.paper.filter(papers => (papers.owner) === currentUser);
    if (myPapers.length === 0) {
      return (
        <Container style={menuStyle} id='list-reviews-page'>
          <Header as="h2" textAlign="center">Your Papers</Header>
          <br/>
          <Grid centered columns={3}>
            <Grid.Column>
              <Header as='h2' icon>
                <Icon name='file alternate outline'/>
                No Papers Found
                <Header.Subheader>
                  You currently have no papers uploaded so far. Please click on the button below to upload a paper.
                </Header.Subheader>
              </Header>
              <Link to='/addPaper'>
                <Button fluid id='list-user-reviews-btn'>Upload Paper</Button>
              </Link>
            </Grid.Column>
          </Grid>
          <br/><br/>
        </Container>
      );
    }
    return (
      <Container style={menuStyle} id='list-reviews-page'>
        <Header as="h2" textAlign="center">Your Papers</Header>
        <br/>
        <CardGroup itemsPerRow={2}>
          {myPapers.map((paper) => <DisplayPaper key={paper._id} paper={paper} />)}
        </CardGroup>
        <br/><br/>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
ListUserPapers.propTypes = {
  review: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    paperId: PropTypes.string,
  })).isRequired,
  paper: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  // Get access to Paper and Review documents.
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the documents
  const paper = Papers.collection.find({}).fetch();

  // const paper = Papers.collection.find({}).fetch();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const review = Reviews.collection.find({ owner: currentUser }).fetch();
  return {
    review,
    paper,
    ready,
  };
})(ListUserPapers);
