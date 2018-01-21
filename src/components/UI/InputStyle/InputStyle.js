import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const inputStyle = props => (
    <TextInput
        {...props}
        placeholder={props.placeholder}
        style={[styles.input, props.style]}
        underlineColorAndroid="transparent"
    />
);

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginTop: 8,
        marginBottom: 8
    }
})

export default inputStyle;