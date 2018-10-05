import ActionType from '@ActionTypes';

export const setPackageData = pkData => ({
    type : ActionType.SET_PACKAGE_DATA, pkData
});

export const setSelectedPackage = packageInfo => ({
    type : ActionType.SET_SELECTED_PACKAGE, packageInfo
});

export const setSelectedCategory = category => ({
    type : ActionType.SET_SELECTED_CATEGORY, category
});

export const setSelectedSubCategory = subcategory => ({
    type : ActionType.SET_SELECTED_SUBCATEGORY, subcategory
});

export const setSelectedCount = ct => ({
    type : ActionType.SET_SELECTED_COUNT , ct
});

export const setCount = count => ({
    type : ActionType.SET_COUNT , count
});