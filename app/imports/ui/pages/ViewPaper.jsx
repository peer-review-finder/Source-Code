import React from 'react';
import { Loader, Container, Card, Label, Button, Header, Table, Message } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Papers } from '../../api/paper/Paper';
import { Reviews } from '../../api/review/Review';
import AddReview from '../components/AddReview';
import EditReview from '../components/EditReview';
import ListReviewsItem from '../components/ListReviewsItem';

/** Renders the Page for viewing a single paper. */
class ViewPaper extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    let reviewContent = <div />;
    if (this.props.paper.owner === Meteor.user().username) {
      if (this.props.reviews.length > 0) {
        const pendingRating = this.props.reviews.filter(review => (review.rating === undefined));
        const alreadyRated = this.props.reviews.filter(review => (review.rating !== undefined));
        const reviewsPendingFirst = pendingRating.concat(alreadyRated);
        reviewContent = (
          <Card.Content>
            <Header as="h2">Reviews</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Created By</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Rating</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {reviewsPendingFirst.map((review) => <ListReviewsItem key={review._id} review={review} />)}
              </Table.Body>
            </Table>
          </Card.Content>
        );
      } else {
        reviewContent = (
          <Card.Content>
            <Header as="h2">Reviews</Header>
            <Message info>
              <Message.Header>No reviews yet</Message.Header>
            </Message>
          </Card.Content>
        );
      }
    } else {
      const reviews = this.props.reviews.filter(review => (review.owner === Meteor.user().username));
      if (reviews.length === 0) {
        reviewContent = (
          <Card.Content>
            <AddReview paper={this.props.paper} reviews={this.props.reviews}/>
          </Card.Content>
        );
      } else {
        reviewContent = (
          <Card.Content>
            <EditReview paper={this.props.paper} reviews={this.props.reviews}/>
          </Card.Content>
        );
      }
    }
    return (
      <Container id="view-paper-page">
        <Card fluid>
          <Card.Content>
            <Card.Header>{this.props.paper.title}</Card.Header>
            <Card.Meta>{this.props.paper.authors.map((author) => `${author}, `)}</Card.Meta>
            <Card.Description>
              {this.props.paper.area.map((area, index) => <Label basic key={index}>{area}</Label>)}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Header>Abstract</Card.Header>
            <Card.Description>{this.props.paper.abstract}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button color='blue' as='a' href={this.props.paper.link}>Download Full Paper</Button>
          </Card.Content>
          {reviewContent}
        </Card>
      </Container>
    );
  }
}

// Require the presence of a Paper document in the props object.
ViewPaper.propTypes = {
  paper: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    abstract: PropTypes.string,
    area: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Paper and Review documents.
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the documents
  const paper = Papers.collection.findOne(documentId);
  const reviews = Reviews.collection.find({ paperId: match.params._id }).fetch();
  return {
    paper,
    reviews,
    ready,
  };
})(ViewPaper);
