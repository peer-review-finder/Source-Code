import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Button, CardGroup, Input, Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Papers } from '../../api/paper/Paper';
import DisplayPaper from '../components/DisplayPaper';

/** A simple static component to render some text for the landing page. */
class ListPaper extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
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
    // const currentUser = Meteor.user().username;
    // let otherPapers = this.props.paper;
    // otherPapers = _.reject(otherPapers, function (papers) { return papers.owner === currentUser; }); // filter out paper created by you
    return (
      <Container>
        <Container fluid>
          <Header as="h1" textAlign="center">Paper Looking for Reviews</Header>
          <Input fluid icon="search" placeholder="Search paper by area of study separated by space or comma..."/>
          <br/>
          <Dropdown
            selection
            defaultValue={sortOptions[0].value}
            options={sortOptions}
          />
          <Button floated="right" icon as={NavLink} exact to="/addPaper" color='green'><Icon name='plus'/>Upload Paper</Button>
        </Container>
        <br/>
        <CardGroup itemsPerRow={4}>
          {this.props.paper.map((papers, index) => <DisplayPaper key={index} paper={papers} />)}
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
