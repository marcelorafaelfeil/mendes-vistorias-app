import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React from 'react';
import { Loading } from './app/components/loading/loading';
import { AppContainer } from './app/core/navigation/app-container';
import { LoadFontService } from './app/services/fonts/load-font-service';
import ThemeContext from './app/core/theme-context';

export default class App extends React.Component {
	state = {
		loaded: 1
	}

	async componentWillMount() {
		await LoadFontService.loadRoboto();
		await LoadFontService.loadOpenSans();

		this.setState({
			loaded: this.state.loaded - 1
		});
	}

	render() {
		if (this.state.loaded > 0) {
			return(<Loading />);
		}
		return (
			<ActionSheetProvider>
				<AppContainer />
			</ActionSheetProvider>
		);
	}
}