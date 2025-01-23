import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import CardForCart from '../components/CardForCart';
import colors from '../globals/colors';
import ErrorBoundary from '../ErrorBoundary';
import { usePostOrderMutation } from '../services/orders';
import { useSelector } from 'react-redux';
import { useGetCartQuery } from '../services/cart';
import { useEffect, useState } from 'react';

const Cart = () => {
	const [triggerPost] = usePostOrderMutation();
	const localId = useSelector((state) => state.user.localId);
	const { data: cart } = useGetCartQuery({ localId });
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (cart) {
			setTotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
		}
	}, [cart]);

	const confirmCart = () => {
		triggerPost({
			products: [{ id: 1, quantity: 1 }],
			total: 123,
		});
	};

	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<FlatList
					data={cart}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <CardForCart product={item} />}
				/>
			</View>
			<View style={styles.content}>
				<Text style={styles.total}>Total:{total} $</Text>
				<Pressable
					style={styles.button}
					onPress={confirmCart}
				>
					<Text style={styles.buttonText}> Finalizar Compra </Text>
				</Pressable>
			</View>
		</ErrorBoundary>
	);
};

export default Cart;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 170,
	},
	content: {
		width: '100%',
		position: 'absolute',
		backgroundColor: '#fff',
		padding: 10,
		bottom: 60,
	},
	total: {
		textAlign: 'right',
		fontSize: 24,
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: colors.primary,
		marginTop: 10,
		padding: 10,
		alignItems: 'center',
		borderRadius: 7,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});
