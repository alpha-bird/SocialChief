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
    Platform,
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
import PopupDialog from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Images, Metrics, Colors, Styles} from '@Themes';
import CommonWidgets from '@CommonWidgets';
import { GetProfileApi,  } from '@ServerApi';
import {  PayWithPaypal } from '@ServerApi/payment';
import {  Service } from '@ServerApi/service';

class InstagramFollowers extends Component {
    constructor(props){
        super(props);

        this.state = {
            requireName : 'official_cityboy',
            profileLoaded : false,
            isLoading : false,

            profileName : '',
            followed : 0,
            profileAvatar : '',
        };
    }
    
    Checkout( ) {
        this.popupDialog.show();
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
                    <View style = { localStyles.inputContainer }>
                        <View style = {{flex : 0.5}}/>
                        
                        <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = { [Styles.titleText, { fontSize : responsiveFontSize(2) } ] }>Instagram Username</Text>
                        </View>
                        
                        <View style = {{flex : 0.5}}/>

                        <View style = {{flex : 1}}>
                        <TextInput 
                            autoCapitalize = 'none'
                            autoCorrect = { false }
                            value = { this.state.requireName }
                            onChangeText = { (text) => {
                                this.setState({
                                    requireName : text
                                });
                            }}
                            underlineColorAndroid = 'transparent'
                            style = { localStyles.nameInput }/>
                        </View>

                        <View style = {{flex : 1}}/>
                        
                        <TouchableOpacity activeOpacity = { 0.5 } 
                                onPress = {( ) => { 
                                    this.setState({
                                        isLoading : true,
                                    });

                                    GetProfileApi(this.state.requireName).then(resp => {
                                        this.setState({
                                            isLoading : false,
                                        });
                                        console.log(resp);
                                        if(resp !== null) {
                                            if(resp.meta.code === 200)
                                            {
                                                this.setState({
                                                    profileName : resp.data.username,
                                                    profileAvatar : resp.data.profile_picture,
                                                    profileLoaded : true,
                                                    followed : resp.data.counts.followed_by,
                                                });
                                            }
                                            else{
                                                Alert.alert('Warning', 'The user not existed or not available');
                                            }
                                        }
                                        else {
                                            Alert.alert('Warning', 'The user not existed or not available');
                                        }
                                        return 1;
                                    });
                                }}
                                style = { localStyles.loadButton }
                                >
                                <Text style = { localStyles.Text1 }>LOAD</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.profileLoaded === true ?
                        <View style = { localStyles.checkoutContainer }>
                            <View style = {{ flex : 0.5}}/>

                            <View style = {{ width : responsiveWidth(80), flex : 5, borderWidth : 1, borderColor : Colors.primary_color}}>
                                <View style = {{ flex : 0.8, borderBottomColor : '#ececec', borderBottomWidth : 1, alignItems : 'center', justifyContent : 'center'}}>
                                    <Text style = { [ localStyles.Text1 , { color : Colors.primary_color } ] }>{'€' + this.props.selectedPK.price}</Text>
                                </View>
                                <View style = {{ flex : 5}}>
                                    <View style = {{flex : 0.5, alignItems : 'center', justifyContent : 'center'}}>
                                        <Text style = { [ localStyles.Text1 , { color : Colors.primary_color, fontWeight : 'normal' } ] }>Profile : { this.state.profileName }</Text>
                                    </View>
                                    <View style = {{flex : 2, justifyContent : 'center',alignItems : 'center'}}>
                                        {
                                            this.state.profileAvatar === '' ?
                                            <Image source = { Images.ic_default_avatar } style = { localStyles.profileAvatar }/>
                                            :
                                            <Image source = { { uri : this.state.profileAvatar } } style = { localStyles.profileAvatar }/>
                                        }
                                        
                                    </View>

                                    <View style = {{flex : 1.5, alignItems : 'center'}}>
                                        <View style = {{flex : 1, width : responsiveWidth(60), borderBottomWidth : 1, borderBottomColor : Colors.primary_color ,justifyContent : 'center', alignItems : 'center'}}>
                                            <Text style = {{color : Colors.primary_color, fontSize : responsiveFontSize(2)}}>Current Followers : { this.state.followed } </Text>
                                        </View>
                                        <View style = {{flex : 1, justifyContent : 'center', }}>
                                            <Text style = {{ color : Colors.primary_color,fontSize : responsiveFontSize(1.8) }}>{'+' + this.props.selectedPK.property1}</Text>
                                        </View>
                                        <View style = {{flex : 1, }}>
                                            <Text style = {{ color : Colors.primary_color, fontSize : responsiveFontSize(1.8) }}>Delivery : Starts instantly</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                    activeOpacity = { 0.5 }
                                    onPress = { ( ) => { 
                                        this.Checkout();
                                    } }
                                    style = { localStyles.checkoutButton }>
                                    <Text style = { localStyles.Text1 }>CheckOut</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style = {{ flex : 0.5}}/>
                        </View>
                        :
                        undefined
                    }
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
                                                return Service(this.props.category, this.props.subcategory, this.props.selectedPK.quantity, 'https://www.instagram.com/' + this.state.profileName )
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
                </TouchableOpacity>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    inputContainer : {
        width : responsiveWidth(100), 
        height : Styles.content.height * 3/10, 
        alignItems : 'center',
        justifyContent : 'center'
    },

    nameInput : {
        flex : 1,
        width : responsiveWidth(70),
        borderWidth : 1,
        borderColor : Colors.border_color,
        borderRadius : 5,
        textAlign : 'center',
        color : Colors.primary_color,
        fontWeight : 'bold'
    },

    loadButton : {
        flex : 1, 
        width : responsiveWidth(40), 
        backgroundColor : Colors.primary_color, 
        borderRadius : 5,
        alignItems : 'center',
        justifyContent : 'center'
    },
    Text1 : {
        color : Colors.secondary_color, fontWeight : 'bold', fontSize : responsiveFontSize(2)
    },

    checkoutContainer : {
        width : responsiveWidth(100), 
        height : Styles.content.height * 7/10, 
        alignItems : 'center',
        justifyContent : 'center'
    },

    profileAvatar : {
        width : responsiveWidth(30), 
        height : responsiveWidth(30), 
        resizeMode : 'cover', 
        borderWidth : 3, 
        borderColor : '#ececec'
    },

    checkoutButton : {
        flex : 0.8, 
        borderTopColor : Colors.primary_color, 
        borderTopWidth : 1, 
        backgroundColor : Colors.primary_color, 
        alignItems : 'center', 
        justifyContent : 'center'
    }
});

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
