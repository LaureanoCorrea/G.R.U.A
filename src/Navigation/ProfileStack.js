import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import ProfileScreen from '../screens/ProfileScreen';
import ImageSelector from '../screens/ImageSelector';
import LocationSelector from '../screens/LocationSelector';
import StartTravel from '../screens/StartTravel';
import { FontDisplay } from 'expo-font';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
	return (
		<Stack.Navigator
			screenOptions={({ route }) => ({
				header: () => {
					return <Header title={route.name} />;
				},
			})}
		>
			<Stack.Screen
				name='MyProfile'
				component={ProfileScreen}
			/>
			<Stack.Screen
				name='ImageSelector'
				component={ImageSelector}
			/>
			<Stack.Screen
				name='LocationSelector'
				component={LocationSelector}
			/>
			<Stack.Screen
				name='StartTravel'
				component={StartTravel}
			/>
		</Stack.Navigator>
	);
};

export default ProfileStack;
