import { Font } from 'expo';
export class LoadFontService {
	static loadOpenSans = async () => {
		return Font.loadAsync({
			OpenSans: require('../../../assets/fonts/open-sans/OpenSans-Regular.ttf'),
			OpenSansSemiBold: require('../../../assets/fonts/open-sans/OpenSans-SemiBold.ttf')
		});
	};

	static loadRoboto = async () => {
		return Font.loadAsync({
			Roboto: require('../../../assets/fonts/Roboto-Regular.ttf')
		});
	};

}
