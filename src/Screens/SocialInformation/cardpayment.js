import React, { Component } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight,
    TouchableOpacity,
    Keyboard,
    TextInput,
    Alert,
    Platform
} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Images, Metrics, Colors, Styles} from '@Themes';
import CommonWidgets from '@CommonWidgets';

class InstagramFollowers extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading : false,
            cardnumber : '',
            exp_month : '',
            exp_year : '',
            cvv : '',
        };
    }
    
    Checkout( ) {
        /*
        if(this.state.cardnumber !== '' && this.state.exp_month !== '' && this.state.exp_year !== '' && this.state.cvv !== '')
        {
            var amount = this.props.selectedPK.price;
            PayWithCard(this.state.cardnumber, this.state.exp_month, this.state.exp_year, this.state.cvv, amount, this).then(resp => {
                this.props.navigation.goBack();
            });
        }
        else{
            Alert.alert('Waring', 'Please complete all field!');
        }*/
    }

    render() {
        var Indicator = 
            <View style={{ position : 'absolute', width : responsiveWidth(100), height : responsiveHeight(100), backgroundColor : 'transparent' }}>
                <BallIndicator color={Colors.primary_color} animationDuration={800} size={responsiveWidth(30)}/>
            </View>
        return (
            <View style = { Styles.fullcontainer }>
                {
                    CommonWidgets.renderStatusBar(Colors.primary_color)
                }
                <View style = { Styles.actionBar }>
                    <View style = { [ Styles.titleContainer, { alignItems : 'center', justifyContent : 'center' } ] }>
                        <Text style = { Styles.titleText } > Pay with Credit Card(All Card) </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity = { 0.5 }
                        onPress = { ( ) => { 
                            this.props.navigation.goBack();
                        } }
                        >
                        <View style = { Styles.backButtonContainer }>
                            
                            <Image source = {Images.ic_back} style = {Styles.backButton}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    activeOpacity = { 1 } 
                    style = {{ backgroundColor : 'white'}}
                    onPress = { () => { 
                        Keyboard.dismiss();
                    } }>
                <View style = { [ Styles.content, { flexDirection : 'column'} ] }>
                    <View style = {{flex : 1, alignItems : 'center'}}>
                        <View style = {{flex : 2}}>
                        </View>
                        <TextInput 
                            style = {{flex : 1.5, width : responsiveWidth(90), borderWidth : 1, borderColor : Colors.border_color, borderRadius : 5}}
                            placeholder = 'Carde Number'
                            autoCapitalize = 'none'
                            keyboardType = 'numeric'
                            value = { this.state.cardnumber }
                            onChangeText = { (text) => {
                                this.setState({
                                    cardnumber : text
                                })
                            } }
                            autoCorrect = { false } 
                            />                        
                        <View style = {{flex : 2}}></View>
                        <View style = {{flex : 1.5, width : responsiveWidth(90), flexDirection : 'row'}}>
                            <TextInput
                                placeholder = 'MM'
                                autoCapitalize = 'none'
                                autoCorrect = { false } 
                                value = { this.state.exp_month }
                                keyboardType = 'numeric'
                                onChangeText = { (text) => {
                                    this.setState({
                                        exp_month : text
                                    })
                                } }                               
                                style = {{flex : 2, borderWidth : 1, borderColor : Colors.border_color, borderRadius : 5}}
                            />
                            <View style = {{flex : 1}}/>
                            <TextInput
                                placeholder = 'YY'
                                autoCapitalize = 'none'
                                autoCorrect = { false } 
                                keyboardType = 'numeric'
                                value = { this.state.exp_year }
                                onChangeText = { (text) => {
                                    this.setState({
                                        exp_year : text
                                    })
                                } }  
                                style = {{flex : 2, borderWidth : 1, borderColor : Colors.border_color, borderRadius : 5}}
                            />
                            <View style = {{flex : 1}}/>
                            <TextInput
                                placeholder = 'CVV'
                                keyboardType = 'numeric'
                                autoCapitalize = 'none'
                                autoCorrect = { false } 
                                value = { this.state.cvv }
                                onChangeText = { (text) => {
                                    this.setState({
                                        cvv : text
                                    })
                                } }  
                                style = {{flex : 3, borderWidth : 1, borderColor : Colors.border_color, borderRadius : 5}}
                            />
                        </View>
                        <View style = {{flex : 2}}></View>
                        <TouchableOpacity 
                            activeOpacity = { 0.5 }
                            onPress = { () => { 
                                this.Checkout();
                            } }
                            style = {{ 
                                flex : 1.5, 
                                width : responsiveWidth(50), 
                                backgroundColor : Colors.primary_color, 
                                borderRadius : 10, 
                                alignItems : 'center',
                                justifyContent : 'center'
                            }}>
                            <Text style = {{color : 'white', fontSize : responsiveFontSize(2.5), fontWeight : 'bold'}}>Check out</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex : 1, backgroundColor : 'gray'}}>
                    </View>
                    {
                        this.state.isLoading ?
                        Indicator : undefined
                    }
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state) {
    return { 
        selectedPK : state.states.selectedPackage ,
        category : state.states.selectedCategory,
        subcategory :  state.states.selectedSubCategory
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(InstagramFollowers);