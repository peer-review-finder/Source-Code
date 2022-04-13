import React from 'react';
import { Card, Header, Label, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';

class DisplayPaper extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // const _id = this.props.paper._id;
    // const reviewer = Meteor.user().username;
  }

  render() {
    return (
      <Card color='green'>
        <Card.Content>
          <Card.Header className="title">{this.props.paper.title}</Card.Header>
          <Card.Meta>
            <span>{this.props.paper.author}</span>
          </Card.Meta>
          <Card.Description>
            <Header as='h5'>Abstract</Header>
            <div className="abstract">
              {this.props.paper.abstract}
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'>Area</Header>
          {_.map(this.props.paper.area,
            (tag, index) => <Label key={index} size='tiny' color='black'>{tag}</Label>)}
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'><a href={this.props.paper.link} target="_blank" rel="noopener noreferrer">Link to Paper</a></Header>
        </Card.Content>
        <Card.Content extra>
          <Button basic size='tiny' onClick={this.handleClick} color='green'>Review</Button>
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
    author: PropTypes.string,
    area: PropTypes.array,
    abstract: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(DisplayPaper);
