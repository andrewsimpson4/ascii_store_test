import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { timeInterval } from 'rxjs/operators';

var ScreenTypes = Object.freeze({"face":1, "buy":2})

export default class Box extends React.Component {
    box = undefined
    constructor(props) {
        super(props)
        this.state = {
           screen: ScreenTypes.face
        }
        this.getDate(this.props.item.date)
    }

    render() {
        return (
            <div onMouseEnter={() => this.enteredBox()} onMouseLeave={ () => this.boxOut()}>
                <Animatable.View ref={val => this.box = val} 
                    style={styles.backgroundColor} 
                    animation="fadeIn" duration={1000} 
                    delay={this.props.index * 100} 
                    style = {styles.box}>
                    {this.currentScreen(this.state.screen)}
                </Animatable.View>
            </div>
        )
    }

    currentScreen = (screen) => {
        if (screen === ScreenTypes.face) {
            return (
                <Text editable={false} selectTextOnFocus={false} 
                    style = {[styles.text, {fontSize: this.props.item.size}]}>{this.props.item.face}</Text>
            )
        }else if (screen === ScreenTypes.buy) {
            return (
                <View style = {styles.multiTextBox}>
                    <Text editable={false} selectTextOnFocus={false} style = {styles.textDate}>{this.getDate(this.props.item.date)}</Text>
                    <Text editable={false} selectTextOnFocus={false} style = {[styles.text, {fontSize: this.props.item.size, marginTop: 70}]}>{this.props.item.face}</Text>
                    <View style = {styles.buyButton}>
                        <Text editable={false} selectTextOnFocus={false} style = {[styles.text, {fontSize: 20, color: 'white', marginTop: 0}]}>${(this.props.item.price*0.01).toFixed(2)}</Text>
                    </View>
                </View>
            )
        }
    }

    enteredBox = () => {
        this.box.flipInY(800)
        setTimeout(() => {
            this.setState({screen: ScreenTypes.buy})
        }, 100);
    }

    boxOut = () => {
        this.box.fadeOut(400).then( () => this.box.fadeIn(400))
        setTimeout(() => {
            this.setState({screen: ScreenTypes.face})
        }, 400);
    }

    getDate = (date) => {
        var timestamp = new Date(date).getTime()
        var difSeconds = Math.floor(Date.now() / 1000) -  (Math.floor(timestamp / 1000))
        var min = Math.floor(difSeconds / 60)
        var hours = Math.floor(min / 60)
        var days = Math.floor(hours / 24)
        var weeks = Math.floor(days / 7)
        if (weeks >= 1) {
            return ( new Date(date).toDateString() )
        } else if (days >= 1) {
            return ( days + "days")
        }else if (hours >= 1) {
            return ( hours + "hours")
        }else {
            return ( min + "min")
        }
    }
}


const styles = StyleSheet.create({
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
    multiTextBox: {
        width: 200,
        height: 200,
        alignItems: 'center',
    },
    textDate: {
        marginTop: 5,
        marginLeft: 5,
        width: 200,
        color: '#777777',
        fontSize: 7
    },
    text: {
        width: 200,
        fontSize: 7,
        color: '#777777',
        textAlign: 'center',
    },

    buyButton: {
        position: 'absolute',
        left: 25,
        bottom: -20,
        width: 150,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fffff',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
   
  })
