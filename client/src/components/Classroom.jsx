import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Button, Container, Input } from 'semantic-ui-react';
import io from 'socket.io-client';
import SimpleWebRTC from 'simplewebrtc';

class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('localhost:3000');
    this.webrtc = new SimpleWebRTC({
      localVideoEL: 'localVideo',
      remoteVideosEL: 'remoteVideos',
      autoRequestMedia: true
    });
  }

  componentDidMount() {
    const channelId = '12345';
    const context = this;

    this.socket.on('connect', () => {
      console.log('Connecting');
      context.socket.emit('client:joinChannel', channelId, (err) => {
        if (!err) {
          console.log('Joined channel');
          context.webrtc.on('readyToCall', () => {
            context.webrtc.joinRoom(channelId);
          });
        } else {
          context.socket.disconnect();
        }
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnecting');
    });
  }

  render() {
    return (
      <Grid celled padded style={{height: '100vh'}}>
        <Grid.Column width={8}>
          <Grid.Row style={{height: '33%'}}>
            <p>Video</p>
            <div>
              <video id='localVideo'></video>
            </div>
            <div id='remoteVideos'></div>
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