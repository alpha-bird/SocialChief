import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import states from '@States';

const AppReducer = combineReducers({
  states,
});

export default AppReducer;