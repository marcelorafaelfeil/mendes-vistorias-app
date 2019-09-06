import React from 'react';
import { Text, View } from 'react-native';
import { Panel } from '../../../../../components/panel/panel';
import { PanelBody } from '../../../../../components/panel/panel-body';
import { PanelHeader } from '../../../../../components/panel/panel-header';
import { theme } from '../../../../../theme/mendes-light';
import { FlatList } from 'react-native-gesture-handler';

export class ErrorsPanel extends React.Component {

	_getMessage(error, field) {
		if (error === 'required') {
			return `O campo "${field.name}", é obrigatório.`;
		}
	}

	_getMessagePhotoTemplate(error, field) {
		if (error === 'required') {
			return `A foto "${field.name}", é obrigatória.`;
		}
	}

	_renderErrorLi = (item) => {
		if (!!item.errors) {
			return (
				Object.keys(item.errors).map((e, index) => (
					<Text style={theme.formError} key={index}>{this._getMessage(e, {name: item.name})}</Text>
				))
			);
		}
	}

	_renderErrorTemplate = (item) => {
		if (!!item.errors) {
			return (
				Object.keys(item.errors).map((e, index) => (
					<Text style={theme.formError} key={index}>{this._getMessagePhotoTemplate(e, {name: item.shortDescription})}</Text>
				))
			);
		}
	}

	render() {
		console.log('items.errors: ', this.props.fields);
		if (!!this.props.fields && this.props.fields.length > 0) {
			return (
				<View>
					<Panel>
						<PanelHeader>Inconsistências</PanelHeader>
						<PanelBody>
							<Text style={{ marginBottom: 15 }}>
								Foram encontradas as seguintes inconsistências no formulário:
						</Text>
							<View style={[theme.row, { marginBottom: 0 }]}>
								<FlatList
									data={this.props.fields}
									keyExtractor={(item, index) => index.toString()}
									renderItem={(item) => this._renderErrorLi(item.item)}
								/>
								<FlatList
									data={!!this.props.photosTemplate ? this.props.photosTemplate.photosTemplateItems : []}
									keyExtractor={(item, index) => index.toString()}
									renderItem={(item) => this._renderErrorTemplate(item.item)}
								/>
							</View>
						</PanelBody>
					</Panel>
				</View>
			);
		} else {
			return <View />;
		}
	}
}