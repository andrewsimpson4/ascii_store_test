import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Box from './boxDisplay'
var lastAd = 0
export default class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        var displayArray = []
        var subtraction = 0
        var _index
        for (_index = 0; _index < this.props.data.length + Math.floor(this.props.data.length / 20);  _index++) {
            if (_index%20 !== 0 || _index === 0) {
                var i = _index - subtraction
                if (i > 30) { i = 0}
                displayArray.push(
                    <Box index={i} item={this.props.data[_index - subtraction]}/>
                )
            }else {
                subtraction++
                var currentAd = 0
                while(lastAd === currentAd) {
                    currentAd = Math.floor(Math.random()*1000)
                }
                lastAd = currentAd
                displayArray.push(
                        <Image
                            style={{width:200, height: 200, margin: 20}}
                            source={{uri: 'http://localhost:3000/ads/?r=' + String(currentAd)}}
                        />
                    )
            }
        }
        return (
            <View style = {styles.background}>
                {displayArray}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    background: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    box: {
        backgroundColor: '#ffffff',
        shadowOpacity: 0.1,
        shadowColor: 'black',
        shadowRadius: 10,
        width: 200,
        height: 200,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
  })
