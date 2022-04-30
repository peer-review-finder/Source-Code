import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, CardGroup, Input, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Papers } from '../../api/paper/Paper';
import DisplayPaper from '../components/DisplayPaper';

/** A simple static component to render some text for the listPaper page. */
class ListPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: false,
      search: [],
    };
  }

  onChange = e => {
    this.setState({ search: e.target.value.split(/[ ,]+/) });
    console.log(this.state);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginTop: '25px' };
    const { search } = this.state;
    const currentUser = Meteor.user().username;
    let otherPapers = this.props.paper;
    otherPapers = _.reject(otherPapers, function (papers) { return papers.owner === currentUser; });// filter out paper created by you
    if (search.length > 1) {
      otherPapers = _.filter(otherPapers, function (papers) {
        return _.find(search, function (searches) {
          const area = papers.area;
          return _.contains(area, searches.toUpperCase());
        });
      });
    }
    if (otherPapers.length === 0) {
      return (
        <Container style={menuStyle} id="list-papers-page">
          <Container fluid>
            <Header as="h1" textAlign="center">Papers Looking for Reviews</Header>
          </Container>
          <br/>
          <Grid centered columns={3}>
            <Grid.Column>
              <Header as='h2' icon>
                <Icon name='file alternate outline'/>
                No Papers Found
                <Header.Subheader>
                  There are currently no papers for you to review. Please come back later on when more papers have been uploaded.
                </Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid>
          <br/><br/><br/><br/>
        </Container>
      );
    }
    return (
      <Container style={menuStyle} id="list-papers-page">
        <Container fluid>
          <Header as="h1" textAlign="center">Papers Looking for Reviews</Header>
          <Input fluid icon="search" placeholder="Search paper by area of study separated by space or comma..." onChange={this.onChange}/>
          <br/>
        </Container>
        <br/>
        <CardGroup itemsPerRow={2}>
          {otherPapers.map((papers) => <DisplayPaper key={papers._id} paper={papers} />)}
        </CardGroup>
        <br/><br/><br/><br/>
      </Container>
    );
  }
}

ListPaper.propTypes = {
  paper: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  const ready = subscription.ready();
  const paper = Papers.collection.find({}).fetch();
  return {
    paper,
    ready,
  };
})(ListPaper);
