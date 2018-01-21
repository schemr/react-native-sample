import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';
import InputStyle from '../../components/UI/InputStyle/InputStyle';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import imagePlaceholder from '../../assets/images/sea.jpg';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }
    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress") {
            if(event.id === "sideMenuToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }
    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>
                            Share a place
                        </HeadingText>
                    </MainText>
                    <View style={styles.placeholder}>
                        <Image source={imagePlaceholder} style={styles.previewImage} />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title="Pick Image" />
                    </View>
                    <View style={styles.placeholder}>
                        <Text>Map</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title="Locate Me" />
                    </View>
                    <InputStyle placeholder="Place Name" />
                    <View style={styles.btnContainer}>
                        <Button title="Share the Place" />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    btnContainer: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);