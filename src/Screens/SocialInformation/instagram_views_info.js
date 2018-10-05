import React, { Component } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
    Keyboard,
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
import PopupDialog from 'react-native-popup-dialog';
import {  PayWithPaypal } from '@ServerApi/payment';
import {  Service } from '@ServerApi/service';

import {Images, Metrics, Colors, Styles} from '@Themes';
import CommonWidgets from '@CommonWidgets';
import InstagramVideo from './instagramVideo';
import { setCount, setSelectedCount } from '@Actions/AppStatus';
import Utils from '@src/utils';
import { GetProfileApi, GetRecentVideoApi } from '@ServerApi';

function toInteger(number){ 
    return Math.round(  // round to nearest integer
      Number(number)    // type cast your input
    ); 
};

class InstagramViews extends Component {
    constructor(props){
        super(props);

        this.state = {
            profileName : '',

            isLoaded : false,
            isLoading : false,

            recentVideos : [ ],
            instagram_video : [ ],
            selected_video : [ ],

            more_loaded : this.getDividedList([ ], ( id ) => {  }),

            isMoreLoaded : false,

            dividedImageList : this.getDividedList([ ], ( id ) => {  })
        }
    }

    init(){
        this.setState({
            isLoaded : false,
            isLoading : false,

            recentVideos : [ ],
            instagram_video : [ ],
            selected_video : [ ],

            more_loaded : this.getDividedList([ ], ( id ) => {  }),

            isMoreLoaded : false,

            dividedImageList : this.getDividedList([ ], ( id ) => {  })
        });
    }

    Checkout( ) {
        if(this.state.selected_video.length !== 0)
            this.popupDialog.show();
        else{
            Alert.alert('Waring', 'There is no selected posting');
        }
    }
    
    onImageTapped( id ){
        var temp_selimages = this.state.selected_video;
        var index = temp_selimages.indexOf(this.state.instagram_video[id]);

        if( index === -1)
        {
            if( temp_selimages.length < 5 )
                temp_selimages.push(this.state.instagram_video[id]);
            else
                Alert.alert('Warning', 'Maximium is limited to 5');
        }
        else
        {
            temp_selimages.splice(index, 1);
        }

        this.setState({
            selected_video : temp_selimages
        });

        this.props.setCount( toInteger(this.props.selectedPK.quantity / this.state.selected_video.length) ) ;

        this.props.setSelectedCount ( this.state.selected_video.length );
    }

    onLoad(){
        if( this.state.profileName !== ''){
            this.init();
            
            this.setState({
                isLoading : true
            });

            GetRecentVideoApi( this.state.profileName ).then(resp => {
                if(resp !== null){
                    var firstLoadedData = [ ];
                    console.log(resp);
                    var loadCount = resp.length > 6 ? 6 : resp.length;
                    for(let i = 0; i < loadCount ;i ++){
                        firstLoadedData.push(resp[i]);
                    }
        
                    this.setState({
                        isLoading : false,
                        isLoaded : true,
        
                        recentVideos : resp,
        
                        instagram_video : firstLoadedData,
                        dividedImageList : this.getDividedList(firstLoadedData , ( id ) => { this.onImageTapped(id) } )
                    });
                    return 1;
                }
                else{
                    this.setState({
                        isLoading : false,
                    });
                    Alert.alert('Warning!', 'Instagram User not existed!!');
                    return 0;
                }
            });
        }
        else{
            Alert.alert('Warning!', 'Instagram Username is empty!!');
        }
    }

    moreLoad(){
        var rest = this.state.recentVideos.length - this.state.instagram_video.length ;
        var loadingIndex = this.state.instagram_video.length;

        if( rest !== 0 ) {
            var loadedData = [ ];
            var moreLoadCount = rest > 3 ? 3 : rest;

            for(let i = loadingIndex ;i < loadingIndex + moreLoadCount; i ++){
                loadedData.push(this.state.recentVideos[i]);
            }
            var loaded = this.getDividedList( loadedData, ( id ) => { this.onImageTapped(id) });
    
            //data adding...
            var temp_instagram_video = this.state.instagram_video;
    
            for(let i = 0 ;i < loadedData.length ;i ++){
                temp_instagram_video.push(loadedData[i]);
            }
    
            //view adding....
            var temp_moreLoaded = this.state.more_loaded;
    
            for(let i = 0; i < loaded.length ;i ++){
                temp_moreLoaded.push(loaded[i]);
            }
    
            this.setState({
                instagram_video : temp_instagram_video,
                more_loaded : temp_moreLoaded,
                isMoreLoaded : true,
            });
        }
    }

    getDividedList( itemList, itemTapped ){
        var dividedImages = [ ];
        for(let i = 0 ; i < itemList.length/3 ;i ++){
            var line = (
                <View key = { itemList[i].id } style = {{ width : responsiveWidth(100), height : responsiveHeight(20), marginBottom : 10,flexDirection : 'row'}}>
                    {
                        itemList[i*3] !== undefined ?
                            <InstagramVideo Tapped = { itemTapped } imageData = { itemList[i*3] } style = {{ marginLeft : responsiveWidth(10)/4 }}/>
                                :
                            undefined
                    }
                    {
                        itemList[i*3 + 1] !== undefined ?
                            <InstagramVideo Tapped = { itemTapped } imageData = { itemList[i*3 + 1] } style = {{ marginLeft : responsiveWidth(10)/4 }}/>
                                :
                            undefined
                    }
                    {
                        itemList[i*3 + 2] !== undefined ?
                            <InstagramVideo Tapped = { itemTapped } imageData = { itemList[i*3 + 2] } style = {{ marginLeft : responsiveWidth(10)/4 }}/>
                                :
                            undefined
                    }
                </View>
            );
            dividedImages.push(line);
        }
        return dividedImages;
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
                        <Text style = { Styles.titleText } > { this.props.selectedPK.property1  }</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity = { 0.5 }
                        onPress = { ( ) => { 
                            Keyboard.dismiss();
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
                    <View style = {{ height : Styles.content.height * 4 / 10, flexDirection : 'column' }}>

                        <View style = {{flex : 2, alignItems : 'center', justifyContent : 'center', borderBottomWidth : 1 ,borderColor : Colors.primary_color}}>
                            <Text style = { localStyles.inputText }>{ '€' + this.props.selectedPK.price }</Text>
                        </View>
                        <View style = {{flex : 4, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = { localStyles.inputText }>Fill in your Instagram User Name</Text>
                        </View>

                        <View style = {{flex : 7, width : responsiveWidth(80), flexDirection : 'column'}}>
                            <View style = {{ flex : 0.5, }}></View>

                            <View style = {{flex : 1}}>
                                <TextInput 
                                    style = { localStyles.inputUserName } 
                                    underlineColorAndroid = 'transparent' 
                                    autoCapitalize = 'none' 
                                    autoCorrect = { false }
                                    value = { this.state.profileName } 
                                    onChangeText = { (text) => {
                                        this.setState({
                                            profileName : text
                                        })
                                    } }
                                    />
                            </View>
                            <View style = {{ flex : 1, }}></View>

                            <View style = {{ flex : 1, flexDirection : 'row'}}>
                                <TouchableOpacity 
                                    style = {
                                        localStyles.loadButton
                                    }
                                    activeOpacity = { 0.5 } 
                                    onPress = { () => { 
                                        this.onLoad();
                                    } }>
                                        <Text style = { localStyles.buttonText }>Load</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style = { 
                                        localStyles.checkoutButton
                                    }
                                    activeOpacity = { 0.5 } 
                                    onPress = { () => { 
                                        this.Checkout();
                                    } }>
                                    <Text style = { localStyles.buttonText }>CheckOut</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <ScrollView style = { localStyles.imagesList }>
                        {
                            this.state.dividedImageList.map( ( element ) => {
                                return element
                            })
                        }
                        {
                            this.state.isMoreLoaded ? 
                                this.state.more_loaded.map( (element) => {
                                    return element
                                })
                                :
                                undefined
                        }
                        {
                            this.state.isLoaded === true ?
                            <View style = {{width : responsiveWidth(100), height : responsiveHeight(7), alignItems : 'center', justifyContent : 'center'}}>
                                <TouchableOpacity activeOpacity = { 0.5 } onPress = {() => { this.moreLoad() }} >
                                <View style = {{
                                        width : responsiveWidth(25), 
                                        height : responsiveHeight(5), 
                                        backgroundColor : Colors.primary_color, 
                                        borderRadius : 5, 
                                        alignItems : 'center',
                                        justifyContent : 'center'
                                    }}>
                                    <Text style = {{ color : 'white', fontWeight : 'bold', fontSize : responsiveFontSize(1.5) }}>LoadMore...</Text>
                                </View>
                                </TouchableOpacity>
                            </View>

                            :

                            undefined
                        }
                        {
                            Platform.OS === 'ios' ? undefined : <View style = {{ height : 50, width : responsiveWidth(100) }}/>
                        }
                    </ScrollView>
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
                                            var links = [];
                                            for(let i = 0; i < this.state.selected_video.length ;i ++ ){
                                                links.push(this.state.selected_video[i].link);
                                            }
                                            return Service(this.props.category, this.props.subcategory, this.props.each_count, links )
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
                </TouchableOpacity>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    inputText : {
        fontWeight : 'bold',
        fontSize : responsiveFontSize(2.5),
        color : Colors.primary_color,
        width : responsiveWidth(60),
        textAlign : 'center'
    },

    inputUserName : {
        flex : 1, 
        borderWidth : 1, 
        borderColor : '#bbbcbc', 
        borderRadius : 5,
        color : Colors.primary_color,
        fontWeight : 'bold',
        textAlign : 'center'
    },

    loadButton :{
        flex : 1, 
        backgroundColor : Colors.primary_color , 
        borderRadius : 5,
        alignItems : 'center', 
        justifyContent : 'center'
    },

    checkoutButton : {
        flex : 1, 
        backgroundColor : Colors.primary_color , 
        borderRadius : 5, 
        alignItems : 'center', 
        justifyContent : 'center', 
        marginLeft : responsiveWidth(7) 
    },

    buttonText : {
        fontWeight : 'bold',
        fontSize : responsiveFontSize(2),
        color : Colors.secondary_color
    },

    imagesList : {
        height : Styles.content.height * 6 / 10, 
        width : responsiveWidth(100) ,
        marginTop : responsiveHeight(7), 
        flexDirection : 'column'
    }
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setCount : ct => dispatch(setCount(ct)),
        setSelectedCount : sct => dispatch(setSelectedCount(sct))
    };
}

function mapStateToProps(state) {
    return { 
        each_count : state.states.count,
        selectedPK : state.states.selectedPackage ,
        category : state.states.selectedCategory,
        subcategory :  state.states.selectedSubCategory };
}

export default connect(mapStateToProps,mapDispatchToProps)(InstagramViews);