import React from 'react';
import { Loader, Container, Card, Rating, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { Papers } from '../../api/paper/Paper';
import { Reviews } from '../../api/review/Review';

/** Renders the Page for viewing a single paper. */
class ViewReview extends React.Component {

  state = { rating: 1 }

  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

  handleClick = () => {
    const rating = this.state.rating;
    Reviews.collection.update(this.props.review._id, { $set: { rating } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Review rated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const papers = this.props.papers.filter(paper => (paper._id === this.props.review.paperId));
    let rating = (
      <Card.Content extra id="add-rating">
        <Card.Header>Rate This Review</Card.Header>
        <Card.Description>
          <Rating icon='star' size='huge' defaultRating={1} maxRating={5} onRate={this.handleRate} />
        </Card.Description>
        <Card.Description>
          <Button color='green' id="add-rating-button" onClick={() => this.handleClick()}>Rate Review</Button>
        </Card.Description>
      </Card.Content>
    );
    if (this.props.review.rating > 0) {
      rating = (
        <Card.Content extra id="view-rating">
          <Card.Header>Rating</Card.Header>
          <Card.Description>
            <Rating icon='star' size='huge' rating={this.props.review.rating} maxRating={5} disabled />
          </Card.Description>
        </Card.Content>
      );
    }
    return (
      <Container id="view-review-page">
        <Card fluid>
          <Card.Content>
            <Card.Header>Review of {papers[0].title}</Card.Header>
            <Card.Meta>Left by {this.props.review.owner}</Card.Meta>
            <Card.Meta>at {this.props.review.timestamp.toLocaleString()}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Card.Header>Review Content</Card.Header>
            <Card.Description>{this.props.review.message}</Card.Description>
          </Card.Content>
          {rating}
          <Card.Content extra>
            <Button color='blue' as={NavLink} exact to={`/view_paper/${papers[0]._id}`}>Back to Paper</Button>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

// Require the presence of a Paper document in the props object.
ViewReview.propTypes = {
  review: PropTypes.shape({
    paperId: PropTypes.string,
    owner: PropTypes.string,
    message: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  papers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Paper and Review documents.
  const subscription = Meteor.subscribe(Reviews.userPublicationName);
  const subscription2 = Meteor.subscribe(Papers.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the documents
  const review = Reviews.collection.findOne(documentId);
  const papers = Papers.collection.find({}).fetch();
  return {
    review,
    papers,
    ready,
  };
})(ViewReview);
