import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { timeInterval } from 'rxjs/operators';

export default class Filter extends React.Component {
    header = undefined
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style = {styles.frame}>
                <Animatable.View ref={val => this.header = val} style = {styles.border}>
                    <Text style = {styles.headerOne}>faces</Text>
                </Animatable.View>
                <View style={styles.filterOptions}>
                    <TouchableOpacity onPress={() => this.filterSize()} activeOpacity={0.5}>
                        <Text style={styles.filterText}>size</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.filterPrice()} activeOpacity={0.5}>
                        <Text style={styles.filterText}>price</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.filterId()} activeOpacity={0.5}>
                        <Text style={styles.filterText}>id</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    filterSize = () => {
        if (this.props.loading === false) {
            this.header.transitionTo([{left: 30}], 400)
            this.props.newFilter('size')
        }
    }
    filterPrice = () => {
        if (this.props.loading === false) {
            this.header.transitionTo([{left: 280}], 400)
            this.props.newFilter('price')
        }
    }
    filterId = () => {
        if (this.props.loading === false) {
            this.header.transitionTo([{left: 530}], 400)
            this.props.newFilter('id')
        }
    }
}

const styles = StyleSheet.create({
    frame: {
        top: 50,
        width: 800,
        height: 100,
    },
    filterOptions: {
        flexDirection: 'row',
        left: 100,
        width: 600,
        height: 30,
        top: 15,
        justifyContent: 'space-between'
    },
    headerOne: {
        height: 50,
        fontFamily: 'Verdana',
        marginLeft: 40,
        marginRight: 40,
        fontSize: 38,
        color: 'white',
      },
    headerTwo: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: 'white',
    },
    border: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 40,
        overflow: 'hidden',
        height: 55,
        width: 250,
        left: 30
    },

    filterText: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        width: 100
    }
})