import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }
    state = {
        placesLoaded: false,
        removeAni: new Animated.Value(1),
        placesAni: new Animated.Value(0)
    }
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
    };

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAni, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAni, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    };

    itemSelectedHandler = key => {
        const selectedPlace = this.props.places.find(place => {
            return place.key === key;
        })
        this.props.navigator.push({
            screen: 'places.DetailPlaceScreen',
            title: this.props.places.find(place => {
                return place.key === key;
            }).name,
            passProps: {
                selectedPlace: selectedPlace
            }
        })
    }
    render() {
        let content = (
            <Animated.View
                style={{
                    opacity: this.state.removeAni,
                    transform: [
                        {
                            scale: this.state.removeAni.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Place</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
        if(this.state.placesLoaded){
            content = (
                <Animated.View
                    style={{
                        opacity: this.state.placesAni
                    }}>
                    <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
                </Animated.View>
            );
        }
        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange"
    }
})

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}


export default connect(mapStateToProps)(FindPlaceScreen);