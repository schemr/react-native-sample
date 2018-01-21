import React, { Component } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

class PickLocation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Text>Map</Text>
                </View>
                <View style={styles.btnContainer}>
                    <Button title="Locate Me" onPress={()=>alert('locate')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
    }
})

export default PickLocation;