import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import DetailPlaceScreen from './src/screens/DetailPlace/DetailPlace';
import SideMenu from './src/screens/SideMenu/SideMenu';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Register Screens 
Navigation.registerComponent(
  "places.AuthScreen", 
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "places.SharePlaceScreen", 
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "places.FindPlaceScreen", 
  () => FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "places.DetailPlaceScreen", 
  () => DetailPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "places.SideMenu", 
  () => SideMenu,
  store,
  Provider
);

// Start a App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "places.AuthScreen",
    title: "Login"
  }
});