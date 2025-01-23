import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ProductsByCategory from '../screens/ProductsByCategory';
import Details from '../screens/Details';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();
const ShopStack = () => {
	return (
		<Stack.Navigator
			screenOptions={({ route }) => ({
				header: () => {
					return (
						<Header
							title={
								route.name === 'Home'
									? 'Categorias'
									: route.name === 'Products'
									? route.params?.category || 'Productos'
									: route.params?.product?.name || 'Detalles'
							}
						/>
					);
				},
			})}
		>
			<Stack.Screen
				name='Home'
				component={Home}
			/>
			<Stack.Screen
				name='Products'
				component={ProductsByCategory}
			/>
			<Stack.Screen
				name='Details'
				component={Details}
			/>
		</Stack.Navigator>
	);
};

export default ShopStack;
