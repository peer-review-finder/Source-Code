import React from 'react';
import { Loader, Container, Card, Label, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Papers } from '../../api/paper/Paper';

/** Renders the Page for viewing a single paper. */
class ViewPaper extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
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
            <Button color='green' disabled>Review Paper - Coming Soon</Button>
          </Card.Content>
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
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Paper documents.
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const paper = Papers.collection.findOne(documentId);
  return {
    paper,
    ready,
  };
})(ViewPaper);
