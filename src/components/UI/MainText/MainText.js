import React from 'react';
import { Text, StyleSheet } from 'react-native';

const mainText = props => (
    <Text style={styles.mainTextStyle}>{props.children}</Text>
);

const styles = StyleSheet.create({
    mainTextStyle: {
        color: '#ccc',
        backgroundColor: 'transparent'
    }
})

export default mainText;