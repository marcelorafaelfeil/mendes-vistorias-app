import { NavigationActions, StackActions } from 'react-navigation';

var _navigator;

function setTopLevelNavigator(ref) {
	_navigator = ref;
}

function navigate(routeName, params) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params
		})
	);
}

function resetTo(routeName, params) {
	_navigator.dispatch(
		StackActions.reset({
			index: 0,
			key: null,
			actions: [
				NavigationActions.navigate({
					routeName,
					params
				})
			]
		})
	);
}

export default {
	navigate,
	resetTo,
	setTopLevelNavigator
};
