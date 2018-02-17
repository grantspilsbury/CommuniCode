import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Classroom from './Classroom.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Classroom />
    );
  }
}

export default App;