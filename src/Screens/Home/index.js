import React, { Component } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Images, Metrics, Colors, Styles} from '@Themes';
import CommonWidgets from '@CommonWidgets';

class HomeScreen extends Component {
    render() {
        return (
            <View style = { Styles.fullcontainer }>
                {
                    CommonWidgets.renderStatusBar(Colors.primary_color)
                }
                
                <View style = { localStyles.logoContainer }>
                    <Image source = {Images.logo_title} style = {{width : responsiveWidth(70), height : responsiveHeight(8), resizeMode : 'stretch'}}/>
                </View>
                <View style = { localStyles.overviewContent }>
                    <Text style = { [ localStyles.overview, { marginTop : 10 } ] } >Welcome to Social Chief!</Text>
                    <Text style = { [ localStyles.overview, { marginTop : 7 } ] }>Our solution for all Social Media</Text>
                    <Text style = { [ localStyles.overview, { marginTop : 7 } ] }>Order may take upto 1 hour to start </Text>
                    <Text style = { [ localStyles.overview, { marginTop : 7, fontSize : responsiveFontSize(2), fontWeight : 'normal' } ] }>Please be patient Thank you!!!</Text>
                </View>
                <View style = { localStyles.logos }>
                    <Image source = {Images.ic_facebook} style = { localStyles.logo }/>
                    <Image source = {Images.ic_instagram} style = { [ localStyles.logo, { marginLeft : responsiveWidth(8) } ] }/>
                    <Image source = {Images.ic_youtube} style = { [ localStyles.logo, { marginLeft : responsiveWidth(8) } ] }/>
                </View>
                <View style = { localStyles.bottomPart }>
                    <TouchableOpacity 
                        activeOpacity = { 0.5 }
                        onPress = { ( ) => { 
                            this.props.navigation.navigate('categoryInit');
                        } }>
                        <View style = {localStyles.getStartButton}>
                            <Text style = {{color : Colors.primary_color, fontSize : responsiveFontSize(2), fontWeight : 'bold'}}>GET STARTED!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const localStyles = StyleSheet.create({
    logoContainer : {
        flex : 3,
        justifyContent : 'center',
        alignItems : 'center'
    },

    overviewContent : {
        flex : 3,
        flexDirection : 'column',
        alignItems : 'center'
    },

    overview :{
        color : Colors.primary_color, 
        fontSize : responsiveFontSize(2.2), 
        fontWeight : 'bold',
    },

    logos : {
        flex : 2,
        justifyContent : 'center',
        flexDirection : 'row'
    },
    
    logo : {
        width : responsiveWidth(15), 
        height : responsiveWidth(15), 
        resizeMode : 'stretch'
    },

    bottomPart : {
        flex : 2,
        alignItems : 'center'
    },

    getStartButton : {
        width : responsiveWidth(50),
        height : responsiveHeight(7),
        borderWidth : 1,
        borderRadius : responsiveHeight(7),
        borderColor : '#ecbcce',
        alignItems : 'center',
        justifyContent : 'center',
    }
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state) {
    return { app_state : state };
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);