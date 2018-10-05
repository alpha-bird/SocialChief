import { StackNavigator } from 'react-navigation';
import Splash from '@Splash';
import HomeScreen from '@Home';
import { CategoryInit, Category_Instagram, Category_Youtube } from '@Category';
import { InstagramLikes, InstagramViews, InstagramFollowers, LinkInformation, CardPayment, StripePayment } from '@Information';
import PackageScreen from '@Package';

const AppNavigator = StackNavigator(
  {
    splash: { screen: Splash },
    homeScreen : { screen : HomeScreen },
    categoryInit : { screen : CategoryInit },
    categoryInstagram : { screen : Category_Instagram },
    categroyYoutube : { screen : Category_Youtube },
    package : { screen : PackageScreen },
    insta_likes : { screen : InstagramLikes },
    insta_views : { screen : InstagramViews },
    insta_followers : { screen : InstagramFollowers },
    link_information : { screen : LinkInformation },
    cardpayment : { screen : CardPayment },
    stripepayment : { screen : StripePayment }
  },
  {
    initialRouteName: 'splash',
    navigationOptions: {
      header: null,
      cardStack: { gesturesEnabled: false },
    },

    headerMode: 'screen',
    lazyLoad: true,
  }
);

export default AppNavigator;
