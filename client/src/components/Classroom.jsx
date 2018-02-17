import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Button, Container, Input } from 'semantic-ui-react';

class Classroom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid celled padded style={{height: '100vh'}}>
        <Grid.Column width={8}>
          <Grid.Row style={{height: '33%'}}>
            <p>Video</p>
          </Grid.Row>
          <Grid.Row style={{height: '33%'}}>
            <p>Transcription</p>
          </Grid.Row>
          <Grid.Row style={{height: '33%'}}>
            <p>Messages</p>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={8}>
          <Grid.Row style={{height: '50%'}}>
            <p>Whiteboard</p>
          </Grid.Row>
          <Grid.Row style={{height: '50%'}}>
            <p>Editor</p>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Classroom;