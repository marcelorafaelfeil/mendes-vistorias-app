import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from '../../screens/login/LoginScreen';
import { DashboardScreen } from '../../screens/collector/dashboard/DashboardScreen';
import { InspectionScreen } from '../../screens/collector/inspection/InspectionScreen';

const isAuth = true;
const initialScreen = isAuth ? 'Dashboard' : 'Login';

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
		initialRouteName: initialScreen
	}
);