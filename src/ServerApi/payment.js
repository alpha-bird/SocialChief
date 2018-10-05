import {
    Platform,
    Alert,
    NativeModules
} from 'react-native';

let MFLReactNativePayPal = NativeModules.MFLReactNativePayPal;
let PPKey = '4g3ioj249024tu24';
let Mode = 'TEST';

const PayWithPaypal = function( amount, description, viewInstance, work ) {
    viewInstance.setState({
        isLoading : true
    });
    return if(Platform.OS === 'ios'){
                MFLReactNativePayPal.initializePaypalEnvironment(Mode, PPKey);
        
                MFLReactNativePayPal.preparePaymentOfAmount(amount, "EUR", description);
                MFLReactNativePayPal.prepareConfigurationForMerchant(description, true, null);
                MFLReactNativePayPal.presentPaymentViewControllerForPreparedPurchase((error, payload) => {
                    if (error) {
                        console.log(error);
                        Alert.alert('Warning','Payment could not be completed!!');
                        return -1;
                    } 
                    else {
                        console.log("payload: " + payload);
        
                        if (payload.status == 1) {
                            //work();
                            viewInstance.props.navigation.goBack();
                            Alert.alert('Well paid!!!', 'Service provided');
                            return 1;
                        } else {
                            //viewInstance.props.navigation.goBack();
                            console.log("User cancelled payment");
                            return 0;
                        }
                    }
                });
            }
            if(Platform.OS === 'android'){
                var PayPal = require('react-native-paypal');
        
                return PayPal.paymentRequest({
                        clientId: PPKey,
                        environment: Mode === 0 ? PayPal.SANDBOX : PayPal.PRODUCTION,
                        price: amount,
                        currency: 'EUR',
                        description: description
                    })
                    .then((confirm, payment) => 
                        {
                            console.log(confirm);
                            console.log(payment);
                            //work();
                            viewInstance.props.navigation.goBack();
                            Alert.alert('Well paid!!!', 'Service provided');
                            return 1;
                        })
                    .catch((error_code) => 
                        {
                            console.log(error_code);
                            if(error_code == 'USER_CANCELLED')
                            {
                                return 0;
                            }
                            else{
                                Alert.alert('Warning','Payment could not be completed!!');
                                return -1;
                            }
                            
                        });
            }
}

export {  PayWithPaypal }