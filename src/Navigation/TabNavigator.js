import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import colors from '../globals/colors';
import ShopStack from './ShopStack';
import CartStack from './CartStack';
import OrdersStack from './OrdersStack';
import ProfileStack from './ProfileStack';
import TabBarIcon from '../components/TabBarIcon';
import ErrorBoundary from '../ErrorBoundary';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<ErrorBoundary>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: styles.tabBar,
					tabBarLabelPosition: 'beside-icon',
				}}
			>
				<Tab.Screen
					name='Shop'
					component={ShopStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								text='Tienda'
								icon='shop'
								focused={focused}
							/>
						),
					}}
				/>
				<Tab.Screen
					name='Cart'
					component={CartStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								text='Carrito'
								icon='cart-shopping'
								focused={focused}
							/>
						),
					}}
				/>
				<Tab.Screen
					name='Orders'
					component={OrdersStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								text='Ordenes'
								icon='file-invoice'
								focused={focused}
							/>
						),
					}}
				/>

				<Tab.Screen
					name='Profile'
					component={ProfileStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								text='Perfil'
								icon='user-astronaut'
								focused={focused}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		</ErrorBoundary>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		height: 60,
		backgroundColor: colors.secondary,
	},
});

export default TabNavigator;
