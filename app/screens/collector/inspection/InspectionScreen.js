import React from 'react';
import { InspectionContainer } from './navigation/inspection-container';

export class InspectionScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
	static router = InspectionContainer.router;

	render() {
		return <InspectionContainer navigation={this.props.navigation} />;
	}
}
