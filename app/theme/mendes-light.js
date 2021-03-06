import { StyleSheet } from 'react-native';

const PRIMARY_COLOR = '#06e2b5';
const INPUT_HEIGHT = 48;

export const theme = StyleSheet.create({
	appContent: {
		backgroundColor: '#f6f6f6'
	},
	panelContent: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},
	panel: {
		backgroundColor: '#ffffff',
		padding: 10
	},
	panelText: {
		fontSize: 12,
		color: '#333333'
	},
	primaryColor: {
		color: PRIMARY_COLOR
	},
	inputGroup: {
		display: 'flex',
		flexDirection: 'row'
	},
	inputGroupItem: {
		flex: 1,
		height: INPUT_HEIGHT
	},
	input: {
		minHeight: INPUT_HEIGHT,
		borderWidth: 1,
		borderColor: PRIMARY_COLOR,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 10,
		paddingRight: 10,
		color: PRIMARY_COLOR,
		backgroundColor: '#FFF'
	},
	inputPlaceholder: {
		color: '#CCCCCC'
	},
	select: {
		height: INPUT_HEIGHT
	},
	selectIcon: {
		position: 'absolute',
		right: 10,
		top: 10,
		color: PRIMARY_COLOR
	},
	inputRange: {
		borderWidth: 1,
		borderColor: PRIMARY_COLOR,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: '#FFFFFF'
	},
	inputTextRange: {
		textAlign: 'center',
		color: PRIMARY_COLOR
	},
	inputGroupLabel: {
		backgroundColor: PRIMARY_COLOR,
		paddingLeft: 15,
		paddingRight: 15,
		justifyContent: 'center'
	},
	inputGroupLabelIcon: {
		backgroundColor: PRIMARY_COLOR,
		minHeight: INPUT_HEIGHT,
		padding: 10,
		paddingLeft: 15,
		paddingRight: 15,
		justifyContent: 'center'
	},
	inputGroupLabelText: {
		color: '#FFFFFF',
		textAlign: 'center',
		fontFamily: 'Roboto'
	},
	inputGroupLabelTimeRange: {
		width: 90
	},
	contentModal: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		display: 'flex',
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center'
	},
	pickerAndroidContainer: {
		borderWidth: 1,
		borderColor: PRIMARY_COLOR
	},
	pickerAndroid: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 10,
		paddingRight: 10,
		color: PRIMARY_COLOR,
		backgroundColor: '#FFF',
		height: INPUT_HEIGHT
	},
	bodyModal: {
		flex: 0,
		backgroundColor: '#FFF',
		margin: 10,
		padding: 15
	},
	textSubheader: {
		textTransform: 'uppercase',
		fontSize: 14,
		color: '#CCCCCC'
	},
	row: {
		display: 'flex',
		alignContent: 'stretch',
		flexWrap: 'wrap',
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: -5,
		marginRight: -5
	},
	columnBase: {
		padding: 5
	},
	'column-LG': {
		width: '100%',
	},
	'column-MD': {
		width: '50%',
	},
	'column-SM': {
		width: '33.33333%'
	},
	column: {
		flex: 1,
		padding: 5
	},
	separator: {
		borderTopWidth: 1,
		borderTopColor: '#CCCCCC',
		marginTop: 5,
		marginBottom: 20
	},
	formError: {
		color: '#F84949',
		fontWeight: 'bold',
		paddingLeft: 5
	},
	formErrorModal: {
		paddingLeft: 18
	},
	photosTemplateDescription: {
		color: '#AAAAAA',
		fontSize: 12,
		textAlign: 'center',
		marginBottom: 15
	}
});
