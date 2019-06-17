import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonComponent } from '../../../../../../components/button-component';
import { InputText } from '../../../../../../components/form/inputs/text/input-text';

export default class AddObservation extends Component {

	state = {
		value: ''
	}

	componentWillMount() {
		if (!!this.props.value) {
			this.setState({value: this.props.value});
		}
	}

	scrollToEnd() {
		if (!!this.props.scrollView) {
			this.props.scrollView.scrollToEnd();
		}
	}

	render() {
		return (
			<View style={styles.content}>
				<View>
					<InputText value={this.state.value} placeholder={'Escreva a observação'} onFocus={() => this.props.onFieldFocus('observation')} multiline={true} autoGrow={true} onChangeText={(text) => {this.setState({value: text});this.props.onChangeObservation(text)}} />
				</View>
			</View>
		)
	} 
}

const styles = StyleSheet.create({
	content: {
		marginBottom: 15
	}
});