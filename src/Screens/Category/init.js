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
import { setPackageData, setSelectedCategory } from '@Actions/AppStatus';

const facebookPackages = [
    {
        id : 0,
        isfeatured : false,
        title : '€2.49 Mini',
        level : 'Mini',
        title1 : 'ONE TIME',

        property1 : '100 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super fast delivery',
        
        price : '2.49',
        quantity : 100
    },
    {
        id : 1,
        isfeatured : false,
        title : '€4.49 Starter',
        level : 'Starter',
        title1 : 'ONE TIME',

        property1 : '250 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super fast delivery',

        price : '4.49',
        quantity : 250
    },
    {
        id : 2,
        isfeatured : false,
        title : '€5.99 Medium',
        level : 'Medium',
        title1 : 'ONE TIME',

        property1 : '500 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super fast delivery',

        price : '5.99',
        quantity : 500
    },
    {
        id : 3,
        isfeatured : false,
        title : '€7.99 Medium',
        level : 'Medium 1',
        title1 : 'ONE TIME',

        property1 : '1000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super fast delivery',

        price : '7.99',
        quantity : 1000
    },
    {
        id : 4,
        isfeatured : true,
        title : '€14.99 Medium',
        level : 'Medium 2',
        title1 : 'ONE TIME',

        property1 : '2500 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super fast delivery',

        price : '14.99',
        quantity : 2500
    },
    {
        id : 5,
        isfeatured : true,
        title : '€24.99 Premium',
        level : 'Premium',
        title1 : 'ONE TIME',

        property1 : '5000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super fast delivery',

        price : '24.99',
        quantity : 5000
    },
    {
        id : 6,
        title : '€44.99 Gold',
        level : 'Gold',
        title1 : 'ONE TIME',

        property1 : '10000 Likes',
        property2 : 'E-mail Support',
        property3 : 'High quality',
        property4 : '100% Safe',
        property5 : 'Super fast delivery',

        price : '44.99',
        quantity : 10000
    }
];

class Category_Init extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style = {Styles.fullcontainer}>
                {
                    CommonWidgets.renderStatusBar(Colors.primary_color)
                }
                <View style = { Styles.actionBar }>
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
                            activeOpacity = {0.5}
                            onPress = { ( ) => { 
                                this.props.loadPackageData(facebookPackages);
                                this.props.setCategory('facebook');
                                this.props.navigation.navigate('package');
                            }}>
                        <View style = { [ localStyles.categoryItem , { } ] }>
                            <Image style = { localStyles.categoryLogo } source = { Images.ic_facebook }/>
                            <Text style = { localStyles.categoryText }>facebook</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                            activeOpacity = {0.5}
                            onPress = { ( ) => { 
                                this.props.setCategory('instagram');
                                this.props.navigation.navigate('categoryInstagram');
                            }}>
                        <View style = { [ localStyles.categoryItem, { marginTop : responsiveHeight(5) } ] }>
                            <Image style = { localStyles.categoryLogo } source = { Images.ic_instagram }/>
                            <Text style = { localStyles.categoryText }>instagram</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                            activeOpacity = {0.5}
                            onPress = { ( ) => { 
                                this.props.setCategory('youtube');
                                this.props.navigation.navigate('categroyYoutube');
                            }}>
                        <View style = { [ localStyles.categoryItem, { marginTop : responsiveHeight(5) } ] }>
                            <Image style = { localStyles.categoryLogo } source = { Images.ic_youtube }/>
                            <Text style = { localStyles.categoryText }>youtube</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const localStyles = StyleSheet.create({
    categoryItem : {
        width : responsiveWidth(70), 
        height : responsiveHeight(10), 
        flexDirection : 'row',
        borderRadius : responsiveHeight(10), 
        borderColor : '#ecbcce', 
        borderWidth : 1,
        alignItems : 'center'
    },
    
    categoryLogo : {
        width : responsiveWidth(10), 
        height : responsiveWidth(10), 
        marginLeft : responsiveHeight(5),
        resizeMode : 'stretch', 
    },

    categoryText : {
        marginLeft : responsiveWidth(10),
        color : Colors.primary_color, 
        fontSize : responsiveFontSize(2.3), 
        fontWeight : 'bold'
    }
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        loadPackageData : pkData => dispatch(setPackageData( pkData )),
        setCategory : cate => dispatch(setSelectedCategory(cate))
    };
}

function mapStateToProps(state) {
    return { app_state : state };
}

export default connect(mapStateToProps,mapDispatchToProps)(Category_Init);