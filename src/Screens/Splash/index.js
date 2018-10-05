import React, { Component } from 'react';
import { Image, ActivityIndicator , View , Text, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import Utils from '@src/utils';
import {Images, Metrics, Colors} from '@Themes';
import CommonWidgets from '@CommonWidgets';

let netStateTimer;

class Splash extends Component {

  componentDidMount() {
    netStateTimer = setInterval(this.onTimer.bind(this), 1000);
     // this.gotoNext();
  }
  componentWillUnmount() {
    clearInterval(netStateTimer);
  }
  onTimer() {
    // if (this.props.globals.networkState) {
    clearInterval(netStateTimer);
    this.gotoNext();
    // }
    // CommonWidgets.showNetworkError();
  }

  async gotoNext() {
      clearInterval(netStateTimer);
      setTimeout(() => {
          this.props.navigation.dispatch(Utils.getResetAction('homeScreen'));
      }, 500);
  }

  render() {
    return (
        <View style={localStyles.mainContainer}>
            {
              CommonWidgets.renderStatusBar(Colors.primary_color)
            }
            <View style = {localStyles.logoContainer}>
              <Image source = {Images.logo} style = {localStyles.logo}/>
              <Image source = {Images.title} style = {localStyles.title} />
            </View>
        </View>
    );
  }
}

const localStyles = StyleSheet.create({
  mainContainer : {
    flex : 1, 
    backgroundColor : Colors.secondary_color
  },

  logoContainer : {
    width : responsiveWidth(100), 
    height : responsiveHeight(20), 
    marginTop : responsiveHeight(30),
    justifyContent : 'center', 
    alignItems : 'center'
  },
  logo : {
    width : responsiveHeight(10), 
    height : responsiveHeight(10), 
    resizeMode : 'stretch'
  },
  title : {
    width : responsiveWidth(80), 
    height : responsiveHeight(10), 
    resizeMode : 'stretch'
  }
});

function mapDispatchToProps(dispatch) {
  console.log(dispatch);
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  const loginStatus = state.states;
  return loginStatus;
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
