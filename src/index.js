import { registerRootComponent } from 'expo';
import React from 'react';
import Routes from './routes';

class App extends React.Component {
  render() {
    return <Routes />;
  }
}
registerRootComponent(App);
