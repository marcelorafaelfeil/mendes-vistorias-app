import React from 'react';
import { Font } from 'expo';
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	TouchableHighlight,
	FlatList,
	ActivityIndicator
} from 'react-native';
import { Header } from '../includes/header/Header';
import { ListItem } from '../../../components/list/ListItem';
import { API, TEMP_TOKEN } from '../../../core/ApiContext';
import { FormatDashboardData } from './FormatDashboardData';
import { SafeAreaView } from 'react-navigation';
import { GetData } from '../../../utils/GetData';

const preloadStyle = {
	fontFamily: 'Arial'
};

export class DashboardScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = {
		loaded: 2,
		latePendencies: [],
		deadlinePendencies: [],
		newPendencies: []
	};

	componentWillMount() {
		this._loadAssetsAsyn();
	}

	async componentDidMount() {
		this._getMyPendencies();
	}

	_loadAssetsAsyn = async () => {
		await Font.loadAsync({
			OpenSans: require('../../../../assets/fonts/open-sans/OpenSans-Regular.ttf'),
			OpenSansSemiBold: require('../../../../assets/fonts/open-sans/OpenSans-SemiBold.ttf')
		});
		preloadStyle.fontFamily = 'consolas';
		this.setState({
			loaded: this.state.loaded - 1
		});
	};

	_getMyPendencies = () => {
		return fetch(API.GET_MY_PENDENCIES, {
			method: 'GET',
			headers: {
				Authorization: TEMP_TOKEN
			}
		})
			.then(response => response.json())
			.then(response => {
				const formatter = new FormatDashboardData(response);
				const latePendencies = formatter.getLatePendencies();
				const deadlinePendencies = formatter.getDeadlineRiskPendencies();
				const newPendencies = formatter.getNewPendencies();

				this.setState({
					latePendencies: latePendencies,
					deadlinePendencies: deadlinePendencies,
					newPendencies: newPendencies,
					loaded: this.state.loaded - 1
				});
			})
			.catch(err => {
				console.log('err: ', err);
			});
	};

	renderItem = (data, status) => {
		return (
			<TouchableHighlight
				onPress={() => this.props.navigation.navigate('Inspection', {inspection: data.item.id})}
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
				<SafeAreaView>
					<Header>Dashboard</Header>
					<ScrollView style={styles.content}>
						{this.renderPendencies('Inspeções atrasadas', 'danger', this.state.latePendencies)}
						{this.renderPendencies('Inspeções a vencer', 'warning', this.state.deadlinePendencies)}
						{this.renderPendencies('Novas inspeções', 'success', this.state.newPendencies)}
					</ScrollView>
				</SafeAreaView>
			);
		}
	}
}

const styles = StyleSheet.create({
	content: {
		padding: 15,
		paddingTop: 0,
		marginBottom: 50
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	subHeader: {
		fontSize: 12,
		fontFamily: 'OpenSansSemiBold',
		fontFamily: 'Arial',
		fontWeight: '600',
		color: '#A8A8A8',
		marginTop: 25,
		marginBottom: 10
	}
});
