import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Review table. See pages/ListReview.jsx. */
class ReviewItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.title}</Table.Cell>
        <Table.Cell>{this.props.message}</Table.Cell>
      </Table.Row>
    );
  }
}

ReviewItem.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default withRouter(ReviewItem);
