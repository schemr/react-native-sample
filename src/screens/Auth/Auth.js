import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import InputStyle from '../../components/UI/InputStyle/InputStyle';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import BackgroundImg from '../../assets/images/background.jpg';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get('window').height>500 ? 'portrait' : 'landscape'
    }
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }
    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }
    loginHandler = () => {
        startMainTabs();
    }

    render () {
        let headingText = null;
        if(this.state.viewMode === 'portrait'){
            headingText = (
                <MainText>
                    <HeadingText>Login</HeadingText>
                </MainText>
            )
        }
        return (
            <ImageBackground source={BackgroundImg} style={styles.backgroundImg}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground color="#29aaf4">Switch to login</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <InputStyle style={styles.input} placeholder="Email Address" />
                        <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                        <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                            <InputStyle style={styles.input} placeholder="Password" />
                        </View>
                        <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                            <InputStyle style={styles.input} placeholder="Confirm Password" />
                        </View>
                        </View>
                    </View>
                    <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Login</ButtonWithBackground>
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
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordWrapper: {
        width: '45%'
    },
    portraitPasswordWrapper: {
        width: '100%'
    }
})

export default AuthScreen;