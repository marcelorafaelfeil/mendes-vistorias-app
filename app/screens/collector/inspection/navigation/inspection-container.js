import { createAppContainer } from 'react-navigation';
import { InspectionTabNavigator } from './inspection-tab-navigator';

export const InspectionContainer = createAppContainer(InspectionTabNavigator);
