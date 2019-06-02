import React from 'react';
import { View } from 'react-native';
import { InputTimeRange } from '../../../../../../components/form/inputs/time/input-time-range';
import { LabelComponent } from '../../../../../../components/label-component';

export class GeneralFormComponent extends React.PureComponent {
	render() {
		return(
			<View>
				<LabelComponent>Expediente</LabelComponent>
				<InputTimeRange 
				placeholderFrom={'00:00'}
				placeholderTo={'00:00'} />
			</View>
		);
	}
}