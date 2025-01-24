import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import Orders from '../screens/Orders';
import OrderSelected from '../screens/OrderSelected';

const Stack = createNativeStackNavigator();
const OrdersStack = () => {
	return (
		<Stack.Navigator
			screenOptions={({ route }) => ({
				header: () => {
					return <Header title={route.name} />;
				},
			})}
		>
			<Stack.Screen
				name='OrderScreen'
				component={Orders}
			/>
			<Stack.Screen
				name='AllOrders'
				component={OrderSelected}
			/>
		</Stack.Navigator>
	);
};

export default OrdersStack;
