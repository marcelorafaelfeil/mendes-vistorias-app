import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as firebase from 'firebase';
import React from 'react';
import { Loading } from './app/components/loading/loading';
import { AppContainer } from './app/core/navigation/app-container';
import { LoadFontService } from './app/services/fonts/load-font-service';
import NavigationService from './app/services/navigation-service';

// Initialize Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyCuVpGUFAQDnHS3pOH-oot6_Y6BFHmsVSg',
	authDomain: 'mendes-vistoria-1550931959909.firebaseapp.com',
	databaseURL: 'https://mendes-vistoria-1550931959909.firebaseio.com',
	projectId: 'mendes-vistoria-1550931959909',
	storageBucket: 'mendes-vistoria-1550931959909.appspot.com',
	messagingSenderId: '710364483643',
	appId: '1:710364483643:web:532a70b7203a8843'
});

export default class App extends React.Component {
	state = {
		loaded: 1
	};

	async componentWillMount() {
		await LoadFontService.loadRoboto();
		await LoadFontService.loadOpenSans();

		this.setState({
			loaded: this.state.loaded - 1
		});
	}

	render() {
		if (this.state.loaded > 0) {
			return <Loading />;
		}
		return (
			<ActionSheetProvider>
				<AppContainer
					ref={navigatorRef =>
						NavigationService.setTopLevelNavigator(navigatorRef)
					}
				/>
			</ActionSheetProvider>
		);
	}
}
