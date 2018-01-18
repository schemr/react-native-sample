import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';

// Register Screens 
Navigation.registerComponent("sample.AuthScreen", () => AuthScreen);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "sample.AuthScreen",
    title: "Login"
  }
});