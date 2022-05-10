import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, CardGroup, Grid, Icon, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Papers } from '../../api/paper/Paper';
import DisplayPaper from '../components/DisplayPaper';

/** A simple static component to render some text for the listPaper page. */
class ListPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listingUpdate: new Date() };
    this.search = [];
  }

  onChange = (e) => {
    this.search = e.target.value.trim().split(/[ ,]+/);
  }

  filterListing = () => {
    this.setState({ listingUpdate: new Date() });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginTop: '25px' };
    if (this.props.papers.length === 0) {
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
    const search = this.search;
    const currentUser = Meteor.user().username;
    let filteredPapers = _.reject(this.props.papers, function (paper) { return paper.owner === currentUser; });// filter out paper created by you
    if (search.length > 0 && search[0].length > 0) {
      filteredPapers = _.filter(filteredPapers, function (papers) {
        return _.some(search, function (searches) {
          const areas = _.map(papers.area, function (area) { return area.toUpperCase(); });
          return _.contains(areas, searches.toUpperCase());
        });
      });
    }
    let content = <div/>;
    if (filteredPapers.length === 0) {
      content = (
        <Header as='h2' icon textAlign='center'>
          <Icon name='file alternate outline'/>
          No Papers Found
          <Header.Subheader>
            No papers meet your search, please try another search.
          </Header.Subheader>
        </Header>
      );
    } else {
      content = (
        <CardGroup itemsPerRow={2}>
          {filteredPapers.reverse().map((papers) => <DisplayPaper key={papers._id} paper={papers} />)}
        </CardGroup>
      );
    }

    return (
      <Container style={menuStyle} id="list-papers-page">
        <Header as="h1" textAlign="center">Papers Looking for Reviews</Header>
        <Form style={{ marginBottom: '20px' }} onSubmit={this.filterListing}>
          <Form.Group>
            <Form.Input width={12} fluid placeholder="Search paper by area of study separated by space or comma..." onChange={this.onChange} />
            <Form.Button width={4} fluid color='green'>Search</Form.Button>
          </Form.Group>
        </Form>
        {content}
        <br/><br/><br/><br/>
      </Container>
    );
  }
}

ListPaper.propTypes = {
  papers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Papers.userPublicationName);
  const ready = subscription.ready();
  const papers = Papers.collection.find({}).fetch();
  return {
    papers,
    ready,
  };
})(ListPaper);
