import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { ContainerComponent } from '../../../../../../components/container-component';
import { InputDate } from '../../../../../../components/form/inputs/date/input-date';
import { theme } from '../../../../../../theme/mendes-light';
import { ScrollView } from 'react-native-gesture-handler';
import { LabelComponent } from '../../../../../../components/label-component';

export class ScheduleForm extends React.Component {
	state = {
		scheduleValue: 0
	};

	onChange = (name, value) => {
		if (!!this.props.onChange) {
			this.props.onChange(name, value);
		}
	}

	render() {
		return (
			<ScrollView>
				<ContainerComponent>
					<KeyboardAvoidingView
						style={{
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'center'
						}}
						behavior='padding'
						enabled
					>
						<View>
							<View style={theme.row}>
								<View style={theme.column}>
									<LabelComponent>
										Data e hora combinado
									</LabelComponent>
									<InputDate
										keyboardType={'numeric'}
										valueAsInteger={this.state.scheduleValue}
										onChangeCalendar={scheduleValue => {
											this.props.onChange('scheduleValue', scheduleValue);
										}}
										onChangeManual={scheduleValue => {
											this.props.onChange('scheduleValue', scheduleValue);
										}}
										mode={'datetime'}
									></InputDate>
								</View>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ContainerComponent>
			</ScrollView>
		);
	}
}
