import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const bottomMargin = 24;
const sHeight = width < height ? height : width;
const sWidth = width < height ? width : height;
const dMargin = 10;
const metrics = {
  searchBarHeight: 30,
  screenWidth: sWidth,
  screenHeight: sHeight,
  navBarHeight: sHeight * 0.09,
  tabBarHeight: sHeight * 0.073,
  defaultMargin: dMargin,
  defaultPadding: dMargin,
  listItemHeight: sHeight / 9,
  appleSize: sHeight / 15,
  contentHeight: sHeight - 110,
  listItemWidth: sWidth - (dMargin * 2),
  thumbRadius: 10,
  sliderMarkerSize: sWidth / 20,

  buttonWidth: sWidth * 0.8,
  buttonHeight: sHeight / 15,
  logoSize: sWidth / 3,
  footerHeight: sWidth / 7,
  androidMarginBottom: bottomMargin,

  tabBarIconSize: sWidth * 0.064,

  statusBarHeight: 20,

};

export default metrics;
