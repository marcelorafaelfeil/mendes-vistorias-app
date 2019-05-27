import { Linking } from 'react-native';
import { BindVariable } from './bind-variable';
export class OpenLinksUtils {
	
	static wazeUrl = 'https://waze.com/ul?q={address}';

	static openSendMail(mail) {
		Linking.openURL(`mailto:${mail}`);
	}
	
	static openCallPhone(number) {
		Linking.openURL(`tel: ${number}`);
	}

	static openWazeByAddress(address) {
		const url = BindVariable.bind(OpenLinksUtils.wazeUrl, { address: address });
		Linking.canOpenURL(url).then((supported) => {
			if (supported) {
				Linking.openURL(url).catch(err => {
					console.error('An error occurred', err);
					alert('Não foi possível abrir esse endereço no waze.');
				});
			} else {
				alert('Não foi possível abrir o endereço no waze. Verifique se o aplicativo está instalado.');
			}
		}).catch(err => alert('Não foi possível abrir esse aplicativo.'));
	}
}
