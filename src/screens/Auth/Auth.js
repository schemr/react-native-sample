import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import InputStyle from '../../components/UI/InputStyle/InputStyle';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }

    render () {
        return (
            <View style={styles.container}>
                <HeadingText>Login</HeadingText>
                <Button title="Switch to login" />
                <View style={styles.inputContainer}>
                    <InputStyle style={styles.input} placeholder="Email Address" />
                    <InputStyle style={styles.input} placeholder="Password" />
                    <InputStyle style={styles.input} placeholder="Confirm Password" />
                </View>
                <Button title="Login" onPress={this.loginHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    }
})

export default AuthScreen;