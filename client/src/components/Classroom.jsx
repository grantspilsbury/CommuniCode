import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Button, Container, Input } from 'semantic-ui-react';
import io from 'socket.io-client';
import SimpleWebRTC from 'simplewebrtc';

class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('localhost:3000');
    this.startVideo = this.startVideo.bind(this);
    this.webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remoteVideos',
      autoRequestMedia: true,
    });
    this.state = {
      channelId: '12345'
    }
  }

  componentDidMount() {
    const context = this;
    this.socket.on('connect', () => {
      console.log('Connecting');
      context.socket.emit('client:joinChannel', context.state.channelId, (err) => {
        console.log('Trying to join channel');
        if (!err) {
          console.log('Joined channel');
        } else {
          console.log('Error in trying to join a channel', err);
          context.socket.disconnect();
        }
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnecting');
    });
  }

  startVideo() {
    var context = this;
    this.webrtc.on('readyToCall', function () {
      context.webrtc.joinRoom(context.state.channelId);
      console.log('Started video');
    });
  }

  render() {
    this.startVideo();
    return (
      <Grid celled padded style={{height: '100vh'}}>
        <Grid.Column width={8}>
          <Grid.Row style={{height: '33%'}}>
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