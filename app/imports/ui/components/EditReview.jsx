import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { Reviews } from '../../api/review/Review';

const formSchema = new SimpleSchema({
  message: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class EditReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = { edit_mode: false };
    this.handleClick = this.handleClick.bind(this);
  }

  // On submit, insert the data.
  submit(data) {
    const { message } = data;
    const timestamp = new Date();
    // console.log(paperId);
    Reviews.collection.update(this.props.reviews[0]._id, {
      $set: {
        message: message,
        timestamp: timestamp,
      },
    }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Review added successfully', 'success').then(function () {
          // reload page after user clicks OK
          window.location.reload(false); // eslint-disable-line
        });
      }
    });
  }

  handleClick() {
    this.setState((prevState) => ({ edit_mode: !prevState.edit_mode }));
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const reviews = this.props.reviews.filter(review => (review.owner === Meteor.user().username));
    if (this.state.edit_mode === false) {
      return (
        <Segment id="submitted-review">
          <Header as="h2">Your Submitted Review</Header>
          <p>{reviews[0].message}</p>
          <Button color='green' onClick={this.handleClick}>Edit Review</Button>
        </Segment>
      );
    }
    return (
      <Segment id="edit-review-form">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.reviews[0]}>
          <Header as="h2">Edit a Review</Header>
          <LongTextField label="Review" name="message" id="edit-review-form-message"/>
          <SubmitField value="Submit" id="edit-review-form-submit"/>
          <ErrorsField/>
        </AutoForm>
      </Segment>
    );
  }
}

EditReview.propTypes = {
  paper: PropTypes.shape({
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
};

export default EditReview;
