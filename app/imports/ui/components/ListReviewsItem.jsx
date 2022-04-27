import React from 'react';
import { Table, Rating, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/** Renders a single row in the List Reviews table. See pages/ViewPaper.jsx. */
class ListReviewsItem extends React.Component {
  render() {
    let rating = 'Not rated yet';
    if (this.props.review.rating > 0) {
      rating = <Rating icon='star' size='huge' rating={this.props.review.rating} maxRating={5} disabled />;
    }
    return (
      <Table.Row className='list-reviews-item'>
        <Table.Cell>{this.props.review.owner}</Table.Cell>
        <Table.Cell>{this.props.review.timestamp.toLocaleString()}</Table.Cell>
        <Table.Cell>{rating}</Table.Cell>
        <Table.Cell>
          <Button color='green' className="view-review-button" as={NavLink} exact to={`/view_review/${this.props.review._id}`}>View Review</Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ListReviewsItem.propTypes = {
  review: PropTypes.shape({
    owner: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default ListReviewsItem;
