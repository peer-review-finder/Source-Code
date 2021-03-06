import React from 'react';
import { Card, Header, Label, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';

class DisplayPaper extends React.Component {

  render() {
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    const button_style = { marginBottom: '5px' };
    let abstract = this.props.paper.abstract;
    if (abstract.length > 200) {
      abstract = `${abstract.substring(0, 200)}...`;
    }
    return (
      <Card color='green'>
        <Card.Content>
          <Card.Header className="title">{this.props.paper.title}</Card.Header>
          <Card.Meta>
            <span>{_.map(this.props.paper.authors, (name) => `${name}, `)}</span>
          </Card.Meta>
          <Card.Description>
            <Header as='h3'><br/>{_.map(this.props.paper.area,
              (tag, index) => <Label key={index} size='tiny' basic>{tag}</Label>)}<br/><br/> Abstract
            </Header>
            <div className="abstract">
              {abstract}
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/view_paper/${this.props.paper._id}`}>
            <Button style={button_style} fluid className="view-paper-button" size='large' color='blue'>View Paper</Button>
          </Link>
          { currentUser === this.props.paper.owner ? (
            <Card.Content>
              <Link to={`/editPaper/${this.props.paper._id}`}><Button style={button_style} fluid size='large' color='green' className="edit-paper-button">Edit Paper </Button></Link>
            </Card.Content>
          ) : '' }
        </Card.Content>
      </Card>
    );
  }
}

DisplayPaper.propTypes = {
  paper: PropTypes.shape({
    _id: PropTypes.string,
    owner: PropTypes.string,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    area: PropTypes.array,
    abstract: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(DisplayPaper);
