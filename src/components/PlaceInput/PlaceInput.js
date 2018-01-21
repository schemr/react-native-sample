import React from "react";
import { View, TextInput, Button } from "react-native";
import InputStyle from '../UI/InputStyle/InputStyle';

const placeInput = props => (
  <InputStyle placeholder="Place Name" value={props.placeName} onChangeText={props.onChangeText}/>
);

export default placeInput;
