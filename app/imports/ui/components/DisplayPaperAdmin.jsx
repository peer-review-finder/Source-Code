import React from 'react';
import { Card, Header, Label, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Papers } from '../../api/paper/Paper';

class DisplayPaper extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    Papers.collection.remove(id);
  }

  render() {
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
              {this.props.paper.abstract}
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as="h5">Uploader:{this.props.paper.owner}</Header>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/view_paper/${this.props.paper._id}`}>
            <Button fluid className="view-paper-button" basic size='tiny' color='green'>View Paper</Button>
          </Link>
          <Link to={`/editPaper/${this.props.paper._id}`}>
            <Button fluid basic size='tiny' color='green'>Edit Paper</Button>
          </Link>
          <Button fluid id="delete-paper-button" basic size='tiny' color='red' onClick={() => this.handleClick(this.props.paper._id)}>Remove/Ban</Button>
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
