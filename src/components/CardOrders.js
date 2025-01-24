import { Pressable, StyleSheet, Text, View } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import ErrorBoundary from '../ErrorBoundary';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDeleteOrderMutation } from '../services/orders';

const CardOrders = ({ order }) => {
	const localId = useSelector((state) => state.user.localId);
	const [triggerDeleteOrder] = useDeleteOrderMutation();
	const navigation = useNavigation();

	const deleteOrder = () => {
		triggerDeleteOrder({ localId, orderId: order.id });
	};

	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.text}>Order ID: {order.id}</Text>
					<Text style={styles.text}>Fecha de compra: {order.createdAt}</Text>
					<Text style={styles.text}>Total de la compra: ${order.total}</Text>
				</View>
				<View style={styles.icons}>
					<Pressable
						onPress={() => {
							navigation.navigate('AllOrders', { order });
						}}
					>
						<EvilIcons
							name='search'
							size={30}
							color='black'
						/>
					</Pressable>
					<Pressable onPress={deleteOrder}>
						<EvilIcons
							name='trash'
							size={30}
							color='black'
						/>
					</Pressable>
				</View>
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
	icons: {
		gap: 17,
	},
});
