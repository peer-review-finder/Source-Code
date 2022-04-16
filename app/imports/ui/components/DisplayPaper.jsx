import React from 'react';
import { Card, Header, Label, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
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
            <Header as='h3'>Abstract<br/>{_.map(this.props.paper.area,
              (tag, index) => <Label key={index} size='tiny' basic>{tag}</Label>)}
            </Header>
            <div className="abstract">
              {this.props.paper.abstract}
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'><a href={this.props.paper.link} target="_blank" rel="noopener noreferrer">Link to Paper</a></Header>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/view_paper/${this.props.paper._id}`}>
            <Button basic size='tiny' color='green'>View Paper</Button>
          </Link>
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