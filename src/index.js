import { registerRootComponent } from 'expo';
import React from 'react';
import Routes from './routes';
import { YellowBox } from 'react-native';

class App extends React.Component {
  construct() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = ['Setting a timer'];
  }
  render() {
    return <Routes />;
  }
}
registerRootComponent(App);
