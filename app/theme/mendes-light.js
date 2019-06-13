import { StyleSheet } from 'react-native';

const PRIMARY_COLOR = '#06e2b5'

export const theme = StyleSheet.create({
	primaryColor: {
		color: PRIMARY_COLOR
	},
	inputGroup: {
		display: 'flex',
		flexDirection: 'row'
	},
	inputGroupItem: {
		flex: 1
	},
	input: {
		borderWidth: 1,
		borderColor: PRIMARY_COLOR,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'center',
		color: PRIMARY_COLOR,
		backgroundColor: '#FFF',
	},
	select: {
		height: 47
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
	selectContentModal: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		display: 'flex',
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center'
	},
	selectModal: {
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
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: -5,
		marginRight: -5
	},
	column: {
		flex: 1,
		margin: 5
	},
	column6: {
		flexGrow: 1,
		margin: 5
	}
});