import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { CircleIcon } from '../navigation/tab-bar/circle-icon';
import { NormalIcon } from '../navigation/tab-bar/normal-icon';
import { GeneralScreen } from '../screens/general-screen/general-screen';
import { HomeScreen } from '../screens/home-screen/home-screen';
import { InspectionScreen } from '../screens/inspection-screen/inspection-screen';
import { RecomendationScreen } from '../screens/recomendation-screen/recomendation-screen';
import { RisksScreen } from '../screens/risks-screen/risks-screen';
import { Platform } from 'expo-core';
import { Config } from '../../../../core/config';

const CameraCircleIcon = props => {
	return <CircleIcon {...props} />;
};

const DefaultIcon = props => {
	return <NormalIcon {...props} />;
};

export const InspectionTabNavigator = createBottomTabNavigator(
	{
		Início: {
			screen: HomeScreen
		},
		Geral: {
			screen: GeneralScreen
		},
		Inspeção: {
			screen: InspectionScreen,
			showLabel: false
		},
		Riscos: {
			screen: RisksScreen
		},
		Recomendações: {
			screen: RecomendationScreen
		}
	},
	{
		initialRouteName: Config.INSPECTION_INICIAL_SCREEN,
		initialRouteParams: {
			inspection: 42
		},
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent = DefaultIcon;
				let iconName;

				if (routeName === 'Início') {
					iconName = Platform.OS === 'ios' ? 'ios-home' : 'md-home';
				} else if (routeName === 'Geral') {
					iconName = Platform.OS === 'ios' ? 'ios-apps' : 'md-apps';
				} else if (routeName === 'Inspeção') {
					iconName = Platform.OS === 'ios' ? 'ios-camera' : 'md-camera';
					IconComponent = CameraCircleIcon;
				} else if (routeName === 'Riscos') {
					iconName = Platform.OS === 'ios' ? 'ios-warning' : 'md-warning';
				} else if (routeName === 'Recomendações') {
					iconName = Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles';
				}

				return (
					<IconComponent
						title={routeName}
						name={iconName}
						size={25}
						color={tintColor}
						focused={focused}
					/>
				);
			}
		}),
		tabBarOptions: {
			activeTintColor: '#333333',
			inactiveTintColor: '#959595',
			showLabel: false
		}
	}
);
