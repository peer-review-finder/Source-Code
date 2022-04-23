import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
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
class AddReview extends React.Component {

  // On submit, insert the data.
  submit(data) {
    const { message } = data;
    const paperId = this.props.paper._id;
    const owner = Meteor.user().username;
    const timestamp = new Date();
    Reviews.collection.insert({ paperId, owner, message, timestamp },
      (error) => {
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

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    // const reviews = this.props.reviews.filter(review => (review.owner === Meteor.user().username));
    // if (reviews.length > 0) {
    //   return (
    //     <Segment id="submitted-review">
    //       <Header as="h2">Your Submitted Review</Header>
    //       <p>{reviews[0].message}</p>
    //       <Button color='green'>Edit Review</Button>
    //     </Segment>
    //   );
    // }
    return (
      <Segment id="add-review-form">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Header as="h2">Submit a Review</Header>
          <LongTextField label="Review" name="message" id="add-review-form-message"/>
          <SubmitField value="Submit" id="add-review-form-submit"/>
          <ErrorsField/>
        </AutoForm>
      </Segment>
    );
  }
}

AddReview.propTypes = {
  paper: PropTypes.shape({
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
};

export default AddReview;
