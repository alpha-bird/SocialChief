
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

class InstagramVideo extends Component {
    constructor(props){
        super(props);

        this.state = {
            onTapped : this.props.Tapped,
            instaData : this.props.imageData
        }

    }
    render() {
        return (
            <TouchableOpacity 
                activeOpacity = { 0.5 } 
                onPress = {() => { 
                    var temp = this.state.instaData;

                    if(this.props.selCount < 5)
                        temp.isChecked = !temp.isChecked;
                    else
                    {
                        if(temp.isChecked === true)
                            temp.isChecked = false;
                    }
                    this.setState({
                        instaData : temp
                    });
                    this.state.onTapped(this.state.instaData.id);
                }}>
                <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                    <View 
                        style = { [ this.props.style ,localStyles.content, { opacity : this.state.instaData.isChecked ? 0.7 : 0.3} ] }>
                        {
                            this.state.instaData.images !== undefined ? 
                                <Image source = { { uri : this.state.instaData.images.thumbnail.url }} 
                                    style = {{
                                        width : responsiveWidth(30) - 2, 
                                        height : responsiveHeight(20) - 2, 
                                        borderWidth : 2,
                                        borderColor : 'white',
                                        resizeMode : 'stretch'
                                    }} />
                                :
                                undefined
                        }
                        <Image 
                            source = { Images.ic_video } 
                            style = {{ width : responsiveWidth(6), height : responsiveHeight(4), resizeMode : 'stretch', position : 'absolute', marginLeft : 2, marginTop : 2}}/>
                    </View>
                    {
                        this.state.instaData.isChecked ?
                            <Text style = {{
                                color : Colors.primary_color, 
                                fontWeight : 'bold',
                                fontSize : responsiveFontSize(2.3),
                                opacity : 1, 
                                backgroundColor : 'transparent', 
                                position : 'absolute',
                                marginLeft : responsiveWidth(10)/4
                                }}> 
                                { '+' + this.props.count }
                            </Text>
                            :
                            undefined
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const localStyles = StyleSheet.create({
    content : {
        width : responsiveWidth(30), 
        height : responsiveHeight(20), 
        borderWidth : 1, 
        borderColor : '#bbbcbc',
    }
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state) {
    return { 
        count : state.states.count,
        selCount : state.states.selectedCount
     };
}

export default connect(mapStateToProps,mapDispatchToProps)(InstagramVideo);