import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Table, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Reviews } from '../../api/review/Review';
import ReviewItem from '../components/ReviewItem';
import { Papers } from '../../api/paper/Paper';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListReview extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id='list-reviews-page'>
        <Header as="h2" textAlign="center">Your reviews</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Your submitted reviews</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.review.map((reviews) => <ReviewItem key={reviews.paperId} title={Papers.collection.findOne(reviews.paperId).title} message={reviews.message}/>)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
ListReview.propTypes = {
  review: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    paperId: PropTypes.string,
  })).isRequired,
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
  // const paper = Papers.collection.find({}).fetch();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const review = Reviews.collection.find({ owner: currentUser }).fetch();
  return {
    review,
    ready,
  };
})(ListReview);
