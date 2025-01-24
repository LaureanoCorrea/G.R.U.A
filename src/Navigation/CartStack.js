import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/CartScreen';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const CartStack = () => {
	return (
		<Stack.Navigator
			screenOptions={() => ({
				header: () => {
					return <Header title='Carrito' />;
				},
			})}
		>
			<Stack.Screen
				name='MainCart'
				component={CartScreen}
			/>
		</Stack.Navigator>
	);
};

export default CartStack;
