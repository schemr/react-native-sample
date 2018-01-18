import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";

// Register Screens 
Navigation.registerComponent("places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("places.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("places.FindPlaceScreen", () => FindPlaceScreen);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "places.AuthScreen",
    title: "Login"
  }
});