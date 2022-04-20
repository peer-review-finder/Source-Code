import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='landing-background' id='landing-page'>
        <Header as='h1' textAlign='center' inverted>Getting Peer Reviews is as Easy as 1-2-3! </Header>
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
        <Grid container centered stackable columns={4}>
          <Grid.Column textAlign='center'>
            <Header as='h1' inverted>100 <br /> Authors</Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Header as='h1' inverted>20 <br /> Topics</Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Header as='h1' inverted>1,000 <br /> Papers</Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Header as='h1' inverted>50 <br /> Per Month</Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
