import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight ,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, 
    responsiveWidth, 
    responsiveFontSize 
} from 'react-native-responsive-dimensions';

import {Images, Metrics, Colors, Styles} from '@Themes';
import CommonWidgets from '@CommonWidgets';
import PackageItem from './packageitem';
import { setSelectedPackage } from '@Actions/AppStatus';

class PackageScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            packages : this.props.packages
        }
    }
    render() {
        return (
            <View style = {Styles.fullcontainer}>
                {
                    CommonWidgets.renderStatusBar(Colors.primary_color)
                }
                <View style = { Styles.actionBar }>
                    <View style = { [ Styles.titleContainer, { alignItems : 'center', justifyContent : 'center' } ] }>
                        <Text style = { Styles.titleText }>Packages</Text>
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

                <View style = { [ Styles.content, { } ] }>
                    <ScrollView showsVerticalScrollIndicator = { false } contentContainerStyle = {{alignItems : 'center'}} style = {{ marginTop : responsiveHeight(5) }}>
                        {
                            this.state.packages.map( ( element ) => {
                                return <PackageItem 
                                            data = { element } 
                                            key = { element.id } 
                                            navHelper = { this.props.navigation }
                                            BuyNow = {() => { 
                                                this.props.setPackage(element);
                                                if(this.props.selectedCategory === 'instagram'){
                                                    switch(this.props.selectedSubCategory){
                                                        case 'followers':
                                                            this.props.navigation.navigate('insta_followers');
                                                            break;
                                                        case 'likes':
                                                            this.props.navigation.navigate('insta_likes');
                                                            break;
                                                        case 'views':
                                                            this.props.navigation.navigate('insta_views');
                                                            break;
                                                        case 'comments':
                                                            this.props.navigation.navigate('link_information');
                                                            break;
                                                    }
                                                }
                                                if(this.props.selectedCategory === 'facebook'){
                                                    this.props.navigation.navigate('link_information');
                                                }
                                                if(this.props.selectedCategory === 'youtube'){
                                                    this.props.navigation.navigate('link_information');
                                                }
                                            }}
                                            />
                            })
                        }
                        {
                            Platform.OS === 'ios' ? undefined : <View style = {{ height : 50, width : responsiveWidth(100) }}/>
                        }
                    </ScrollView>
                </View>

            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setPackage : sPK => dispatch(setSelectedPackage(sPK))
    };
}

function mapStateToProps(state) {
    return { 
        packages : state.states.packageData,
        selectedCategory : state.states.selectedCategory,
        selectedSubCategory : state.states.selectedSubCategory
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(PackageScreen);