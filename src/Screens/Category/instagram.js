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

const instagram_follower_package = [
    {
        id : 0,
        isfeatured : false,
        title : '€5.99 Mini',
        level : 'Mini',
        title1 : 'ONE TIME',

        property1 : '1000 Followers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Less than an Hour',

        price : '5.99',
        quantity : 1000
    },

    {
        id : 1,
        isfeatured : false,
        title : '€12.99 Starter',
        level : 'Starter',
        title1 : 'ONE TIME',

        property1 : '2500 Followers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Less than an Hour',

        price : '12.99',
        quantity : 2500
    },

    {
        id : 2,
        isfeatured : true,
        title : '€21.99 Standard',
        level : 'Standard',
        title1 : 'ONE TIME',

        property1 : '5000 Followers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Less than an Hour',

        price : '21.99',
        quantity : 5000
    },

    {
        id : 3,
        isfeatured : true,
        title : '€54.99 Medium',
        level : 'Medium',
        title1 : 'ONE TIME',

        property1 : '15,000 Followers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Less than an Hour',

        price : '54.99',
        quantity : 15000
    },

    {
        id : 4,
        isfeatured : false,
        title : '€247.99 Medium',
        level : 'Medium 1',
        title1 : 'ONE TIME',

        property1 : '50,000 Followers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Less than an Hour',

        price : '247.99',
        quantity : 50000
    },

    {
        id : 5,
        isfeatured : false,
        title : '€499.99 Premium',
        level : 'Premium',
        title1 : 'ONE TIME',

        property1 : '1,000,000 Followers',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Followers Starts In',
        property6 : 'Less than an Hour',

        price : '499.99',
        quantity : 1000000
    }
];

const instagram_likes_package = [
    {
        id : 0,
        isfeatured : false,
        title : '€1.99 Micro',
        level : 'Micro',
        title1 : 'ONE TIME',

        property1 : '100 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '1.99',
        quantity : 100
    },

    {
        id : 1,
        isfeatured : false,
        title : '€5.99 Mini',
        level : 'Mini',
        title1 : 'ONE TIME',

        property1 : '1000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '5.99',
        quantity : 1000
    },

    {
        id : 2,
        isfeatured : true,
        title : '€12.99 Standard',
        level : 'Standard',
        title1 : 'ONE TIME',

        property1 : '2500 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '12.99',
        quantity : 2500
    },

    {
        id : 3,
        isfeatured : true,
        title : '€21.99 Standard',
        level : 'Standard 1',
        title1 : 'ONE TIME',

        property1 : '5000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '21.99',
        quantity : 5000
    },

    {
        id : 4,
        isfeatured : false,
        title : '€39.99 Medium',
        level : 'Medium',
        title1 : 'ONE TIME',

        property1 : '10,000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '39.99',
        quantity : 10000
    },

    {
        id : 5,
        isfeatured : false,
        title : '€69.99 Premium',
        level : 'Premium',
        title1 : 'ONE TIME',

        property1 : '20,000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '69.99',
        quantity : 20000
    }
]

const instagram_views_package = [
    {
        id : 0,
        isfeatured : false,
        title : '€1.99 Micro',
        level : 'Micro',
        title1 : 'ONE TIME',

        property1 : '100 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '1.99',
        quantity : 100
    },

    {
        id : 1,
        isfeatured : false,
        title : '€5.99 Mini',
        level : 'Mini',
        title1 : 'ONE TIME',

        property1 : '1000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '5.99',
        quantity : 1000
    },

    {
        id : 2,
        isfeatured : true,
        title : '€12.99 Standard',
        level : 'Standard',
        title1 : 'ONE TIME',

        property1 : '2500 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '12.99',
        quantity : 2500
    },

    {
        id : 3,
        isfeatured : true,
        title : '€21.99 Standard',
        level : 'Standard 1',
        title1 : 'ONE TIME',

        property1 : '5000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '21.99',
        quantity : 5000
    },

    {
        id : 4,
        isfeatured : false,
        title : '€39.99 Medium',
        level : 'Medium',
        title1 : 'ONE TIME',

        property1 : '10,000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '39.99',
        quantity : 10000
    },

    {
        id : 5,
        isfeatured : false,
        title : '€69.99 Premium',
        level : 'Premium',
        title1 : 'ONE TIME',

        property1 : '20,000 Views',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'ORDERS Starts In',
        property6 : 'Less than 60 Sec',

        price : '69.99',
        quantity : 20000
    }
]

const instagram_comments_package = [
    {
        id : 0,
        isfeatured : false,
        title : '€2.99 Micro',
        level : 'Micro',
        title1 : 'ONE TIME',

        property1 : '10 Comment',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'General Instagram',
        property6 : 'Super Fast Delivery',

        price : '2.99',
        quantity : 10
    },

    {
        id : 1,
        isfeatured : false,
        title : '€5.99 Mini',
        level : 'Mini',
        title1 : 'ONE TIME',

        property1 : '25 Comment',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'General Instagram',
        property6 : 'Super Fast Delivery',

        price : '5.99',
        quantity : 25
    },

    {
        id : 2,
        isfeatured : true,
        title : '€9.99 Starter',
        level : 'Starter',
        title1 : 'ONE TIME',

        property1 : '50 Comment',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'General Instagram',
        property6 : 'Super Fast Delivery',

        price : '9.99',
        quantity : 50
    },

    {
        id : 3,
        isfeatured : true,
        title : '€15.99 Standard',
        level : 'Standard',
        title1 : 'ONE TIME',

        property1 : '100 Comment',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'General Instagram',
        property6 : 'Super Fast Delivery',

        price : '15.99',
        quantity : 100
    },

    {
        id : 4,
        isfeatured : false,
        title : '€34.99 Medium',
        level : 'Medium',
        title1 : 'ONE TIME',

        property1 : '250 Comment',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'General Instagram',
        property6 : 'Super Fast Delivery',

        price : '34.99',
        quantity : 250
    },

    {
        id : 5,
        isfeatured : false,
        title : '€59.99 Premium',
        level : 'Premium',
        title1 : 'ONE TIME',

        property1 : '500 Comment',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'General Instagram',
        property6 : 'Super Fast Delivery',

        price : '59.99',
        quantity : 500
    }
]

class Instagram_Cate extends Component {
    render() {
        return (
            <View style = {Styles.fullcontainer}>
                {
                    CommonWidgets.renderStatusBar(Colors.primary_color)
                }
                <View style = { Styles.actionBar }>
                    <View style = { [ Styles.titleContainer, { alignItems : 'center', justifyContent : 'center' } ] }>
                        <Text style = { Styles.titleText }>Instagram</Text>
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
                            this.props.loadPackageData(instagram_follower_package);
                            this.props.setSubCategory('followers');
                            this.props.navigation.navigate('package');
                        }}>
                        <View style = { localStyles.categoryItem }>
                            <Text style = { localStyles.categoryText }> Instagram Followers </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity = { 0.5 } 
                        onPress = { ( ) => {
                            this.props.loadPackageData(instagram_likes_package);
                            this.props.setSubCategory('likes');
                            this.props.navigation.navigate('package');
                        }}>
                        <View style = { [ localStyles.categoryItem , { marginTop : responsiveHeight(5) } ] }>
                            <Text style = { localStyles.categoryText }> Instagram Likes </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity = { 0.5 } 
                        onPress = { ( ) => {
                            this.props.loadPackageData(instagram_views_package);
                            this.props.setSubCategory('views');
                            this.props.navigation.navigate('package');
                        }}>
                        <View style = { [ localStyles.categoryItem , { marginTop : responsiveHeight(5) } ] }>
                            <Text style = { localStyles.categoryText }> Instagram Views </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity = { 0.5 } 
                        onPress = { ( ) => { 
                            this.props.loadPackageData(instagram_comments_package);
                            this.props.setSubCategory('comments');
                            this.props.navigation.navigate('package');
                        }}>
                        <View style = { [ localStyles.categoryItem , { marginTop : responsiveHeight(5) } ] }>
                            <Text style = { localStyles.categoryText }> Instagram Comments </Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(Instagram_Cate);