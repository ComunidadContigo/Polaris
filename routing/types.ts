import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from './StackRoutes';

export type StackNavigationProp<
  RouteName extends keyof MainStackParamList = MainRoutes,
> = NativeStackNavigationProp<MainStackParamList, RouteName>;
