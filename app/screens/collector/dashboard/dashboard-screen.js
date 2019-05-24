import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { CustomSafeView } from '../../../components/custom-safe-view';
import { ListItem } from '../../../components/list/list-item';
import { PendenciesService } from '../../../services/rest/pendencies-service';
import { GetData } from '../../../utils/get-data';
import { Header } from '../includes/header/header';
import { Platform } from 'expo-core';

export class DashboardScreen extends React.Component {
	static navigationOptions = {
		header: null,
		gesturesEnabled: false
	};

	state = {
		loaded: 1,
		latePendencies: [],
		deadlinePendencies: [],
		newPendencies: []
	};

	async componentDidMount() {
		return PendenciesService.getMyPendencies().then(data => {
			this.setState({
				...data,
				loaded: this.state.loaded - 1
			});
		});
	}

	renderItem = (data, status) => {
		return (
			<TouchableHighlight
				onPress={() =>
					this.props.navigation.navigate('Inspection', {
						inspection: data.item.id
					})
				}
			>
				<ListItem
					label={data.item.name}
					description={GetData.getAddress(data.item.address)}
					status={status}
					time={!!data.item.time ? data.item.time.quantity * -1 : 0}
					unit={!!data.item.time ? data.item.time.unit : ''}
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

	render() {
		if (this.state.loaded > 0) {
			return (
				<View style={styles.loader}>
					<ActivityIndicator size='large' color='#0c9' />
				</View>
			);
		} else {
			return (
				<CustomSafeView>
					<Header>Dashboard</Header>
					<ScrollView style={styles.content}>
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
					</ScrollView>
				</CustomSafeView>
			);
		}
	}
}

const styles = StyleSheet.create({
	content: {
		padding: 15,
		paddingTop: 0,
		marginBottom: Platform.OS === 'ios' ? 40 : 0
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
