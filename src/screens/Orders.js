import { FlatList, StyleSheet, Text, View } from 'react-native';
import orders from '../data/orders.json';
import CardOrders from '../components/CardOrders';
import ErrorBoundary from '../ErrorBoundary';

const Orders = () => {
	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<FlatList
					data={orders}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <CardOrders order={item} />}
				/>
			</View>
		</ErrorBoundary>
	);
};

export default Orders;

const styles = StyleSheet.create({});
