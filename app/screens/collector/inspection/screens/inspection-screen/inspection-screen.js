import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { CustomActivityIndicatorComponent } from '../../../../../components/loading/custom-activity-indicator-component';
import { Header } from '../../../includes/header/header';
import GridPhotosComponent from './component/grid-photos-component';
import { InspectionPhotoPlaceholderComponent } from './component/inspection-photo-placeholder-component';
import PhotosService from './services/photos-service';

export class InspectionScreen extends React.Component {
	state = {
		inspection: this.props.navigation.getParam('inspection'),
		photos: [],
		loaded: false
	};

	constructor(props) {
		super(props);
		this.savePhoto = this.savePhoto.bind(this);
		this.removePhoto = this.removePhoto.bind(this);
	}

	async componentDidMount() {
		this.getPermissionAsync();
		const photos = await PhotosService.loadPhotosOfStorage(
			this.state.inspection
		);
		this.setState({
			photos,
			loaded: true
		});
	}

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(
				Permissions.CAMERA_ROLL,
				Permissions.CAMERA
			);
			if (status !== 'granted') {
				alert(
					'Sorry, we need camera roll permissions to make this work!'
				);
			}
		}
	};

	/**
	 * @description Salva a foto na memória do celular e também salva a foto no banco de dados.
	 */
	savePhoto(photo) {
		if (!photo.cancelled) {
			const photos = this.state.photos;
			photo.loading = true;
			photo.completed = false;
			const index = photos.push(photo) - 1;
			this.setState({ photos });

			// Salva a foto na memória do celular
			AsyncStorage.setItem(
				PhotosService.TAG_PHOTOS + this.state.inspection,
				JSON.stringify(photos)
			);

			// Salva a foto no banco de dados
			PhotosService.savePhoto(photo, this.state.inspection).then(
				response => {
					// Se retornar sucesso, remove o loading.
					const photos = this.state.photos;
					photos[index].id = response.data.id;
					photos[index].loading = false;
					photos[index].completed = true;
					this.setState({ photos });
				},
				err => {
					const photos = this.state.photos;
					photos[index].loading = false;
					this.setState({ photos });
					console.info(`ERROR: Não foi possível salvar a foto.`);
					console.error(err);
				}
			);
		}
	}

	removePhoto(index) {
		const photos = this.state.photos;
		if (!!photos[index].id) {
			PhotosService.removePhoto(photos[index].id);
		}
		photos.splice(index, 1);
		this.setState({ photos });
		// Salva a foto na memória do celular
		AsyncStorage.setItem(
			PhotosService.TAG_PHOTOS + this.state.inspection,
			JSON.stringify(photos)
		);
	}

	render() {
		if (!this.state.loaded) {
			return <CustomActivityIndicatorComponent />;
		}
		return (
			<CustomSafeView>
				<ScrollView>
					<Header>Inspecionar</Header>
					{this.state.photos.length === 0 ? (
						<InspectionPhotoPlaceholderComponent
							onFinish={this.savePhoto}
						/>
					) : (
						<GridPhotosComponent
							onRemove={this.removePhoto}
							onFinish={this.savePhoto}
							photos={this.state.photos}
						/>
					)}
				</ScrollView>
			</CustomSafeView>
		);
	}
}
