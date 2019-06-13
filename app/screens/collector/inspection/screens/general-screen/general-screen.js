import '@firebase/firestore';
import * as firebase from 'firebase';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ContainerComponent } from '../../../../../components/container-component';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { Header } from '../../../includes/header/header';
import { GeneralFormComponent } from './components/general-form-component';
import { Loading } from '../../../../../components/loading/loading';

export class GeneralScreen extends React.Component {
	state = {
		inspection: this.props.navigation.getParam('inspection'),
		data: {},
		loaded: false
	};
	db = firebase.firestore();
	inspection = this.db.collection('inspection');

	constructor(props) {
		super(props);
		this.saveData = this.saveData.bind(this);
	}

	async componentWillMount() {
		const data = {};
		/* const data = await this.inspection
			.doc(`inspection-${this.state.inspection}`)
			.get()
			.then(doc => {
				if (doc.exists) {
					return doc.data();
				}
				return {};
			})
			.catch(err => {
				console.error(err);
			}); */
		this.setState({
			loaded: true,
			data: data
		});
	}

	saveData(data, field) {
		/* this.inspection
			.doc(`inspection-${this.state.inspection}`)
			.get()
			.then(doc => {
				if (!doc.exists) {
					this.inspection
						.doc(`inspection-${this.state.inspection}`)
						.set({
							[field]: data
						});
				} else {
					this.inspection
						.doc(`inspection-${this.state.inspection}`)
						.update({
							[field]: data
						});
				}
			})
			.catch(e => {
				console.error(
					'Erro interno ao verificar se dados da inspeção já existem.',
					e
				);
			}); */
	}

	render() {
		if (!this.state.loaded) {
			return <Loading />;
		} else {
			return (
				<CustomSafeView>
					<ScrollView>
						<ContainerComponent>
							<Header>Geral</Header>
							<GeneralFormComponent
								data={this.state.data}
								onChange={this.saveData}
							/>
						</ContainerComponent>
					</ScrollView>
				</CustomSafeView>
			);
		}
	}
}
