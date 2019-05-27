import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from '../../screens/login/login-screen';
import { DashboardScreen } from '../../screens/collector/dashboard/dashboard-screen';
import { InspectionScreen } from '../../screens/collector/inspection/inspection-screen';
import { Config } from '../config';

const isAuth = Config.getIsAuth();
const initialScreen = isAuth ? Config.INITIAL_AUTHENTICATED_SCREEN : Config.LOGIN_SCREEN;

export const AppNavigator = createStackNavigator(
	{
		Login: {
			screen: LoginScreen
		},
		Dashboard: {
			screen: DashboardScreen
		},
		Inspection: {
			screen: InspectionScreen
		}
	},
	{
		initialRouteName: initialScreen,
		cardStyle: {
			backgroundColor: '#f6f6f6'
		}
	}
);