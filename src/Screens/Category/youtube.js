import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight ,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, 
    responsiveWidth, 
    responsiveFontSize 
} from 'react-native-responsive-dimensions';

import {Images, Metrics, Colors, Styles} from '@Themes';
import CommonWidgets from '@CommonWidgets';
import { setPackageData, setSelectedSubCategory } from '@Actions/AppStatus';

const youtube_views_package = [
    {
        id : 0,
        isfeatured : false,
        title : '€1.99 Micro',
        level : 'Micro',
        title1 : 'ONE TIME',

        property1 : '1000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Super Fast delivery',

        price : '1.99',
        quantity : 1000
    },

    {
        id : 1,
        isfeatured : false,
        title : '€8.99 Mini',
        level : 'Mini',
        title1 : 'ONE TIME',

        property1 : '5000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Super Fast delivery',

        price : '8.99',
        quantity : 5000
    },

    {
        id : 2,
        isfeatured : false,
        title : '€14.99 Starter',
        level : 'Starter',
        title1 : 'ONE TIME',

        property1 : '10,000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Super Fast delivery',

        price : '14.99',
        quantity : 10000
    },

    {
        id : 3,
        isfeatured : true,
        title : '€59.99 Standard',
        level : 'Standard',
        title1 : 'ONE TIME',

        property1 : '50,000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Super Fast delivery',

        price : '59.99',
        quantity : 50000
    },

    {
        id : 4,
        isfeatured : true,
        title : '€109.99 Medium',
        level : 'Medium',
        title1 : 'ONE TIME',

        property1 : '100,000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Super Fast delivery',

        price : '109.99',
        quantity : 100000
    },

    {
        id : 5,
        isfeatured : false,
        title : '€998.99 Premium',
        level : 'Premium',
        title1 : 'ONE TIME',

        property1 : '1,000,000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Super Fast delivery',

        price : '998.99',
        quantity : 1000000
    }
];

const youtube_likes_package = [
    {
        id : 0,
        isfeatured : false,
        title : '€14.99 Micro',
        level : 'Micro',
        title1 : 'ONE TIME',

        property1 : '100 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '14.99',
        quantity : 100
    },

    {
        id : 1,
        isfeatured : false,
        title : '€49.99 Mini',
        level : 'Mini',
        title1 : 'ONE TIME',

        property1 : '500 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '49.99',
        quantity : 500
    },

    {
        id : 2,
        isfeatured : true,
        title : '€149.99 Starter',
        level : 'Starter',
        title1 : 'ONE TIME',

        property1 : '2500 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '149.99',
        quantity : 2500
    },

    {
        id : 3,
        isfeatured : true,
        title : '€499.99 Standard',
        level : 'Standard',
        title1 : 'ONE TIME',

        property1 : '10,000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '499.99',
        quantity : 10000
    },

    {
        id : 4,
        isfeatured : false,
        title : '€1999.99 Medium',
        level : 'Medium',
        title1 : 'ONE TIME',

        property1 : '50,000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '1999.99',
        quantity : 50000
    },

    {
        id : 5,
        isfeatured : false,
        title : '€3499.99 Premium',
        level : 'Premium',
        title1 : 'ONE TIME',

        property1 : '100,000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '3499.99',
        quantity : 100000
    }
];

const youtube_subscribers_package = [
    {
        id : 0,
        isfeatured : false,
        title : '€12.99 Micro',
        level : 'Micro',
        title1 : 'ONE TIME',

        property1 : '100 Subscribers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '12.99',
        quantity : 100
    },

    {
        id : 1,
        isfeatured : false,
        title : '€24.99 Mini',
        level : 'Mini',
        title1 : 'ONE TIME',

        property1 : '200 Subscribers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '24.99',
        quantity : 200
    },

    {
        id : 2,
        isfeatured : true,
        title : '€54.99 Starter',
        level : 'Starter',
        title1 : 'ONE TIME',

        property1 : '500 Subscribers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '54.99',
        quantity : 500
    },

    {
        id : 3,
        isfeatured : true,
        title : '€99.99 Standard',
        level : 'Standard',
        title1 : 'ONE TIME',

        property1 : '1000 Subscribers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '99.99',
        quantity : 1000
    },

    {
        id : 4,
        isfeatured : false,
        title : '€209.99 Medium',
        level : 'Medium',
        title1 : 'ONE TIME',

        property1 : '2500 Subscribers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '209.99',
        quantity : 2500
    },

    {
        id : 5,
        isfeatured : false,
        title : '€399.99 Premium',
        level : 'Premium',
        title1 : 'ONE TIME',

        property1 : '5000 Subscribers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '399.99',
        quantity : 5000
    },

    {
        id : 6,
        isfeatured : false,
        title : '€749.99 Gold',
        level : 'Gold',
        title1 : 'ONE TIME',

        property1 : '10000 Subscribers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super Fast delivery',

        price : '749.99',
        quantity : 10000
    }
];

class Youtube_Cate extends Component {
    render() {
        return (
            <View style = {Styles.fullcontainer}>
                {
                    CommonWidgets.renderStatusBar(Colors.primary_color)
                }
                <View style = { Styles.actionBar }>
                    <View style = { [ Styles.titleContainer, { alignItems : 'center', justifyContent : 'center' } ] }>
                        <Text style = { Styles.titleText }>Youtube</Text>
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
                
                <View style = { Styles.content }>
                    <TouchableOpacity 
                        activeOpacity = { 0.5 } 
                        onPress = { ( ) => { 
                            this.props.loadPackageData(youtube_views_package);
                            this.props.setSubCategory('views');
                            this.props.navigation.navigate('package');
                        }}>
                        <View style = { localStyles.categoryItem }>
                            <Text style = { localStyles.categoryText }> Youtube Views </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity = { 0.5 } 
                        onPress = { ( ) => { 
                            this.props.loadPackageData(youtube_likes_package);
                            this.props.setSubCategory('likes');
                            this.props.navigation.navigate('package');
                        }}>
                        <View style = { [ localStyles.categoryItem , { marginTop : responsiveHeight(5) } ] }>
                            <Text style = { localStyles.categoryText }> Youtube Likes </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity = { 0.5 }
                        onPress = { ( ) => { 
                            this.props.loadPackageData(youtube_subscribers_package);
                            this.props.setSubCategory('subscribers');
                            this.props.navigation.navigate('package');
                        }}>
                        <View style = { [ localStyles.categoryItem , { marginTop : responsiveHeight(5) } ] }>
                            <Text style = { localStyles.categoryText }> Youtube Subscribers </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    categoryItem : {
        width : responsiveWidth(80), 
        height : responsiveHeight(10), 
        borderWidth : 1, 
        borderColor : Colors.primary_color, 
        borderRadius : 20,
        alignItems : 'center',
        justifyContent : 'center'
    },

    categoryText : {
        color : Colors.primary_color,
        fontWeight : 'bold',
        fontSize : responsiveFontSize(2.3)
    }
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        loadPackageData : pkData => dispatch(setPackageData( pkData )),
        setSubCategory : scate => dispatch(setSelectedSubCategory( scate ))
    };
}

function mapStateToProps(state) {
    return { app_state : state };
}

export default connect(mapStateToProps,mapDispatchToProps)(Youtube_Cate);