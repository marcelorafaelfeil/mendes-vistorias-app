import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HeaderObservation from './header-observation';
import { theme } from '../../../../../../theme/mendes-light';

export default class ListObservations extends Component {
	render() {
		return (
			<View>
				{!!this.props.data && this.props.data.map((item, index) => (
					<View key={index} style={[theme.panelContent, { marginBottom: 15 }]}>
						<HeaderObservation title={item.author} subHeader={item.date} picture={item.photo} />
						<View style={theme.panel}>
							<Text style={[theme.panelText, styles.observationText]}>{item.content}</Text>
						</View>
					</View>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	observationText: {
		textAlign: 'justify'
	}
});