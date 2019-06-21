import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from '../../screens/login/login-screen';
import { DashboardScreen } from '../../screens/collector/dashboard/dashboard-screen';
import { InspectionScreen } from '../../screens/collector/inspection/inspection-screen';
import { Config } from '../config';
import { WelcomeScreen } from '../../screens/welcome/welcome-screen';
import { SettingsScreen } from '../../screens/settings/settings-screen';
import { Auth } from '../../services/auth/auth-service';
import AuthLoadingScreen from '../../screens/auth-loading/auth-loading-screen';

const isAuth = Auth.isAuthenticated();
const initialScreen = Config.DATA_LOAD_SCREEN;

export const AppNavigator = createStackNavigator(
	{
		AuthLoading: {
			screen: AuthLoadingScreen
		},
		Login: {
			screen: LoginScreen
		},
		Dashboard: {
			screen: DashboardScreen
		},
		Inspection: {
			screen: InspectionScreen
		},
		Welcome: {
			screen: WelcomeScreen
		},
		Settings: {
			screen: SettingsScreen
		}
	},
	{
		initialRouteName: initialScreen,
		cardStyle: {
			backgroundColor: '#f6f6f6'
		}
	}
);
