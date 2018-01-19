import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import InputStyle from '../../components/UI/InputStyle/InputStyle';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import BackgroundImg from '../../assets/images/background.jpg';

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }

    render () {
        return (
            <ImageBackground source={BackgroundImg} style={styles.backgroundImg}>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Login</HeadingText>
                    </MainText>
                    <Button title="Switch to login" />
                    <View style={styles.inputContainer}>
                        <InputStyle style={styles.input} placeholder="Email Address" />
                        <InputStyle style={styles.input} placeholder="Password" />
                        <InputStyle style={styles.input} placeholder="Confirm Password" />
                    </View>
                    <Button title="Login" onPress={this.loginHandler}/>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImg: {
        flex:1,
        width: '100%'
    },
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