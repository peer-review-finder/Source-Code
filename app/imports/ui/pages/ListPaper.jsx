import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Button, CardGroup, Input, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Papers } from '../../api/paper/Paper';
import DisplayPaper from '../components/DisplayPaper';

/** A simple static component to render some text for the landing page. */
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
    // eslint-disable-next-line no-unused-vars
    const sortOptions = [
      {
        key: 'All',
        text: 'All',
        value: 'All',
      },
      {
        key: 'Conference',
        text: 'Conference',
        value: 'Conference',
      },
      {
        key: 'Essay',
        text: 'Essay',
        value: 'Essay',
      },
      {
        key: 'Journal',
        text: 'Journal',
        value: 'Journal',
      },
    ];
    const { search } = this.state;
    // const currentUser = Meteor.user().username;
    let otherPapers = this.props.paper;
    if (search.length > 1) {
      otherPapers = _.filter(otherPapers, function (papers) {
        return _.find(search, function (searches) {
          const area = papers.area;
          return _.contains(area, searches.toUpperCase());
        });
      });
    }
    // otherPapers = _.reject(otherPapers, function (papers) { return papers.owner === currentUser; }); // filter out paper created by you
    // <Dropdown selection defaultValue={sortOptions[0].value} options={sortOptions}/>
    return (
      <Container>
        <Container fluid>
          <Header as="h1" textAlign="center">Paper Looking for Reviews</Header>
          <Input fluid icon="search" placeholder="Search paper by area of study separated by space or comma..." onChange={this.onChange}/>
          <br/>
          <Button floated="right" icon as={NavLink} exact to="/addPaper" color='green'><Icon name='plus'/>Upload Paper</Button>
        </Container>
        <br/>
        <CardGroup itemsPerRow={4}>
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
