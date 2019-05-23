import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppContext from './app/core/AppContext';
import { AppContainer } from './app/core/navigation/AppContainer';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.mainContainer}>
				<AppContext.Provider>
					<AppContainer />
				</AppContext.Provider>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: '#F6F6F6'
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
