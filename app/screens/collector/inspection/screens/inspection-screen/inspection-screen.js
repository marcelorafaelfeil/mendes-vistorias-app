import { Constants, Permissions } from 'expo';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { Header } from '../../../includes/header/header';
import GridPhotosComponent from './component/grid-photos-component';
import { InspectionPhotoPlaceholderComponent } from './component/inspection-photo-placeholder-component';
import PhotosService from './services/photos-service';
import { CustomActivityIndicatorComponent } from '../../../../../components/loading/custom-activity-indicator-component';

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
		const photos = await PhotosService.loadPhotosOfStorage(this.state.inspection);
		this.setState({
			photos,
			loaded: true
		})
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

	savePhoto(photo) {
		if (!photo.cancelled) {
			const photos = this.state.photos;
			photos.push(photo);
			this.setState({ photos });
			PhotosService.savePhoto(photos, this.state.inspection);
		}
	}

	removePhoto(index) {
		const photos = this.state.photos;
		photos.splice(index, 1);
		this.setState({ photos });
		PhotosService.savePhoto(photos, this.state.inspection);
	}

	render() {
		if (!this.state.loaded) {
			return <CustomActivityIndicatorComponent />
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
