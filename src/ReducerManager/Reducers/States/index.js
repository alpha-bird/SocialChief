import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import ActionTypes from '@ActionTypes';

const initialState = Immutable({ 
  packageData : [ ] ,
  selectedPackage : { },
  selectedCategory : '',
  selectedSubCategory : '',
  selectedCount : 0,
  count : 0,
});

const setPackageData = function(state, action) {
    console.log('Loading Package Data .....');
    return ({
      ...state,
      packageData : action.pkData,
    });
};

const setSelectedPackage = function(state, action) {
  console.log('Saving Selected Package Information ....');

  return ({
    ...state,
    selectedPackage : action.packageInfo
  });
};

const setSelectedCategory = function(state, action) {
  console.log('Saving Selected Category ....');

  return ({
    ...state,
    selectedCategory : action.category
  });
};

const setSelectedSubCategory = function(state, action) {
  console.log('Saving Selected Subcategory ...');

  return ({
    ...state,
    selectedSubCategory : action.subcategory
  });
};

const setSelectedCount = function(state, action ) {
  console.log('Changing selected Item Count ....');

  return ({
    ...state,
    selectedCount : action.ct
  })
};

const setCount = function(state, action ) {
  console.log('Changing Count(Views, Likes) ....');

  return ({
    ...state,
    count : action.count
  })
};

const actionHandlers = {
  [ActionTypes.SET_PACKAGE_DATA]: setPackageData,
  [ActionTypes.SET_SELECTED_PACKAGE]: setSelectedPackage,
  [ActionTypes.SET_SELECTED_CATEGORY]: setSelectedCategory,
  [ActionTypes.SET_SELECTED_SUBCATEGORY]: setSelectedSubCategory,
  [ActionTypes.SET_SELECTED_COUNT]: setSelectedCount,
  [ActionTypes.SET_COUNT]: setCount,
}

export default createReducer(initialState, actionHandlers);