import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

class SideMenu extends Component {
    render() {
        return (
            <View style={[styles.container, {width: Dimensions.get("window").width * 0.8}]}>
                <TouchableOpacity>
                    <View style={styles.menuItem}>
                        <Icon 
                            name={
                                Platform.OS === 'android' ? 'md-log-out' :
                                'ios-log-out'} size={30} color="#aaa" style={styles.menuIcon} />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "white",
        flex: 1
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    },
    menuIcon: {
        marginRight: 10
    }
})

export default SideMenu;