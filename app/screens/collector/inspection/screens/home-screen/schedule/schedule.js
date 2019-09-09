import React from 'react';
import { Modal, View, Text } from 'react-native';
import { ButtonComponent } from '../../../../../../components/button-component';
import { ModalHeader } from '../../../../../../components/modal-header';
import { theme } from '../../../../../../theme/mendes-light';
import { ErrorsPanel } from '../../send-screen/errors-panel';
import { ScheduleForm } from './schedule-form';
import { ScheduleService } from './schedule.service';

export class Schedule extends React.Component {

	state = {
		isModalVisible: false,
		scheduleForm: {},
		fieldErrors: [],
		errors: []
	}

	openModal = () => {
		this.setState({
			isModalVisible: true
		})
	}

	closeModal = () => {
		this.setState({
			isModalVisible: false
		})
	}

	onChange = (name, value) => {
		const scheduleForm = this.state.scheduleForm;
		scheduleForm[name] = value;
		this.setState({scheduleForm});
	}
	
	saveSchedule = () => {
		this.setState({errors: []})
		const errors = ScheduleService.validateData(this.state.scheduleForm);
		if (errors.length === 0) {
			this.closeModal();
			const schedule = this.state.scheduleForm;
			ScheduleService.saveSchedule(schedule, this.props.inspection)
			if (!!this.props.onSchedule) {
				this.props.onSchedule(schedule);
			}
		}else {
			this.setState({errors});
		}
	}

	render() {
		return (
			<View>
				<View style={theme.row}>
					<View style={[theme.column, theme.columnBase]}>
						<ButtonComponent onPress={() => {this.openModal()}}>Agendar Horário</ButtonComponent>
					</View>
				</View>
				<Modal
					animationType={'slide'}
					transparet={false}
					visible={this.state.isModalVisible}
				>
					<View>
						<ModalHeader onRequestConfirm={() => {this.saveSchedule()}} onRequestClose={() => this.closeModal()}>Agendar Horário</ModalHeader>
						<ScheduleForm onChange={this.onChange}></ScheduleForm>
						{this.state.errors.map((e, index) => (
							<View key={index}>
							<Text style={[theme.formError, theme.formErrorModal]}>{e.message}</Text></View>
						))}
					</View>
				</Modal>
			</View>
		);
	}
}
