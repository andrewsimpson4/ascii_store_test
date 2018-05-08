import React, { Component } from 'react';
import Grid from './Grid'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Filter from './filter'
import apiControler from './apiControl'

Animatable.initializeRegistryWithDefinitions( { spin: {
    from: {
      transform: [{ rotate: '-8deg'}],
    },
    to: {
      transform: [{ rotate: '8deg'}],
    },
  } }
)


class App extends React.Component {
  api = new apiControler()
  background = undefined
  currentFilter = 'size'
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true
    }
  }
  componentDidMount() {
    this.api.getDataByFilter('size', this.setDataState)
    document.addEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <View style = {styles.background}>
        <Filter loading={this.state.isLoading} newFilter={ (filter) => {
          this.currentFilter = filter
          this.transitionScreen()
          this.api.amount = 30
          this.api.getDataByFilter(filter, this.setDataState)
        }}/>
        <Animatable.View ref={val => this.background = val} style = {{top: 100}}>
          {this.getBaseScreen(this.state.isLoading)}
        </Animatable.View>
      </View>
    );
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight) {
      this.setState({data: this.api.backburner})
      this.api.getBackburner(this.currentFilter)
    }
  }

  setDataState = (data) => {
    this.setState({data: data})
    this.transitionScreen()
  }
  
  getBaseScreen = (loading) => {
    if (loading === true) {
      return (
        <Animatable.View animation="slideInDown" iterationCount="infinite" direction="alternate" style = {styles.loader}>
            <Animatable.View animation={"spin"} duration={250} easing={"ease-in-out-quad"}direction="alternate"iterationCount="infinite" style = {[styles.loader, {top: 0}]}/>
        </Animatable.View>
          
      )
    }else {
      return (
        <Grid data = {this.state.data}/>
      )
    }
  }

  transitionScreen() {
    if (this.state.isLoading === true) {
      this.background.fadeOut(500)
      setTimeout(() => {
        this.setState({isLoading: false})
        this.background.fadeIn(500)
      }, 500);

    }else {
      this.background.fadeOut(500)
      setTimeout(() => {
        this.setState({isLoading: true})
        this.background.fadeIn(500)
      }, 500);
    }
  }

}

const styles = StyleSheet.create({
  background: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  loader: {
    top: 300,
    backgroundColor: '#ffffff',
    shadowOpacity: 0.1,
    shadowColor: 'black',
    shadowRadius: 10,
    width: 200,
    height: 200,
  }

})

export default App;
