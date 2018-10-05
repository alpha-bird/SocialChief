import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight ,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, 
    responsiveWidth, 
    responsiveFontSize 
} from 'react-native-responsive-dimensions';

import { Images, Metrics, Colors, Styles } from '@Themes';

class PackageItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            data : this.props.data,
            onBuyNow : this.props.BuyNow
        }
    }
    render() {
        return (
            <View style = { [localStyles.item, { marginTop : this.state.data.id === 0 ? 0 : responsiveHeight(5) }] }>
                <View style = { localStyles.title }>
                    <View style = { localStyles.titleTextContainer }>
                        <Text style = { localStyles.titleText }> { this.state.data.title } </Text>
                    </View>
                    {
                        this.state.data.isfeatured ? 
                            <Image 
                                source = { Images.ic_featured } 
                                style = { localStyles.featured_icon } />
                            :
                            undefined
                    }
                </View>
                <View style = { localStyles.title1Container }>
                    <Text style = { localStyles.title1Text }> { this.state.data.title1 }</Text>
                </View>
                <View style = {{ flex : 4, }}>
                    <View style = {{flex : 1, }}>
                    </View>

                    <View style = {{flex : 1, flexDirection : 'row'}}>
                        <View style = {{flex : 1}}>
                            <Text style = {localStyles.propertyText}> { this.state.data.property1} </Text>
                        </View>
                        <View style = {{flex : 1,}}>
                            <Text style = {localStyles.propertyText}> { this.state.data.property2} </Text>
                        </View>
                    </View>

                    <View style = {{flex : 1, }}>
                    </View>

                    <View style = {{flex : 1, flexDirection : 'row'}}>
                        <View style = {{flex : 1}}>
                            <Text style = {localStyles.propertyText}> { this.state.data.property3} </Text>
                        </View>
                        <View style = {{flex : 1}}>
                            <Text style = {localStyles.propertyText}> { this.state.data.property4} </Text>
                        </View>
                    </View>
                    <View style = {{flex : 1, }}>
                    </View>
                    <View style = {{flex : 1, flexDirection : 'row'}}>
                        <View style = {{flex : 1}}>
                            <Text style = {localStyles.propertyText}> { this.state.data.property5} </Text>
                        </View>
                        <View style = {{flex : 1}}>
                            <Text style = {localStyles.propertyText}> { this.state.data.property6} </Text>
                        </View>
                    </View>
                </View>
                <View style = {{ flex : 3, alignItems : 'center', justifyContent : 'center'}}>
                    <TouchableOpacity 
                        activeOpacity = { 0.5 } 
                        onPress = {( ) => { 
                            this.state.onBuyNow();
                        }}>
                        <View style = { localStyles.buyButton }>
                            <Text style = { localStyles.buyText }>BUY NOW</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    item : {
        width : responsiveWidth(85), 
        height : responsiveHeight(30), 
        borderWidth : 1, 
        borderColor : Colors.primary_color, 
    },

    title : {
        flex : 2,
        alignItems : 'center',
        flexDirection : 'row'
    },

    titleTextContainer : {
        width : responsiveWidth(85), 
        height : responsiveHeight(30)/5,  
        alignItems : 'center', 
        justifyContent : 'center',
        flexDirection : 'row'
    },

    titleText : {
        color : Colors.primary_color, 
        fontWeight : 'bold', 
        fontSize : responsiveFontSize(2.3)
    },
    
    featured_icon : {
        width : responsiveHeight(30)/5, 
        height : responsiveHeight(30)/5, 
        resizeMode : 'stretch',
        position : 'absolute',
    },

    title1Container : {
        flex : 1, 
        alignItems : 'center', 
        justifyContent : 'center'
    },

    title1Text : {
        color : '#b7b7b7', 
        fontSize : responsiveFontSize(1.3)
    },

    propertyText : {
        fontSize : responsiveFontSize(1.5),
        color : '#b7b7b7',
        marginLeft : responsiveWidth(10)
    },

    buyButton : {
        width : responsiveWidth(35), 
        height : responsiveHeight(6), 
        borderRadius : 5,
        backgroundColor : Colors.primary_color,
        alignItems : 'center',
        justifyContent : 'center'
    },

    buyText : {
        fontSize : responsiveFontSize(2), 
        fontWeight : 'bold', 
        color : Colors.secondary_color
    }
});

export default PackageItem;