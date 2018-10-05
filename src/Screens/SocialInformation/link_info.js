import React, { Component } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight,
    TouchableOpacity,
    Keyboard,
    TextInput,
    KeyboardAvoidingView,
    Alert
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PopupDialog from 'react-native-popup-dialog';
import {  PayWithPaypal } from '@ServerApi/payment';
import {  Service } from '@ServerApi/service';

import {Images, Metrics, Colors, Styles} from '@Themes';
import CommonWidgets from '@CommonWidgets';

class LinkInformation extends Component {
    constructor(props){
        super(props);

        this.state = {
            link : '',
            isLoading : false,
        }
    }

    Checkout( ) {
        if(this.state.link !== '')
            this.popupDialog.show();
        else{
            Alert.alert('Waring', 'There is no link');
        }
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
                        <Text style = { Styles.titleText } > { this.props.selectedPK.property1 }</Text>
                    </View>

                    <View style = { Styles.backButtonContainer }>
                        <TouchableOpacity
                            activeOpacity = { 0.5 }
                            onPress = { ( ) => { 
                                Keyboard.dismiss();
                                this.props.navigation.goBack();
                            } }
                            >
                            <Image source = {Images.ic_back} style = {Styles.backButton}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <KeyboardAwareScrollView>
                
                    <View style = { [ Styles.content, { flexDirection : 'column'} ] }>
                        <View style = {{flex : 1}}>
                        </View>
                        <View style = {{flex : 1, width : responsiveWidth(70),borderBottomWidth : 1, borderColor : Colors.primary_color, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = { [Styles.titleText, { fontSize : responsiveFontSize(3) }] }> { '€' + this.props.selectedPK.price }</Text>
                        </View>
                        <View style = {{flex : 1.3, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = {{fontSize : responsiveFontSize(2), color : Colors.primary_color}}>{ '+' + this.props.selectedPK.property1 }</Text>
                        </View>
                        <View style = {{flex : 1}}>
                            <Text style = {{fontSize : responsiveFontSize(2), color : Colors.primary_color}}>Delivery : Starts instantly</Text>
                        </View>

                        <View style = {{flex : 2, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = { [Styles.titleText, { fontSize : responsiveFontSize(3) }] }>Insert your Full html link here</Text>
                        </View>
                        
                        <View style = {{ flex : 0.7 }}>
                            <TextInput 
                                autoCapitalize = 'none'
                                autoCorrect = { false }
                                underlineColorAndroid = 'transparent'
                                value = { this.state.link }
                                onChangeText = { (text) => {
                                    this.setState({
                                        link : text
                                    });
                                }}
                                style = {{flex : 0.7, width : responsiveWidth(70), borderWidth : 1, color : Colors.primary_color ,borderColor : Colors.border_color, borderRadius : 5}}>
                            </TextInput>
                        </View>

                        <View style = {{flex : 0.5, }}></View>

                        <TouchableOpacity 
                                activeOpacity = { 0.5 }
                                onPress = { ( ) => {
                                    this.Checkout();
                                }}
                                style = {{flex : 0.7, width : responsiveWidth(40), backgroundColor : Colors.primary_color, borderRadius : 5, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = {{color : 'white', fontSize : responsiveFontSize(2), fontWeight : 'bold'}}>CheckOut</Text>
                        </TouchableOpacity>

                        <View style = {{flex : 3}}>
                        </View>

                        <PopupDialog
                            width = { responsiveWidth(80) } 
                            height = { Styles.content.height / 2 }
                            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        >
                            <View style = {{paddingTop : Styles.content.height / 20, paddingBottom : Styles.content.height / 20, alignItems : 'center'}}>
                                <TouchableOpacity 
                                    activeOpacity = { 0.5 }
                                    onPress = { () => { 
                                            this.popupDialog.dismiss();

                                            var amount = this.props.selectedPK.price;
                                            var description = this.props.category + ' ' + this.props.subcategory + ' ' + this.props.selectedPK.level + ' x1';

                                            PayWithPaypal(amount, description, this,
                                                () => {
                                                    return Service(this.props.category, this.props.subcategory, this.props.selectedPK.quantity, this.state.link )
                                                        .then(resp => resp);
                                                }
                                            );
                                        }
                                    }
                                    style = {{
                                        borderColor : Colors.border_color, 
                                        borderWidth : 1,
                                        borderRadius : 5,
                                        alignItems : 'center',
                                        justifyContent : 'center',
                                        width : responsiveWidth(70), 
                                        height : Styles.content.height / 10 }}
                                    >
                                    <Image source = {Images.ic_paypal} style = {{height : Styles.content.height * 0.9 / 10, width : responsiveWidth(35), resizeMode : 'stretch'}}/>
                                </TouchableOpacity>

                                <View style = {{backgroundColor : 'white', width : responsiveWidth(70), height : Styles.content.height / 20 }} />

                                <TouchableOpacity 
                                    activeOpacity = { 0.5 }
                                    onPress = { () => { 
                                            this.popupDialog.dismiss();
                                            this.props.navigation.navigate('stripepayment');
                                        }
                                    }
                                    style = {{
                                        borderColor : Colors.border_color, 
                                        borderWidth : 1,
                                        borderRadius : 5,
                                        alignItems : 'center',
                                        justifyContent : 'center',
                                        width : responsiveWidth(70), 
                                        height : Styles.content.height / 10 }}
                                    >
                                    <Image source = {Images.ic_stripe} style = {{height : Styles.content.height / 10, width : responsiveWidth(35), resizeMode : 'stretch'}}/>
                                </TouchableOpacity>

                                <View style = {{backgroundColor : 'white', width : responsiveWidth(70), height : Styles.content.height / 20 }} />

                                <TouchableOpacity 
                                    activeOpacity = { 0.5 }
                                    onPress = { () => { 
                                            this.popupDialog.dismiss();
                                            this.props.navigation.navigate('cardpayment');
                                        }
                                    }
                                    style = {{
                                        borderColor : Colors.border_color, 
                                        borderWidth : 1,
                                        borderRadius : 5,
                                        alignItems : 'center',
                                        justifyContent : 'center',
                                        width : responsiveWidth(70), 
                                        height : Styles.content.height / 10 }}
                                    >
                                    <Image source = {Images.ic_creditcard} style = {{height : Styles.content.height * 0.8 / 10, width : responsiveWidth(60), resizeMode : 'stretch'}}/>
                                </TouchableOpacity>
                            </View>
                        </PopupDialog>
                        {
                            this.state.isLoading ?
                            Indicator : undefined
                        }
                    </View>
                </KeyboardAwareScrollView>
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
    return { selectedPK : state.states.selectedPackage ,
        category : state.states.selectedCategory,
        subcategory :  state.states.selectedSubCategory };
}

export default connect(mapStateToProps,mapDispatchToProps)(LinkInformation);