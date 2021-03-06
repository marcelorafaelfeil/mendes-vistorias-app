import { Platform } from '@unimodules/core';
import React from 'react';
import {
	RefreshControl,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { ContainerComponent } from '../../../components/container-component';
import { CustomSafeView } from '../../../components/custom-safe-view';
import { Empty } from '../../../components/empty';
import { ListItem } from '../../../components/list/list-item';
import { CustomActivityIndicatorComponent } from '../../../components/loading/custom-activity-indicator-component';
import { PendenciesService } from '../../../services/rest/pendencies-service';
import { GetData } from '../../../utils/get-data';
import { Header } from '../includes/header/header';

export class DashboardScreen extends React.Component {
	static navigationOptions = {
		header: null,
		gesturesEnabled: false
	};

	state = {
		loaded: 1,
		refreshing: false,
		latePendencies: [],
		deadlinePendencies: [],
		newPendencies: []
	};

	componentDidMount() {
		this.props.navigation.addListener('willFocus', () => {
			const refresh = this.props.navigation.getParam('refresh');
			if (!!refresh) {
				this.setState({ loaded: this.state.loaded + 1 });
				this.loadPedencies();
			}
		});
		this.loadPedencies();
	}

	loadPedencies = () => {
		return PendenciesService.getMyPendencies().then(data => {
			this.setState({
				...data,
				loaded: this.state.loaded - 1
			});
		});
	};

	renderItem = (data, status) => {
		const hasSchedule =
			!!data.item &&
			!!data.item.schedules &&
			data.item.schedules.length > 0;
		if (hasSchedule) {
			if (data.item.time.quantity >= 2) {
				status = 'success';
			} else if (data.item.time.quantity >= 0) {
				status = 'warning';
			} else {
				status = 'danger';
			}
		}
		if (data.item.time.quantity < 0) {
			data.item.time.quantity = data.item.time.quantity * (-1);
		}
		return (
			<TouchableHighlight
				onPress={() =>
					this.props.navigation.navigate('Inspection', {
						inspection: data.item.id
					})
				}
			>
				<ListItem
					label={data.item.id + ' - ' + data.item.name}
					description={GetData.getAddress(data.item.address)}
					status={status}
					time={data.item.time.quantity}
					unit={data.item.unit}
					schedule={hasSchedule}
				/>
			</TouchableHighlight>
		);
	};

	renderPendencies(title, status, data) {
		if (!!data && data.length > 0) {
			return (
				<View>
					<Text style={styles.subHeader}>{title}</Text>
					<FlatList
						data={data}
						renderItem={item => this.renderItem(item, status)}
						keyExtractor={item => item.id.toString()}
					/>
				</View>
			);
		}
	}

	onRefresh = () => {
		this.setState({
			refreshing: true
		});
		this.loadPedencies().then(() => {
			this.setState({
				refreshing: false
			});
		});
	};

	render() {
		if (this.state.loaded > 0) {
			return <CustomActivityIndicatorComponent />;
		} else {
			return (
				<CustomSafeView>
					<ScrollView
						styles={styles.content}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.onRefresh}
							/>
						}
					>
						<ContainerComponent
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh}
						>
							<Header showSettings>Dashboard</Header>
							{(!!this.state.latePendencies &&
								this.state.latePendencies.length > 0) ||
							(!!this.state.deadlinePendencies &&
								this.state.deadlinePendencies.length > 0) ||
							(!!this.state.newPendencies &&
								this.state.newPendencies.length > 0) ? (
								<View>
									{this.renderPendencies(
										'Inspeções agendadas',
										'success',
										this.state.schedulePendencies
									)}
									{this.renderPendencies(
										'Inspeções atrasadas',
										'danger',
										this.state.latePendencies
									)}
									{this.renderPendencies(
										'Inspeções a vencer',
										'warning',
										this.state.deadlinePendencies
									)}
									{this.renderPendencies(
										'Novas inspeções',
										'success',
										this.state.newPendencies
									)}
								</View>
							) : (
								<Empty />
							)}
						</ContainerComponent>
					</ScrollView>
				</CustomSafeView>
			);
		}
	}
}

const styles = StyleSheet.create({
	content: {
		paddingTop: 0,
		marginBottom: Platform.OS === 'ios' ? 0 : 0
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	subHeader: {
		fontSize: 12,
		fontFamily: 'OpenSansSemiBold',
		fontWeight: '600',
		color: '#A8A8A8',
		marginTop: 15,
		marginBottom: 10
	}
});
