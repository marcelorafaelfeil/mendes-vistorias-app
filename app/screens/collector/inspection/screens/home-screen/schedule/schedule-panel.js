import React from 'react';
import { View, Text } from 'react-native';
import { PanelComponent } from '../../../../../../components/panel-component';
import { RowComponent } from '../../../../../../components/row-component';
import { LabelComponent } from '../../../../../../components/label-component';
import moment from 'moment';
import { SectionTitleComponent } from '../../../../../../components/section-title-component';

export class SchedulePanel extends React.Component {
	state = {
		schedule: null
	};

	componentWillMount = () => {
		const data = this.props.schedule;
		const dateInMoment = moment(data.scheduleDate);
		const dateInString = dateInMoment.format('DD/MM/YYYY HH:mm');
		this.setState({ schedule: dateInString });
	};

	render() {
		const { schedule } = this.state;
		return (
			<View style={{ marginBottom: 10 }}>
				<SectionTitleComponent>Agendamento</SectionTitleComponent>
				<PanelComponent>
					<RowComponent>
						<LabelComponent>Data do Agendamento</LabelComponent>
						<Text>{schedule}</Text>
					</RowComponent>
				</PanelComponent>
			</View>
		);
	}
}
