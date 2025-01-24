import { FlatList, StyleSheet, View } from 'react-native';
import CardOrders from '../components/CardOrders';
import ErrorBoundary from '../ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyListComponent from '../components/EmptyListComponent';
import { useGetOrdersUserQuery } from '../services/orders';
import { useSelector } from 'react-redux';

const Orders = () => {
	const localId = useSelector((state) => state.user.localId);
	const { data: orders, isLoading } = useGetOrdersUserQuery({ localId });

	if (isLoading) return <LoadingSpinner />;
	if (!orders)
		return <EmptyListComponent message='No hay ordenes, apurate a comprar!' />;

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
