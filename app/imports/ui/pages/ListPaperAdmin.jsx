import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, CardGroup, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Papers } from '../../api/paper/Paper';
import DisplayPaperAdmin from '../components/DisplayPaperAdmin';

/** A simple static component to render some text for the landing page. */
class ListPaperAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: false,
      search: [],
    };
  }

  onChange = e => {
    this.setState({ search: e.target.value.split(/[ ,]+/) });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginTop: '25px' };
    const { search } = this.state;
    let otherPapers = this.props.paper;
    if (search.length > 1) {
      otherPapers = _.filter(otherPapers, function (papers) {
        return _.find(search, function (searches) {
          const area = papers.area;
          return _.contains(area, searches.toUpperCase());
        });
      });
    }
    return (
      <Container style={menuStyle} id="list-papers-admin-page">
        <Container fluid>
          <Header as="h1" textAlign="center">All Papers Uploaded</Header>
          <Input fluid icon="search" placeholder="Search paper by area of study separated by space or comma..." onChange={this.onChange}/>
          <br/>
          {/* <Button floated="right" icon as={NavLink} exact to="/addPaper" color='green'><Icon name='plus'/>Upload Paper</Button> */}
        </Container>
        <br/>
        <CardGroup itemsPerRow={2}>
          {otherPapers.reverse().map((papers) => <DisplayPaperAdmin key={papers._id} paper={papers} />)}
        </CardGroup>
        <br/><br/><br/><br/>
      </Container>
    );
  }
}

ListPaperAdmin.propTypes = {
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
})(ListPaperAdmin);
