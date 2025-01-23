import { StyleSheet, Text, View } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import ErrorBoundary from '../ErrorBoundary';

const CardOrders = ({ order }) => {
	const date = new Date(order.createdAt).toLocaleDateString();
	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.text}>Order ID: {order.id}</Text>
					<Text style={styles.text}>Fecha de compra: {date}</Text>
					<Text style={styles.text}>Total de la compra: ${order.total}</Text>
				</View>
				<EvilIcons
					name='search'
					size={24}
					color='black'
				/>
			</View>
		</ErrorBoundary>
	);
};

export default CardOrders;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 7,
		padding: 16,
		margin: 12,
		backgroundColor: '#f1f1f1',
		borderRadius: 8,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	text: {
		fontSize: 16,
		marginBottom: 4,
	},
});
