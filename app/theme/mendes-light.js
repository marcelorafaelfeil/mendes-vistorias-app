import { StyleSheet } from 'react-native';

export const theme = StyleSheet.create({
	inputGroup: {
		flex: 1
	},
	inputRange: {
		borderWidth: 1,
		borderColor: 'rgba(12, 254, 204, 0.5)',
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: '#FFFFFF'
	},
	inputTextRange: {
		textAlign: 'center',
		color: 'rgba(12, 254, 204, 0.5)'
	},
	inputGroupLabel: {
		backgroundColor: 'rgb(12, 254, 204)',
		paddingTop: 15,
		paddingBottom: 15
	},
	inputGroupLabelText: {
		color: '#FFFFFF',
		textAlign: 'center'
	},
	inputGroupLabelTimeRange: {
		width: 90
	},
	iosDateContentModal: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		display: 'flex',
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center'
	},
	iosDateModal: {
		flex: 0,
		backgroundColor: '#FFF',
		margin: 10,
		padding: 15
	},
	textSubheader: {
		textTransform: 'uppercase',
		fontSize: 14,
		color: '#CCCCCC'
	}
});