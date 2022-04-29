import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Grid, Header, Icon, Loader, Statistic } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Papers } from '../../api/paper/Paper';
import { Reviews } from '../../api/review/Review';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  greeting() {
    const today = new Date();
    const curHr = today.getHours();
    let salutation = '';

    if (curHr < 12) {
      salutation = 'Good Morning!';
    } else if (curHr < 18) {
      salutation = 'Good Afternoon!';
    } else {
      salutation = 'Good Evening!';
    }
    return salutation;
  }

  render() {
    if (Meteor.userId() !== null) {
      return (this.props.ready) ? this.renderUser() : <Loader active>Getting data</Loader>;
    }
    return this.renderNotLoggedIn();
  }

  renderUser() {
    const statisticLabel = { fontSize: '2rem', lineHeight: '1.5em' };
    const my_papers = _.filter(this.props.papers, function (paper) { return paper.owner === Meteor.user().username; });
    const other_papers = _.filter(this.props.papers, function (paper) { return paper.owner !== Meteor.user().username; });
    console.log(other_papers);
    const getId = _.pluck(my_papers, '_id');
    const getAreas = _.pluck(other_papers, 'area');
    console.log(getAreas);
    const count_reviews = this.props.reviews.filter((review) => getId.includes(review.paperId));
    // const matching_interests = Meteor.user().profile.interests.filter(x => getArea.includes(x));
    const matching_interests = _.map(getAreas, (x) => x.filter(r => Meteor.user().profile.interests.includes(r)));
    console.log(matching_interests);
    return (
      <div className='landing-background' id='landing-page' >
        <Header as='h1' textAlign='center' inverted style={{ paddingTop: '30px', fontSize: '50px' }}>{this.greeting()} </Header>
        <br />
        <Statistic.Group size='huge' widths='three' style={{ marginTop: '50px' }}>
          <Statistic inverted>
            <Statistic.Value>{count_reviews.length}</Statistic.Value>
            <Statistic.Label style={statisticLabel}>Reviews on <br/> your papers!</Statistic.Label>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>{matching_interests.length}</Statistic.Value>
            <Statistic.Label style={statisticLabel}>Papers match <br/> your interest</Statistic.Label>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>{this.props.papers.length}</Statistic.Value>
            <Statistic.Label style={statisticLabel}>Papers</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    );
  }

  renderNotLoggedIn() {
    const total_authors = _.reduce(this.props.papers, function (memo, paper) { return memo + paper.authors.length; }, 0);
    const total_topics = _.uniq(_.reduce(this.props.papers, function (a, b) { return a.concat(b.area); }, []));
    return (
      <div className='landing-background' id='landing-page'>
        <Header as='h1' textAlign='center' inverted style={{ paddingTop: '15px' }}>Getting Peer Reviews is as Easy as 1-2-3! </Header>
        <br />
        <Grid container centered stackable columns={3}>
          <Grid.Column textAlign='center'>
            <Icon size='huge' name='user' inverted />
            <Header as='h1' inverted>Create an Account!</Header>
            <Header as='h3' inverted>This enables any user to register and complete a user profile.  You will be able to join focused area communities by interest(s), technical field, etc.</Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Icon size='huge' name='book' inverted />
            <Header as='h1' inverted>Upload Research Paper!</Header>
            <Header as='h3' inverted>For each paper, you are able to upload research papers for others to review.  You can also view and edit any previously uploaded papers.</Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Icon size='huge' name='share' inverted />
            <Header as='h1' inverted>Get Peer Reviews!</Header>
            <Header as='h3' inverted>Review other research papers.  Let peers review yours!</Header>
          </Grid.Column>
          <Header as='h1' inverted>Interested in Reviewing Papers?</Header>
        </Grid>
        <Statistic.Group size='huge' widths='three' style={{ marginTop: '40px' }}>
          <Statistic inverted>
            <Statistic.Value>{total_authors}</Statistic.Value>
            <Statistic.Label>Authors</Statistic.Label>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>{total_topics.length}</Statistic.Value>
            <Statistic.Label>Topics</Statistic.Label>
          </Statistic>
          <Statistic inverted>
            <Statistic.Value>{this.props.papers.length}</Statistic.Value>
            <Statistic.Label>Papers</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    );
  }
}

Landing.propTypes = {
  reviews: PropTypes.array.isRequired,
  papers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
// Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
// Get access to Paper and Review documents.
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the documents
  const papers = Papers.collection.find({}).fetch();
  // const paper = Papers.collection.find({}).fetch();
  // const currentUser = Meteor.user() ? Meteor.user().username : '';
  const reviews = Reviews.collection.find({}).fetch();
  return {
    reviews,
    papers,
    ready,
  };
})(Landing);
