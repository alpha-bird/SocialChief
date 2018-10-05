import Colors from './Colors';
import Metrics from './Metrics';

import { Platform } from 'react-native';
import { responsiveHeight, 
    responsiveWidth, 
    responsiveFontSize 
} from 'react-native-responsive-dimensions';

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
const marginRequired = Platform.OS === 'ios' ? 0 : 20;

const Styles = {
    fullcontainer : {
        flex : 1,
        backgroundColor : 'white'
    },
    actionBar : {
        width : responsiveWidth(100),
        height : responsiveHeight(8),
        flexDirection : 'row',
        marginTop : marginRequired
    },
    
    titleContainer : {
        width : responsiveWidth(100),
        height : responsiveHeight(8),
        position : 'absolute',    
    },

    backButtonContainer : {
        width : responsiveHeight(8),
        height : responsiveHeight(8),
        alignItems : 'center',
        justifyContent : 'center',
    },

    backButton : {
        width : 10, 
        height : 18, 
        resizeMode : 'stretch'
    },
    
    titleText : {
        color : Colors.primary_color,
        fontWeight : 'bold',
        fontSize : responsiveFontSize(2.5)
    },

    content : {
        width : responsiveWidth(100),
        height : responsiveHeight(92) - statusBarHeight ,
        alignItems : 'center',
        justifyContent : 'center'
    },
}

export default Styles;